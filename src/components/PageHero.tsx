interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-brand-primary text-white py-16 md:py-20 px-6 md:px-10">
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase' as const,
            opacity: 0.7,
            marginBottom: '16px',
          }}
        >
          {eyebrow}
        </div>
        <h1
          className="font-heading font-bold text-white leading-[1.2]"
          style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.75,
            opacity: 0.8,
            marginTop: '16px',
            maxWidth: '600px',
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
