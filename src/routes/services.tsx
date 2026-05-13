import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle } from "lucide-react";
import { CLINIC, SERVICES } from "../content/wanTsui";
import { IMAGES, placeholderSvg } from "../lib/imageHelpers";
import { PageHero } from "../components/PageHero";

export const Route = createFileRoute("/services")({
  component: Services,
});

// ─── Alternating Service Sections ────────────────────────────────────────────

function ServiceSection({
  service,
  index,
  image,
}: {
  service: typeof SERVICES[number];
  index: number;
  image: string;
}) {
  const isOdd = index % 2 === 0; // 0-indexed: 0,2,4 → image LEFT; 1,3,5 → image RIGHT
  const isLast = index === SERVICES.length - 1;

  const ImageSide = (
    <div
      className="relative overflow-hidden bg-brand-primary"
      style={{ aspectRatio: '4 / 3' }}
    >
      <img
        src={image}
        alt={service.title_tc}
        className="w-full h-full object-cover block"
        onError={(e) => {
          (e.target as HTMLImageElement).src = placeholderSvg(service.title_tc);
        }}
      />
      {service.govScheme && (
        <span
          className="absolute text-white"
          style={{
            top: '14px',
            left: '14px',
            padding: '5px 10px',
            backgroundColor: '#065F46',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          政府資助
        </span>
      )}
      {service.voucher && (
        <span
          className="absolute text-white"
          style={{
            top: '14px',
            left: '14px',
            padding: '5px 10px',
            backgroundColor: '#9F3A1A',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          長者專享
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
          style={{
            fontSize: '11px',
            color: '#9F3A1A',
            fontWeight: 700,
            letterSpacing: '0.18em',
          }}
        >
          {service.num}
        </span>
        <span
          style={{
            fontSize: '11px',
            color: '#A8A29E',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {service.title_en}
        </span>
      </div>
      <h2
        className="font-heading font-bold text-brand-ink"
        style={{ fontSize: '28px', lineHeight: 1.3, marginBottom: '16px' }}
      >
        {service.title_tc}
      </h2>
      <p style={{ fontSize: '15px', color: '#57534E', lineHeight: 1.7, marginBottom: '16px' }}>
        {service.desc}
      </p>
      <p style={{ fontSize: '14px', color: '#57534E', lineHeight: 1.7, marginBottom: '24px' }}>
        {service.detail}
      </p>
      <div className="flex flex-wrap" style={{ gap: '8px' }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: '11px',
              color: '#065F46',
              backgroundColor: '#ECFDF5',
              padding: '6px 12px',
              letterSpacing: '0.08em',
              fontWeight: 600,
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
      className="py-16 md:py-20 px-6 md:px-10"
      style={{ borderBottom: isLast ? 'none' : '1px solid #E7E5E4' }}
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
  return (
    <section className="bg-brand-primary text-white text-center py-16 px-6 md:px-10">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2
          className="font-heading font-bold text-white"
          style={{ fontSize: '24px', marginBottom: '16px' }}
        >
          歡迎致電預約・無須轉介
        </h2>
        <p style={{ fontSize: '15px', opacity: 0.8, marginBottom: '32px' }}>
          建議於就診前致電預約，以節省輪候時間。
        </p>
        <div className="flex justify-center flex-wrap" style={{ gap: '16px' }}>
          <a
            href={`tel:${CLINIC.phone_tel}`}
            className="inline-flex items-center rounded-full bg-white text-brand-primary font-semibold"
            style={{ gap: '10px', padding: '16px 32px', fontSize: '15px', textDecoration: 'none' }}
          >
            <Phone size={16} />
            {CLINIC.phone}
          </a>
          <a
            href={`https://wa.me/${CLINIC.whatsapp}`}
            className="inline-flex items-center rounded-full text-white font-semibold"
            style={{
              gap: '10px',
              border: '1px solid #FFFFFF',
              padding: '16px 32px',
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            <MessageCircle size={16} />
            WhatsApp 預約
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function Services() {
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title="診所服務"
        subtitle="六項專業醫療服務・三項政府資助計劃"
      />
      {SERVICES.map((service, i) => (
        <ServiceSection
          key={service.num}
          service={service}
          index={i}
          image={IMAGES.services[i]}
        />
      ))}
      <CTABand />
    </>
  );
}
