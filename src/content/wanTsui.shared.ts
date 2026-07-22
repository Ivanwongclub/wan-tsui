export const CLINIC_SHARED = {
  phone: '(852) 2337 8999',
  phone_short: '2337 8999',
  phone_tel: '+85223378999',
  mobile: '(852) 6801 5968',
  mobile_tel: '+85268015968',
  email: 'reception@wt-medical.com',
  whatsapp: '85268015968',
  lunch_break: '13:00–15:00',
  voucher_amount: 'HK$2,000',
};

export const INSURANCE_PARTNERS = [
  'Bupa', 'AXA', 'Cigna', 'BlueCross', 'AIA', 'Manulife', 'Prudential', 'Sun Life',
] as const;

// Service IDs (locale-invariant — used for keys, hash anchors, DB IDs later)
export const SERVICE_IDS = ['gp', 'crcsp', 'cdcc', 'flu', 'ehvs'] as const;
export type ServiceId = typeof SERVICE_IDS[number];

// Doctor IDs
export const DOCTOR_IDS = ['mak', 'lam'] as const;
export type DoctorId = typeof DOCTOR_IDS[number];

// Day IDs (locale-invariant — used to key schedule, drive today-detection)
export const DAY_IDS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type DayId = typeof DAY_IDS[number];

export const DAY_ID_TO_JS_DAY: Record<DayId, number> = {
  mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 0,
};
