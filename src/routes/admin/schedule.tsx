import { createFileRoute } from '@tanstack/react-router';
import { Typography } from 'antd';

export const Route = createFileRoute('/admin/schedule')({
  ssr: false,
  component: AdminSchedulePage,
});

function AdminSchedulePage() {
  return <Typography.Title level={3}>Schedule</Typography.Title>;
}
