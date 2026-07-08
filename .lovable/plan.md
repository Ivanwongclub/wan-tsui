## Audit result

All URLs in the site resolve correctly. WhatsApp links already use `https://wa.me/85268015968` (from `CLINIC.whatsapp` in `src/content/wanTsui.ts`). Tel/mailto/internal routes all valid. No broken URLs found.

The only issue: WhatsApp links currently open in the same tab. Only one external link (`tunebrighthk.com` in footer) uses `target="_blank"`.

## Fix — open all WhatsApp links in a new window

Add `target="_blank" rel="noopener noreferrer"` to every `wa.me` anchor:

1. `src/layouts/MainLayout.tsx` — desktop nav CTA (line ~233) and mobile floating CTA (line ~451)
2. `src/routes/index.tsx` — hero CTA (line ~101)
3. `src/routes/services.tsx` — CTA band (line ~204)
4. `src/routes/contact.tsx` — WhatsApp row (rendered at line ~91 via `row.href`) and CTA button (line ~120)

For the contact page row rendering, since only WhatsApp among the rows is external, add a conditional: if `row.href` starts with `https://`, add `target="_blank" rel="noopener noreferrer"`.

No content or URL string changes — the number `85268015968` is already correct.