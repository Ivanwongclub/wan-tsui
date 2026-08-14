import { useEffect, useMemo, useState } from 'react';
import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Spin, Switch, Table, Tag, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export const Route = createFileRoute('/admin/schedule')({
  ssr: false,
  component: AdminSchedulePage,
});

type ScheduleRow = Tables<'doctor_schedule'>;

type Draft = {
  am_tc: string;
  am_en: string;
  pm_tc: string;
  pm_en: string;
  is_closed_am: boolean;
  is_closed_pm: boolean;
};

const DAY_LABELS: Record<string, string> = {
  mon: '星期一 Mon',
  tue: '星期二 Tue',
  wed: '星期三 Wed',
  thu: '星期四 Thu',
  fri: '星期五 Fri',
  sat: '星期六 Sat',
  sun: '星期日 Sun',
};

function AdminSchedulePage() {
  const queryClient = useQueryClient();
  const [messageApi, messageContext] = message.useMessage();
  const [modal, modalContext] = Modal.useModal();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'doctor_schedule'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('doctor_schedule')
        .select('*')
        .order('sort', { ascending: true });
      if (error) throw error;
      return (data ?? []) as ScheduleRow[];
    },
  });

  const dataMap = useMemo(() => {
    const map = new Map<string, ScheduleRow>();
    for (const row of data ?? []) map.set(row.day_id, row);
    return map;
  }, [data]);

  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [baseline, setBaseline] = useState<Record<string, Draft>>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (data && !initialized) {
      const initDrafts: Record<string, Draft> = {};
      const initBaseline: Record<string, Draft> = {};
      for (const row of data) {
        const draft: Draft = {
          am_tc: row.am_tc ?? '',
          am_en: row.am_en ?? '',
          pm_tc: row.pm_tc ?? '',
          pm_en: row.pm_en ?? '',
          is_closed_am: row.is_closed_am,
          is_closed_pm: row.is_closed_pm,
        };
        initDrafts[row.day_id] = draft;
        initBaseline[row.day_id] = { ...draft };
      }
      setDrafts(initDrafts);
      setBaseline(initBaseline);
      setInitialized(true);
    }
  }, [data, initialized]);

  const updateDraft = (dayId: string, patch: Partial<Draft>) => {
    setDrafts((prev) => {
      const current = prev[dayId] ?? fallbackDraft(dataMap.get(dayId));
      return { ...prev, [dayId]: { ...current, ...patch } };
    });
  };

  const changedDayIds = useMemo(() => {
    const ids: string[] = [];
    for (const dayId of Object.keys(drafts)) {
      const base = baseline[dayId];
      if (!base) continue;
      const d = drafts[dayId];
      if (
        d.am_tc !== base.am_tc ||
        d.am_en !== base.am_en ||
        d.pm_tc !== base.pm_tc ||
        d.pm_en !== base.pm_en ||
        d.is_closed_am !== base.is_closed_am ||
        d.is_closed_pm !== base.is_closed_pm
      ) {
        ids.push(dayId);
      }
    }
    return ids;
  }, [drafts, baseline]);

  const hasChanges = changedDayIds.length > 0;

  useBlocker({
    shouldBlockFn: () => {
      if (!hasChanges) return false;
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
    enableBeforeUnload: () => hasChanges,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const upserts = changedDayIds.map((dayId) => {
        const d = drafts[dayId];
        const row = dataMap.get(dayId);
        return {
          day_id: dayId,
          sort: row?.sort ?? 0,
          am_tc: d.am_tc === '' ? null : d.am_tc,
          am_en: d.am_en === '' ? null : d.am_en,
          pm_tc: d.pm_tc === '' ? null : d.pm_tc,
          pm_en: d.pm_en === '' ? null : d.pm_en,
          is_closed_am: d.is_closed_am,
          is_closed_pm: d.is_closed_pm,
          updated_at: new Date().toISOString(),
        };
      });

      const { error } = await supabase
        .from('doctor_schedule')
        .upsert(upserts, { onConflict: 'day_id' });
      if (error) throw error;
      return changedDayIds;
    },
    onSuccess: (dayIds) => {
      messageApi.success('Saved');
      setBaseline((prev) => {
        const next = { ...prev };
        for (const dayId of dayIds) {
          next[dayId] = { ...drafts[dayId] };
        }
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ['admin', 'doctor_schedule'] });
    },
    onError: (error: unknown) => {
      messageApi.error(error instanceof Error ? error.message : 'Save failed');
    },
  });

  const columns: ColumnsType<ScheduleRow> = [
    {
      title: 'Day 星期',
      dataIndex: 'day_id',
      key: 'day',
      render: (dayId: string) => DAY_LABELS[dayId] ?? dayId,
    },
    {
      title: 'AM 上午（繁中）',
      key: 'am_tc',
      render: (_, record) => {
        const draft = drafts[record.day_id];
        const disabled = draft ? draft.is_closed_am : record.is_closed_am;
        const value = draft ? draft.am_tc : (record.am_tc ?? '');
        return (
          <Input
            disabled={disabled}
            value={value}
            onChange={(e) => updateDraft(record.day_id, { am_tc: e.target.value })}
          />
        );
      },
    },
    {
      title: 'AM (English)',
      key: 'am_en',
      render: (_, record) => {
        const draft = drafts[record.day_id];
        const disabled = draft ? draft.is_closed_am : record.is_closed_am;
        const value = draft ? draft.am_en : (record.am_en ?? '');
        return (
          <Input
            disabled={disabled}
            value={value}
            onChange={(e) => updateDraft(record.day_id, { am_en: e.target.value })}
          />
        );
      },
    },
    {
      title: 'PM 下午（繁中）',
      key: 'pm_tc',
      render: (_, record) => {
        const draft = drafts[record.day_id];
        const disabled = draft ? draft.is_closed_pm : record.is_closed_pm;
        const value = draft ? draft.pm_tc : (record.pm_tc ?? '');
        return (
          <Input
            disabled={disabled}
            value={value}
            onChange={(e) => updateDraft(record.day_id, { pm_tc: e.target.value })}
          />
        );
      },
    },
    {
      title: 'PM (English)',
      key: 'pm_en',
      render: (_, record) => {
        const draft = drafts[record.day_id];
        const disabled = draft ? draft.is_closed_pm : record.is_closed_pm;
        const value = draft ? draft.pm_en : (record.pm_en ?? '');
        return (
          <Input
            disabled={disabled}
            value={value}
            onChange={(e) => updateDraft(record.day_id, { pm_en: e.target.value })}
          />
        );
      },
    },
    {
      title: '上午休息 Closed AM',
      key: 'is_closed_am',
      render: (_, record) => {
        const draft = drafts[record.day_id];
        const checked = draft ? draft.is_closed_am : record.is_closed_am;
        return (
          <Switch
            checked={checked}
            onChange={(checked) => updateDraft(record.day_id, { is_closed_am: checked })}
          />
        );
      },
    },
    {
      title: '下午休息 Closed PM',
      key: 'is_closed_pm',
      render: (_, record) => {
        const draft = drafts[record.day_id];
        const checked = draft ? draft.is_closed_pm : record.is_closed_pm;
        return (
          <Switch
            checked={checked}
            onChange={(checked) => updateDraft(record.day_id, { is_closed_pm: checked })}
          />
        );
      },
    },
  ];

  if (isLoading || !initialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200 }}>
      {messageContext}
      {modalContext}
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        醫生當值時間表
      </Typography.Title>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}
      >
        {hasChanges && <Tag color="warning">Unsaved changes</Tag>}
        <Button
          type="primary"
          loading={saveMutation.isPending}
          disabled={!hasChanges || saveMutation.isPending}
          onClick={() => saveMutation.mutate()}
        >
          Save
        </Button>
      </div>

      <Table
        rowKey="day_id"
        dataSource={data ?? []}
        columns={columns}
        pagination={false}
        bordered
        size="middle"
      />

      <Typography.Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
        休息時段會自動在網站顯示為休診。Closed sessions are shown as closed on the website automatically.
      </Typography.Text>
    </div>
  );
}

function fallbackDraft(row?: ScheduleRow): Draft {
  return {
    am_tc: row?.am_tc ?? '',
    am_en: row?.am_en ?? '',
    pm_tc: row?.pm_tc ?? '',
    pm_en: row?.pm_en ?? '',
    is_closed_am: row?.is_closed_am ?? false,
    is_closed_pm: row?.is_closed_pm ?? false,
  };
}
