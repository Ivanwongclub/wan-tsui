Update clinic timetable and doctor rota

Current state
- The schedule grid lives in `src/content/wanTsui.tc.ts` and `src/content/wanTsui.en.ts` and is rendered by `ScheduleTable.tsx` and `HoursTable` on `/contact`.
- Dr. Lam's roster currently shows Mon–Wed all day + Sat AM.
- Dr. Mak's roster currently shows Thu–Fri all day, but the table already has Thu AM closed and Fri AM/Fri PM open.
- The clinic hours string and the footer schedule note still describe the old Mon–Fri morning-opening pattern.

Proposed changes

1. Update the schedule grid in both locale files
   - Monday–Wednesday: no change (AM + PM: Dr. Lam).
   - Thursday: keep AM closed, PM Dr. Mak (no change).
   - Friday: change AM from "Dr. Mak / 麥振威醫生" to "— Closed / — 休診"; keep PM Dr. Mak.
   - Saturday: keep AM Dr. Lam, PM closed (no change — not mentioned in new rota).
   - Sunday: change AM from "— Closed / — 休診" to "Duty doctor / 當值醫生"; keep PM closed.
   - Set `is_closed_am` accordingly: `true` for Thu–Fri AM and Sun PM, `false` for Sun AM.

2. Update the doctor consulting-hour summaries in both locale files
   - Dr. Lam: keep "星期一・二・三 全日・星期六上午" / "Mon · Tue · Wed (all day) · Sat AM".
   - Dr. Mak: change from "星期四・五 全日" / "Thu · Fri (all day)" to "星期四・五 下午" / "Thu · Fri (PM only)".

3. Update the clinic opening-hours strings in both locale files
   - Chinese: "星期一至三 09:00–13:00, 15:00–19:00・星期四・五 15:00–19:00・星期六・日 09:00–13:00".
   - English: "Mon–Wed 09:00–13:00, 15:00–19:00 · Thu–Fri 15:00–19:00 · Sat–Sun 09:00–13:00".
   - Apply the same logic to `hours_short` in both locales.

4. Update the footer schedule note in both locale files
   - Chinese: "午膳 13:00–15:00・星期四・五上午及星期六下午休診".
   - English: "Lunch break 13:00–15:00 · Closed on Thu–Fri mornings and Sat afternoons".

Open decision
- The Sunday table row is currently labelled "星期日及公眾假期 / Sunday & Public Holidays". If public holidays should stay closed, split that row into "星期日" and "公眾假期" so only Sunday AM shows "當值醫生". If public holidays follow the same Sunday pattern, the existing combined row can remain.

Files affected
- `src/content/wanTsui.tc.ts`
- `src/content/wanTsui.en.ts`
- No JSX/component changes needed; `ScheduleTable.tsx`, `HoursTable`, and `Footer` all read from the content bundles.

Verification
- After the edit, check `/about` and `/contact` for the updated roster, and the footer for the updated hours string.
- Confirm that the Sunday AM row renders as an open session (non-muted text) with the duty-doctor label.
