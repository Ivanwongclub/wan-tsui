import { SCHEDULE } from '../content/wanTsui';

const DAY_INDEX_MAP: Record<string, number> = {
  星期一: 1,
  星期二: 2,
  星期三: 3,
  星期四: 4,
  星期五: 5,
  星期六: 6,
  星期日及公眾假期: 0,
};

export function ScheduleTable() {
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
            style={{ fontSize: 'clamp(28px, 3.5vw, 36px)' }}
          >
            醫生當值時間表
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse bg-brand-surface"
            style={{ minWidth: '600px', fontSize: '15px' }}
          >
            <thead className="bg-brand-primary-light">
              <tr>
                {['日期', '上午 09:00–13:00', '下午 15:00–19:00'].map((col) => (
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
                    className={`border-b border-brand-border${isToday ? ' bg-brand-accent-light' : ''}`}
                  >
                    <td className="px-6 py-[18px] text-[15px] font-semibold text-brand-ink">
                      {isToday && (
                        <span className="inline-block text-[10px] font-bold text-white bg-brand-accent px-2 py-0.5 mr-2.5 tracking-[0.1em] align-middle">
                          今日
                        </span>
                      )}
                      {row.day}
                    </td>
                    <td
                      className={`px-6 py-[18px] text-[15px] ${
                        row.am.includes('休') ? 'text-brand-muted' : 'text-brand-body'
                      }`}
                    >
                      {row.am}
                    </td>
                    <td
                      className={`px-6 py-[18px] text-[15px] ${
                        row.pm.includes('休') ? 'text-brand-muted' : 'text-brand-body'
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
          <span>
            <strong className="text-brand-primary">備註：</strong>
            如有調動，致電查詢為準
          </span>
        </div>
      </div>
    </section>
  );
}
