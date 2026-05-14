import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, CreditCard, ShieldCheck } from "lucide-react";
import { CLINIC, SCHEDULE, UI_LABELS, type ContactRow } from "../content/wanTsui";
import { PageHero } from "../components/PageHero";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { DS } from "../styles/designSystem";

const reveal = (isVisible: boolean) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : `translateY(${DS.animation.scroll.translateY})`,
  transition: `opacity ${DS.animation.duration.slow} ${DS.animation.ease.out}, transform ${DS.animation.duration.slow} ${DS.animation.ease.out}`,
});

export const Route = createFileRoute("/contact")({
  component: Contact,
});

const DAY_INDEX_MAP: Record<string, number> = {
  星期一: 1,
  星期二: 2,
  星期三: 3,
  星期四: 4,
  星期五: 5,
  星期六: 6,
  星期日及公眾假期: 0,
};

// ─── Contact Info ─────────────────────────────────────────────────────────────

function ContactInfo() {
  const { ref, isVisible } = useScrollReveal();
  const rows: ContactRow[] = [
    { label: '地址', value: CLINIC.address_tc },
    { label: '交通', value: `${CLINIC.mtr}\n${CLINIC.bus}`, whitespace: true },
    { label: '電話', value: CLINIC.phone, href: `tel:${CLINIC.phone_tel}` },
    { label: '手機', value: CLINIC.mobile, href: `tel:${CLINIC.mobile_tel}` },
    {
      label: 'WhatsApp',
      value: CLINIC.mobile,
      href: `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('你好，我想預約診症')}`,
    },
    { label: '電郵', value: CLINIC.email, href: `mailto:${CLINIC.email}` },
    {
      label: '營業時間',
      value: `${CLINIC.hours_tc}\n午膳 ${CLINIC.lunch_break} 暫停服務`,
      whitespace: true,
    },
  ];

  return (
    <section ref={ref} className="py-[120px] px-6 md:px-10 bg-brand-paper" style={reveal(isVisible)}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div
          className="text-brand-primary"
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase' as const,
            marginBottom: '32px',
          }}
        >
          {UI_LABELS.contact.infoEyebrow}
        </div>

        <div className="flex flex-col" style={{ gap: '24px', fontSize: '15px' }}>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid${i < rows.length - 1 ? ' border-b border-brand-border' : ''}`}
              style={{
                gridTemplateColumns: '100px 1fr',
                gap: '20px',
                paddingBottom: '20px',
              }}
            >
              <span
                className="text-brand-primary"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  fontWeight: 600,
                  paddingTop: '2px',
                }}
              >
                {row.label}
              </span>
              {row.href ? (
                <a
                  href={row.href}
                  className="text-brand-ink font-medium leading-[1.7]"
                  style={{ textDecoration: 'none' }}
                >
                  {row.value}
                </a>
              ) : (
                <span
                  className="text-brand-body leading-[1.7]"
                  style={row.whitespace ? { whiteSpace: 'pre-line' } : undefined}
                >
                  {row.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap" style={{ gap: '16px', marginTop: '40px' }}>
          <a
            href={`tel:${CLINIC.phone_tel}`}
            className="inline-flex items-center rounded-full bg-brand-primary text-white font-semibold"
            style={{ gap: '10px', padding: '16px 32px', fontSize: '15px', textDecoration: 'none' }}
          >
            <Phone size={16} />
            {UI_LABELS.cta.callNow}
          </a>
          <a
            href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('你好，我想預約診症')}`}
            className="inline-flex items-center rounded-full bg-brand-surface text-brand-ink font-semibold border border-brand-border"
            style={{
              gap: '10px',
              padding: '16px 32px',
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            <MessageCircle size={16} />
            {UI_LABELS.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Hours Table ─────────────────────────────────────────────────────────────

function HoursTable() {
  const { ref, isVisible } = useScrollReveal();
  const todayIndex = new Date().getDay();

  return (
    <section ref={ref} className="py-16 px-6 md:px-10 bg-brand-surface border-t border-brand-border" style={reveal(isVisible)}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
          {UI_LABELS.schedule.hoursEyebrow}
        </div>
        <h2
          className="font-heading font-bold text-brand-ink"
          style={{ fontSize: '24px', marginBottom: '32px' }}
        >
          {UI_LABELS.schedule.hoursHeading}
        </h2>

        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse bg-brand-surface"
            style={{ minWidth: '540px', fontSize: '15px' }}
          >
            <thead>
              <tr className="bg-brand-primary-light">
                {[UI_LABELS.schedule.colDate, UI_LABELS.schedule.colAM, UI_LABELS.schedule.colPM].map((col) => (
                  <th
                    key={col}
                    className="text-left text-[11px] font-semibold text-brand-primary tracking-[0.15em] uppercase border-b border-brand-primary"
                    style={{ padding: '20px 24px' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((row) => {
                const isToday = DAY_INDEX_MAP[row.day] === todayIndex;
                const amIsOff = row.am.includes('休');
                const pmIsOff = row.pm.includes('休');
                return (
                  <tr
                    key={row.day}
                    className={`border-b border-brand-border${isToday ? ' bg-brand-accent-light' : ''}`}
                  >
                    <td
                      className="text-[15px] font-semibold text-brand-ink"
                      style={{ padding: '18px 24px' }}
                    >
                      {isToday && (
                        <span
                          className="inline-block text-white bg-brand-accent font-bold"
                          style={{
                            fontSize: '10px',
                            padding: '2px 8px',
                            marginRight: '10px',
                            letterSpacing: '0.1em',
                            verticalAlign: 'middle',
                          }}
                        >
                          {UI_LABELS.schedule.todayBadge}
                        </span>
                      )}
                      {row.day}
                    </td>
                    <td
                      className={`text-[15px]${amIsOff ? ' text-brand-muted' : ' text-brand-primary font-medium'}`}
                      style={{ padding: '18px 24px' }}
                    >
                      {amIsOff ? row.am : '應診'}
                    </td>
                    <td
                      className={`text-[15px]${pmIsOff ? ' text-brand-muted' : ' text-brand-primary font-medium'}`}
                      style={{ padding: '18px 24px' }}
                    >
                      {pmIsOff ? row.pm : '應診'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-brand-body" style={{ marginTop: '16px', fontSize: '13px' }}>
          {UI_LABELS.schedule.footerNote}
        </p>
      </div>
    </section>
  );
}

// ─── Payment Reminder ─────────────────────────────────────────────────────────

function PaymentReminder() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-16 px-6 md:px-10 bg-brand-primary-light" style={reveal(isVisible)}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div className="flex justify-center items-center flex-wrap" style={{ gap: '32px' }}>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <CreditCard size={20} className="text-brand-primary" />
            <span className="text-brand-ink" style={{ fontSize: '14px', fontWeight: 600 }}>
              {UI_LABELS.trust.insurance}
            </span>
          </div>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <ShieldCheck size={20} className="text-brand-accent" />
            <span className="text-brand-ink" style={{ fontSize: '14px', fontWeight: 600 }}>
              {UI_LABELS.trust.voucher}
            </span>
          </div>
        </div>
        <p className="text-brand-body" style={{ marginTop: '16px', fontSize: '15px' }}>
          {UI_LABELS.contact.paymentDesc}
        </p>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT US"
        title="聯絡我們"
        subtitle="歡迎致電或 WhatsApp 預約"
      />
      <ContactInfo />
      <HoursTable />
      <PaymentReminder />
    </>
  );
}
