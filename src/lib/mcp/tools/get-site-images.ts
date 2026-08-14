import { defineTool } from '@lovable.dev/mcp-js';
import { supabaseForUser } from '../supabase';

export default defineTool({
  name: 'get_site_images',
  title: 'List website picture slots',
  description:
    'List the website picture slots with their replacement image (if any) and their short Chinese/English picture descriptions.',
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: 'text', text: 'Not authenticated' }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from('site_images')
      .select('key, url, alt_tc, alt_en')
      .order('key');
    if (error) return { content: [{ type: 'text', text: error.message }], isError: true };
    return {
      content: [{ type: 'text', text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { rows: data ?? [] },
    };
  },
});
