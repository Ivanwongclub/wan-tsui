import { useCallback, useEffect, useMemo, useState } from 'react';
import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Badge,
  Button,
  Collapse,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Typography,
  message,
} from 'antd';
import { supabase } from '@/integrations/supabase/client';
import { CONTENT } from '@/content';
import { EDITABLE_SECTIONS, type EditableField } from '@/admin/editableFields';

export const Route = createFileRoute('/admin/content')({
  ssr: false,
  component: AdminContentPage,
});

type Row = { key: string; value_tc: string | null; value_en: string | null };
type Draft = { tc: string; en: string };

function readPath(root: unknown, path: string): string | null {
  let node: unknown = root;
  for (const part of path.split('.')) {
    if (node === null || typeof node !== 'object') return null;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === 'string' ? node : null;
}

function AdminContentPage() {
  const queryClient = useQueryClient();
  const [messageApi, messageContext] = message.useMessage();
  const [modal, modalContext] = Modal.useModal();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'site_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, value_tc, value_en');
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const rowMap = useMemo(() => {
    const map = new Map<string, Row>();
    for (const row of data ?? []) map.set(row.key, row);
    return map;
  }, [data]);

  const baseline = useMemo(() => {
    const map = new Map<string, Draft>();
    for (const section of EDITABLE_SECTIONS) {
      for (const field of section.fields) {
        const row = rowMap.get(field.key);
        map.set(field.key, {
          tc: row?.value_tc ?? readPath(CONTENT.tc, field.key) ?? '',
          en: row?.value_en ?? readPath(CONTENT.en, field.key) ?? '',
        });
      }
    }
    return map;
  }, [rowMap]);

  const [drafts, setDrafts] = useState<Record<string, Draft>>({});

  useEffect(() => {
    setDrafts({});
  }, [baseline]);

  const valueOf = useCallback(
    (key: string): Draft => drafts[key] ?? baseline.get(key) ?? { tc: '', en: '' },
    [drafts, baseline],
  );

  const changedKeys = useMemo(() => {
    const keys = new Set<string>();
    for (const [key, draft] of Object.entries(drafts)) {
      const base = baseline.get(key);
      if (!base) continue;
      if (draft.tc !== base.tc || draft.en !== base.en) keys.add(key);
    }
    return keys;
  }, [drafts, baseline]);

  const hasUnsaved = changedKeys.size > 0;

  useBlocker({
    shouldBlockFn: () => {
      if (!hasUnsaved) return false;
      return new Promise<boolean>((resolve) => {
        modal.confirm({
          title: 'Discard unsaved changes?',
          content: 'You have unsaved changes on this page. Leaving will discard them.',
          okText: 'Discard',
          cancelText: 'Stay',
          okButtonProps: { danger: true },
          onOk: () => resolve(false),
          onCancel: () => resolve(true),
        });
      });
    },
    enableBeforeUnload: () => hasUnsaved,
  });

  const saveMutation = useMutation({
    mutationFn: async (keys: string[]) => {
      const deleteKeys: string[] = [];
      const upserts: { key: string; value_tc: string | null; value_en: string | null; updated_at: string }[] = [];

      for (const key of keys) {
        const draft = valueOf(key);
        const staticTc = readPath(CONTENT.tc, key) ?? '';
        const staticEn = readPath(CONTENT.en, key) ?? '';
        const nextTc = draft.tc === staticTc || draft.tc === '' ? null : draft.tc;
        const nextEn = draft.en === staticEn || draft.en === '' ? null : draft.en;

        if (nextTc === null && nextEn === null) {
          deleteKeys.push(key);
        } else {
          upserts.push({
            key,
            value_tc: nextTc,
            value_en: nextEn,
            updated_at: new Date().toISOString(),
          });
        }
      }

      if (deleteKeys.length > 0) {
        const { error } = await supabase.from('site_content').delete().in('key', deleteKeys);
        if (error) throw error;
      }

      if (upserts.length > 0) {
        const { error } = await supabase.from('site_content').upsert(upserts, { onConflict: 'key' });
        if (error) throw error;
      }

      return keys;
    },
    onSuccess: (keys) => {
      setDrafts((prev) => {
        const next = { ...prev };
        for (const key of keys) delete next[key];
        return next;
      });
      messageApi.success('Saved');
      queryClient.invalidateQueries({ queryKey: ['admin', 'site_content'] });
    },
    onError: (error: unknown) => {
      messageApi.error(error instanceof Error ? error.message : 'Save failed');
    },
  });

  const resetMutation = useMutation({
    mutationFn: async (key: string) => {
      const { error } = await supabase.from('site_content').delete().eq('key', key);
      if (error) throw error;
      return key;
    },
    onSuccess: (key) => {
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      messageApi.success('Reset to original text');
      queryClient.invalidateQueries({ queryKey: ['admin', 'site_content'] });
    },
    onError: (error: unknown) => {
      messageApi.error(error instanceof Error ? error.message : 'Reset failed');
    },
  });

  const setValue = (key: string, part: keyof Draft, value: string) => {
    setDrafts((prev) => {
      const base = prev[key] ?? baseline.get(key) ?? { tc: '', en: '' };
      return { ...prev, [key]: { ...base, [part]: value } };
    });
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
        <Spin size="large" />
      </div>
    );
  }

  const renderField = (field: EditableField) => {
    const missing =
      readPath(CONTENT.tc, field.key) === null && readPath(CONTENT.en, field.key) === null;
    const draft = valueOf(field.key);
    const hasRow = rowMap.has(field.key);
    const Control = field.input === 'textarea' ? Input.TextArea : Input;
    const controlProps = field.input === 'textarea' ? { autoSize: { minRows: 2, maxRows: 8 } } : {};

    return (
      <div key={field.key} style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Typography.Text strong>{field.label}</Typography.Text>
          {changedKeys.has(field.key) && <Badge status="processing" text="unsaved" />}
          {hasRow && !missing && (
            <Popconfirm
              title="Reset to the original text?"
              okText="Reset"
              cancelText="Cancel"
              onConfirm={() => resetMutation.mutate(field.key)}
            >
              <Typography.Link style={{ fontSize: 12 }}>Reset</Typography.Link>
            </Popconfirm>
          )}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 12,
          }}
        >
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              繁中 (TC)
            </Typography.Text>
            <Control
              {...controlProps}
              disabled={missing}
              placeholder={missing ? 'key not found' : ''}
              value={missing ? '' : draft.tc}
              onChange={(e) => setValue(field.key, 'tc', e.target.value)}
            />
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              English (EN)
            </Typography.Text>
            <Control
              {...controlProps}
              disabled={missing}
              placeholder={missing ? 'key not found' : ''}
              value={missing ? '' : draft.en}
              onChange={(e) => setValue(field.key, 'en', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const items = EDITABLE_SECTIONS.map((section) => {
    const sectionChanged = section.fields.filter((f) => changedKeys.has(f.key)).map((f) => f.key);
    const saving = saveMutation.isPending && saveMutation.variables?.[0] === sectionChanged[0];
    return {
      key: section.id,
      label: (
        <Badge dot={sectionChanged.length > 0} offset={[6, 0]}>
          <span style={{ fontWeight: 600 }}>{section.title}</span>
        </Badge>
      ),
      extra: (
        <Button
          type="primary"
          size="small"
          disabled={sectionChanged.length === 0}
          loading={saving}
          onClick={(e) => {
            e.stopPropagation();
            saveMutation.mutate(sectionChanged);
          }}
        >
          Save
        </Button>
      ),
      children: <div>{section.fields.map(renderField)}</div>,
    };
  });

  return (
    <div style={{ maxWidth: 1100 }}>
      {messageContext}
      {modalContext}
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        Content
      </Typography.Title>
      <Collapse items={items} defaultActiveKey={['announcement']} />
    </div>
  );
}
