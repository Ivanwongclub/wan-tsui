/*
 * Wan Tsui — About Page Reference Spec
 * 
 * This file defines the exact design for /about.
 * All typography, spacing, and color values follow the V6.1 editorial system.
 * Claude Code: read this file and implement exactly as specified.
 * 
 * Content source: import from src/content/wanTsui.ts
 * Images source: import from src/lib/imageHelpers.ts
 */

// ============================================================
// CONTENT: Add 'bio' field to DOCTORS in wanTsui.ts
// ============================================================

const DOCTOR_BIOS = {
  '麥振威醫生': '麥醫生畢業於香港大學醫學院，在公立醫院完成駐院訓練後投身社區家庭醫學。熟悉柴灣區居民的健康需要，擅長慢性病長期管理及長者健康諮詢。',
  '林慧美醫生': '林醫生畢業於香港中文大學醫學院，其後赴英國卡迪夫大學修讀皮膚科文憑課程。除普通科門診外，對濕疹、暗瘡等常見皮膚問題有豐富的診療經驗。',
};

// ============================================================
// SECTION 1: PageHero (reuse component from Services page)
// ============================================================
// eyebrow: "ABOUT US"
// title: "關於我們"
// subtitle: "植根柴灣・服務社區"

// ============================================================
// SECTION 2: Clinic Intro
// ============================================================
const ClinicIntro = {
  container: {
    padding: '120px 40px',
    backgroundColor: '#FAFAF9', // brand-paper
  },
  inner: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  eyebrow: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#065F46',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    marginBottom: '24px',
    // text: "診所簡介"
  },
  heading: {
    fontFamily: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    fontSize: 'clamp(32px, 4vw, 44px)',
    fontWeight: 700,
    color: '#1C1917',
    lineHeight: 1.2,
    marginBottom: '32px',
    // text: "植根" + <span color="#9F3A1A">"柴灣"</span>
  },
  paragraph: {
    fontSize: '17px',
    color: '#57534E',
    lineHeight: 1.8,
    marginBottom: '24px',
  },
  // Paragraph 1: "環翠綜合醫務中心紮根柴灣近二十年，由兩位資深普通科醫生駐診，為環翠邨及鄰近屋苑的街坊提供全面的基層醫療服務。"
  // Paragraph 2: "本診所致力以專業、親切的態度服務社區，並積極參與政府各項醫療資助計劃，讓街坊能以可負擔的費用獲得優質醫療照顧。"
};

// ============================================================
// SECTION 3: Doctor Profiles
// ============================================================
// Same layout as Home page Section 5 (Doctors) from V6.1 reference
// PLUS: add a bio paragraph after the credential rows
const DoctorSection = {
  container: {
    padding: '120px 40px',
    backgroundColor: '#FFFFFF', // brand-surface
    borderTop: '1px solid #E7E5E4',
    borderBottom: '1px solid #E7E5E4',
  },
  inner: {
    maxWidth: '1320px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '64px',
    maxWidth: '600px',
  },
  headerEyebrow: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#065F46',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    marginBottom: '16px',
    // text: "醫生團隊"
  },
  headerTitle: {
    fontFamily: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    fontSize: 'clamp(32px, 4vw, 44px)',
    fontWeight: 700,
    color: '#1C1917',
    lineHeight: 1.2,
    marginBottom: '16px',
    // text: "兩位普通科醫生"
  },
  headerBody: {
    fontSize: '16px',
    color: '#57534E',
    lineHeight: 1.75,
    // text: "熟悉柴灣社區，與街坊建立長期醫患關係。"
  },

  // Doctor cards — 2-col grid, 1-col mobile
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '64px',
    // mobile: gridTemplateColumns '1fr'
  },

  // Each doctor card — matches V6.1 exactly
  card: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr',
    gap: '32px',
    alignItems: 'flex-start',
    // mobile: gridTemplateColumns '1fr', gap '24px'
  },

  // Photo side
  photo: {
    aspectRatio: '4 / 5',
    backgroundColor: '#065F46',
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  photoNumber: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    fontFamily: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    fontSize: '36px',
    fontWeight: 700,
    fontStyle: 'italic',
    lineHeight: 1,
    color: '#F4A57A', // terra light
  },

  // Bio side
  bioContainer: {
    paddingTop: '8px',
  },
  name: {
    fontFamily: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    fontSize: '28px',
    fontWeight: 700,
    color: '#1C1917',
    margin: '0 0 4px',
    letterSpacing: '0.01em',
  },
  nameEn: {
    fontSize: '12px',
    color: '#A8A29E',
    letterSpacing: '0.1em',
    marginBottom: '24px',
  },
  infoRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    fontSize: '14px',
    color: '#57534E',
    lineHeight: 1.7,
  },
  infoLabel: {
    fontSize: '11px',
    color: '#065F46',
    letterSpacing: '0.15em',
    marginBottom: '4px',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  infoRow: {
    paddingBottom: '14px',
    borderBottom: '1px solid #E7E5E4',
    // last row: no border
  },
  // Info rows: 學歷 → creds, 專業範疇 → specialty, 當值時段 → schedule_tc

  // NEW: Bio paragraph (not in V6.1 home page, added for About page)
  bioParagraph: {
    marginTop: '24px',
    fontSize: '14px',
    color: '#57534E',
    lineHeight: 1.7,
    fontStyle: 'italic',
  },
};

// ============================================================
// SECTION 4: Schedule Table
// ============================================================
// Extract as shared component: src/components/ScheduleTable.tsx
// Reuse in both Home (index.tsx Section 6) and About page
// Exact same design as V6.1 reference — see wan-tsui-homepage-v6_1.jsx lines 510-562
const ScheduleTable = {
  container: {
    padding: '120px 40px',
    backgroundColor: '#FAFAF9',
  },
  inner: {
    maxWidth: '1080px',
    margin: '0 auto',
  },
  eyebrow: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#065F46',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    marginBottom: '16px',
    // text: "本週值班"
  },
  title: {
    fontFamily: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    fontSize: 'clamp(28px, 3.5vw, 36px)',
    fontWeight: 700,
    color: '#1C1917',
    lineHeight: 1.25,
    // text: "醫生當值時間表"
  },
  // Table styles — see V6.1 reference Section 6 for exact values
  // thead: bg #ECFDF5, th 11px/600/0.15em/uppercase, border-bottom brand-primary
  // tbody: 15px, padding 18px 24px, today row bg #FBE9DE with 今日 badge
  // 今日 badge: 10px/700/white/bg-accent/px-2 py-0.5/tracking-0.1em
  // Notes: 13px, brand-body, "午膳" + "備註" labels in brand-primary bold
};
