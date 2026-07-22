import { CONTENT } from '../content';
import { useI18n } from './useI18n';

export function useContent() {
  const { locale } = useI18n();
  return CONTENT[locale];
}

// Also export locale-invariant shared data for convenience
export { CLINIC_SHARED, INSURANCE_PARTNERS, SERVICE_IDS, DOCTOR_IDS, DAY_IDS, DAY_ID_TO_JS_DAY } from '../content';
export type { ServiceId, DoctorId, DayId } from '../content/wanTsui.shared';
