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
import { CLINIC_SHARED } from '../content';
import type { ContentBundle, FooterLinkItem } from '../types/content';
import { useContent } from '../hooks/useContent';
import { LocaleToggle } from '../components/LocaleToggle';
import { DS } from '../styles/designSystem';

// ─── TopStrip ────────────────────────────────────────────────────────────────

function TopStrip() {
  const { announcement } = useContent();
  return (
    <div
      className="bg-brand-accent text-white text-center"
      style={{ padding: '9px 16px', fontSize: '12.5px', fontWeight: 500, letterSpacing: '0.08em' }}
    >
      <span className="text-brand-accent-light mr-2">{announcement.badge}</span>
      {announcement.text}
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function navLinks(nav: ContentBundle['nav']) {
  return [
    { to: '/' as const, label: nav.home },
    { to: '/services' as const, label: nav.services },
    { to: '/about' as const, label: nav.about },
    { to: '/contact' as const, label: nav.contact },
  ];
}

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { clinic, nav, a11y } = useContent();

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
        <Link to="/" className="flex items-center min-w-0 flex-1" style={{ textDecoration: 'none', gap: '12px' }}>
          <img
            src="/images/wtimc-logo-icon.png"
            alt={clinic.logo_alt}
            width={50}
            height={40}
            className="h-9 md:h-10 w-auto flex-shrink-0 block"
          />
          <div className="min-w-0">
            <div
              className="font-heading font-bold text-brand-ink"
              style={{ fontSize: '20px', lineHeight: 1, letterSpacing: '0.02em' }}
            >
              {clinic.name}
            </div>
            <div
              className="text-brand-muted text-[7px] tracking-[0.03em] sm:text-[8px] sm:tracking-[0.05em] md:text-[10.5px] md:tracking-[0.18em] font-medium whitespace-nowrap"
              style={{ marginTop: '4px' }}
            >
              {clinic.name_short.toUpperCase()}
            </div>
          </div>
        </Link>

        {/* Desktop: nav + divider + locale toggle + CTA */}
        <div className="hidden md:flex items-center" style={{ gap: '24px' }}>
          <nav className="flex" style={{ gap: '40px' }}>
            {navLinks(nav).map(({ to, label }) => (
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
          <div
            aria-hidden="true"
            style={{
              width: '1px',
              height: '16px',
              background: 'var(--color-brand-border, rgba(0,0,0,0.12))',
            }}
          />
          <LocaleToggle />
          <a
            href={`tel:${CLINIC_SHARED.phone_tel}`}
            className="bg-brand-primary text-white rounded-button inline-flex"
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
            {CLINIC_SHARED.phone_short}
          </a>
        </div>

        {/* Mobile: locale toggle + hamburger */}
        <div className="flex md:hidden items-center" style={{ gap: '10px' }}>
          <LocaleToggle />
          <button
            type="button"
            className="text-brand-ink"
            onClick={onMenuClick}
            aria-label={a11y.menuOpen}
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
  const { nav, a11y, ui } = useContent();

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
        aria-label={a11y.menuClose}
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
        {navLinks(nav).map(({ to, label }) => (
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
          href={`tel:${CLINIC_SHARED.phone_tel}`}
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
          {ui.cta.callNow}
        </a>
        <a
          href={`https://wa.me/${CLINIC_SHARED.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
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

function FooterLinks({ items }: { items: ReadonlyArray<FooterLinkItem> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item) => (
        <Link
          key={`${item.to}#${item.hash ?? ''}-${item.label}`}
          to={item.to}
          hash={item.hash}
          className="text-brand-body hover:text-brand-primary transition-colors"
          style={{ fontSize: '14px', textDecoration: 'none' }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function Footer() {
  const { clinic, ui } = useContent();
  const { columnTitles, footerLinks } = ui.footer;

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
            {ui.trust.insurance}
          </span>
        </div>
        <div className="h-5 w-px bg-brand-border" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={20} className="text-brand-accent" />
          <span className="text-brand-ink" style={{ fontSize: '14px', fontWeight: 600 }}>
            {ui.trust.voucher}
          </span>
        </div>
        <div className="h-5 w-px bg-brand-border" />
        <span className="text-brand-body" style={{ fontSize: '13px' }}>
          {ui.trust.footerText}
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
              alt={clinic.logo_alt}
              width={72}
              height={80}
              style={{ height: '80px', width: 'auto', marginBottom: '16px', display: 'block' }}
            />
            <div
              className="font-heading font-bold text-brand-ink"
              style={{ fontSize: '18px', marginBottom: '4px' }}
            >
              {clinic.name}
            </div>
            <div
              className="text-brand-muted"
              style={{ fontSize: '10.5px', letterSpacing: '0.18em', fontWeight: 500, marginBottom: '20px' }}
            >
              {clinic.name_short.toUpperCase()}
            </div>
            <div className="text-brand-body" style={{ fontSize: '14px', lineHeight: 1.75 }}>
              {clinic.address}
            </div>
            <div className="text-brand-body" style={{ fontSize: '14px', lineHeight: 1.75 }}>
              {clinic.hours}
            </div>
          </div>

          {/* Col 2 — services */}
          <div>
            <FooterColumnTitle>{columnTitles.services}</FooterColumnTitle>
            <FooterLinks items={footerLinks.services} />
          </div>

          {/* Col 3 — payment */}
          <div>
            <FooterColumnTitle>{columnTitles.payment}</FooterColumnTitle>
            <FooterLinks items={footerLinks.payment} />
          </div>

          {/* Col 4 — info */}
          <div>
            <FooterColumnTitle>{columnTitles.info}</FooterColumnTitle>
            <FooterLinks items={footerLinks.info} />
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
            © {new Date().getFullYear()} {clinic.name}
          </span>
          <span className="text-brand-muted" style={{ fontSize: '12.5px' }}>
            {ui.footer.emergency} <strong className="text-brand-accent">{ui.footer.emergencyNumber}</strong>
          </span>
        </div>

        {/* Tune Bright credit */}
        <div style={{ paddingTop: '16px', textAlign: 'center' }}>
          <a
            href="https://www.tunebrighthk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted transition-colors hover:text-brand-body"
            style={{
              fontSize: '11px',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              opacity: 0.55,
            }}
          >
            Designed &amp; Powered by Tune Bright Limited
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── MobileStickyBar ──────────────────────────────────────────────────────────

function MobileStickyBar() {
  const { ui } = useContent();
  return (
    <div
      className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-brand-border"
    >
      <a
        href={`tel:${CLINIC_SHARED.phone_tel}`}
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
        {ui.cta.callNow}
      </a>
      <a
        href={`https://wa.me/${CLINIC_SHARED.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
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
  const { pathname, hash } = useRouterState({
    select: (s) => ({ pathname: s.location.pathname, hash: s.location.hash }),
  });

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

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
