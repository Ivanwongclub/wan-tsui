import { createFileRoute } from "@tanstack/react-router";
import { DOCTOR_IDS } from "../content";
import { useContent } from "../hooks/useContent";
import { PageHero } from "../components/PageHero";
import { ScheduleTable } from "../components/ScheduleTable";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { DS } from "../styles/designSystem";

const reveal = (isVisible: boolean) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : `translateY(${DS.animation.scroll.translateY})`,
  transition: `opacity ${DS.animation.duration.slow} ${DS.animation.ease.out}, transform ${DS.animation.duration.slow} ${DS.animation.ease.out}`,
});

export const Route = createFileRoute("/about")({
  component: About,
});




// ─── Doctor Profiles ─────────────────────────────────────────────────────────

function DoctorProfiles() {
  const { ref, isVisible } = useScrollReveal();
  const { doctors, ui } = useContent();
  return (
    <section ref={ref} id="doctors" className="py-[120px] px-6 md:px-10 bg-brand-surface border-t border-b border-brand-border" style={{ ...reveal(isVisible), scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '64px', maxWidth: '600px' }}>
          <div
            className="text-brand-primary"
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              marginBottom: '16px',
            }}
          >
            {ui.doctors.eyebrow}
          </div>
          <h2
            className="font-heading font-bold text-brand-ink leading-[1.2]"
            style={{
              fontSize: 'clamp(32px, 4vw, 44px)',
              letterSpacing: '-0.01em',
              marginBottom: '16px',
            }}
          >
            {ui.doctors.headingAbout}
          </h2>
          <p className="text-brand-body" style={{ fontSize: '16px', lineHeight: 1.75 }}>
            {ui.doctors.tagline}
          </p>
        </div>

        {/* Doctor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '64px' }}>
          {DOCTOR_IDS.map((id) => {
            const doctor = doctors[id];
            return (
            <div
              key={id}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] items-start"
              style={{ gap: '32px' }}
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
              <div style={{ paddingTop: '8px' }}>
                <div
                  className="font-heading font-bold text-brand-ink"
                  style={{ fontSize: '28px', marginBottom: '24px', letterSpacing: '0.01em' }}
                >
                  {doctor.name}
                </div>

                <div
                  className="flex flex-col text-brand-body"
                  style={{ gap: '16px', fontSize: '14px', lineHeight: 1.7 }}
                >
                  <div className="border-b border-brand-border" style={{ paddingBottom: '14px' }}>
                    <div
                      className="text-brand-primary"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                        fontWeight: 600,
                        marginBottom: '4px',
                      }}
                    >
                      {ui.doctors.fieldCreds}
                    </div>
                    <div>{doctor.creds}</div>
                  </div>
                  <div className="border-b border-brand-border" style={{ paddingBottom: '14px' }}>
                    <div
                      className="text-brand-primary"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                        fontWeight: 600,
                        marginBottom: '4px',
                      }}
                    >
                      {ui.doctors.fieldSpecialty}
                    </div>
                    <div>{doctor.specialty}</div>
                  </div>
                  <div style={{ paddingBottom: '14px' }}>
                    <div
                      className="text-brand-primary"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase' as const,
                        fontWeight: 600,
                        marginBottom: '4px',
                      }}
                    >
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

// ─── Page ─────────────────────────────────────────────────────────────────────

function About() {
  const { pageHeros } = useContent();
  return (
    <>
      <PageHero
        eyebrow={pageHeros.about.eyebrow}
        title={pageHeros.about.title}
        subtitle={pageHeros.about.subtitle}
      />
      <DoctorProfiles />
      <ScheduleTable />
    </>
  );
}
