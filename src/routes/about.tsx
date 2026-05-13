import { createFileRoute } from "@tanstack/react-router";
import { DOCTORS } from "../content/wanTsui";
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
          診所簡介
        </div>
        <h2
          className="font-heading font-bold text-brand-ink leading-[1.2]"
          style={{ fontSize: 'clamp(32px, 4vw, 44px)', marginBottom: '32px' }}
        >
          植根<span className="text-brand-accent">柴灣</span>
        </h2>
        <p className="text-brand-body" style={{ fontSize: '17px', lineHeight: 1.8, marginBottom: '24px' }}>
          環翠綜合醫務中心紮根柴灣近二十年，由兩位資深普通科醫生駐診，為環翠邨及鄰近屋苑的街坊提供全面的基層醫療服務。
        </p>
        <p className="text-brand-body" style={{ fontSize: '17px', lineHeight: 1.8 }}>
          本診所致力以專業、親切的態度服務社區，並積極參與政府各項醫療資助計劃，讓街坊能以可負擔的費用獲得優質醫療照顧。
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
            醫生團隊
          </div>
          <h2
            className="font-heading font-bold text-brand-ink leading-[1.2]"
            style={{
              fontSize: 'clamp(32px, 4vw, 44px)',
              letterSpacing: '-0.01em',
              marginBottom: '16px',
            }}
          >
            兩位普通科醫生
          </h2>
          <p className="text-brand-body" style={{ fontSize: '16px', lineHeight: 1.75 }}>
            熟悉柴灣社區，與街坊建立長期醫患關係。
          </p>
        </div>

        {/* Doctor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '64px' }}>
          {DOCTORS.map((doctor, i) => (
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
                      學歷
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
                      專業範疇
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
                      當值時段
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
        subtitle="植根柴灣・服務社區"
      />
      <ClinicIntro />
      <DoctorProfiles />
      <ScheduleTable />
    </>
  );
}
