import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, ShieldCheck, ArrowRight, MapPin, Clock } from "lucide-react";
import { CLINIC, DOCTORS, SERVICES, INSURANCE_PARTNERS, SCHEDULE } from "../content/wanTsui";
import { IMAGES, placeholderSvg } from "../lib/imageHelpers";

export const Route = createFileRoute("/")({
  component: Home,
});

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="h-[70vh] md:h-[min(78vh,720px)] relative bg-brand-primary"
      >
        <img
          src={IMAGES.hero}
          alt="環翠醫務中心診所實景"
          className="absolute inset-0 object-cover w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderSvg("診所實景");
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
                { icon: <CreditCard size={14} />, label: "接受醫療卡" },
                { icon: <ShieldCheck size={14} />, label: "長者醫療券" },
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
              家庭醫療
              <br />
              植根柴灣
            </h1>

            {/* Subtitle */}
            <p
              className="mb-10 max-w-[480px]"
              style={{ fontSize: "17px", lineHeight: 1.75, color: "white", opacity: 0.92 }}
            >
              由兩位註冊普通科醫生主理・三項政府資助計劃・接受多種醫療卡及長者醫療券。
            </p>

            {/* CTAs */}
            <div className="flex gap-4 items-center flex-wrap">
              <a
                href={`tel:${CLINIC.phone_tel}`}
                className="bg-brand-primary text-white rounded-full inline-flex items-center gap-2.5 font-semibold"
                style={{ padding: "16px 32px", fontSize: "15px", textDecoration: "none" }}
              >
                致電預約
                <ArrowRight size={16} />
              </a>
              <a
                href={`https://wa.me/${CLINIC.whatsapp}`}
                className="inline-flex items-center text-white font-medium"
                style={{
                  fontSize: "15px",
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderBottom: "1px solid white",
                }}
              >
                WhatsApp 6801 5968
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
          <div className="flex flex-col md:flex-row md:justify-between md:items-center items-start gap-2 md:gap-0 px-5 md:px-10 py-3.5 md:py-5 text-white text-[12px] md:text-[13px] tracking-[0.05em]">
            <span className="inline-flex items-center gap-2.5" style={{ opacity: 0.92 }}>
              <MapPin size={14} />
              柴灣環翠邨環翠商場1樓109號舖
            </span>
            <span className="inline-flex items-center gap-2.5" style={{ opacity: 0.92 }}>
              <Clock size={14} />
              星期一至六 09:00–19:00
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: TrustBar ─────────────────────────────────────────────────────

function TrustBar() {
  return (
    <section className="bg-brand-primary-light py-16 px-6 md:px-10 border-b border-brand-border">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left — insurance cards */}
          <div className="pb-8 border-b border-brand-border md:pb-0 md:border-b-0 md:border-r md:border-brand-border md:pr-10">
            <div className="flex items-center gap-3 mb-5">
              <CreditCard size={28} className="text-brand-primary flex-shrink-0" />
              <div>
                <div className="text-[11px] text-brand-primary tracking-[0.22em] uppercase font-semibold">
                  醫療保險
                </div>
                <h3 className="font-heading text-[24px] font-bold text-brand-ink mt-1 leading-[1.2]">
                  接受醫療卡直付
                </h3>
              </div>
            </div>
            <p className="text-[15px] text-brand-body leading-[1.7] mb-5">
              本診所接受多種私營醫療保險公司之醫療卡直付，免除你即場墊支麻煩。
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
              <span className="text-[12px] text-brand-muted px-1 italic self-center">
                及其他公司・致電查詢
              </span>
            </div>
          </div>

          {/* Right — healthcare voucher */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck size={28} className="text-brand-accent flex-shrink-0" />
              <div>
                <div className="text-[11px] text-brand-accent tracking-[0.22em] uppercase font-semibold">
                  政府資助
                </div>
                <h3 className="font-heading text-[24px] font-bold text-brand-ink mt-1 leading-[1.2]">
                  長者醫療券抵扣
                </h3>
              </div>
            </div>
            <p className="text-[15px] text-brand-body leading-[1.7] mb-5">
              65歲或以上香港居民每年可獲
              <strong className="text-brand-accent">HK$2,000</strong>
              醫療券資助，可用於本診所所有服務。
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[13px] text-brand-primary font-semibold border-b border-brand-primary pb-1"
              style={{ textDecoration: "none" }}
            >
              了解使用方法
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: About Preview ────────────────────────────────────────────────

function AboutPreview() {
  return (
    <section className="py-[120px] px-6 md:px-10 bg-brand-paper">
      <div className="max-w-[900px] mx-auto">
        <div className="text-[12px] font-semibold text-brand-primary tracking-[0.22em] uppercase mb-6">
          關於環翠
        </div>
        <p
          className="font-heading leading-[1.55] text-brand-ink font-medium"
          style={{ fontSize: "clamp(24px, 3vw, 32px)", letterSpacing: "0.01em" }}
        >
          服務柴灣街坊近<span className="text-brand-accent font-bold">二十年</span>。
          <br />
          由兩位註冊普通科醫生主理日常診症及皮膚問題診治，
          <br />
          <span className="text-brand-primary">
            並提供三項政府資助計劃，讓街坊安心就醫。
          </span>
        </p>
      </div>
    </section>
  );
}

// ─── Section 4: Services Grid ────────────────────────────────────────────────

function ServicesGrid() {
  return (
    <section className="pt-10 pb-[120px] px-6 md:px-10 bg-brand-paper">
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end flex-wrap gap-6 mb-16">
          <div>
            <div className="text-[12px] font-semibold text-brand-primary tracking-[0.22em] uppercase mb-4">
              診所服務 / Services
            </div>
            <h2
              className="font-heading font-bold text-brand-ink leading-[1.2]"
              style={{ fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.01em" }}
            >
              我們提供的服務
            </h2>
            <p className="text-[15px] text-brand-body leading-relaxed mt-4 max-w-[520px]">
              兩個專科服務・三項政府資助計劃・接受長者醫療券。
            </p>
          </div>
          <Link
            to="/services"
            className="text-[14px] font-medium text-brand-ink border-b border-brand-ink pb-1"
            style={{ textDecoration: "none" }}
          >
            查看詳情 →
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <Link
              key={service.num}
              to="/services"
              className="group block"
              style={{ textDecoration: "none" }}
            >
              {/* Photo */}
              <div className="aspect-[4/3] mb-6 overflow-hidden relative bg-brand-primary">
                <img
                  src={IMAGES.services[i]}
                  alt={service.title_tc}
                  className="object-cover w-full h-full transition-transform duration-[600ms] ease-in-out group-hover:scale-[1.04]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = placeholderSvg(service.title_tc);
                  }}
                />

                {service.govScheme && (
                  <span
                    className="absolute bg-brand-primary text-white text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ top: "14px", left: "14px", padding: "5px 10px" }}
                  >
                    政府資助
                  </span>
                )}
                {service.voucher && (
                  <span
                    className="absolute bg-brand-accent text-white text-[10px] font-semibold tracking-[0.15em] uppercase"
                    style={{ top: "14px", left: "14px", padding: "5px 10px" }}
                  >
                    長者專享
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
                <span className="text-[11px] text-brand-muted tracking-[0.12em] uppercase">
                  {service.title_en}
                </span>
              </div>
              <h3
                className="font-heading font-semibold text-brand-ink mb-2.5 leading-[1.3]"
                style={{ fontSize: "22px" }}
              >
                {service.title_tc}
              </h3>
              <p
                className="leading-relaxed text-brand-body mb-3.5"
                style={{ fontSize: "14.5px" }}
              >
                {service.desc}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10.5px] text-brand-primary bg-brand-primary-light px-2.5 py-1 font-semibold tracking-[0.08em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Doctors ──────────────────────────────────────────────────────

function Doctors() {
  const doctorImages = [IMAGES.doctor1, IMAGES.doctor2];

  return (
    <section className="py-[120px] px-6 md:px-10 bg-brand-surface border-t border-b border-brand-border">
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-16 max-w-[600px]">
          <div className="text-[12px] font-semibold text-brand-primary tracking-[0.22em] uppercase mb-4">
            醫生團隊
          </div>
          <h2
            className="font-heading font-bold text-brand-ink leading-[1.2] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.01em" }}
          >
            認識我們的醫生
          </h2>
          <p className="text-[16px] text-brand-body leading-relaxed">
            熟悉柴灣社區，與街坊建立長期醫患關係。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {DOCTORS.map((doctor, i) => (
            <div
              key={doctor.name_en}
              className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 items-start"
            >
              {/* Photo */}
              <div className="aspect-[4/5] bg-brand-primary overflow-hidden relative">
                <img
                  src={doctorImages[i]}
                  alt={doctor.name_en}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = placeholderSvg(doctor.name_en);
                  }}
                />
                <div
                  className="absolute bottom-4 left-4 font-heading font-bold italic leading-none select-none"
                  style={{ fontSize: "36px" }}
                >
                  <span style={{ color: "#F4A57A" }}>0{i + 1}</span>
                </div>
              </div>

              {/* Bio */}
              <div className="pt-2">
                <div
                  className="font-heading font-bold text-brand-ink mb-1"
                  style={{ fontSize: "28px" }}
                >
                  {doctor.name_tc}
                </div>
                <div className="text-[12px] text-brand-muted tracking-[0.1em] mb-6">
                  {doctor.name_en}
                </div>

                <div className="flex flex-col gap-4 text-[14px] text-brand-body leading-relaxed">
                  <div className="border-b border-brand-border pb-3.5">
                    <div className="text-[11px] text-brand-primary tracking-[0.15em] uppercase font-semibold mb-1">
                      學歷
                    </div>
                    <div>{doctor.creds}</div>
                  </div>
                  <div className="border-b border-brand-border pb-3.5">
                    <div className="text-[11px] text-brand-primary tracking-[0.15em] uppercase font-semibold mb-1">
                      專業範疇
                    </div>
                    <div>{doctor.specialty}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-brand-primary tracking-[0.15em] uppercase font-semibold mb-1">
                      當值時段
                    </div>
                    <div>{doctor.schedule_tc}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Schedule Table ───────────────────────────────────────────────

const DAY_INDEX_MAP: Record<string, number> = {
  星期一: 1,
  星期二: 2,
  星期三: 3,
  星期四: 4,
  星期五: 5,
  星期六: 6,
  星期日及公眾假期: 0,
};

function ScheduleTable() {
  const todayIndex = new Date().getDay();

  return (
    <section className="py-[120px] px-6 md:px-10 bg-brand-paper">
      <div className="max-w-[1080px] mx-auto">
        <div className="mb-12">
          <div className="text-[12px] font-semibold text-brand-primary tracking-[0.22em] uppercase mb-4">
            本週值班
          </div>
          <h2
            className="font-heading font-bold text-brand-ink leading-[1.25]"
            style={{ fontSize: "clamp(28px, 3.5vw, 36px)" }}
          >
            醫生當值時間表
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse bg-brand-surface"
            style={{ minWidth: "600px", fontSize: "15px" }}
          >
            <thead className="bg-brand-primary-light">
              <tr>
                {["日期", "上午 09:00–13:00", "下午 15:00–19:00"].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-5 text-left text-[11px] font-semibold text-brand-primary tracking-[0.15em] uppercase border-b border-brand-primary"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((row) => {
                const isToday = DAY_INDEX_MAP[row.day] === todayIndex;
                return (
                  <tr
                    key={row.day}
                    className="border-b border-brand-border"
                    style={isToday ? { backgroundColor: "#FBE9DE" } : undefined}
                  >
                    <td
                      className="px-6 py-[18px] text-[15px] font-semibold text-brand-ink"
                    >
                      {isToday && (
                        <span className="inline-block text-[10px] font-bold text-white bg-brand-accent px-2 py-0.5 mr-2.5 tracking-[0.1em] align-middle">
                          今日
                        </span>
                      )}
                      {row.day}
                    </td>
                    <td
                      className={`px-6 py-[18px] text-[15px] ${
                        row.am.includes("休") ? "text-brand-muted" : "text-brand-body"
                      }`}
                    >
                      {row.am}
                    </td>
                    <td
                      className={`px-6 py-[18px] text-[15px] ${
                        row.pm.includes("休") ? "text-brand-muted" : "text-brand-body"
                      }`}
                    >
                      {row.pm}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-[13px] text-brand-body flex gap-6 flex-wrap">
          <span>
            <strong className="text-brand-primary">午膳：</strong>
            每日 13:00–15:00 暫停服務
          </span>
          <span><strong className="text-brand-primary">備註：</strong>如有調動，致電查詢為準</span>
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Location ─────────────────────────────────────────────────────

type ContactRow = {
  label: string;
  value: string;
  href?: string;
  whitespace?: boolean;
};

function Location() {
  const contactRows: ContactRow[] = [
    { label: "地址", value: CLINIC.address_tc },
    {
      label: "交通",
      value: `${CLINIC.mtr}\n${CLINIC.bus}`,
      whitespace: true,
    },
    { label: "電話", value: CLINIC.phone, href: `tel:${CLINIC.phone_tel}` },
    { label: "手機", value: CLINIC.mobile, href: `tel:${CLINIC.mobile_tel}` },
    { label: "電郵", value: CLINIC.email, href: `mailto:${CLINIC.email}` },
  ];

  return (
    <section className="bg-brand-surface border-t border-brand-border">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — contact */}
        <div className="py-[120px] px-6 md:px-10 w-full md:max-w-[600px] md:justify-self-end">
          <div className="text-[12px] font-semibold text-brand-primary tracking-[0.22em] uppercase mb-4">
            到訪我們
          </div>
          <h2
            className="font-heading font-bold text-brand-ink leading-[1.2] mb-8"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.01em" }}
          >
            就在<span className="text-brand-accent">環翠邨</span>
            <br />
            港鐵站旁
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
                    className="text-brand-body leading-relaxed"
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
          <img
            src={IMAGES.location}
            alt="環翠邨位置"
            className="object-cover w-full h-full absolute inset-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderSvg("柴灣・環翠邨");
            }}
          />
          <div className="absolute top-8 right-8">
            <span
              className="bg-brand-accent text-white inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] uppercase"
              style={{ padding: "14px 20px" }}
            >
              <MapPin size={14} />
              港鐵柴灣站 B 出口
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 8: Payment CTA Strip ────────────────────────────────────────────

function PaymentCTA() {
  return (
    <section className="py-20 px-6 md:px-10 bg-brand-primary text-white">
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 flex-wrap">
        <div className="max-w-[700px]">
          <div
            className="text-[12px] tracking-[0.22em] uppercase mb-5 inline-flex items-center gap-2.5 font-medium"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <span style={{ color: "#F4A57A" }}>●</span>
            付款方式
          </div>
          <h2
            className="font-heading font-bold text-white leading-[1.3]"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-0.01em" }}
          >
            接受醫療卡及長者醫療券
            <br />
            <span style={{ opacity: 0.7 }}>免除墊支麻煩</span>
          </h2>
        </div>
        <a
          href="/services"
          className="bg-brand-accent text-white rounded-full inline-flex items-center gap-3 font-semibold whitespace-nowrap"
          style={{ padding: "14px 28px", fontSize: "15px", textDecoration: "none" }}
        >
          查看接受卡別
          <ArrowRight size={16} />
        </a>
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
      <AboutPreview />
      <ServicesGrid />
      <Doctors />
      <ScheduleTable />
      <Location />
      <PaymentCTA />
    </>
  );
}
