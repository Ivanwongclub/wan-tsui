# Text update plan

## What to change

1. Update the Sunday AM schedule row in both locale bundles so it shows the regular doctor name instead of "duty doctor".
2. Update the `/about` page hero subtitle in both locale bundles to remove the "Rooted in / 植根" wording.

## Files to edit

- `src/content/wanTsui.tc.ts`
- `src/content/wanTsui.en.ts`

## Exact changes

### `src/content/wanTsui.tc.ts`

- `schedule.sun.am`: `'當值醫生'` → `'麥振威醫生'`
- `pageHeros.about.subtitle`: `'植根柴灣・服務社區'` → `'柴灣・服務社區'`

### `src/content/wanTsui.en.ts`

- `schedule.sun.am`: `'Duty doctor'` → `'Dr. Mak'`
- `pageHeros.about.subtitle`: `'Rooted in Chai Wan · Serving the community'` → `'Chai Wan · Serving the community'`

No other files, components, or routes need changes.
