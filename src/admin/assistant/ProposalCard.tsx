import { useState } from 'react';
import { Button, Space, Tag, Typography, message as antdMessage } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { supabase } from '@/integrations/supabase/client';

export type ContentProposal = {
  kind: 'content';
  key: string;
  label: string;
  current: { value_tc: string | null; value_en: string | null };
  next: { value_tc: string | null; value_en: string | null };
  reason: string | null;
};

export type ScheduleProposal = {
  kind: 'schedule';
  day_id: string;
  label: string;
  current: Record<string, unknown> | null;
  next: Record<string, unknown>;
  reason: string | null;
};

export type Proposal = ContentProposal | ScheduleProposal;

const DAY_LABEL: Record<string, string> = {
  mon: '星期一 Mon',
  tue: '星期二 Tue',
  wed: '星期三 Wed',
  thu: '星期四 Thu',
  fri: '星期五 Fri',
  sat: '星期六 Sat',
  sun: '星期日 Sun',
};

const FIELD_LABEL: Record<string, string> = {
  value_tc: '中文 TC',
  value_en: '英文 EN',
  am_tc: '上午 (中文)',
  am_en: 'Morning (EN)',
  pm_tc: '下午 (中文)',
  pm_en: 'Afternoon (EN)',
  is_closed_am: '上午休息 Closed AM',
  is_closed_pm: '下午休息 Closed PM',
};

function display(value: unknown): string {
  if (value === null || value === undefined || value === '') return '（原本內容 / unchanged）';
  if (typeof value === 'boolean') return value ? '是 Yes' : '否 No';
  return String(value);
}

function storageKey(toolCallId: string) {
  return `wt-proposal-applied:${toolCallId}`;
}

export function ProposalCard({
  proposal,
  toolCallId,
}: {
  proposal: Proposal;
  toolCallId: string;
}) {
  const [state, setState] = useState<'idle' | 'saving' | 'applied' | 'discarded'>(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem(storageKey(toolCallId))) {
      return 'applied';
    }
    return 'idle';
  });

  const rows =
    proposal.kind === 'content'
      ? (['value_tc', 'value_en'] as const)
          .filter((f) => proposal.next[f] !== null && proposal.next[f] !== undefined)
          .map((f) => ({ field: f, before: proposal.current?.[f], after: proposal.next[f] }))
      : Object.keys(proposal.next).map((f) => ({
          field: f,
          before: proposal.current?.[f],
          after: proposal.next[f],
        }));

  async function apply() {
    setState('saving');
    try {
      if (proposal.kind === 'content') {
        const payload: { key: string; value_tc?: string; value_en?: string } = { key: proposal.key };
        if (proposal.next.value_tc !== null) payload.value_tc = proposal.next.value_tc;
        if (proposal.next.value_en !== null) payload.value_en = proposal.next.value_en;
        const { error } = await supabase
          .from('site_content')
          .upsert(payload, { onConflict: 'key' });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('doctor_schedule')
          .update(proposal.next as Record<string, never>)
          .eq('day_id', proposal.day_id);
        if (error) throw error;
      }
      window.localStorage.setItem(storageKey(toolCallId), '1');
      setState('applied');
      antdMessage.success('已儲存 Saved');
    } catch (error) {
      setState('idle');
      antdMessage.error(error instanceof Error ? error.message : '儲存失敗 Save failed');
    }
  }

  return (
    <div
      style={{
        border: '1px solid #D6E4E2',
        background: '#F7FBFA',
        borderRadius: 10,
        padding: 14,
        marginTop: 8,
      }}
    >
      <Space direction="vertical" size={6} style={{ width: '100%' }}>
        <Space size={8} wrap>
          <Tag color="cyan">{proposal.kind === 'content' ? '網站文字 Website text' : '醫生當值 Doctor rota'}</Tag>
          <Typography.Text strong>
            {proposal.kind === 'content' ? proposal.label : (DAY_LABEL[proposal.day_id] ?? proposal.label)}
          </Typography.Text>
        </Space>

        {proposal.reason ? (
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {proposal.reason}
          </Typography.Text>
        ) : null}

        {rows.map((row) => (
          <div key={row.field} style={{ fontSize: 13 }}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {FIELD_LABEL[row.field] ?? row.field}
            </Typography.Text>
            <div style={{ color: '#8c8c8c', textDecoration: 'line-through' }}>{display(row.before)}</div>
            <div style={{ color: '#0F766E', fontWeight: 500 }}>{display(row.after)}</div>
          </div>
        ))}

        {state === 'applied' ? (
          <Tag color="green" icon={<CheckOutlined />}>
            已套用 Applied
          </Tag>
        ) : state === 'discarded' ? (
          <Tag>已取消 Discarded</Tag>
        ) : (
          <Space>
            <Button type="primary" loading={state === 'saving'} icon={<CheckOutlined />} onClick={apply}>
              套用 Apply
            </Button>
            <Button icon={<CloseOutlined />} onClick={() => setState('discarded')}>
              取消 Discard
            </Button>
          </Space>
        )}
      </Space>
    </div>
  );
}
