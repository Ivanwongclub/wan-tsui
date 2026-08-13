import { createServerFn } from '@tanstack/react-start';
import { supabase } from '../integrations/supabase/client';
import type {
  SiteOverrides,
  TextOverrideRow,
  ScheduleOverrideRow,
  ImageOverrideRow,
} from './siteOverrides';

/**
 * Reads CMS overrides. Never throws — on any failure the site falls back to the
 * static content bundles by returning empty arrays.
 */
export const fetchSiteOverrides = createServerFn({ method: 'GET' }).handler(
  async (): Promise<SiteOverrides> => {
    try {
      const [texts, schedule, images] = await Promise.all([
        supabase.from('site_content').select('key, value_tc, value_en'),
        supabase
          .from('doctor_schedule')
          .select('day_id, am_tc, am_en, pm_tc, pm_en, is_closed_am, is_closed_pm'),
        supabase.from('site_images').select('key, url'),
      ]);

      if (texts.error) console.error('[siteContent] site_content read failed', texts.error);
      if (schedule.error) console.error('[siteContent] doctor_schedule read failed', schedule.error);
      if (images.error) console.error('[siteContent] site_images read failed', images.error);

      return {
        texts: (texts.data ?? []) as TextOverrideRow[],
        schedule: (schedule.data ?? []) as ScheduleOverrideRow[],
        images: (images.data ?? []) as ImageOverrideRow[],
      };
    } catch (error) {
      console.error('[siteContent] fetchSiteOverrides failed', error);
      return { texts: [], schedule: [], images: [] };
    }
  },
);
