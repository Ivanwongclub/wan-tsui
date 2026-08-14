import { defineTool } from '@lovable.dev/mcp-js';
import { z } from 'zod';
import { supabaseForUser } from '../supabase';

export default defineTool({
  name: 'get_site_content',
  title: 'Get website text overrides',
  description:
    'Read the saved website text overrides. Optionally filter by key. Keys with no saved override still show the original wording on the site.',
  inputSchema: {
    key: z.string().trim().min(1).optional().describe('Optional content key to read.'),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ key }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: 'text', text: 'Not authenticated' }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase.from('site_content').select('key, value_tc, value_en').order('key');
    if (key) query = query.eq('key', key);
    const { data, error } = await query;
    if (error) return { content: [{ type: 'text', text: error.message }], isError: true };
    return {
      content: [{ type: 'text', text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { rows: data ?? [] },
    };
  },
});
