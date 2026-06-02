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
import { CLINIC, ANNOUNCEMENT, FOOTER_NAV, UI_LABELS } from '../content/wanTsui';
import { DS } from '../styles/designSystem';

// ─── TopStrip ────────────────────────────────────────────────────────────────

function TopStrip() {
  return (
    <div
      className="bg-brand-accent text-white text-center"
      style={{ padding: '9px 16px', fontSize: '12.5px', fontWeight: 500, letterSpacing: '0.08em' }}
    >
      <span className="text-brand-accent-light mr-2">{ANNOUNCEMENT.badge}</span>
      {ANNOUNCEMENT.text}
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
        transition: `all ${DS.animation.duration.base} ${DS.animation.ease.default}`,
        willChange: 'backdrop-filter, opacity',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'white',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${DS.colors.border}` : '1px solid transparent',
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
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/images/wtimc-logo-icon.png"
            alt={`${CLINIC.name_tc} 標誌`}
            width={50}
            height={40}
            style={{ height: '40px', width: 'auto', flexShrink: 0, display: 'block' }}
          />
          <div>
            <div
              className="font-heading font-bold text-brand-ink"
              style={{ fontSize: '20px', lineHeight: 1, letterSpacing: '0.02em' }}
            >
              {CLINIC.name_tc}
            </div>
            <div
              className="text-brand-muted"
              style={{ fontSize: '10.5px', letterSpacing: '0.18em', fontWeight: 500, marginTop: '4px' }}
            >
              {CLINIC.name_en_short.toUpperCase()}
            </div>
          </div>
        </Link>

        {/* Center nav — desktop only */}
        <nav className="hidden md:flex" style={{ gap: '40px' }}>
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              preload="intent"
              className="text-brand-ink"
              style={{ fontSize: '14.5px', fontWeight: 500, textDecoration: 'none', paddingBottom: '4px' }}
              activeProps={{
                style: {
                  fontSize: '14.5px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  paddingBottom: '4px',
                  borderBottom: `1px solid ${DS.colors.accent}`,
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
            className="bg-brand-primary text-white rounded-button hidden md:inline-flex"
            style={{
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              textDecoration: 'none',
            }}
          >
            <Phone size={14} />
            {CLINIC.phone_short}
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
        transition: `transform ${DS.animation.duration.base} ${DS.animation.ease.default}`,
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
          className="bg-brand-surface text-brand-ink rounded-button border border-brand-border"
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
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────


function FooterColumnTitle({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-brand-primary"
      style={{
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        fontWeight: 600,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CreditCard size={20} className="text-brand-primary" />
          <span className="text-brand-ink" style={{ fontSize: '14px', fontWeight: 600 }}>
            {UI_LABELS.trust.insurance}
          </span>
        </div>
        <div className="h-5 w-px bg-brand-border" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={20} className="text-brand-accent" />
          <span className="text-brand-ink" style={{ fontSize: '14px', fontWeight: 600 }}>
            {UI_LABELS.trust.voucher}
          </span>
        </div>
        <div className="h-5 w-px bg-brand-border" />
        <span className="text-brand-body" style={{ fontSize: '13px' }}>
          {UI_LABELS.trust.footerText}
        </span>
      </div>

      {/* 4-column grid */}
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div
          className="grid gap-12 pb-16 border-b border-brand-border md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
        >
          {/* Col 1 — clinic info */}
          <div>
            <img
              src="/images/wtimc-logo.png"
              alt={`${CLINIC.name_tc} 標誌`}
              width={72}
              height={80}
              style={{ height: '80px', width: 'auto', marginBottom: '16px', display: 'block' }}
            />
            <div
              className="font-heading font-bold text-brand-ink"
              style={{ fontSize: '18px', marginBottom: '4px' }}
            >
              {CLINIC.name_tc}
            </div>
            <div
              className="text-brand-muted"
              style={{ fontSize: '10.5px', letterSpacing: '0.18em', fontWeight: 500, marginBottom: '20px' }}
            >
              {CLINIC.name_en_short.toUpperCase()}
            </div>
            <div className="text-brand-body" style={{ fontSize: '14px', lineHeight: 1.75 }}>
              {CLINIC.address_tc}
            </div>
            <div className="text-brand-body" style={{ fontSize: '14px', lineHeight: 1.75 }}>
              {CLINIC.hours_tc}
            </div>
          </div>

          {/* Col 2 — services */}
          <div>
            <FooterColumnTitle>服務</FooterColumnTitle>
            <FooterLinks items={FOOTER_NAV.services} />
          </div>

          {/* Col 3 — payment */}
          <div>
            <FooterColumnTitle>付款</FooterColumnTitle>
            <FooterLinks items={FOOTER_NAV.payment} />
          </div>

          {/* Col 4 — info */}
          <div>
            <FooterColumnTitle>資訊</FooterColumnTitle>
            <FooterLinks items={FOOTER_NAV.info} />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span className="text-brand-muted" style={{ fontSize: '12.5px' }}>
            © {new Date().getFullYear()} {CLINIC.name_tc} {CLINIC.name_en}
          </span>
          <span className="text-brand-muted" style={{ fontSize: '12.5px' }}>
            {UI_LABELS.footer.emergency} <strong className="text-brand-accent">{UI_LABELS.footer.emergencyNumber}</strong>
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
      className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-brand-border"
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
        className="bg-brand-surface text-brand-ink border-l border-brand-border"
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
