import type { ServiceId, DoctorId, DayId } from '../content/wanTsui.shared';

export type Locale = 'tc' | 'en';

export interface Announcement { badge: string; text: string; }
export interface Clinic {
  name: string; name_short: string; address: string;
  hours: string; hours_short: string;
  mtr: string; mtr_exit: string; bus: string;
  tagline: string;
  hero_headline: readonly [string, string];
  hero_subtitle: string;
  intro: readonly string[];
  logo_alt: string;
}
export interface Doctor {
  name: string; creds: string; specialty: string;
  schedule: string; bio: string;
}
export interface Service {
  num: string; title: string; desc: string; detail: string;
  tags: readonly string[]; govScheme: boolean; voucher: boolean;
}
export interface ScheduleDay {
  day: string; am: string; pm: string;
  is_closed_am: boolean; is_closed_pm: boolean;
}
export interface PageHeroContent { eyebrow: string; title: string; subtitle: string; }
export interface FooterLinkItem {
  label: string;
  to: '/services' | '/about' | '/contact';
  hash?: string;
}

export type ContactRow = {
  label: string;
  value: string;
  href?: string;
  whitespace?: boolean;
};

export interface ContentBundle {
  announcement: Announcement;
  clinic: Clinic;
  doctors: Record<DoctorId, Doctor>;
  services: Record<ServiceId, Service>;
  schedule: Record<DayId, ScheduleDay>;
  nav: { home: string; services: string; about: string; contact: string; };
  pageHeros: { about: PageHeroContent; services: PageHeroContent; contact: PageHeroContent; };
  contactRows: { address: string; transport: string; phone: string; mobile: string; email: string; hours: string; };
  whatsappPrefill: string;
  a11y: { menuOpen: string; menuClose: string; heroImageAlt: string; locationImageAlt: string; };
  meta: { title: string; desc: string; desc_short: string; };
  ui: {
    trust: { insurance: string; voucher: string; govScheme: string; seniorOnly: string; footerText: string; };
    trustBar: {
      insuranceEyebrow: string; insuranceHeading: string; insuranceDesc: string; insuranceTrail: string;
      voucherEyebrow: string; voucherHeading: string; voucherDescPre: string; voucherDescPost: string; voucherCta: string;
    };
    cta: { call: string; callNow: string; whatsapp: string; viewDetails: string; viewCards: string; };
    doctors: {
      eyebrow: string; heading: string; headingAbout: string; tagline: string;
      fieldCreds: string; fieldSpecialty: string; fieldSchedule: string;
    };
    schedule: {
      eyebrow: string; heading: string; hoursEyebrow: string; hoursHeading: string;
      colDate: string; colAM: string; colPM: string;
      todayBadge: string; lunchLabel: string; lunchDetail: string;
      adjustNote: string; footerNote: string;
    };
    home: {
      aboutEyebrow: string;
      pullQuote: readonly [string, string, string, string];
      servicesEyebrow: string; servicesHeading: string; servicesSubtitle: string;
      locationEyebrow: string; locationHeading: readonly [string, string];
      paymentEyebrow: string; paymentHeading: readonly [string, string];
    };
    about: { introEyebrow: string; };
    services: { ctaHeading: string; ctaBody: string; };
    contact: { infoEyebrow: string; paymentDesc: string; };
    footer: {
      emergency: string; emergencyNumber: string;
      columnTitles: { services: string; payment: string; info: string; };
      footerLinks: {
        services: readonly FooterLinkItem[];
        payment: readonly FooterLinkItem[];
        info: readonly FooterLinkItem[];
      };
    };
    locale: { toggleToEn: string; toggleAriaLabel: string; };
  };
}
