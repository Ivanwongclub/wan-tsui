import { defineTool } from '@lovable.dev/mcp-js';
import { z } from 'zod';
import { supabaseForUser } from '../supabase';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export default defineTool({
  name: 'update_doctor_schedule',
  title: 'Update doctor rota for one day',
  description:
    'Update the morning and/or afternoon doctor rota for a single weekday. Only the fields you pass are changed.',
  inputSchema: {
    day_id: z.enum(DAYS).describe('Weekday to update.'),
    am_tc: z.string().optional().describe('Morning doctor, Traditional Chinese.'),
    am_en: z.string().optional().describe('Morning doctor, English.'),
    pm_tc: z.string().optional().describe('Afternoon doctor, Traditional Chinese.'),
    pm_en: z.string().optional().describe('Afternoon doctor, English.'),
    is_closed_am: z.boolean().optional().describe('Closed in the morning.'),
    is_closed_pm: z.boolean().optional().describe('Closed in the afternoon.'),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ day_id, ...patch }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: 'text', text: 'Not authenticated' }], isError: true };
    }
    const updates = Object.fromEntries(
      Object.entries(patch).filter(([, v]) => v !== undefined),
    );
    if (Object.keys(updates).length === 0) {
      return { content: [{ type: 'text', text: 'Nothing to update.' }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from('doctor_schedule')
      .update(updates)
      .eq('day_id', day_id)
      .select('day_id, am_tc, am_en, pm_tc, pm_en, is_closed_am, is_closed_pm')
      .maybeSingle();
    if (error) return { content: [{ type: 'text', text: error.message }], isError: true };
    if (!data) {
      return { content: [{ type: 'text', text: `No rota row for ${day_id}.` }], isError: true };
    }
    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
      structuredContent: { row: data },
    };
  },
});
