import { auth, defineMcp } from '@lovable.dev/mcp-js';
import listContentKeys from './tools/list-content-keys';
import getSiteContent from './tools/get-site-content';
import updateSiteContent from './tools/update-site-content';
import getDoctorSchedule from './tools/get-doctor-schedule';
import updateDoctorSchedule from './tools/update-doctor-schedule';
import getSiteImages from './tools/get-site-images';

const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? 'project-ref-unset';

export default defineMcp({
  name: 'wan-tsui-starter',
  title: 'Wan Tsui Starter',
  version: '0.1.0',
  instructions:
    'Tools for the Wan Tsui Integrated Medical Centre website. Read and edit the website wording (Traditional Chinese and English), the seven-day doctor duty rota, and the website picture slots. Call list_content_keys first to find the right text key. Editing requires a signed-in clinic administrator.',
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: 'authenticated',
  }),
  tools: [
    listContentKeys,
    getSiteContent,
    updateSiteContent,
    getDoctorSchedule,
    updateDoctorSchedule,
    getSiteImages,
  ],
});
