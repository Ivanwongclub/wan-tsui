export const CLINIC = {
  name_tc: '環翠綜合醫務中心',
  name_en: 'Wan Tsui Integrated Medical Centre',
  address_tc: '香港柴灣環翠邨環翠商場1樓109號舖',
  address_en: 'Shop 109, 1/F, Wan Tsui Commercial Centre, Wan Tsui Estate, Chai Wan, Hong Kong',
  phone: '(852) 2337 8999',
  phone_tel: '+85223378999',
  mobile: '(852) 6801 5968',
  mobile_tel: '+85268015968',
  email: 'reception@wt-medical.com',
  whatsapp: '85268015968',
  hours_tc: '星期一至六 09:00–13:00, 15:00–19:00',
  lunch_break: '13:00–15:00',
  mtr: '港鐵柴灣站 B 出口・步行3分鐘',
  bus: '巴士 8H, 8X, 82, 82X・小巴 56',
};

export const DOCTORS = [
  {
    name_tc: '麥振威醫生',
    name_en: 'Dr. MAK Chun Wai',
    creds: '香港大學內外全科醫學士 (MB BS HK)',
    specialty: '普通科 / General Practice',
    schedule_tc: '星期一・三・五 全日',
  },
  {
    name_tc: '林慧美醫生',
    name_en: 'Dr. LAM Wai May Josephine',
    creds: '香港中文大學內外全科醫學士 (MB ChB CUHK)・卡迪夫大學皮膚科文憑 (PgDip Dermatology Cardiff)',
    specialty: '普通科 / General Practice (兼 皮膚科文憑)',
    schedule_tc: '星期二・四 全日',
  },
];

export const SERVICES = [
  { num: '01', title_tc: '普通科門診', title_en: 'General Practice', desc: '日常疾病診治、慢性病管理、健康諮詢及預防保健。', tags: ['即日加號', '可預約'] },
  { num: '02', title_tc: '皮膚問題診治', title_en: 'Skin Conditions (Dermatology Diploma)', desc: '處理濕疹、暗瘡、皮疹、色素問題及一般皮膚不適，由持卡迪夫大學皮膚科文憑之林醫生主理。', tags: ['須預約', '林醫生主理'] },
  { num: '03', title_tc: '大腸癌篩查計劃', title_en: 'Colorectal Cancer Screening', desc: '政府資助大腸癌篩查計劃，50歲以上合資格人士可參與。', tags: ['政府資助', '須預約'], govScheme: true },
  { num: '04', title_tc: '慢性病共治計劃', title_en: 'Chronic Disease Co-Care', desc: '糖尿病、高血壓共同治理先導計劃，獲政府資助。', tags: ['政府資助', '長期跟進'], govScheme: true },
  { num: '05', title_tc: '流感疫苗注射', title_en: 'Flu Vaccination', desc: '季節性流感疫苗接種，長者及合資格人士可獲政府資助。', tags: ['資助計劃', '即日提供'], govScheme: true },
  { num: '06', title_tc: '醫療券抵扣', title_en: 'Healthcare Voucher Acceptance', desc: '接受長者醫療券抵扣診金，65歲以上長者每年享$2,000資助。', tags: ['長者專享', '即時抵扣'], voucher: true },
];

export const INSURANCE_PARTNERS = ['Bupa', 'AXA', 'Cigna', 'BlueCross', 'AIA', 'Manulife', 'Prudential', 'Sun Life'];

export const SCHEDULE = [
  { day: '星期一', am: '麥振威醫生', pm: '麥振威醫生' },
  { day: '星期二', am: '林慧美醫生', pm: '林慧美醫生' },
  { day: '星期三', am: '麥振威醫生', pm: '林慧美醫生' },
  { day: '星期四', am: '林慧美醫生', pm: '麥振威醫生' },
  { day: '星期五', am: '麥振威醫生', pm: '麥振威醫生' },
  { day: '星期六', am: '林慧美醫生', pm: '— 休診' },
  { day: '星期日及公眾假期', am: '— 休診', pm: '— 休診' },
];
