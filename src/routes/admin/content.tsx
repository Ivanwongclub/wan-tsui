import { createFileRoute } from '@tanstack/react-router';
import { Typography } from 'antd';

export const Route = createFileRoute('/admin/content')({
  ssr: false,
  component: AdminContentPage,
});

function AdminContentPage() {
  return <Typography.Title level={3}>Content</Typography.Title>;
}
