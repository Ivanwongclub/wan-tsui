import type { ContentBundle, Locale } from '../types/content';
import type { SiteOverrides } from './siteOverrides';

function pick(row: { value_tc: string | null; value_en: string | null }, locale: Locale) {
  const value = locale === 'tc' ? row.value_tc : row.value_en;
  return typeof value === 'string' && value !== '' ? value : null;
}

/** Clone-on-write along the path, then set the leaf. Never creates new paths. */
function setPath(root: Record<string, unknown>, path: string, value: string): void {
  const parts = path.split('.');
  let node: Record<string, unknown> | unknown[] = root;

  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i]!;
    const container = node as Record<string, unknown>;
    const next = container[key];
    if (next === null || typeof next !== 'object') return; // path does not exist
    const cloned: Record<string, unknown> | unknown[] = Array.isArray(next)
      ? [...(next as unknown[])]
      : { ...(next as Record<string, unknown>) };
    container[key] = cloned;
    node = cloned;
  }

  const leaf = parts[parts.length - 1]!;
  const target = node as Record<string, unknown>;
  if (!(leaf in target)) return; // never create new paths
  target[leaf] = value;
}

/**
 * Returns a shallow-cloned bundle with database overrides applied.
 * The original bundle is never mutated. Anything not overridden stays static.
 */
export function applyOverrides(
  bundle: ContentBundle,
  overrides: SiteOverrides | null | undefined,
  locale: Locale,
): ContentBundle {
  const texts = overrides?.texts ?? [];
  const scheduleRows = overrides?.schedule ?? [];
  if (texts.length === 0 && scheduleRows.length === 0) return bundle;

  const merged = { ...(bundle as unknown as Record<string, unknown>) };

  for (const row of texts) {
    if (!row?.key) continue;
    const value = pick(row, locale);
    if (value === null) continue;
    try {
      setPath(merged, row.key, value);
    } catch {
      // ignore malformed paths
    }
  }

  if (scheduleRows.length > 0) {
    const staticSchedule = bundle.schedule as unknown as Record<string, Record<string, unknown>>;
    const schedule: Record<string, Record<string, unknown>> = { ...staticSchedule };

    for (const row of scheduleRows) {
      const day = schedule[row?.day_id ?? ''];
      if (!day) continue;
      const next = { ...day };
      const am = pick({ value_tc: row.am_tc, value_en: row.am_en }, locale);
      const pm = pick({ value_tc: row.pm_tc, value_en: row.pm_en }, locale);
      if (am !== null) next['am'] = am;
      if (pm !== null) next['pm'] = pm;
      if (typeof row.is_closed_am === 'boolean') next['is_closed_am'] = row.is_closed_am;
      if (typeof row.is_closed_pm === 'boolean') next['is_closed_pm'] = row.is_closed_pm;
      // 'day' label is never overridden.
      schedule[row.day_id] = next;
    }

    merged['schedule'] = schedule;
  }

  return merged as unknown as ContentBundle;
}
