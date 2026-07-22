import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, ShieldCheck, ArrowRight, MapPin } from "lucide-react";
import { CLINIC_SHARED, INSURANCE_PARTNERS, SERVICE_IDS, DOCTOR_IDS } from "../content";
import type { ContactRow } from "../types/content";
import { useContent } from "../hooks/useContent";
import { IMAGES, placeholderSvg } from "../lib/imageHelpers";
import { Image } from "../components/Image";
import { ScheduleTable } from "../components/ScheduleTable";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { DS } from "../styles/designSystem";

export const Route = createFileRoute("/")({
  component: Home,
});

const reveal = (isVisible: boolean) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : `translateY(${DS.animation.scroll.translateY})`,
  transition: `opacity ${DS.animation.duration.slow} ${DS.animation.ease.out}, transform ${DS.animation.duration.slow} ${DS.animation.ease.out}`,
});

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function Hero() {
  const { clinic, ui, a11y } = useContent();
  return (
    <section className="relative overflow-hidden">
      <div
        className="h-[70vh] md:h-[min(78vh,720px)] relative bg-brand-primary"
      >
        <Image
          image={IMAGES.hero}
          alt={a11y.heroImageAlt}
          className="absolute inset-0 object-cover w-full h-full"
          priority={true}
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderSvg(a11y.locationImageAlt);
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(28,25,23,0.78) 0%, rgba(28,25,23,0.55) 35%, rgba(28,25,23,0.15) 60%, transparent 90%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 h-full flex items-center">
          <div className="max-w-[640px] text-white">
            {/* Trust badges */}
            <div className="flex gap-2.5 mb-8 flex-wrap">
              {[
                { icon: <CreditCard size={14} />, label: ui.trust.insurance },
                { icon: <ShieldCheck size={14} />, label: ui.trust.voucher },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-white text-[12px] font-semibold tracking-[0.05em]"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {icon}
                  {label}
                </span>
              ))}
            </div>

            {/* H1 */}
            <h1
              className="font-heading font-bold text-white mb-6"
              style={{ fontSize: "clamp(38px, 5.5vw, 64px)", lineHeight: 1.15, letterSpacing: "-0.01em" }}
            >
              {clinic.hero_headline[0]}
              <br />
              {clinic.hero_headline[1]}
            </h1>

            {/* Subtitle */}
            <p
              className="mb-10 max-w-[480px]"
              style={{ fontSize: "17px", lineHeight: 1.75, opacity: 0.92 }}
            >
              {clinic.hero_subtitle}
            </p>

            {/* CTAs */}
            <div className="flex gap-4 items-center flex-wrap">
              <a
                href={`tel:${CLINIC_SHARED.phone_tel}`}
                className="bg-brand-primary text-white rounded-full inline-flex items-center gap-2.5 font-semibold"
                style={{ padding: "16px 32px", fontSize: "15px", textDecoration: "none" }}
              >
                {ui.cta.call}
                <ArrowRight size={16} />
              </a>
              <a
                href={`https://wa.me/${CLINIC_SHARED.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-white font-medium"
                style={{
                  fontSize: "15px",
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderBottom: "1px solid white",
                }}
              >
                WhatsApp {CLINIC_SHARED.mobile}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom info strip */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            background: "rgba(28,25,23,0.3)",
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center items-start gap-2 md:gap-0 px-5 md:px-10 py-3.5 md:py-5 text-white text-[12px] md:text-[13px] tracking-[0.05em]">
            <span className="inline-flex items-center gap-2.5" style={{ opacity: 0.92 }}>
              <MapPin size={14} />
              {clinic.address}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: TrustBar ─────────────────────────────────────────────────────

function TrustBar() {
  const { ref, isVisible } = useScrollReveal();
  const { ui } = useContent();
  return (
    <section
      ref={ref}
      className="bg-brand-primary-light py-16 px-6 md:px-10 border-b border-brand-border"
      style={reveal(isVisible)}
    >
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left — insurance cards */}
          <div className="pb-8 border-b border-brand-border md:pb-0 md:border-b-0 md:border-r md:border-brand-border md:pr-10">
            <div className="flex items-center gap-3 mb-5">
              <CreditCard size={28} className="text-brand-primary flex-shrink-0" />
              <div>
                <div className="text-[11px] text-brand-primary tracking-[0.22em] uppercase font-semibold">
                  {ui.trustBar.insuranceEyebrow}
                </div>
                <h3 className="font-heading text-[24px] font-bold text-brand-ink mt-1 leading-[1.2]">
                  {ui.trustBar.insuranceHeading}
                </h3>
              </div>
            </div>
            <p className="text-[15px] text-brand-body leading-[1.7] mb-5">
              {ui.trustBar.insuranceDesc}
            </p>
            <div className="flex flex-wrap gap-2">
              {INSURANCE_PARTNERS.map((name) => (
                <span
                  key={name}
                  className="text-[12px] text-brand-ink bg-brand-surface border border-brand-border px-3 py-1.5 font-semibold"
                >
                  {name}
                </span>
              ))}
              <span className="text-[12px] text-brand-muted py-1.5 px-1 italic">
                {ui.trustBar.insuranceTrail}
              </span>
            </div>
          </div>

          {/* Right — healthcare voucher */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck size={28} className="text-brand-accent flex-shrink-0" />
              <div>
                <div className="text-[11px] text-brand-accent tracking-[0.22em] uppercase font-semibold">
                  {ui.trustBar.voucherEyebrow}
                </div>
                <h3 className="font-heading text-[24px] font-bold text-brand-ink mt-1 leading-[1.2]">
                  {ui.trustBar.voucherHeading}
                </h3>
              </div>
            </div>
            <p className="text-[15px] text-brand-body leading-[1.7] mb-5">
              {ui.trustBar.voucherDescPre}
              <strong className="text-brand-accent">{CLINIC_SHARED.voucher_amount}</strong>
              {ui.trustBar.voucherDescPost}
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[13px] text-brand-primary font-semibold border-b border-brand-primary pb-1"
              style={{ textDecoration: "none" }}
            >
              {ui.trustBar.voucherCta}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Services Grid ────────────────────────────────────────────────

function ServicesGrid() {
  const { ref, isVisible } = useScrollReveal();
  const { services, ui } = useContent();
  return (
    <section
      ref={ref}
      className="pt-10 pb-[120px] px-6 md:px-10 bg-brand-paper"
      style={reveal(isVisible)}
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end flex-wrap gap-6 mb-16">
          <div>
            <div className="text-[12px] font-semibold text-brand-primary tracking-[0.22em] uppercase mb-4">
              {ui.home.servicesEyebrow}
            </div>
            <h2
              className="font-heading font-bold text-brand-ink leading-[1.2]"
              style={{ fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.01em" }}
            >
              {ui.home.servicesHeading}
            </h2>
            <p className="text-[15px] text-brand-body leading-[1.75] mt-4 max-w-[520px]">
              {ui.home.servicesSubtitle}
            </p>
          </div>
          <Link
            to="/services"
            className="text-[14px] font-medium text-brand-ink border-b border-brand-ink pb-1"
            style={{ textDecoration: "none" }}
          >
            {ui.cta.viewDetails}
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_IDS.map((id, i) => {
            const service = services[id];
            return (
            <Link
              key={id}
              to="/services"
              preload="intent"
              className={`group block${isVisible ? ` animate-fade-in-up animate-stagger-${(i % 5) + 1}` : ' opacity-0'}`}
              style={{ textDecoration: "none" }}
            >
              {/* Photo */}
              <div className="aspect-[4/3] mb-6 overflow-hidden relative bg-brand-primary">
                <Image
                  image={IMAGES.services[i]}
                  alt={service.title}
                  className="object-cover w-full h-full transition-transform duration-[var(--duration-image)] ease-in-out group-hover:scale-[1.04]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = placeholderSvg(service.title);
                  }}
                />

                {service.govScheme && (
                  <span
                    className="absolute bg-brand-primary text-white text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ top: "14px", left: "14px", padding: "5px 10px" }}
                  >
                    {ui.trust.govScheme}
                  </span>
                )}
                {service.voucher && (
                  <span
                    className="absolute bg-brand-accent text-white text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ top: "14px", left: "14px", padding: "5px 10px" }}
                  >
                    {ui.trust.seniorOnly}
                  </span>
                )}

                {/* Number overlay */}
                <div
                  className="absolute font-heading font-bold italic leading-none text-white select-none"
                  style={{ bottom: "14px", right: "14px", fontSize: "36px", mixBlendMode: "overlay", opacity: 0.9 }}
                >
                  {service.num}
                </div>
              </div>

              {/* Text */}
              <div className="flex items-baseline gap-2.5 mb-2">
                <span className="text-[11px] text-brand-accent font-bold tracking-[0.18em]">
                  {service.num}
                </span>
              </div>
              <h3
                className="font-heading font-semibold text-brand-ink mb-2.5 leading-[1.3]"
                style={{ fontSize: "22px", letterSpacing: 0 }}
              >
                {service.title}
              </h3>
              <p
                className="leading-[1.7] text-brand-body mb-3.5"
                style={{ fontSize: "14.5px" }}
              >
                {service.desc}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10.5px] text-brand-primary bg-brand-primary-light px-[9px] py-1 font-semibold tracking-[0.08em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Doctors ──────────────────────────────────────────────────────

function Doctors() {
  const { ref, isVisible } = useScrollReveal();
  const { doctors, ui } = useContent();

  return (
    <section
      ref={ref}
      className="py-[120px] px-6 md:px-10 bg-brand-surface border-t border-b border-brand-border"
      style={reveal(isVisible)}
    >
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-16 max-w-[600px]">
          <div className="text-[12px] font-semibold text-brand-primary tracking-[0.22em] uppercase mb-4">
            {ui.doctors.eyebrow}
          </div>
          <h2
            className="font-heading font-bold text-brand-ink leading-[1.2] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.01em" }}
          >
            {ui.doctors.heading}
          </h2>
          <p className="text-[16px] text-brand-body leading-[1.75]">
            {ui.doctors.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {DOCTOR_IDS.map((id) => {
            const doctor = doctors[id];
            return (
            <div
              key={id}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 items-start"
            >
              {/* Doctor stamp (replaces photo) */}
              <div className="hidden md:flex aspect-[4/5] bg-brand-primary overflow-hidden relative items-center justify-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div
                  className="font-heading font-bold text-white relative z-10"
                  style={{
                    writingMode: 'vertical-rl',
                    whiteSpace: 'nowrap',
                    fontSize: 'clamp(24px, 3.5vw, 42px)',
                    letterSpacing: '0.18em',
                    lineHeight: 1.1,
                  }}
                >
                  {doctor.name}
                </div>
                <div
                  aria-hidden="true"
                  className="absolute z-10"
                  style={{
                    left: '18%',
                    top: '20%',
                    bottom: '20%',
                    width: '1px',
                    background: 'rgba(212, 143, 99, 0.5)',
                  }}
                />
              </div>

              {/* Bio */}
              <div className="pt-2">
                <div
                  className="font-heading font-bold text-brand-ink mb-6"
                  style={{ fontSize: "28px", letterSpacing: "0.01em" }}
                >
                  {doctor.name}
                </div>

                <div className="flex flex-col gap-4 text-[14px] text-brand-body leading-[1.7]">
                  <div className="border-b border-brand-border pb-3.5">
                    <div className="text-[11px] text-brand-primary tracking-[0.15em] uppercase font-semibold mb-1">
                      {ui.doctors.fieldCreds}
                    </div>
                    <div>{doctor.creds}</div>
                  </div>
                  <div className="border-b border-brand-border pb-3.5">
                    <div className="text-[11px] text-brand-primary tracking-[0.15em] uppercase font-semibold mb-1">
                      {ui.doctors.fieldSpecialty}
                    </div>
                    <div>{doctor.specialty}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-brand-primary tracking-[0.15em] uppercase font-semibold mb-1">
                      {ui.doctors.fieldSchedule}
                    </div>
                    <div>{doctor.schedule}</div>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Schedule Table (shared component) ────────────────────────────

// ─── Section 7: Location ─────────────────────────────────────────────────────

function Location() {
  const { ref, isVisible } = useScrollReveal();
  const { clinic, contactRows: rowLabels, ui, a11y } = useContent();

  const contactRows: ContactRow[] = [
    { label: rowLabels.address, value: clinic.address },
    {
      label: rowLabels.transport,
      value: `${clinic.mtr}\n${clinic.bus}`,
      whitespace: true,
    },
    { label: rowLabels.phone, value: CLINIC_SHARED.phone, href: `tel:${CLINIC_SHARED.phone_tel}` },
    { label: rowLabels.mobile, value: CLINIC_SHARED.mobile, href: `tel:${CLINIC_SHARED.mobile_tel}` },
    { label: rowLabels.email, value: CLINIC_SHARED.email, href: `mailto:${CLINIC_SHARED.email}` },
  ];

  return (
    <section
      ref={ref}
      className="bg-brand-surface border-t border-brand-border"
      style={reveal(isVisible)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — contact */}
        <div className="py-[120px] px-6 md:px-10 w-full md:max-w-[600px] md:justify-self-end">
          <div className="text-[12px] font-semibold text-brand-primary tracking-[0.22em] uppercase mb-4">
            {ui.home.locationEyebrow}
          </div>
          <h2
            className="font-heading font-bold text-brand-ink leading-[1.2] mb-8"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.01em" }}
          >
            <span className="text-brand-accent">{ui.home.locationHeading[0]}</span>
            <br />
            {ui.home.locationHeading[1]}
          </h2>

          <div className="flex flex-col gap-6 text-[15px]">
            {contactRows.map((row, i) => (
              <div
                key={row.label}
                className={`grid gap-5 ${
                  i < contactRows.length - 1
                    ? "pb-5 border-b border-brand-border"
                    : ""
                }`}
                style={{ gridTemplateColumns: "100px 1fr" }}
              >
                <span className="text-[11px] text-brand-primary tracking-[0.15em] uppercase font-semibold pt-0.5">
                  {row.label}
                </span>
                {row.href ? (
                  <a
                    href={row.href}
                    className="text-brand-ink font-medium"
                    style={{ textDecoration: "none" }}
                  >
                    {row.value}
                  </a>
                ) : (
                  <span
                    className="text-brand-body leading-[1.7]"
                    style={row.whitespace ? { whiteSpace: "pre-line" } : undefined}
                  >
                    {row.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo */}
        <div className="min-h-[320px] md:min-h-[600px] bg-brand-primary overflow-hidden relative">
          <Image
            image={IMAGES.location}
            alt={a11y.locationImageAlt}
            className="object-cover w-full h-full absolute inset-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderSvg(a11y.locationImageAlt);
            }}
          />
          <div className="absolute top-8 right-8">
            <span
              className="bg-brand-accent text-white inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] uppercase"
              style={{ padding: "14px 20px" }}
            >
              <MapPin size={14} />
              {clinic.mtr_exit}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 8: Payment CTA Strip ────────────────────────────────────────────

function PaymentCTA() {
  const { ref, isVisible } = useScrollReveal();
  const { ui } = useContent();
  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-10 bg-brand-primary text-white"
      style={reveal(isVisible)}
    >
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 flex-wrap">
        <div className="max-w-[700px]">
          <div
            className="text-[12px] tracking-[0.22em] uppercase mb-5 inline-flex items-center gap-2.5 font-medium text-white/70"
          >
            <span className="text-brand-terra-light">●</span>
            {ui.home.paymentEyebrow}
          </div>
          <h2
            className="font-heading font-bold text-white leading-[1.3]"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.01em" }}
          >
            {ui.home.paymentHeading[0]}
            <br />
            <span style={{ opacity: 0.7 }}>{ui.home.paymentHeading[1]}</span>
          </h2>
        </div>
        <Link
          to="/services"
          className="bg-brand-accent text-white rounded-full inline-flex items-center gap-3 font-semibold whitespace-nowrap"
          style={{ padding: "14px 28px", fontSize: "15px", textDecoration: "none" }}
        >
          {ui.cta.viewCards}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <Doctors />
      <ScheduleTable />
      <Location />
      <PaymentCTA />
    </>
  );
}
