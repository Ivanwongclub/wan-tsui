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
    bio: '麥醫生畢業於香港大學醫學院，在公立醫院完成駐院訓練後投身社區家庭醫學。熟悉柴灣區居民的健康需要，擅長慢性病長期管理及長者健康諮詢。',
  },
  {
    name_tc: '林慧美醫生',
    name_en: 'Dr. LAM Wai May Josephine',
    creds: '香港中文大學內外全科醫學士 (MB ChB CUHK)・卡迪夫大學皮膚科文憑 (PgDip Dermatology Cardiff)',
    specialty: '普通科 / General Practice (兼 皮膚科文憑)',
    schedule_tc: '星期二・四 全日',
    bio: '林醫生畢業於香港中文大學醫學院，其後赴英國卡迪夫大學修讀皮膚科文憑課程。除普通科門診外，對濕疹、暗瘡等常見皮膚問題有豐富的診療經驗。',
  },
];

export const SERVICES = [
  {
    num: '01',
    title_tc: '普通科門診',
    title_en: 'General Practice',
    desc: '日常疾病診治、慢性病管理、健康諮詢及預防保健。',
    detail: '提供日常疾病診斷及治療，包括感冒、發燒、腸胃不適等常見病症。慢性病管理：定期覆診、藥物調整、健康監測。預防保健：身體檢查建議、健康諮詢、轉介服務。即日加號服務，方便街坊臨時求診。',
    tags: ['即日加號', '可預約'],
  },
  {
    num: '02',
    title_tc: '皮膚問題診治',
    title_en: 'Skin Conditions (Dermatology Diploma)',
    desc: '處理濕疹、暗瘡、皮疹、色素問題及一般皮膚不適，由持卡迪夫大學皮膚科文憑之林醫生主理。',
    detail: '由林慧美醫生主理，持卡迪夫大學皮膚科文憑 (PgDip Dermatology Cardiff)。處理常見皮膚問題：濕疹、暗瘡、皮疹、蕁麻疹、真菌感染。色素問題評估：色斑、痣的初步檢查及轉介。須預約・建議初次求診預留30分鐘。',
    tags: ['須預約', '林醫生主理'],
  },
  {
    num: '03',
    title_tc: '大腸癌篩查計劃',
    title_en: 'Colorectal Cancer Screening',
    desc: '政府資助大腸癌篩查計劃，50歲以上合資格人士可參與。',
    detail: '政府資助篩查計劃，目標群組：50–75歲無症狀香港居民。第一步：大便隱血測試 (FIT)・免費。如測試結果呈陽性，安排轉介進行大腸鏡檢查（政府資助）。早期發現可大幅提高治癒率。',
    tags: ['政府資助', '須預約'],
    govScheme: true,
  },
  {
    num: '04',
    title_tc: '慢性病共治計劃',
    title_en: 'Chronic Disease Co-Care',
    desc: '糖尿病、高血壓共同治理先導計劃，獲政府資助。',
    detail: '政府資助先導計劃，針對糖尿病及高血壓患者。包括：定期診症、化驗檢查（HbA1c、腎功能等）、藥物治療。由家庭醫生與專科協作，減少急症室求診。符合資格者經地區康健中心轉介。',
    tags: ['政府資助', '長期跟進'],
    govScheme: true,
  },
  {
    num: '05',
    title_tc: '流感疫苗注射',
    title_en: 'Flu Vaccination',
    desc: '季節性流感疫苗接種，長者及合資格人士可獲政府資助。',
    detail: '2026/27 季度流感疫苗接種服務。政府疫苗資助計劃：6個月至未滿12歲兒童、50歲以上人士、孕婦、長期病患者。疫苗資助額：每劑 HK$260。即日可接種，無須預約（建議先致電確認疫苗供應）。',
    tags: ['資助計劃', '即日提供'],
    govScheme: true,
  },
  {
    num: '06',
    title_tc: '醫療券抵扣',
    title_en: 'Healthcare Voucher Acceptance',
    desc: '接受長者醫療券抵扣診金，65歲以上長者每年享$2,000資助。',
    detail: '長者醫療券計劃：65歲或以上香港居民每年可獲 HK$2,000 醫療券資助，累積上限 HK$8,000。獎賞先導計劃：於同一年度使用 HK$1,000+ 於特定基層醫療服務，可額外獲發 HK$500。本診所已登記參與計劃，長者只需出示香港身份證即可使用。',
    tags: ['長者專享', '即時抵扣'],
    voucher: true,
  },
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
