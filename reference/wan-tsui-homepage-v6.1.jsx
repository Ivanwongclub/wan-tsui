import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowRight, CreditCard, ShieldCheck } from 'lucide-react';

export default function WanTsuiClinicHome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const c = {
    primary: '#065F46',
    primaryDark: '#044E3B',
    primaryLight: '#ECFDF5',
    accent: '#9F3A1A',
    accentDark: '#7C2E15',
    accentLight: '#FBE9DE',
    gold: '#B8985A',
    ink: '#1C1917',
    secondary: '#44403C',
    body: '#57534E',
    muted: '#A8A29E',
    paper: '#FAFAF9',
    surface: '#FFFFFF',
    border: '#E7E5E4',
    borderStrong: '#D6D3D1',
  };

  const fontStack = `'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', 'Plus Jakarta Sans', Inter, sans-serif`;
  const serifStack = `'Noto Serif TC', 'PingFang TC', Georgia, serif`;

  const placeholderImg = (label, color1 = '#065F46', color2 = '#044E3B') => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}"/>
          <stop offset="100%" stop-color="${color2}"/>
        </linearGradient>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.15)"/>
        </pattern>
      </defs>
      <rect width="800" height="600" fill="url(#g)"/>
      <rect width="800" height="600" fill="url(#dots)"/>
      <text x="50%" y="50%" font-family="serif" font-size="32" fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle">${label}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  };

  const heroImg = `https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=1920&q=80`;
  const doctor1Img = `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80`;
  const doctor2Img = `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80`;
  const locationImg = `https://images.unsplash.com/photo-1610847499832-918a1c3c6811?w=1200&q=80`;

  const services = [
    {
      num: '01',
      title: '普通科門診',
      subtitle: 'General Practice',
      desc: '日常疾病診治、慢性病管理、健康諮詢及預防保健。',
      tags: ['即日加號', '可預約'],
      img: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&q=80',
      fallback: '普通科',
    },
    {
      num: '02',
      title: '皮膚問題診治',
      subtitle: 'Skin Conditions (Dermatology Diploma)',
      desc: '處理濕疹、暗瘡、皮疹、色素問題及一般皮膚不適，由持卡迪夫大學皮膚科文憑之林醫生主理。',
      tags: ['須預約', '林醫生主理'],
      img: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80',
      fallback: '皮膚診治',
    },
    {
      num: '03',
      title: '大腸癌篩查計劃',
      subtitle: 'Colorectal Cancer Screening',
      desc: '政府資助大腸癌篩查計劃，50歲以上合資格人士可參與。',
      tags: ['政府資助', '須預約'],
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      fallback: '大腸癌篩查',
      govScheme: true,
    },
    {
      num: '04',
      title: '慢性病共治計劃',
      subtitle: 'Chronic Disease Co-Care',
      desc: '糖尿病、高血壓共同治理先導計劃，獲政府資助。',
      tags: ['政府資助', '長期跟進'],
      img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
      fallback: '慢性病共治',
      govScheme: true,
    },
    {
      num: '05',
      title: '流感疫苗注射',
      subtitle: 'Flu Vaccination',
      desc: '季節性流感疫苗接種，長者及合資格人士可獲政府資助。',
      tags: ['資助計劃', '即日提供'],
      img: 'https://images.unsplash.com/photo-1632053002780-3c5cd7be1d97?w=800&q=80',
      fallback: '流感疫苗',
      govScheme: true,
    },
    {
      num: '06',
      title: '醫療券抵扣',
      subtitle: 'Healthcare Voucher Acceptance',
      desc: '接受長者醫療券抵扣診金，65歲以上長者每年享$2,500資助。',
      tags: ['長者專享', '即時抵扣'],
      img: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80',
      fallback: '醫療券',
      voucher: true,
    },
  ];

  // 醫療卡 partners (typical HK private health insurance)
  const insurancePartners = [
    'Bupa',
    'AXA',
    'Cigna',
    'BlueCross',
    'AIA',
    'Manulife',
    'Prudential',
    'Sun Life',
  ];

  return (
    <div style={{ 
      backgroundColor: c.paper, 
      color: c.ink, 
      fontFamily: fontStack,
      letterSpacing: '0.02em',
      lineHeight: 1.75,
      minHeight: '100vh',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&family=Noto+Serif+TC:wght@500;700&display=swap" rel="stylesheet" />

      {/* TOP STRIP */}
      <div style={{ 
        backgroundColor: c.accent, 
        color: c.surface, 
        padding: '9px 16px', 
        textAlign: 'center', 
        fontSize: '12.5px',
        fontWeight: 500,
        letterSpacing: '0.08em',
      }}>
        <span style={{ color: c.accentLight, marginRight: '8px' }}>新</span>
        2026年流感疫苗開始預約・歡迎致電查詢
      </div>

      {/* HEADER */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : c.surface,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${c.border}` : '1px solid transparent',
        transition: 'all 240ms ease',
      }}>
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: scrolled ? '14px 40px' : '20px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 240ms ease',
        }} className="header-inner">
          <div>
            <div style={{ fontFamily: serifStack, fontSize: '20px', fontWeight: 700, color: c.ink, lineHeight: 1, letterSpacing: '0.02em' }}>
              環翠綜合醫務中心
            </div>
            <div style={{ fontSize: '10.5px', color: c.muted, letterSpacing: '0.18em', marginTop: '4px', fontWeight: 500 }}>
              WAN TSUI MEDICAL CENTRE · CHAI WAN
            </div>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="desktop-nav">
            {['診所服務', '醫生團隊', '收費及保險', '聯絡我們'].map((item, i) => (
              <a key={i} href="#" style={{ fontSize: '14.5px', color: c.ink, textDecoration: 'none', fontWeight: 500, paddingBottom: '4px', borderBottom: '1px solid transparent', transition: 'border-color 200ms' }}
                onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = c.accent}
                onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}>
                {item}
              </a>
            ))}
          </nav>

          <a href="tel:+85225551234" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', backgroundColor: c.primary, color: c.surface, textDecoration: 'none', borderRadius: '9999px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.02em' }} className="header-cta">
            <Phone size={14} />
            2555 1234
          </a>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: 'min(78vh, 720px)', position: 'relative', backgroundColor: c.primary }} className="hero-img">
          <img src={heroImg} alt="環翠綜合醫務中心" onError={(e) => { e.currentTarget.src = placeholderImg('診所實景', '#065F46', '#044E3B'); }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(28,25,23,0.78) 0%, rgba(28,25,23,0.55) 35%, rgba(28,25,23,0.15) 60%, transparent 90%)' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1320px', margin: '0 auto', padding: '0 40px', height: '100%', display: 'flex', alignItems: 'center' }}>
            <div style={{ maxWidth: '640px', color: c.surface }}>
              {/* DUAL TRUST BADGES — Critical fix: 醫療卡 + 醫療券 BOTH visible */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: c.surface,
                }}>
                  <CreditCard size={14} />
                  接受醫療卡
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: c.surface,
                }}>
                  <ShieldCheck size={14} />
                  長者醫療券
                </div>
              </div>

              <h1 style={{ fontFamily: serifStack, fontSize: 'clamp(38px, 5.5vw, 64px)', fontWeight: 700, lineHeight: 1.15, color: c.surface, marginBottom: '24px', letterSpacing: '-0.01em' }}>
                家庭醫療<br />植根柴灣
              </h1>

              <p style={{ fontSize: '17px', lineHeight: 1.75, color: c.surface, opacity: 0.92, marginBottom: '40px', maxWidth: '480px' }}>
                由兩位註冊普通科醫生主理・三項政府資助計劃・接受多種醫療卡及長者醫療券。
              </p>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="tel:+85225551234" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', backgroundColor: c.primary, color: c.surface, textDecoration: 'none', borderRadius: '9999px', fontSize: '15px', fontWeight: 600 }}>
                  致電預約 <ArrowRight size={16} />
                </a>
                <a href="https://wa.me/85291234567" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 28px', color: c.surface, textDecoration: 'none', fontSize: '15px', fontWeight: 500, borderBottom: `1px solid ${c.surface}`, paddingBottom: '14px', paddingTop: '14px' }}>
                  WhatsApp 9123 4567
                </a>
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: c.surface, fontSize: '13px', letterSpacing: '0.05em', borderTop: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)', backgroundColor: 'rgba(28,25,23,0.3)' }} className="hero-strip">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.92 }}>
              <MapPin size={14} /> 柴灣環翠邨環翠商場2樓201號舖
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.92 }}>
              <Clock size={14} /> 星期一至六 09:00–19:00
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEW: TRUST BAR — 醫療卡 + 醫療券 EXPLAINED ===== */}
      <section style={{ 
        padding: '64px 40px',
        backgroundColor: c.primaryLight,
        borderBottom: `1px solid ${c.border}`,
      }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'flex-start',
          }} className="trust-bar-grid">
            
            {/* 醫療卡 column */}
            <div style={{ paddingRight: '40px', borderRight: `1px solid ${c.border}` }} className="trust-card-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <CreditCard size={28} color={c.primary} />
                <div>
                  <div style={{ fontSize: '11px', color: c.primary, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>
                    醫療保險
                  </div>
                  <h3 style={{ 
                    fontFamily: serifStack,
                    fontSize: '24px', 
                    fontWeight: 700, 
                    color: c.ink, 
                    margin: '4px 0 0',
                    lineHeight: 1.2,
                  }}>
                    接受醫療卡直付
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: c.body, lineHeight: 1.7, marginBottom: '20px' }}>
                本診所接受多種私營醫療保險公司之醫療卡直付，免除你即場墊支麻煩。
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {insurancePartners.map((p, i) => (
                  <span key={i} style={{
                    fontSize: '12px',
                    color: c.ink,
                    backgroundColor: c.surface,
                    border: `1px solid ${c.border}`,
                    padding: '6px 12px',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}>
                    {p}
                  </span>
                ))}
                <span style={{
                  fontSize: '12px',
                  color: c.muted,
                  padding: '6px 4px',
                  fontStyle: 'italic',
                }}>
                  及其他公司・致電查詢
                </span>
              </div>
            </div>

            {/* 醫療券 column */}
            <div className="trust-card-right">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <ShieldCheck size={28} color={c.accent} />
                <div>
                  <div style={{ fontSize: '11px', color: c.accent, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>
                    政府資助
                  </div>
                  <h3 style={{ 
                    fontFamily: serifStack,
                    fontSize: '24px', 
                    fontWeight: 700, 
                    color: c.ink, 
                    margin: '4px 0 0',
                    lineHeight: 1.2,
                  }}>
                    長者醫療券抵扣
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: c.body, lineHeight: 1.7, marginBottom: '20px' }}>
                65歲或以上香港居民每年可獲<strong style={{ color: c.accent }}>HK$2,500</strong>醫療券資助，可用於本診所所有服務。
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: c.primary,
                fontWeight: 600,
                borderBottom: `1px solid ${c.primary}`,
                paddingBottom: '4px',
              }}>
                了解使用方法 <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding: '120px 40px', backgroundColor: c.paper }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: c.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '24px' }}>
            關於環翠
          </div>
          <p style={{ fontFamily: serifStack, fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.55, color: c.ink, fontWeight: 500, marginBottom: '0', letterSpacing: '0.01em' }}>
            服務柴灣街坊近<span style={{ color: c.accent, fontWeight: 700 }}>二十年</span>。<br />
            由兩位註冊普通科醫生主理日常診症及皮膚問題診治，<br />
            <span style={{ color: c.primary }}>並提供三項政府資助計劃，讓街坊安心就醫。</span>
          </p>
        </div>
      </section>

      {/* SERVICES — 6 items, properly aligned to brief */}
      <section style={{ padding: '40px 40px 120px', backgroundColor: c.paper }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: c.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px' }}>
                診所服務 / Services
              </div>
              <h2 style={{ fontFamily: serifStack, fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: c.ink, lineHeight: 1.2, margin: 0, letterSpacing: '-0.01em' }}>
                我們提供的服務
              </h2>
              <p style={{ fontSize: '15px', color: c.body, lineHeight: 1.75, marginTop: '16px', maxWidth: '520px' }}>
                兩個專科服務・三項政府資助計劃・接受長者醫療券。
              </p>
            </div>
            <a href="#" style={{ fontSize: '14px', color: c.ink, textDecoration: 'none', fontWeight: 500, borderBottom: `1px solid ${c.ink}`, paddingBottom: '4px' }}>
              查看詳情 →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="services-grid">
            {services.map((s, i) => (
              <a key={i} href="#" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} className="service-card">
                <div style={{ aspectRatio: '4 / 3', marginBottom: '24px', overflow: 'hidden', position: 'relative', backgroundColor: c.primary }} className="service-img-wrap">
                  <img src={s.img} alt={s.title} onError={(e) => { e.currentTarget.src = placeholderImg(s.fallback); }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 600ms ease' }}
                    className="service-img" />
                  {s.govScheme && (
                    <div style={{ position: 'absolute', top: '14px', left: '14px', padding: '5px 10px', backgroundColor: c.primary, color: c.surface, fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      政府資助
                    </div>
                  )}
                  {s.voucher && (
                    <div style={{ position: 'absolute', top: '14px', left: '14px', padding: '5px 10px', backgroundColor: c.accent, color: c.surface, fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      長者專享
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: '14px', right: '14px', fontFamily: serifStack, fontSize: '36px', fontWeight: 700, color: c.surface, lineHeight: 1, fontStyle: 'italic', mixBlendMode: 'overlay', opacity: 0.9 }}>
                    {s.num}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: c.accent, fontWeight: 700, letterSpacing: '0.18em' }}>{s.num}</span>
                  <span style={{ fontSize: '11px', color: c.muted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.subtitle}</span>
                </div>
                <h3 style={{ fontFamily: serifStack, fontSize: '22px', fontWeight: 600, color: c.ink, marginBottom: '10px', letterSpacing: '0', lineHeight: 1.3 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: c.body, marginBottom: '14px' }}>
                  {s.desc}
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {s.tags.map((tag, j) => (
                    <span key={j} style={{ fontSize: '10.5px', color: c.primary, backgroundColor: c.primaryLight, padding: '4px 9px', letterSpacing: '0.08em', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section style={{ padding: '120px 40px', backgroundColor: c.surface, borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}` }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px', maxWidth: '600px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: c.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px' }}>
              醫生團隊
            </div>
            <h2 style={{ fontFamily: serifStack, fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: c.ink, lineHeight: 1.2, marginBottom: '16px', letterSpacing: '-0.01em' }}>
              認識我們的醫生
            </h2>
            <p style={{ fontSize: '16px', color: c.body, lineHeight: 1.75 }}>
              熟悉柴灣社區，與街坊建立長期醫患關係。
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '64px' }} className="doctors-grid">
            {[
              { img: doctor1Img, name: '麥振威醫生', nameEn: 'Dr. MAK Chun Wai', creds: '香港大學內外全科醫學士 (MB BS HK)', specialty: '普通科 / General Practice', schedule: '星期一・三・五 全日', fallbackLabel: 'Dr. MAK' },
              { img: doctor2Img, name: '林慧美醫生', nameEn: 'Dr. LAM Wai May Josephine', creds: '香港中文大學內外全科醫學士 (MB ChB CUHK)・卡迪夫大學皮膚科文憑 (PgDip Dermatology Cardiff)', specialty: '普通科 / General Practice (兼 皮膚科文憑)', schedule: '星期二・四 全日', fallbackLabel: 'Dr. LAM' },
            ].map((d, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '32px', alignItems: 'flex-start' }} className="doctor-row">
                <div style={{ aspectRatio: '4 / 5', backgroundColor: c.primary, overflow: 'hidden', position: 'relative' }}>
                  <img src={d.img} alt={d.name} onError={(e) => { e.currentTarget.src = placeholderImg(d.fallbackLabel); }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontFamily: serifStack, fontSize: '36px', fontWeight: 700, color: c.surface, fontStyle: 'italic', lineHeight: 1 }}>
                    <span style={{ color: '#F4A57A' }}>0{i+1}</span>
                  </div>
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <h3 style={{ fontFamily: serifStack, fontSize: '28px', fontWeight: 700, color: c.ink, margin: '0 0 4px', letterSpacing: '0.01em' }}>
                    {d.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: c.muted, letterSpacing: '0.1em', marginBottom: '24px' }}>
                    {d.nameEn}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: c.body, lineHeight: 1.7 }}>
                    <div style={{ paddingBottom: '14px', borderBottom: `1px solid ${c.border}` }}>
                      <div style={{ fontSize: '11px', color: c.primary, letterSpacing: '0.15em', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>學歷</div>
                      {d.creds}
                    </div>
                    <div style={{ paddingBottom: '14px', borderBottom: `1px solid ${c.border}` }}>
                      <div style={{ fontSize: '11px', color: c.primary, letterSpacing: '0.15em', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>專業範疇</div>
                      {d.specialty}
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: c.primary, letterSpacing: '0.15em', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>當值時段</div>
                      {d.schedule}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section style={{ padding: '120px 40px', backgroundColor: c.paper }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: c.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px' }}>
              本週值班
            </div>
            <h2 style={{ fontFamily: serifStack, fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 700, color: c.ink, lineHeight: 1.25, margin: 0 }}>
              醫生當值時間表
            </h2>
          </div>

          <div className="schedule-wrap">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', backgroundColor: c.surface }} className="schedule-table">
              <thead>
                <tr style={{ backgroundColor: c.primaryLight }}>
                  <th style={{ padding: '20px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: c.primary, letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: `1px solid ${c.primary}` }}>日期</th>
                  <th style={{ padding: '20px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: c.primary, letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: `1px solid ${c.primary}` }}>上午 09:00–13:00</th>
                  <th style={{ padding: '20px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: c.primary, letterSpacing: '0.15em', textTransform: 'uppercase', borderBottom: `1px solid ${c.primary}` }}>下午 15:00–19:00</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { day: '星期一', am: '麥振威醫生', pm: '麥振威醫生', today: false },
                  { day: '星期二', am: '林慧美醫生', pm: '林慧美醫生', today: true },
                  { day: '星期三', am: '麥振威醫生', pm: '林慧美醫生', today: false },
                  { day: '星期四', am: '林慧美醫生', pm: '麥振威醫生', today: false },
                  { day: '星期五', am: '麥振威醫生', pm: '麥振威醫生', today: false },
                  { day: '星期六', am: '林慧美醫生', pm: '— 休診', today: false },
                  { day: '星期日及公眾假期', am: '— 休診', pm: '— 休診', today: false },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${c.border}`, backgroundColor: row.today ? c.accentLight : 'transparent' }}>
                    <td style={{ padding: '18px 24px', fontSize: '15px', fontWeight: 600, color: c.ink }}>
                      {row.today && (
                        <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, color: c.surface, backgroundColor: c.accent, padding: '2px 8px', marginRight: '10px', letterSpacing: '0.1em', verticalAlign: 'middle' }}>
                          今日
                        </span>
                      )}
                      {row.day}
                    </td>
                    <td style={{ padding: '18px 24px', fontSize: '15px', color: row.am.includes('休') ? c.muted : c.body }}>{row.am}</td>
                    <td style={{ padding: '18px 24px', fontSize: '15px', color: row.pm.includes('休') ? c.muted : c.body }}>{row.pm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '24px', fontSize: '13px', color: c.body, display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div><strong style={{ color: c.primary }}>午膳：</strong>每日 13:00–15:00 暫停服務</div>
            <div><strong style={{ color: c.primary }}>備註：</strong>如有調動，致電查詢為準</div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section style={{ backgroundColor: c.surface, borderTop: `1px solid ${c.border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="location-grid">
          <div style={{ padding: '120px 40px', maxWidth: '600px', justifySelf: 'end' }} className="location-info">
            <div style={{ fontSize: '12px', fontWeight: 600, color: c.primary, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '16px' }}>
              到訪我們
            </div>
            <h2 style={{ fontFamily: serifStack, fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, color: c.ink, lineHeight: 1.2, marginBottom: '32px', letterSpacing: '-0.01em' }}>
              就在<span style={{ color: c.accent }}>環翠邨</span><br />港鐵站旁
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '15px' }}>
              {[
                { label: '地址', value: '香港柴灣環翠邨環翠商場1樓109號舖' },
                { label: '交通', value: '港鐵柴灣站 B 出口・步行3分鐘\n巴士 8H, 8X, 82, 82X・小巴 56' },
                { label: '電話', value: '(852) 2337 8999', href: 'tel:+85223378999' },
                { label: '手機', value: '(852) 6801 5968', href: 'tel:+85268015968' },
                { label: '電郵', value: 'reception@wt-medical.com', href: 'mailto:reception@wt-medical.com' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px', paddingBottom: '20px', borderBottom: i < 4 ? `1px solid ${c.border}` : 'none' }}>
                  <div style={{ fontSize: '11px', color: c.primary, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, paddingTop: '2px' }}>
                    {item.label}
                  </div>
                  <div>
                    {item.href ? <a href={item.href} style={{ color: c.ink, textDecoration: 'none', fontWeight: 500 }}>{item.value}</a> : <div style={{ color: c.body, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.value}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ minHeight: '600px', backgroundColor: c.primary, overflow: 'hidden', position: 'relative' }} className="location-img">
            <img src={locationImg} alt="柴灣" onError={(e) => { e.currentTarget.src = placeholderImg('柴灣・環翠邨'); }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', top: '32px', right: '32px', backgroundColor: c.accent, color: c.surface, padding: '14px 20px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} /> 港鐵柴灣站 B 出口
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT CTA STRIP */}
      <section style={{ padding: '80px 40px', backgroundColor: c.primary, color: c.surface }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }} className="voucher-strip">
          <div style={{ maxWidth: '700px' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: c.surface, opacity: 0.7, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#F4A57A' }}>●</span> 付款方式
            </div>
            <h2 style={{ fontFamily: serifStack, fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, color: c.surface, lineHeight: 1.3, margin: 0, letterSpacing: '-0.01em' }}>
              接受醫療卡及長者醫療券<br />
              <span style={{ opacity: 0.7 }}>免除墊支麻煩</span>
            </h2>
          </div>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', color: c.surface, backgroundColor: c.accent, padding: '14px 28px', textDecoration: 'none', fontSize: '15px', fontWeight: 600, borderRadius: '9999px', whiteSpace: 'nowrap' }}>
            查看接受卡別 <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* FOOTER — with both 醫療卡 & 醫療券 badges */}
      <footer style={{ backgroundColor: c.paper, padding: '80px 40px 40px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          
          {/* Footer trust badges row */}
          <div style={{ 
            padding: '20px 24px',
            backgroundColor: c.primaryLight,
            marginBottom: '48px',
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CreditCard size={20} color={c.primary} />
              <span style={{ fontSize: '14px', fontWeight: 600, color: c.ink }}>接受醫療卡</span>
            </div>
            <div style={{ width: '1px', height: '20px', backgroundColor: c.border }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} color={c.accent} />
              <span style={{ fontSize: '14px', fontWeight: 600, color: c.ink }}>長者醫療券</span>
            </div>
            <div style={{ width: '1px', height: '20px', backgroundColor: c.border }} />
            <div style={{ fontSize: '13px', color: c.body }}>
              三項政府資助計劃・歡迎街坊查詢
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', paddingBottom: '64px', borderBottom: `1px solid ${c.border}` }} className="footer-grid">
            <div>
              <div style={{ fontFamily: serifStack, fontSize: '18px', fontWeight: 700, color: c.ink, marginBottom: '4px' }}>
                環翠綜合醫務中心
              </div>
              <div style={{ fontSize: '10.5px', color: c.muted, letterSpacing: '0.18em', marginBottom: '20px' }}>
                WAN TSUI MEDICAL CENTRE
              </div>
              <p style={{ fontSize: '14px', color: c.body, lineHeight: 1.75 }}>
                香港柴灣環翠邨環翠商場1樓109號舖<br/>
                星期一至六 09:00–13:00, 15:00–19:00
              </p>
            </div>

            {[
              { title: '服務', items: ['普通科', '皮膚問題診治', '大腸癌篩查', '慢性病共治', '流感疫苗'] },
              { title: '付款', items: ['醫療卡列表', '長者醫療券', '收費表', '政府資助'] },
              { title: '資訊', items: ['醫生團隊', '預約須知', '私隱政策', '使用條款'] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: c.primary, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px' }}>
                  {col.title}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {col.items.map((item, j) => (
                    <li key={j}><a href="#" style={{ fontSize: '14px', color: c.body, textDecoration: 'none' }}>{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '12.5px', color: c.muted }}>
            <div>© 2025 環翠綜合醫務中心 Wan Tsui Integrated Medical Centre</div>
            <div>緊急情況請致電 <strong style={{ color: c.accent }}>999</strong></div>
          </div>
        </div>
      </footer>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '64px', display: 'none', zIndex: 50, borderTop: `1px solid ${c.border}` }} className="mobile-sticky-bar">
        <a href="tel:+85223378999" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: c.primary, color: c.surface, textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}>
          <Phone size={18} /> 致電
        </a>
        <a href="https://wa.me/85268015968" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: c.surface, color: c.ink, textDecoration: 'none', fontSize: '15px', fontWeight: 600, borderLeft: `1px solid ${c.border}` }}>
          <MessageCircle size={18} /> WhatsApp
        </a>
      </div>

      <style>{`
        .service-card:hover .service-img { transform: scale(1.04); }
        
        @media (max-width: 968px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
          .trust-bar-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .trust-card-left { border-right: none !important; padding-right: 0 !important; padding-bottom: 32px !important; border-bottom: 1px solid ${c.border} !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .header-cta { font-size: 13px !important; padding: 8px 16px !important; }
          .header-inner { padding: 14px 20px !important; }
          .hero-img { height: 70vh !important; }
          .hero-strip { padding: 14px 20px !important; flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; font-size: 12px !important; }
          .services-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .doctors-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
          .doctor-row { grid-template-columns: 1fr !important; gap: 24px !important; }
          .location-grid { grid-template-columns: 1fr !important; }
          .location-info { padding: 80px 24px !important; max-width: 100% !important; }
          .location-img { min-height: 320px !important; }
          .voucher-strip { flex-direction: column !important; align-items: flex-start !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .mobile-sticky-bar { display: flex !important; }
          .schedule-wrap { overflow-x: auto !important; }
          .schedule-table { min-width: 600px; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
