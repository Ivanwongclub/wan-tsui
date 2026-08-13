import { useMemo } from 'react';
import { CONTENT } from '../content';
import type { ContentBundle } from '../types/content';
import { applyOverrides } from '../lib/applyOverrides';
import { useI18n } from './useI18n';
import { useOverrides } from './useOverrides';

export function useContent(): ContentBundle {
  const { locale } = useI18n();
  const overrides = useOverrides();
  return useMemo(() => applyOverrides(CONTENT[locale], overrides, locale), [locale, overrides]);
}

// Also export locale-invariant shared data for convenience
export { CLINIC_SHARED, INSURANCE_PARTNERS, SERVICE_IDS, DOCTOR_IDS, DAY_IDS, DAY_ID_TO_JS_DAY } from '../content';
export type { ServiceId, DoctorId, DayId } from '../content/wanTsui.shared';
