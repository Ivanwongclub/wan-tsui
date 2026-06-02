## Root cause

`src/components/ScheduleTable.tsx` calls `new Date().getDay()` during render (line 23). SSR runs in the Cloudflare Worker (UTC), so the server may compute a different weekday than the client's local timezone (HK = UTC+8). The server then renders one row with the "今日" badge + `bg-brand-accent-light`, the client renders a different row, React throws a hydration mismatch, the root error boundary catches it, and SSR returns 500 for `GET /`.

This matches the runtime error exactly — the diff in the hydration log shows the "星期二" row losing its `bg-brand-accent-light` class and 今日 badge on the client.

## Fix

Defer the "today" calculation until after mount so SSR renders no highlight, then the client paints the highlight post-hydration. No visual regression — the row simply transitions in on the client.

In `src/components/ScheduleTable.tsx`:

1. Add `useEffect`, `useState` imports.
2. Replace `const todayIndex = new Date().getDay();` with:
   ```ts
   const [todayIndex, setTodayIndex] = useState<number | null>(null);
   useEffect(() => { setTodayIndex(new Date().getDay()); }, []);
   ```
3. Update the comparison: `const isToday = todayIndex !== null && DAY_INDEX_MAP[row.day] === todayIndex;`

That's the only change needed. Server and initial client render both produce identical HTML (no highlight), hydration succeeds, then the today highlight appears.

## Verification

- Reload `/` — no 500, no hydration error in console.
- Schedule table renders; correct weekday row highlights after hydration.