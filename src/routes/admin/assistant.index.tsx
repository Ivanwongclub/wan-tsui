import { useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Spin, message as antdMessage } from 'antd';
import { createThread, listThreads } from '@/admin/assistant/threads';

export const Route = createFileRoute('/admin/assistant/')({
  ssr: false,
  component: AssistantIndex,
});

function AssistantIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const threads = await listThreads();
        const target = threads[0] ?? (await createThread());
        if (cancelled) return;
        navigate({ to: '/admin/assistant/$threadId', params: { threadId: target.id }, replace: true });
      } catch (error) {
        if (!cancelled) {
          antdMessage.error(error instanceof Error ? error.message : 'Failed to open assistant');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
      <Spin size="large" />
    </div>
  );
}
