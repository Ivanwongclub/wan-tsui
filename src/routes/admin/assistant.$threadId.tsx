import { useCallback, useEffect, useState } from 'react';
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import { Button, List, Popconfirm, Spin, Typography, message as antdMessage } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { UIMessage } from 'ai';
import { ChatWindow } from '@/admin/assistant/ChatWindow';
import {
  createThread,
  deleteThread,
  listThreads,
  loadMessages,
  type ChatThread,
} from '@/admin/assistant/threads';

export const Route = createFileRoute('/admin/assistant/$threadId')({
  ssr: false,
  component: AssistantThread,
});

function AssistantThread() {
  const { threadId } = useParams({ from: '/admin/assistant/$threadId' });
  const navigate = useNavigate();
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [messages, setMessages] = useState<UIMessage[] | null>(null);

  const refreshThreads = useCallback(async () => {
    try {
      setThreads(await listThreads());
    } catch (error) {
      antdMessage.error(error instanceof Error ? error.message : 'Failed to load conversations');
    }
  }, []);

  useEffect(() => {
    void refreshThreads();
  }, [refreshThreads]);

  useEffect(() => {
    let cancelled = false;
    setMessages(null);
    (async () => {
      try {
        const loaded = await loadMessages(threadId);
        if (!cancelled) setMessages(loaded);
      } catch (error) {
        if (!cancelled) {
          setMessages([]);
          antdMessage.error(error instanceof Error ? error.message : 'Failed to load messages');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [threadId]);

  async function onNewThread() {
    try {
      const thread = await createThread();
      await refreshThreads();
      navigate({ to: '/admin/assistant/$threadId', params: { threadId: thread.id } });
    } catch (error) {
      antdMessage.error(error instanceof Error ? error.message : 'Failed to create conversation');
    }
  }

  async function onDelete(id: string) {
    try {
      await deleteThread(id);
      const rest = await listThreads();
      setThreads(rest);
      if (id === threadId) {
        const next = rest[0] ?? (await createThread());
        navigate({ to: '/admin/assistant/$threadId', params: { threadId: next.id }, replace: true });
      }
    } catch (error) {
      antdMessage.error(error instanceof Error ? error.message : 'Failed to delete conversation');
    }
  }

  return (
    <div style={{ display: 'flex', gap: 16, height: 'calc(100vh - 160px)', minHeight: 480 }}>
      <div
        style={{
          width: 240,
          flexShrink: 0,
          borderRight: '1px solid #f0f0f0',
          paddingRight: 12,
          overflowY: 'auto',
        }}
      >
        <Button type="primary" icon={<PlusOutlined />} block onClick={onNewThread} style={{ marginBottom: 12 }}>
          新對話 New chat
        </Button>
        <List
          size="small"
          dataSource={threads}
          renderItem={(thread) => {
            const active = thread.id === threadId;
            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  borderRadius: 6,
                  padding: '4px 6px',
                  background: active ? '#E6F4F1' : undefined,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    navigate({ to: '/admin/assistant/$threadId', params: { threadId: thread.id } })
                  }
                  style={{
                    flex: 1,
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: active ? '#0F766E' : 'inherit',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {thread.title || '新對話'}
                </button>
                <Popconfirm title="刪除對話？Delete?" onConfirm={() => onDelete(thread.id)}>
                  <Button type="text" size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
              </div>
            );
          }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Typography.Title level={4} style={{ marginTop: 0 }}>
          AI 助理 Assistant
        </Typography.Title>
        {messages === null ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
            <Spin />
          </div>
        ) : (
          <ChatWindow
            key={threadId}
            threadId={threadId}
            initialMessages={messages}
            onFirstMessage={() => {
              window.setTimeout(() => void refreshThreads(), 2500);
            }}
          />
        )}
      </div>
    </div>
  );
}
