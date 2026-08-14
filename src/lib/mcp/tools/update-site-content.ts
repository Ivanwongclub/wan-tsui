import { defineTool } from '@lovable.dev/mcp-js';
import { z } from 'zod';
import { supabaseForUser } from '../supabase';
import { EDITABLE_SECTIONS } from '@/admin/editableFields';

const VALID_KEYS = new Set(EDITABLE_SECTIONS.flatMap((s) => s.fields.map((f) => f.key)));

export default defineTool({
  name: 'update_site_content',
  title: 'Update website text',
  description:
    'Save Traditional Chinese and/or English wording for one editable text key. Pass an empty string to restore the original wording for that language.',
  inputSchema: {
    key: z.string().trim().min(1).describe('Content key from list_content_keys.'),
    value_tc: z.string().optional().describe('Traditional Chinese wording; empty string restores the original.'),
    value_en: z.string().optional().describe('English wording; empty string restores the original.'),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ key, value_tc, value_en }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: 'text', text: 'Not authenticated' }], isError: true };
    }
    if (!VALID_KEYS.has(key)) {
      return { content: [{ type: 'text', text: `Unknown content key: ${key}` }], isError: true };
    }
    if (value_tc === undefined && value_en === undefined) {
      return {
        content: [{ type: 'text', text: 'Provide value_tc and/or value_en.' }],
        isError: true,
      };
    }
    const supabase = supabaseForUser(ctx);
    const { data: existing, error: readError } = await supabase
      .from('site_content')
      .select('key, value_tc, value_en')
      .eq('key', key)
      .maybeSingle();
    if (readError) return { content: [{ type: 'text', text: readError.message }], isError: true };

    const norm = (v: string | undefined, current: string | null | undefined) =>
      v === undefined ? (current ?? null) : v.trim() === '' ? null : v;
    const nextTc = norm(value_tc, existing?.value_tc);
    const nextEn = norm(value_en, existing?.value_en);

    if (nextTc === null && nextEn === null) {
      const { error } = await supabase.from('site_content').delete().eq('key', key);
      if (error) return { content: [{ type: 'text', text: error.message }], isError: true };
      return {
        content: [{ type: 'text', text: `Restored original wording for ${key}.` }],
        structuredContent: { key, value_tc: null, value_en: null },
      };
    }

    const { data, error } = await supabase
      .from('site_content')
      .upsert({ key, value_tc: nextTc, value_en: nextEn }, { onConflict: 'key' })
      .select('key, value_tc, value_en')
      .single();
    if (error) return { content: [{ type: 'text', text: error.message }], isError: true };
    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
      structuredContent: { row: data },
    };
  },
});
