import { createFileRoute } from '@tanstack/react-router';
import { Typography } from 'antd';

export const Route = createFileRoute('/admin/images')({
  ssr: false,
  component: AdminImagesPage,
});

function AdminImagesPage() {
  return <Typography.Title level={3}>Images</Typography.Title>;
}
