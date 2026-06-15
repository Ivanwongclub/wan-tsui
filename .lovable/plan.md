## Goal
Replace every Chinese occurrence of `普通科` with `全科` across the live site. English label "General Practice" stays unchanged (per your selection). Reference spec files under `reference/` are not shipped — leave them alone.

## Files & edits

**1. `src/content/wanTsui.ts`** (8 occurrences)
- L30 intro: `兩位資深普通科醫生` → `兩位資深全科醫生`
- L40, L48 doctor specialty: `普通科 / General Practice` → `全科 / General Practice`
- L50 林醫生 bio: `除普通科門診外` → `除全科門診外`
- L57 SERVICES[0] `title_tc`: `普通科門診` → `全科門診`
- L115 FOOTER_NAV.services[0] label: `普通科` → `全科`
- L171 UI_LABELS.doctors.headingAbout: `兩位普通科醫生` → `兩位全科醫生`
- L196 UI_LABELS.home.pullQuote: `由兩位註冊普通科醫生主理…` → `由兩位註冊全科醫生主理…`

**2. `src/routes/__root.tsx`** (5 occurrences, in SEO meta strings)
- L17 META_DESC: `兩位資深普通科醫生駐診，提供普通科、…` → `兩位資深全科醫生駐診，提供全科、…`
- L18 META_DESC_SHORT: `兩位資深普通科醫生駐診` → `兩位資深全科醫生駐診`
- L96–98 description / og:description / twitter:description: `兩位註冊普通科醫生主理。提供普通科門診…` → `兩位註冊全科醫生主理。提供全科門診…`

`title_en: 'General Practice'`, doctor `specialty` English half, and any other English copy remain unchanged.

## Out of scope
- `reference/*.jsx` (design specs, not used at runtime)
- No layout, routing, or component logic changes

## Verification
After edits, `rg "普通科" src/` should return 0 matches; build passes.
