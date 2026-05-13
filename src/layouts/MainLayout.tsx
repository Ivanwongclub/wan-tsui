import { useState, useEffect, type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import {
  Phone,
  Menu,
  X,
  MessageCircle,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { CLINIC } from '../content/wanTsui';

// ─── TopStrip ────────────────────────────────────────────────────────────────

function TopStrip() {
  return (
    <div
      className="bg-brand-accent text-white text-center"
      style={{ padding: '9px 16px', fontSize: '12.5px', fontWeight: 500, letterSpacing: '0.08em' }}
    >
      <span className="text-brand-accent-light mr-2">新</span>
      2026年流感疫苗開始預約・歡迎致電查詢
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { to: '/' as const, label: '主頁' },
  { to: '/services' as const, label: '診所服務' },
  { to: '/about' as const, label: '關於我們' },
  { to: '/contact' as const, label: '聯絡我們' },
];

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        transition: 'all 240ms ease',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'white',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #E7E5E4' : '1px solid transparent',
        padding: scrolled ? '14px 40px' : '20px 40px',
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left — clinic name */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div
            className="font-heading font-bold text-brand-ink"
            style={{ fontSize: '20px', lineHeight: 1.2 }}
          >
            {CLINIC.name_tc}
          </div>
          <div
            className="text-brand-muted"
            style={{ fontSize: '10.5px', letterSpacing: '0.18em', fontWeight: 500, marginTop: '2px' }}
          >
            WAN TSUI MEDICAL CENTRE · CHAI WAN
          </div>
        </Link>

        {/* Center nav — desktop only */}
        <nav className="hidden md:flex" style={{ gap: '32px' }}>
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-brand-ink"
              style={{ fontSize: '14.5px', fontWeight: 500, textDecoration: 'none', paddingBottom: '2px' }}
              activeProps={{
                style: {
                  fontSize: '14.5px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  paddingBottom: '2px',
                  borderBottom: '1px solid #9F3A1A',
                },
              }}
              activeOptions={{ exact: to === '/' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right — phone CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href={`tel:${CLINIC.phone_tel}`}
            className="bg-brand-primary text-white rounded-button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <Phone size={14} />
            2337 8999
          </a>
          <button
            className="md:hidden text-brand-ink"
            onClick={onMenuClick}
            aria-label="開啟選單"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── MobileMenu ───────────────────────────────────────────────────────────────

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.95)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 300ms ease',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="關閉選單"
        className="text-brand-ink"
        style={{
          alignSelf: 'flex-end',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
        }}
      >
        <X size={28} />
      </button>

      {/* Nav links */}
      <nav style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={onClose}
            className="font-heading text-brand-ink"
            style={{
              fontSize: '24px',
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom CTAs */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <a
          href={`tel:${CLINIC.phone_tel}`}
          className="bg-brand-primary text-white rounded-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px',
            fontSize: '15px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <Phone size={18} />
          致電
        </a>
        <a
          href={`https://wa.me/${CLINIC.whatsapp}`}
          className="bg-brand-surface text-brand-ink rounded-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px',
            fontSize: '15px',
            fontWeight: 600,
            textDecoration: 'none',
            border: '1px solid #E7E5E4',
          }}
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const FOOTER_SERVICES = ['普通科', '皮膚問題診治', '大腸癌篩查', '慢性病共治', '流感疫苗'];
const FOOTER_PAYMENT = ['醫療卡列表', '長者醫療券', '收費表', '政府資助'];
const FOOTER_INFO = ['醫生團隊', '預約須知', '私隱政策', '使用條款'];

function FooterColumnTitle({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-brand-primary"
      style={{
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        fontWeight: 500,
        marginBottom: '20px',
      }}
    >
      {children}
    </div>
  );
}

function FooterLinks({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item) => (
        <span key={item} className="text-brand-body" style={{ fontSize: '14px' }}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-paper" style={{ padding: '80px 40px 40px' }}>
      {/* Trust badge row */}
      <div
        className="bg-brand-primary-light"
        style={{
          padding: '20px 24px',
          marginBottom: '48px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CreditCard size={20} className="text-brand-primary" />
          <span className="text-brand-ink" style={{ fontSize: '14px', fontWeight: 600 }}>
            接受醫療卡
          </span>
        </div>
        <div style={{ height: '20px', width: '1px', backgroundColor: '#E7E5E4' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} className="text-brand-accent" />
          <span className="text-brand-ink" style={{ fontSize: '14px', fontWeight: 600 }}>
            長者醫療券
          </span>
        </div>
        <div style={{ height: '20px', width: '1px', backgroundColor: '#E7E5E4' }} />
        <span className="text-brand-body" style={{ fontSize: '13px' }}>
          三項政府資助計劃・歡迎街坊查詢
        </span>
      </div>

      {/* 4-column grid */}
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div
          className="grid gap-12 pb-16 border-b border-brand-border md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
        >
          {/* Col 1 — clinic info */}
          <div>
            <div
              className="font-heading font-bold text-brand-ink"
              style={{ fontSize: '18px', lineHeight: 1.3 }}
            >
              {CLINIC.name_tc}
            </div>
            <div
              className="text-brand-muted"
              style={{ fontSize: '10.5px', letterSpacing: '0.18em', fontWeight: 500, marginTop: '4px' }}
            >
              WAN TSUI MEDICAL CENTRE
            </div>
            <div className="text-brand-body" style={{ fontSize: '14px', marginTop: '16px', lineHeight: 1.75 }}>
              {CLINIC.address_tc}
            </div>
            <div className="text-brand-body" style={{ fontSize: '14px', marginTop: '8px' }}>
              {CLINIC.hours_tc}
            </div>
          </div>

          {/* Col 2 — services */}
          <div>
            <FooterColumnTitle>服務</FooterColumnTitle>
            <FooterLinks items={FOOTER_SERVICES} />
          </div>

          {/* Col 3 — payment */}
          <div>
            <FooterColumnTitle>付款</FooterColumnTitle>
            <FooterLinks items={FOOTER_PAYMENT} />
          </div>

          {/* Col 4 — info */}
          <div>
            <FooterColumnTitle>資訊</FooterColumnTitle>
            <FooterLinks items={FOOTER_INFO} />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span className="text-brand-muted" style={{ fontSize: '12.5px' }}>
            © 2026 環翠綜合醫務中心 Wan Tsui Integrated Medical Centre
          </span>
          <span className="text-brand-muted" style={{ fontSize: '12.5px' }}>
            緊急情況請致電 <strong className="text-brand-accent">999</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── MobileStickyBar ──────────────────────────────────────────────────────────

function MobileStickyBar() {
  return (
    <div
      className="flex md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '64px',
        borderTop: '1px solid #E7E5E4',
      }}
    >
      <a
        href={`tel:${CLINIC.phone_tel}`}
        className="bg-brand-primary text-white"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '15px',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        <Phone size={18} />
        致電
      </a>
      <a
        href={`https://wa.me/${CLINIC.whatsapp}`}
        className="bg-brand-surface text-brand-ink"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '15px',
          fontWeight: 600,
          textDecoration: 'none',
          borderLeft: '1px solid #E7E5E4',
        }}
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}

// ─── ScrollToTop ──────────────────────────────────────────────────────────────

function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

// ─── MainLayout ───────────────────────────────────────────────────────────────

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <TopStrip />
      <Header onMenuClick={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileStickyBar />
      <ScrollToTop />
    </>
  );
}
