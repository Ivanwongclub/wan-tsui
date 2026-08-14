import { tool } from 'ai';
import { z } from 'zod';
import type { SupabaseClient } from '@supabase/supabase-js';
import { EDITABLE_SECTIONS } from '@/admin/editableFields';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

const VALID_KEYS = new Set(EDITABLE_SECTIONS.flatMap((s) => s.fields.map((f) => f.key)));

function labelFor(key: string): string {
  for (const section of EDITABLE_SECTIONS) {
    const field = section.fields.find((f) => f.key === key);
    if (field) return `${section.title} — ${field.label}`;
  }
  return key;
}

/**
 * Read tools run immediately. Write tools only ever return a *proposal*;
 * the admin must press Apply in the UI before anything is written.
 */
export function buildAssistantTools(supabase: SupabaseClient) {
  return {
    list_content_keys: tool({
      description:
        'List every editable website text key, grouped by section, with its human label. Use this first to find the right key.',
      inputSchema: z.object({}),
      execute: async () => ({
        sections: EDITABLE_SECTIONS.map((section) => ({
          section: section.title,
          fields: section.fields.map((f) => ({ key: f.key, label: f.label })),
        })),
      }),
    }),

    get_site_content: tool({
      description:
        'Read saved website text overrides. Optionally filter by key. Keys with no saved override still show the original wording on the site.',
      inputSchema: z.object({ key: z.string().optional() }),
      execute: async ({ key }) => {
        let query = supabase.from('site_content').select('key, value_tc, value_en').order('key');
        if (key) query = query.eq('key', key);
        const { data, error } = await query;
        if (error) return { error: error.message };
        return { rows: data ?? [] };
      },
    }),

    get_doctor_schedule: tool({
      description: 'Read the seven-day doctor duty rota (morning and afternoon, Chinese and English).',
      inputSchema: z.object({}),
      execute: async () => {
        const { data, error } = await supabase
          .from('doctor_schedule')
          .select('day_id, am_tc, am_en, pm_tc, pm_en, is_closed_am, is_closed_pm, sort')
          .order('sort', { ascending: true });
        if (error) return { error: error.message };
        return { rows: data ?? [] };
      },
    }),

    get_site_images: tool({
      description: 'List the website picture slots with their replacement image and picture descriptions.',
      inputSchema: z.object({}),
      execute: async () => {
        const { data, error } = await supabase
          .from('site_images')
          .select('key, url, alt_tc, alt_en')
          .order('key');
        if (error) return { error: error.message };
        return { rows: data ?? [] };
      },
    }),

    propose_content_update: tool({
      description:
        'Propose new wording for one website text key. This does NOT save anything — the administrator reviews and confirms it in the chat. Provide value_tc and/or value_en.',
      inputSchema: z.object({
        key: z.string().describe('Content key from list_content_keys.'),
        value_tc: z.string().optional().describe('Traditional Chinese wording.'),
        value_en: z.string().optional().describe('English wording.'),
        reason: z.string().optional().describe('One short sentence describing the change.'),
      }),
      execute: async ({ key, value_tc, value_en, reason }) => {
        if (!VALID_KEYS.has(key)) {
          return { error: `Unknown content key: ${key}. Call list_content_keys first.` };
        }
        if (value_tc === undefined && value_en === undefined) {
          return { error: 'Provide value_tc and/or value_en.' };
        }
        const { data } = await supabase
          .from('site_content')
          .select('value_tc, value_en')
          .eq('key', key)
          .maybeSingle();
        return {
          proposal: {
            kind: 'content' as const,
            key,
            label: labelFor(key),
            current: { value_tc: data?.value_tc ?? null, value_en: data?.value_en ?? null },
            next: { value_tc: value_tc ?? null, value_en: value_en ?? null },
            reason: reason ?? null,
          },
        };
      },
    }),

    propose_schedule_update: tool({
      description:
        'Propose a change to the doctor rota for one weekday. This does NOT save anything — the administrator reviews and confirms it in the chat.',
      inputSchema: z.object({
        day_id: z.enum(DAYS),
        am_tc: z.string().optional(),
        am_en: z.string().optional(),
        pm_tc: z.string().optional(),
        pm_en: z.string().optional(),
        is_closed_am: z.boolean().optional(),
        is_closed_pm: z.boolean().optional(),
        reason: z.string().optional(),
      }),
      execute: async ({ day_id, reason, ...patch }) => {
        const next = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined));
        if (Object.keys(next).length === 0) return { error: 'Nothing to change.' };
        const { data } = await supabase
          .from('doctor_schedule')
          .select('day_id, am_tc, am_en, pm_tc, pm_en, is_closed_am, is_closed_pm')
          .eq('day_id', day_id)
          .maybeSingle();
        return {
          proposal: {
            kind: 'schedule' as const,
            day_id,
            label: day_id.toUpperCase(),
            current: data ?? null,
            next,
            reason: reason ?? null,
          },
        };
      },
    }),
  };
}

export type AssistantTools = ReturnType<typeof buildAssistantTools>;
