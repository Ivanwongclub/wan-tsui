import { useCallback, useEffect, useState } from 'react';
import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouterState,
  Link,
} from '@tanstack/react-router';
import { ConfigProvider, Layout, Menu, Spin, Button, Typography, message } from 'antd';
import { FileTextOutlined, CalendarOutlined, PictureOutlined } from '@ant-design/icons';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/admin')({
  ssr: false,
  component: AdminLayoutRoute,
});

const THEME = {
  token: {
    colorPrimary: '#0F766E',
    borderRadius: 8,
    fontFamily: 'Inter, "Noto Sans HK", "Noto Sans TC", sans-serif',
  },
};

const MENU = [
  { key: '/admin/content', icon: <FileTextOutlined />, label: <Link to="/admin/content">Content</Link>, title: 'Content' },
  { key: '/admin/schedule', icon: <CalendarOutlined />, label: <Link to="/admin/schedule">Schedule</Link>, title: 'Schedule' },
  { key: '/admin/images', icon: <PictureOutlined />, label: <Link to="/admin/images">Images</Link>, title: 'Images' },
];

function AdminLayoutRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLogin = pathname.startsWith('/admin/login');

  return (
    <ConfigProvider theme={THEME}>
      {isLogin ? <Outlet /> : <AdminGuard pathname={pathname} />}
    </ConfigProvider>
  );
}

function AdminGuard({ pathname }: { pathname: string }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'ok'>('loading');
  const [email, setEmail] = useState<string>('');

  const toLogin = useCallback(() => {
    navigate({ to: '/admin/login', replace: true });
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (cancelled) return;
      if (!session) {
        toLogin();
        return;
      }
      const { data: row, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();
      if (cancelled) return;
      if (error || !row || row.active !== true) {
        message.error('Not authorised');
        await supabase.auth.signOut();
        toLogin();
        return;
      }
      setEmail(session.user.email ?? '');
      setStatus('ok');
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) toLogin();
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [toLogin]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  const current = MENU.find((m) => pathname.startsWith(m.key));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider theme="light" width={220} collapsible style={{ background: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ padding: '20px 16px' }}>
            <div style={{ color: '#0F766E', fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap' }}>
              環翠綜合醫務中心
            </div>
            <div style={{ color: '#0F766E', fontSize: 12, letterSpacing: 1 }}>Admin</div>
          </div>
          <Menu
            mode="inline"
            selectedKeys={current ? [current.key] : []}
            items={MENU.map(({ key, icon, label }) => ({ key, icon, label }))}
            style={{ borderInlineEnd: 'none' }}
          />
          <div style={{ marginTop: 'auto', padding: 16, borderTop: '1px solid #f0f0f0' }}>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8, wordBreak: 'break-all' }}>
              {email}
            </Typography.Text>
            <Button
              block
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: '/admin/login', replace: true });
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontSize: 18, fontWeight: 600 }}>{current?.title ?? 'Admin'}</span>
        </Layout.Header>
        <Layout.Content style={{ background: '#F5F5F5', padding: 24 }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
