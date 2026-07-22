import tc from './wanTsui.tc';
import en from './wanTsui.en';
import type { Locale, ContentBundle } from '../types/content';

export const CONTENT: Record<Locale, ContentBundle> = { tc, en };
export type { Locale, ContentBundle } from '../types/content';
export * from './wanTsui.shared';
