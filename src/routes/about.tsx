import { createFileRoute } from "@tanstack/react-router";
import { CLINIC, DOCTORS, UI_LABELS, type Doctor } from "../content/wanTsui";
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
  return (
    <section ref={ref} className="py-[120px] px-6 md:px-10 bg-brand-surface border-t border-b border-brand-border" style={reveal(isVisible)}>
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
            {UI_LABELS.doctors.eyebrow}
          </div>
          <h2
            className="font-heading font-bold text-brand-ink leading-[1.2]"
            style={{
              fontSize: 'clamp(32px, 4vw, 44px)',
              letterSpacing: '-0.01em',
              marginBottom: '16px',
            }}
          >
            {UI_LABELS.doctors.headingAbout}
          </h2>
          <p className="text-brand-body" style={{ fontSize: '16px', lineHeight: 1.75 }}>
            {UI_LABELS.doctors.tagline}
          </p>
        </div>

        {/* Doctor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '64px' }}>
          {(DOCTORS as Doctor[]).map((doctor, i) => (
            <div
              key={doctor.name_en}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] items-start"
              style={{ gap: '32px' }}
            >
              {/* Doctor stamp (replaces photo) */}
              <div className="aspect-[4/5] bg-brand-primary overflow-hidden relative flex flex-col items-center justify-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div
                  className="font-heading font-bold italic text-brand-terra-light leading-none relative z-10"
                  style={{ fontSize: 'clamp(120px, 16vw, 180px)' }}
                >
                  0{i + 1}
                </div>
                <div
                  className="relative z-10"
                  style={{
                    width: '48px',
                    height: '1px',
                    background: 'rgba(212, 143, 99, 0.5)',
                    marginTop: '20px',
                  }}
                />
                <div
                  className="relative z-10 text-white font-semibold"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.22em',
                    opacity: 0.6,
                    marginTop: '16px',
                  }}
                >
                  MEDICAL DOCTOR
                </div>
              </div>

              {/* Bio */}
              <div style={{ paddingTop: '8px' }}>
                <div
                  className="font-heading font-bold text-brand-ink"
                  style={{ fontSize: '28px', marginBottom: '4px', letterSpacing: '0.01em' }}
                >
                  {doctor.name_tc}
                </div>
                <div
                  className="text-brand-muted"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    marginBottom: '24px',
                  }}
                >
                  {doctor.name_en}
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
                      {UI_LABELS.doctors.fieldCreds}
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
                      {UI_LABELS.doctors.fieldSpecialty}
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
                      {UI_LABELS.doctors.fieldSchedule}
                    </div>
                    <div>{doctor.schedule_tc}</div>
                  </div>
                </div>

                {/* Bio paragraph — About page only */}
                <p
                  className="text-brand-body"
                  style={{
                    marginTop: '24px',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                  }}
                >
                  {doctor.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function About() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="關於我們"
        subtitle={`${CLINIC.tagline_tc}・服務社區`}
      />
      <DoctorProfiles />
      <ScheduleTable />
    </>
  );
}
