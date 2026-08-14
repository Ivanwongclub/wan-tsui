import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Card, Form, Input, message, Typography } from 'antd';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin/login')({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === 'string' ? s.next : undefined,
  }),
  component: AdminLoginPage,
});

/** Only same-origin relative paths are accepted as a post-login redirect. */
function safeNext(next: string | undefined): string | null {
  if (!next) return null;
  if (!next.startsWith('/') || next.startsWith('//')) return null;
  return next;
}

function AdminLoginPage() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        message.error(error.message);
        return;
      }
      const target = safeNext(next);
      if (target) {
        window.location.href = target;
        return;
      }
      navigate({ to: '/admin/content', replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F5F5F5',
        padding: 24,
      }}
    >
      <Card style={{ width: '100%', maxWidth: 380 }}>
        <Typography.Title level={4} style={{ marginTop: 0, color: '#0F766E' }}>
          Admin Sign In
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
          >
            <Input autoComplete="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Enter your password' }]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}
