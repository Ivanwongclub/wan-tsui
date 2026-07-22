import { useEffect, useState } from 'react';
import { DAY_IDS, DAY_ID_TO_JS_DAY } from '../content';
import { useContent } from '../hooks/useContent';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { DS } from '../styles/designSystem';

const reveal = (isVisible: boolean) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : `translateY(${DS.animation.scroll.translateY})`,
  transition: `opacity ${DS.animation.duration.slow} ${DS.animation.ease.out}, transform ${DS.animation.duration.slow} ${DS.animation.ease.out}`,
});

export function ScheduleTable() {
  const { ref, isVisible } = useScrollReveal();
  const { schedule, ui } = useContent();
  const [todayIndex, setTodayIndex] = useState<number | null>(null);
  useEffect(() => { setTodayIndex(new Date().getDay()); }, []);

  return (
    <section ref={ref} className="py-[120px] px-6 md:px-10 bg-brand-paper" style={reveal(isVisible)}>
      <div className="max-w-[1080px] mx-auto">
        <div className="mb-12">
          <div className="text-[12px] font-semibold text-brand-primary tracking-[0.22em] uppercase mb-4">
            {ui.schedule.eyebrow}
          </div>
          <h2
            className="font-heading font-bold text-brand-ink leading-[1.25]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 36px)' }}
          >
            {ui.schedule.heading}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse bg-brand-surface"
            style={{ minWidth: '600px', fontSize: '15px' }}
          >
            <thead className="bg-brand-primary-light">
              <tr>
                {[ui.schedule.colDate, ui.schedule.colAM, ui.schedule.colPM].map((col) => (
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
              {DAY_IDS.map((id) => {
                const row = schedule[id];
                const isToday = todayIndex !== null && DAY_ID_TO_JS_DAY[id] === todayIndex;
                return (
                  <tr
                    key={id}
                    className={`border-b border-brand-border${isToday ? ' bg-brand-accent-light' : ''}`}
                  >
                    <td className="px-6 py-[18px] text-[15px] font-semibold text-brand-ink">
                      {isToday && (
                        <span className="inline-block text-[10px] font-bold text-white bg-brand-accent px-2 py-0.5 mr-2.5 tracking-[0.1em] align-middle">
                          {ui.schedule.todayBadge}
                        </span>
                      )}
                      {row.day}
                    </td>
                    <td
                      className={`px-6 py-[18px] text-[15px] ${
                        row.is_closed_am ? 'text-brand-muted' : 'text-brand-body'
                      }`}
                    >
                      {row.am}
                    </td>
                    <td
                      className={`px-6 py-[18px] text-[15px] ${
                        row.is_closed_pm ? 'text-brand-muted' : 'text-brand-body'
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
            <strong className="text-brand-primary">{ui.schedule.lunchLabel}</strong>
            {ui.schedule.lunchDetail}
          </span>
          <span>{ui.schedule.adjustNote}</span>
        </div>
      </div>
    </section>
  );
}
