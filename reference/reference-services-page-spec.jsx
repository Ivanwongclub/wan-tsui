/*
 * Wan Tsui — Services Page Reference Spec
 * 
 * This file defines the exact design for /services.
 * All typography, spacing, and color values follow the V6.1 editorial system.
 * Claude Code: read this file and implement exactly as specified.
 * 
 * Content source: import from src/content/wanTsui.ts
 * Images source: import from src/lib/imageHelpers.ts
 */

// ============================================================
// CONTENT: Add 'detail' field to SERVICES in wanTsui.ts
// ============================================================

const SERVICE_DETAILS = {
  '01': '提供日常疾病診斷及治療，包括感冒、發燒、腸胃不適等常見病症。慢性病管理：定期覆診、藥物調整、健康監測。預防保健：身體檢查建議、健康諮詢、轉介服務。即日加號服務，方便街坊臨時求診。',
  '02': '由林慧美醫生主理，持卡迪夫大學皮膚科文憑 (PgDip Dermatology Cardiff)。處理常見皮膚問題：濕疹、暗瘡、皮疹、蕁麻疹、真菌感染。色素問題評估：色斑、痣的初步檢查及轉介。須預約・建議初次求診預留30分鐘。',
  '03': '政府資助篩查計劃，目標群組：50–75歲無症狀香港居民。第一步：大便隱血測試 (FIT)・免費。如測試結果呈陽性，安排轉介進行大腸鏡檢查（政府資助）。早期發現可大幅提高治癒率。',
  '04': '政府資助先導計劃，針對糖尿病及高血壓患者。包括：定期診症、化驗檢查（HbA1c、腎功能等）、藥物治療。由家庭醫生與專科協作，減少急症室求診。符合資格者經地區康健中心轉介。',
  '05': '2026/27 季度流感疫苗接種服務。政府疫苗資助計劃：6個月至未滿12歲兒童、50歲以上人士、孕婦、長期病患者。疫苗資助額：每劑 HK$260。即日可接種，無須預約（建議先致電確認疫苗供應）。',
  '06': '長者醫療券計劃：65歲或以上香港居民每年可獲 HK$2,000 醫療券資助，累積上限 HK$8,000。獎賞先導計劃：於同一年度使用 HK$1,000+ 於特定基層醫療服務，可額外獲發 HK$500。本診所已登記參與計劃，長者只需出示香港身份證即可使用。',
};

// ============================================================
// SECTION 1: PageHero
// ============================================================
// Reusable component — create src/components/PageHero.tsx
const PageHero = {
  container: {
    backgroundColor: '#065F46', // brand-primary
    color: '#FFFFFF',
    padding: '80px 40px', // py-20 px-10
    // mobile: padding '64px 24px'
  },
  inner: {
    maxWidth: '1320px',
    margin: '0 auto',
  },
  eyebrow: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    opacity: 0.7,
    marginBottom: '16px',
    // value: "OUR SERVICES"
  },
  title: {
    fontFamily: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    fontSize: 'clamp(32px, 4vw, 44px)',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#FFFFFF',
    // value: "診所服務"
  },
  subtitle: {
    fontSize: '16px',
    lineHeight: 1.75,
    opacity: 0.8,
    marginTop: '16px',
    maxWidth: '600px',
    // value: "六項專業醫療服務・三項政府資助計劃"
  },
};

// ============================================================
// SECTION 2: Alternating Service Sections
// ============================================================
// Map all 6 SERVICES. Each gets a full-width section.
// Odd (01,03,05): image LEFT, text RIGHT
// Even (02,04,06): text LEFT, image RIGHT
const ServiceSection = {
  container: {
    padding: '80px 40px', // py-20 px-10
    borderBottom: '1px solid #E7E5E4', // last section: no border
  },
  inner: {
    maxWidth: '1320px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '64px', // gap-16
    alignItems: 'center',
    // mobile: gridTemplateColumns '1fr', image always on top
  },

  // IMAGE SIDE
  imageContainer: {
    aspectRatio: '4 / 3',
    overflow: 'hidden',
    backgroundColor: '#065F46',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    // onError: placeholderSvg(service.title_tc)
  },
  numberOverlay: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    fontFamily: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    fontSize: '48px',
    fontWeight: 700,
    fontStyle: 'italic',
    color: '#FFFFFF',
    lineHeight: 1,
    mixBlendMode: 'overlay',
    opacity: 0.9,
  },
  govBadge: {
    position: 'absolute',
    top: '14px',
    left: '14px',
    padding: '5px 10px',
    backgroundColor: '#065F46',
    color: '#FFFFFF',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    // text: "政府資助"
  },
  voucherBadge: {
    // same as govBadge but:
    backgroundColor: '#9F3A1A',
    // text: "長者專享"
  },

  // TEXT SIDE
  eyebrow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '10px',
    marginBottom: '12px',
  },
  eyebrowNum: {
    fontSize: '11px',
    color: '#9F3A1A', // brand-accent
    fontWeight: 700,
    letterSpacing: '0.18em',
  },
  eyebrowEn: {
    fontSize: '11px',
    color: '#A8A29E', // brand-muted
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  titleTC: {
    fontFamily: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    fontSize: '28px',
    fontWeight: 700,
    color: '#1C1917',
    lineHeight: 1.3,
    marginBottom: '16px',
  },
  description: {
    fontSize: '15px',
    color: '#57534E',
    lineHeight: 1.7,
    marginBottom: '16px',
  },
  detail: {
    fontSize: '14px',
    color: '#57534E',
    lineHeight: 1.7,
    marginBottom: '24px',
  },
  tags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: '11px',
    color: '#065F46',
    backgroundColor: '#ECFDF5',
    padding: '6px 12px',
    letterSpacing: '0.08em',
    fontWeight: 600,
  },
};

// ============================================================
// SECTION 3: CTA Band
// ============================================================
const CTABand = {
  container: {
    padding: '64px 40px',
    backgroundColor: '#065F46',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  inner: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontFamily: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '16px',
    // text: "歡迎致電預約・無須轉介"
  },
  body: {
    fontSize: '15px',
    opacity: 0.8,
    marginBottom: '32px',
    // text: "建議於就診前致電預約，以節省輪候時間。"
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  phoneButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#FFFFFF',
    color: '#065F46',
    borderRadius: '9999px',
    padding: '16px 32px',
    fontSize: '15px',
    fontWeight: 600,
    // icon: Phone (16px) + CLINIC.phone
  },
  whatsappButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid #FFFFFF',
    color: '#FFFFFF',
    borderRadius: '9999px',
    padding: '16px 32px',
    fontSize: '15px',
    fontWeight: 600,
    // icon: MessageCircle (16px) + "WhatsApp 預約"
  },
};
