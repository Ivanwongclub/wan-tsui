Generate 10 AI images for the Wan Tsui clinic website and save them to `public/images/`. No code changes.

## Images

Using `imagegen--generate_image` with the `standard` quality tier (better fidelity for editorial photography; `premium` reserved for text-heavy assets, none here). All saved as `.jpg` (no transparency needed).

Each prompt will be prefixed with strict style anchors to enforce the look:
- "East Asian / Hong Kong Chinese people only"
- "Hong Kong public housing estate neighbourhood clinic, modest and clean (NOT a luxury private hospital, NOT a western hospital)"
- "Warm natural lighting, editorial photography"
- "No text, no signage, no logos"

| # | File (in `public/images/`) | Dimensions | Notes |
|---|---|---|---|
| 1 | `hero-clinic.jpg` | 1920×1088 | Wide reception interior. (1080 rounded to nearest /32 multiple → 1088) |
| 2 | `service-general-practice.jpg` | 800×608 | Male GP + elderly patient |
| 3 | `service-dermatology.jpg` | 800×608 | Female doctor + dermatoscope |
| 4 | `service-colorectal-screening.jpg` | 800×608 | Lab corner, no people |
| 5 | `service-chronic-disease.jpg` | 800×608 | BP measurement |
| 6 | `service-flu-vaccine.jpg` | 800×608 | Vaccine injection |
| 7 | `service-voucher.jpg` | 800×608 | Elderly couple at reception |
| 8 | `doctor-mak.jpg` | 512×640 | Portrait 4:5, male doctor 40s-50s |
| 9 | `doctor-lam.jpg` | 512×640 | Portrait 4:5, female doctor 30s-40s |
| 10 | `location-chai-wan.jpg` | 1216×800 | HK public housing podium street view |

Note on dimensions: imagegen requires multiples of 32 between 512–1920. The exact spec sizes (1080, 600, 400, 500) are rounded to the nearest valid multiple while preserving aspect ratio. The user can resize/crop downstream if needed.

## Execution

Generate all 10 in parallel batches via `imagegen--generate_image`. After generation, list `public/images/` to confirm all 10 files landed, then report back.

## What I will NOT do

- No edits to routes, components, content files, or `imageHelpers.ts`
- No wiring of the new images into the UI (Claude Code will handle references)
