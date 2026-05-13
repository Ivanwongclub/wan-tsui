import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, CreditCard, ShieldCheck } from "lucide-react";
import { CLINIC, SCHEDULE } from "../content/wanTsui";
import { PageHero } from "../components/PageHero";

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

type ContactRow = {
  label: string;
  value: string;
  href?: string;
  whitespace?: boolean;
};

function ContactInfo() {
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
    <section className="py-[120px] px-6 md:px-10 bg-brand-paper">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#065F46',
            letterSpacing: '0.22em',
            textTransform: 'uppercase' as const,
            marginBottom: '32px',
          }}
        >
          聯絡方式
        </div>

        <div className="flex flex-col" style={{ gap: '24px', fontSize: '15px' }}>
          {rows.map((row, i) => (
            <div
              key={row.label}
              className="grid"
              style={{
                gridTemplateColumns: '100px 1fr',
                gap: '20px',
                paddingBottom: '20px',
                borderBottom: i < rows.length - 1 ? '1px solid #E7E5E4' : 'none',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  color: '#065F46',
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
                  style={{
                    color: '#1C1917',
                    textDecoration: 'none',
                    fontWeight: 500,
                    lineHeight: 1.7,
                  }}
                >
                  {row.value}
                </a>
              ) : (
                <span
                  style={{
                    color: '#57534E',
                    lineHeight: 1.7,
                    whiteSpace: row.whitespace ? 'pre-line' : undefined,
                  }}
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
            立即致電
          </a>
          <a
            href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent('你好，我想預約診症')}`}
            className="inline-flex items-center rounded-full bg-brand-surface text-brand-ink font-semibold"
            style={{
              gap: '10px',
              border: '1px solid #E7E5E4',
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

// ─── Hours Table ─────────────────────────────────────────────────────────────

function HoursTable() {
  const todayIndex = new Date().getDay();

  return (
    <section className="py-16 px-6 md:px-10 bg-brand-surface border-t border-brand-border">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#065F46',
            letterSpacing: '0.22em',
            textTransform: 'uppercase' as const,
            marginBottom: '24px',
          }}
        >
          營業時間
        </div>
        <h2
          className="font-heading font-bold text-brand-ink"
          style={{ fontSize: '24px', marginBottom: '32px' }}
        >
          每週應診時間
        </h2>

        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse bg-brand-surface"
            style={{ minWidth: '540px', fontSize: '15px' }}
          >
            <thead>
              <tr className="bg-brand-primary-light">
                {['日期', '上午 09:00–13:00', '下午 15:00–19:00'].map((col) => (
                  <th
                    key={col}
                    className="text-left text-[11px] font-semibold text-brand-primary tracking-[0.15em] uppercase border-b border-brand-primary"
                    style={{ padding: '20px 24px', textAlign: 'left' }}
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
                    className="border-b border-brand-border"
                    style={isToday ? { backgroundColor: '#FBE9DE' } : undefined}
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
                          今日
                        </span>
                      )}
                      {row.day}
                    </td>
                    <td
                      className="text-[15px]"
                      style={{
                        padding: '18px 24px',
                        color: amIsOff ? '#A8A29E' : '#065F46',
                        fontWeight: amIsOff ? undefined : 500,
                      }}
                    >
                      {amIsOff ? row.am : '應診'}
                    </td>
                    <td
                      className="text-[15px]"
                      style={{
                        padding: '18px 24px',
                        color: pmIsOff ? '#A8A29E' : '#065F46',
                        fontWeight: pmIsOff ? undefined : 500,
                      }}
                    >
                      {pmIsOff ? row.pm : '應診'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: '16px', fontSize: '13px', color: '#57534E' }}>
          午膳 13:00–15:00 暫停服務・星期日及公眾假期休診
        </p>
      </div>
    </section>
  );
}

// ─── Payment Reminder ─────────────────────────────────────────────────────────

function PaymentReminder() {
  return (
    <section className="py-16 px-6 md:px-10 bg-brand-primary-light">
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div className="flex justify-center items-center flex-wrap" style={{ gap: '32px' }}>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <CreditCard size={20} className="text-brand-primary" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1C1917' }}>接受醫療卡</span>
          </div>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <ShieldCheck size={20} className="text-brand-accent" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1C1917' }}>長者醫療券</span>
          </div>
        </div>
        <p style={{ marginTop: '16px', fontSize: '15px', color: '#57534E' }}>
          歡迎致電查詢接受之醫療卡種類及醫療券使用詳情
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
