import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Locale } from '../types/content';

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);
const COOKIE_NAME = 'wt_locale';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function writeCookie(locale: Locale) {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function I18nProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    writeCookie(l);
  }, []);

  const toggle = useCallback(() => {
    const next: Locale = locale === 'tc' ? 'en' : 'tc';
    setLocale(next);
  }, [locale, setLocale]);

  return <I18nContext.Provider value={{ locale, setLocale, toggle }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
