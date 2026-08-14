import { defineTool } from '@lovable.dev/mcp-js';
import { supabaseForUser } from '../supabase';

export default defineTool({
  name: 'get_doctor_schedule',
  title: 'Get doctor rota',
  description: 'Read the seven-day doctor duty rota (morning and afternoon, Chinese and English).',
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: 'text', text: 'Not authenticated' }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from('doctor_schedule')
      .select('day_id, am_tc, am_en, pm_tc, pm_en, is_closed_am, is_closed_pm, sort')
      .order('sort', { ascending: true });
    if (error) return { content: [{ type: 'text', text: error.message }], isError: true };
    return {
      content: [{ type: 'text', text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { rows: data ?? [] },
    };
  },
});
