export type TextOverrideRow = {
  key: string;
  value_tc: string | null;
  value_en: string | null;
};

export type ScheduleOverrideRow = {
  day_id: string;
  am_tc: string | null;
  am_en: string | null;
  pm_tc: string | null;
  pm_en: string | null;
  is_closed_am: boolean | null;
  is_closed_pm: boolean | null;
};

export type ImageOverrideRow = {
  key: string;
  url: string | null;
};

export type SiteOverrides = {
  texts: TextOverrideRow[];
  schedule: ScheduleOverrideRow[];
  images: ImageOverrideRow[];
};

export const EMPTY_OVERRIDES: SiteOverrides = { texts: [], schedule: [], images: [] };
