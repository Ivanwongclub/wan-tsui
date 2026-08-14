export type EditableInput = 'input' | 'textarea';

export type EditableField = {
  key: string;
  label: string;
  input: EditableInput;
};

export type EditableSection = {
  id: string;
  title: string;
  fields: EditableField[];
};

const DOCTORS: { id: string; label: string }[] = [
  { id: 'mak', label: 'Dr Mak (麥振威醫生)' },
  { id: 'lam', label: 'Dr Lam (林慧美醫生)' },
];

const SERVICES: { id: string; label: string }[] = [
  { id: 'gp', label: 'General practice (全科門診)' },
  { id: 'crcsp', label: 'Colorectal screening (大腸癌篩查)' },
  { id: 'cdcc', label: 'Chronic disease co-care (慢性病共治)' },
  { id: 'flu', label: 'Flu vaccination (流感疫苗)' },
  { id: 'ehvs', label: 'Health vouchers (醫療券)' },
];

const PAGE_HEROS: { id: string; label: string }[] = [
  { id: 'about', label: 'About page (關於我們)' },
  { id: 'services', label: 'Services page (診所服務)' },
  { id: 'contact', label: 'Contact page (聯絡我們)' },
];

export const EDITABLE_SECTIONS: EditableSection[] = [
  {
    id: 'announcement',
    title: 'Announcement 公告',
    fields: [
      { key: 'announcement.badge', label: 'Badge (標籤)', input: 'input' },
      { key: 'announcement.text', label: 'Text (內容)', input: 'input' },
    ],
  },
  {
    id: 'clinic',
    title: 'Clinic info 診所資料',
    fields: [
      { key: 'clinic.name', label: 'Clinic name (診所名稱)', input: 'input' },
      { key: 'clinic.name_short', label: 'Short name (簡稱)', input: 'input' },
      { key: 'clinic.address', label: 'Address (地址)', input: 'input' },
      { key: 'clinic.hours', label: 'Opening hours (營業時間)', input: 'input' },
      { key: 'clinic.hours_short', label: 'Opening hours, short (營業時間簡寫)', input: 'input' },
      { key: 'clinic.mtr', label: 'MTR directions (港鐵交通)', input: 'input' },
      { key: 'clinic.mtr_exit', label: 'MTR exit (港鐵出口)', input: 'input' },
      { key: 'clinic.bus', label: 'Bus and minibus (巴士小巴)', input: 'input' },
      { key: 'clinic.tagline', label: 'Tagline (標語)', input: 'input' },
      { key: 'clinic.hero_headline.0', label: 'Hero headline line 1 (主標題第一行)', input: 'input' },
      { key: 'clinic.hero_headline.1', label: 'Hero headline line 2 (主標題第二行)', input: 'input' },
      { key: 'clinic.hero_subtitle', label: 'Hero subtitle (副標題)', input: 'textarea' },
      { key: 'clinic.intro.0', label: 'Intro paragraph 1 (簡介第一段)', input: 'textarea' },
      { key: 'clinic.intro.1', label: 'Intro paragraph 2 (簡介第二段)', input: 'textarea' },
    ],
  },
  {
    id: 'doctors',
    title: 'Doctors 醫生',
    fields: DOCTORS.flatMap(({ id, label }) => [
      { key: `doctors.${id}.name`, label: `${label} — Name (姓名)`, input: 'input' as const },
      { key: `doctors.${id}.creds`, label: `${label} — Qualifications (學歷)`, input: 'input' as const },
      { key: `doctors.${id}.specialty`, label: `${label} — Specialty (專業範疇)`, input: 'input' as const },
      { key: `doctors.${id}.schedule`, label: `${label} — Sessions (當值時段)`, input: 'input' as const },
      { key: `doctors.${id}.bio`, label: `${label} — Biography (簡介)`, input: 'textarea' as const },
    ]),
  },
  {
    id: 'services',
    title: 'Services 服務',
    fields: SERVICES.flatMap(({ id, label }) => [
      { key: `services.${id}.title`, label: `${label} — Title (標題)`, input: 'input' as const },
      { key: `services.${id}.desc`, label: `${label} — Short description (簡述)`, input: 'textarea' as const },
      { key: `services.${id}.detail`, label: `${label} — Full detail (詳情)`, input: 'textarea' as const },
    ]),
  },
  {
    id: 'pageHeros',
    title: 'Page headers 頁面標題',
    fields: PAGE_HEROS.flatMap(({ id, label }) => [
      { key: `pageHeros.${id}.eyebrow`, label: `${label} — Eyebrow (小標)`, input: 'input' as const },
      { key: `pageHeros.${id}.title`, label: `${label} — Title (標題)`, input: 'input' as const },
      { key: `pageHeros.${id}.subtitle`, label: `${label} — Subtitle (副標題)`, input: 'textarea' as const },
    ]),
  },
  {
    id: 'misc',
    title: 'Other 其他',
    fields: [
      { key: 'whatsappPrefill', label: 'WhatsApp prefilled message (WhatsApp 預設訊息)', input: 'input' },
      { key: 'ui.schedule.adjustNote', label: 'Schedule adjustment note (時間表調動提示)', input: 'input' },
      { key: 'ui.schedule.footerNote', label: 'Schedule footer note (時間表註腳)', input: 'input' },
    ],
  },
];
