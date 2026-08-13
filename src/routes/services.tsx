import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle } from "lucide-react";
import { CLINIC_SHARED, SERVICE_IDS, type ServiceId } from "../content";
import type { Service } from "../types/content";
import { useContent } from "../hooks/useContent";
import { IMAGES, ImageMeta, placeholderSvg } from "../lib/imageHelpers";
import { Image } from "../components/Image";
import { PageHero } from "../components/PageHero";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { DS } from "../styles/designSystem";

const reveal = (isVisible: boolean) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : `translateY(${DS.animation.scroll.translateY})`,
  transition: `opacity ${DS.animation.duration.slow} ${DS.animation.ease.out}, transform ${DS.animation.duration.slow} ${DS.animation.ease.out}`,
});

const SERVICE_IMAGE_KEYS = [
  "service-general-practice",
  "service-colorectal-screening",
  "service-chronic-disease",
  "service-flu-vaccine",
  "service-voucher",
] as const;

export const Route = createFileRoute("/services")({
  component: Services,
});

// ─── Alternating Service Sections ────────────────────────────────────────────

function ServiceSection({
  service,
  index,
  image,
  slotKey,
}: {
  service: Service;
  index: number;
  image: ImageMeta;
  slotKey?: string;
}) {
  const { ref, isVisible } = useScrollReveal();
  const { ui } = useContent();
  const isOdd = index % 2 === 0; // 0-indexed: 0,2,4 → image LEFT; 1,3,5 → image RIGHT
  const isLast = index === SERVICE_IDS.length - 1;

  const ImageSide = (
    <div
      className="relative overflow-hidden bg-brand-primary"
      style={{ aspectRatio: '4 / 3' }}
    >
      <Image
        image={image}
        slotKey={slotKey}
        alt={service.title}
        className="w-full h-full object-cover block"
        onError={(e) => {
          (e.target as HTMLImageElement).src = placeholderSvg(service.title);
        }}
      />
      {service.govScheme && (
        <span
          className="absolute bg-brand-primary text-white"
          style={{
            top: '14px',
            left: '14px',
            padding: '5px 10px',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {ui.trust.govScheme}
        </span>
      )}
      {service.voucher && (
        <span
          className="absolute bg-brand-accent text-white"
          style={{
            top: '14px',
            left: '14px',
            padding: '5px 10px',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {ui.trust.seniorOnly}
        </span>
      )}
      <div
        className="absolute font-heading font-bold italic leading-none text-white select-none"
        style={{
          bottom: '16px',
          right: '16px',
          fontSize: '48px',
          mixBlendMode: 'overlay',
          opacity: 0.9,
        }}
      >
        {service.num}
      </div>
    </div>
  );

  const TextSide = (
    <div>
      <div className="flex items-baseline" style={{ gap: '10px', marginBottom: '12px' }}>
        <span
          className="text-brand-accent"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.18em',
          }}
        >
          {service.num}
        </span>
      </div>
      <h2
        className="font-heading font-bold text-brand-ink"
        style={{ fontSize: '28px', lineHeight: 1.3, marginBottom: '16px' }}
      >
        {service.title}
      </h2>
      <p className="text-brand-body" style={{ fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>
        {service.desc}
      </p>
      <p className="text-brand-body" style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
        {service.detail}
      </p>
      <div className="flex flex-wrap" style={{ gap: '8px' }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-brand-primary bg-brand-primary-light font-semibold"
            style={{
              fontSize: '11px',
              padding: '6px 12px',
              letterSpacing: '0.08em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section
      ref={ref}
      id={`service-${service.num}`}
      className={`py-16 md:py-20 px-6 md:px-10${isLast ? '' : ' border-b border-brand-border'}`}
      style={{ ...reveal(isVisible), scrollMarginTop: '80px' }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 items-center"
          style={{ gap: '64px' }}
        >
          {isOdd ? (
            <>
              {ImageSide}
              {TextSide}
            </>
          ) : (
            <>
              <div className="md:order-2">{ImageSide}</div>
              <div className="md:order-1">{TextSide}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Band ─────────────────────────────────────────────────────────────────

function CTABand() {
  const { ref, isVisible } = useScrollReveal();
  const { ui } = useContent();
  return (
    <section ref={ref} className="bg-brand-primary text-white text-center py-16 px-6 md:px-10" style={reveal(isVisible)}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2
          className="font-heading font-bold text-white"
          style={{ fontSize: '24px', marginBottom: '16px' }}
        >
          {ui.services.ctaHeading}
        </h2>
        <p style={{ fontSize: '15px', opacity: 0.8, marginBottom: '32px' }}>
          {ui.services.ctaBody}
        </p>
        <div className="flex justify-center flex-wrap" style={{ gap: '16px' }}>
          <a
            href={`tel:${CLINIC_SHARED.phone_tel}`}
            className="inline-flex items-center rounded-full bg-white text-brand-primary font-semibold"
            style={{ gap: '10px', padding: '16px 32px', fontSize: '15px', textDecoration: 'none' }}
          >
            <Phone size={16} />
            {CLINIC_SHARED.phone}
          </a>
          <a
            href={`https://wa.me/${CLINIC_SHARED.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full text-white font-semibold border border-white"
            style={{
              gap: '10px',
              padding: '16px 32px',
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            <MessageCircle size={16} />
            {ui.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function Services() {
  const { pageHeros, services } = useContent();
  return (
    <>
      <PageHero
        eyebrow={pageHeros.services.eyebrow}
        title={pageHeros.services.title}
        subtitle={pageHeros.services.subtitle}
      />
      {SERVICE_IDS.map((id: ServiceId, i) => (
        <ServiceSection
          key={id}
          service={services[id]}
          index={i}
          image={IMAGES.services[i]}
          slotKey={SERVICE_IMAGE_KEYS[i]}
        />
      ))}
      <CTABand />
    </>
  );
}
