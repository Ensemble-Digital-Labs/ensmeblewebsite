# Session log – 2026-06-16 (home mission section fix)

## Summary
Fixed homepage mission (passion) section: missing image, clipped layout, and missing eyebrow label.

## Changes
- `src/lib/homeImagery.js` — passion image fallback to `aboutPageContent.mission.image` (local webp missing)
- `src/components/home/chapters/HomeChapterPassion.jsx` — contained grid, eyebrow, improved typography
- `src/index.css` — `#home-passion` layout styles

## Notes
- Drop `public/ensemble-2026/home/passion/mission-band.webp` to swap in a custom mission photo later.
