import { createFileRoute } from "@tanstack/react-router";
import { CLINIC, DOCTORS, UI_LABELS, type Doctor } from "../content/wanTsui";
import { IMAGES, placeholderSvg } from "../lib/imageHelpers";
import { PageHero } from "../components/PageHero";
import { ScheduleTable } from "../components/ScheduleTable";

export const Route = createFileRoute("/about")({
  component: About,
});

const doctorImages = [IMAGES.doctor1, IMAGES.doctor2] as const;

// ─── Clinic Intro ─────────────────────────────────────────────────────────────

function ClinicIntro() {
  return (
    <section className="py-[120px] px-6 md:px-10 bg-brand-paper">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div
          className="text-brand-primary"
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase' as const,
            marginBottom: '24px',
          }}
        >
          {UI_LABELS.about.introEyebrow}
        </div>
        <h2
          className="font-heading font-bold text-brand-ink leading-[1.2]"
          style={{ fontSize: 'clamp(32px, 4vw, 44px)', marginBottom: '32px' }}
        >
          <span className="text-brand-accent">{CLINIC.tagline_tc}</span>
        </h2>
        <p className="text-brand-body" style={{ fontSize: '17px', lineHeight: 1.8, marginBottom: '24px' }}>
          {CLINIC.intro[0]}
        </p>
        <p className="text-brand-body" style={{ fontSize: '17px', lineHeight: 1.8 }}>
          {CLINIC.intro[1]}
        </p>
      </div>
    </section>
  );
}

// ─── Doctor Profiles ─────────────────────────────────────────────────────────

function DoctorProfiles() {
  return (
    <section className="py-[120px] px-6 md:px-10 bg-brand-surface border-t border-b border-brand-border">
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
              {/* Photo */}
              <div
                className="overflow-hidden bg-brand-primary relative"
                style={{ aspectRatio: '4 / 5' }}
              >
                <img
                  src={doctorImages[i].src}
                  width={doctorImages[i].width}
                  height={doctorImages[i].height}
                  alt={doctor.name_en}
                  className="w-full h-full object-cover block"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = placeholderSvg(doctor.name_en);
                  }}
                />
                <div
                  className="absolute font-heading font-bold italic leading-none select-none"
                  style={{ bottom: '16px', left: '16px', fontSize: '36px' }}
                >
                  <span className="text-brand-terra-light">0{i + 1}</span>
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
      <ClinicIntro />
      <DoctorProfiles />
      <ScheduleTable />
    </>
  );
}
