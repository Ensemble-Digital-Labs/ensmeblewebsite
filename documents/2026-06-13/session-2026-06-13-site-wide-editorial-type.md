# Session log – 2026-06-13 (site-wide editorial typography)

## Summary
Rolled out Ensemble editorial typography site-wide: Fraunces with optical sizing, hero weight 400, headings 500, emphasis 600, tight tracking. Replaced global extrabold 800 heading lock.

## Changes
- Created `src/styles/ensemble-editorial-type.css` — CSS variables + global rules for h1–h6, `.font-display`, section headings, nav menu, hero
- Updated `src/main.jsx` — import editorial type stylesheet
- Updated `src/index.css` — section-heading-neon weights/tracking; removed h1–h6 800 override; hero uses CSS vars
- Updated `tailwind.config.js` — display stack comment
- Updated `src/lib/growthCtaClasses.js` — nav CTA font-semibold (maps to editorial emphasis)

## Notes
- Body/UI stays Plus Jakarta (`font-ui`, `font-sans`)
- Gradient clip titles keep gradients; weight/spacing now editorial
- DNA Capital clone (non-ensemble) still uses Cormorant in its own CSS
