import { useEffect, useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Col, Input, Popconfirm, Row, Spin, Tag, Typography, Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { supabase } from '@/integrations/supabase/client';
import { getImage } from '@/lib/imageHelpers';
import type { Tables } from '@/integrations/supabase/types';

export const Route = createFileRoute('/admin/images')({
  ssr: false,
  component: AdminImagesPage,
});

type ImageRow = Tables<'site_images'>;

const SIGNED_URL_EXPIRY = 315360000; // 10 years, in seconds

const SLOTS = [
  { key: 'hero-clinic', label: 'Homepage hero (主頁大相)' },
  { key: 'doctor-mak', label: 'Dr Mak photo (麥振威醫生相片)' },
  { key: 'doctor-lam', label: 'Dr Lam photo (林慧美醫生相片)' },
  { key: 'location-chai-wan', label: 'Location photo (診所位置相片)' },
  { key: 'service-general-practice', label: 'General practice (全科門診)' },
  { key: 'service-colorectal-screening', label: 'Colorectal screening (大腸癌篩查)' },
  { key: 'service-chronic-disease', label: 'Chronic disease co-care (慢性病共同治理)' },
  { key: 'service-flu-vaccine', label: 'Influenza vaccination (流感疫苗)' },
  { key: 'service-voucher', label: 'Health care voucher (醫療券)' },
] as const;

const DEFAULT_SRC: Record<string, string> = Object.fromEntries(
  SLOTS.map((s) => [s.key, getImage(s.key as Parameters<typeof getImage>[0]).src]),
);

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 5 * 1024 * 1024;

function sanitise(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
}

type Draft = { alt_tc: string; alt_en: string };

function AdminImagesPage() {
  const queryClient = useQueryClient();
  const [messageApi, messageContext] = message.useMessage();
  const [uploading, setUploading] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [initialized, setInitialized] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'site_images'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_images').select('*');
      if (error) throw error;
      return (data ?? []) as ImageRow[];
    },
  });

  const rowMap = useMemo(() => {
    const map = new Map<string, ImageRow>();
    for (const row of data ?? []) map.set(row.key, row);
    return map;
  }, [data]);

  useEffect(() => {
    if (data && !initialized) {
      const init: Record<string, Draft> = {};
      for (const slot of SLOTS) {
        const row = rowMap.get(slot.key);
        init[slot.key] = { alt_tc: row?.alt_tc ?? '', alt_en: row?.alt_en ?? '' };
      }
      setDrafts(init);
      setInitialized(true);
    }
  }, [data, initialized, rowMap]);

  const saveAlt = useMutation({
    mutationFn: async (key: string) => {
      const draft = drafts[key];
      const { error } = await supabase
        .from('site_images')
        .update({
          alt_tc: draft.alt_tc.trim() === '' ? null : draft.alt_tc,
          alt_en: draft.alt_en.trim() === '' ? null : draft.alt_en,
          updated_at: new Date().toISOString(),
        })
        .eq('key', key);
      if (error) throw error;
    },
    onSuccess: () => {
      messageApi.success('Alt text saved');
      queryClient.invalidateQueries({ queryKey: ['admin', 'site_images'] });
    },
    onError: (e: Error) => messageApi.error(e.message),
  });

  const restore = useMutation({
    mutationFn: async (key: string) => {
      const { error } = await supabase
        .from('site_images')
        .update({ url: null, updated_at: new Date().toISOString() })
        .eq('key', key);
      if (error) throw error;
    },
    onSuccess: () => {
      messageApi.success('Restored default image');
      queryClient.invalidateQueries({ queryKey: ['admin', 'site_images'] });
    },
    onError: (e: Error) => messageApi.error(e.message),
  });

  async function handleUpload(key: string, file: File) {
    setUploading(key);
    try {
      const path = `${key}/${Date.now()}-${sanitise(file.name)}`;
      const { error: upErr } = await supabase.storage
        .from('site-images')
        .upload(path, file, { upsert: false, contentType: file.type });
      if (upErr) throw upErr;

      const { data: signed, error: signErr } = await supabase.storage
        .from('site-images')
        .createSignedUrl(path, SIGNED_URL_EXPIRY);
      if (signErr) throw signErr;
      if (!signed?.signedUrl) throw new Error('Could not create signed URL');

      const { error: updErr } = await supabase
        .from('site_images')
        .update({ url: signed.signedUrl, updated_at: new Date().toISOString() })
        .eq('key', key);
      if (updErr) throw updErr;

      await queryClient.invalidateQueries({ queryKey: ['admin', 'site_images'] });
      messageApi.success('Image replaced');
    } catch (e) {
      messageApi.error(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(null);
    }
  }

  function beforeUpload(key: string): UploadProps['beforeUpload'] {
    return (file) => {
      if (!ACCEPTED.includes(file.type)) {
        messageApi.error('Only JPG, PNG or WebP images are allowed');
        return Upload.LIST_IGNORE;
      }
      if (file.size > MAX_BYTES) {
        messageApi.error('Image must be 5MB or smaller');
        return Upload.LIST_IGNORE;
      }
      void handleUpload(key, file as File);
      return Upload.LIST_IGNORE;
    };
  }

  if (isLoading) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <Spin />
      </div>
    );
  }

  return (
    <div>
      {messageContext}
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        Images 圖片
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Replace a photo or restore the built-in default. Alt text is used by screen readers and search engines.
        替換相片或還原預設圖片。
      </Typography.Paragraph>

      <Row gutter={[16, 16]}>
        {SLOTS.map((slot) => {
          const row = rowMap.get(slot.key);
          const url = row?.url ?? null;
          const effective = url && url !== '' ? url : DEFAULT_SRC[slot.key];
          const draft = drafts[slot.key] ?? { alt_tc: '', alt_en: '' };
          const dirty =
            draft.alt_tc !== (row?.alt_tc ?? '') || draft.alt_en !== (row?.alt_en ?? '');

          return (
            <Col key={slot.key} xs={24} md={12} lg={8}>
              <Card
                title={slot.label}
                loading={uploading === slot.key}
                extra={url ? <Tag color="blue">Custom</Tag> : <Tag>Default</Tag>}
                cover={
                  <img
                    src={effective}
                    alt={draft.alt_en || slot.label}
                    style={{ height: 180, objectFit: 'cover', width: '100%' }}
                  />
                }
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      Alt text 繁中
                    </Typography.Text>
                    <Input
                      value={draft.alt_tc}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [slot.key]: { ...draft, alt_tc: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      Alt text English
                    </Typography.Text>
                    <Input
                      value={draft.alt_en}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [slot.key]: { ...draft, alt_en: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                    <Button
                      type="primary"
                      disabled={!dirty}
                      loading={saveAlt.isPending && saveAlt.variables === slot.key}
                      onClick={() => saveAlt.mutate(slot.key)}
                    >
                      Save
                    </Button>
                    <Upload
                      accept="image/jpeg,image/png,image/webp"
                      maxCount={1}
                      showUploadList={false}
                      beforeUpload={beforeUpload(slot.key)}
                    >
                      <Button icon={<UploadOutlined />}>Replace</Button>
                    </Upload>
                    <Popconfirm
                      title="Restore the original image?"
                      okText="Restore"
                      cancelText="Cancel"
                      onConfirm={() => restore.mutate(slot.key)}
                    >
                      <Button disabled={!url}>Restore default</Button>
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
