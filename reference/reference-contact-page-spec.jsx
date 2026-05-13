/*
 * Wan Tsui — Contact Page Reference Spec
 * 
 * This file defines the exact design for /contact.
 * All typography, spacing, and color values follow the V6.1 editorial system.
 * Claude Code: read this file and implement exactly as specified.
 * 
 * Content source: import from src/content/wanTsui.ts
 * Images source: import from src/lib/imageHelpers.ts
 */

// ============================================================
// SECTION 1: PageHero (reuse component)
// ============================================================
// eyebrow: "CONTACT US"
// title: "聯絡我們"
// subtitle: "歡迎致電或 WhatsApp 預約"

// ============================================================
// SECTION 2: Contact Info
// ============================================================
// Same definition-list pattern as V6.1 Home Location section (lines 566-603)
const ContactInfo = {
  container: {
    padding: '120px 40px',
    backgroundColor: '#FAFAF9',
  },
  inner: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  eyebrow: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#065F46',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    marginBottom: '32px',
    // text: "聯絡方式"
  },

  // Definition list — same grid pattern as V6.1 Location section
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    fontSize: '15px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    gap: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #E7E5E4',
    // last row: no borderBottom
  },
  label: {
    fontSize: '11px',
    color: '#065F46',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    fontWeight: 600,
    paddingTop: '2px',
  },
  value: {
    color: '#57534E',
    lineHeight: 1.7,
    // for multi-line: whiteSpace 'pre-line'
  },
  valueLink: {
    color: '#1C1917',
    textDecoration: 'none',
    fontWeight: 500,
  },

  // 7 rows:
  // Row 1 — label: "地址",     value: CLINIC.address_tc (plain text)
  // Row 2 — label: "交通",     value: CLINIC.mtr + "\n" + CLINIC.bus (pre-line)
  // Row 3 — label: "電話",     value: CLINIC.phone (link → tel:)
  // Row 4 — label: "手機",     value: CLINIC.mobile (link → tel:)
  // Row 5 — label: "WhatsApp", value: CLINIC.mobile (link → wa.me/ with pre-filled msg "你好，我想預約診症")
  // Row 6 — label: "電郵",     value: CLINIC.email (link → mailto:)
  // Row 7 — label: "營業時間", value: CLINIC.hours_tc + "\n午膳 " + CLINIC.lunch_break + " 暫停服務" (pre-line, no border)

  // CTA buttons below the list
  ctaContainer: {
    display: 'flex',
    gap: '16px',
    marginTop: '40px',
    flexWrap: 'wrap',
  },
  phoneCTA: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#065F46',
    color: '#FFFFFF',
    borderRadius: '9999px',
    padding: '16px 32px',
    fontSize: '15px',
    fontWeight: 600,
    textDecoration: 'none',
    // icon: Phone (16px) + "立即致電"
    // href: tel:+85223378999
  },
  whatsappCTA: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#FFFFFF',
    color: '#1C1917',
    border: '1px solid #E7E5E4',
    borderRadius: '9999px',
    padding: '16px 32px',
    fontSize: '15px',
    fontWeight: 600,
    textDecoration: 'none',
    // icon: MessageCircle (16px) + "WhatsApp 預約"
    // href: https://wa.me/85268015968?text=你好，我想預約診症
  },
};

// ============================================================
// SECTION 3: Hours Table
// ============================================================
const HoursTable = {
  container: {
    padding: '64px 40px',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E7E5E4',
  },
  inner: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  eyebrow: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#065F46',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    marginBottom: '24px',
    // text: "營業時間"
  },
  title: {
    fontFamily: "'Noto Serif TC', 'PingFang TC', Georgia, serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#1C1917',
    marginBottom: '32px',
    // text: "每週應診時間"
  },
  // Simple table — same header style as V6.1 schedule table
  // Columns: "日期" | "上午 09:00–13:00" | "下午 15:00–19:00"
  tableHeader: {
    backgroundColor: '#ECFDF5',
    // th: same as V6.1 schedule thead
    fontSize: '11px',
    fontWeight: 600,
    color: '#065F46',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '20px 24px',
    textAlign: 'left',
    borderBottom: '1px solid #065F46',
  },
  tableCell: {
    padding: '18px 24px',
    fontSize: '15px',
    borderBottom: '1px solid #E7E5E4',
  },
  // Rows:
  // Mon-Fri: "應診" in brand-primary (#065F46), font-weight 500
  // Sat AM: "應診", Sat PM: "休診" in brand-muted (#A8A29E)
  // Sun: "休診" both columns in brand-muted
  // Today row: bg #FBE9DE + "今日" badge (same as V6.1 schedule)
  todayRow: {
    backgroundColor: '#FBE9DE',
  },
  todayBadge: {
    display: 'inline-block',
    fontSize: '10px',
    fontWeight: 700,
    color: '#FFFFFF',
    backgroundColor: '#9F3A1A',
    padding: '2px 8px',
    marginRight: '10px',
    letterSpacing: '0.1em',
    verticalAlign: 'middle',
  },
  note: {
    marginTop: '16px',
    fontSize: '13px',
    color: '#57534E',
    // text: "午膳 13:00–15:00 暫停服務・星期日及公眾假期休診"
  },
};

// ============================================================
// SECTION 4: Payment Reminder
// ============================================================
const PaymentReminder = {
  container: {
    padding: '64px 40px',
    backgroundColor: '#ECFDF5', // brand-primary-light
  },
  inner: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  badges: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  // Badge 1: CreditCard icon (20px, #065F46) + "接受醫療卡" (14px, semibold, #1C1917)
  // Badge 2: ShieldCheck icon (20px, #9F3A1A) + "長者醫療券" (14px, semibold, #1C1917)
  body: {
    marginTop: '16px',
    fontSize: '15px',
    color: '#57534E',
    // text: "歡迎致電查詢接受之醫療卡種類及醫療券使用詳情"
  },
};
