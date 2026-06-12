# Session log – 2026-06-12 (hero masthead images)

## Summary
Wired user hero photos into masthead tiles; removed old tilted-card placeholders and ambient fallbacks.

## Changes
- Copied root `ChatGPT Image …` PNGs → `public/ensemble-2026/home/hero/masthead-01.png` … `masthead-04.png`
- Replaced remaining old masthead-03/04 (tilted mockups) with latest flat photos
- Removed duplicate ChatGPT PNGs from repo root
- `src/lib/ensemble2026Assets.js` — masthead paths use `.png`
- `src/lib/homeImagery.js` — `HOME_HERO_MASTHEAD` from ensemble-2026 + cache-bust query
- `HomeChapterExpertise.jsx` — stop reusing hero masthead overlay (was pulling old abstract tile)

## Notes
- Drop unique `masthead-03.png` / `masthead-04.png` into `public/ensemble-2026/home/hero/` to replace interim duplicates of 01/02.
- Bump `HERO_MASTHEAD_VERSION` in `homeImagery.js` after swapping files if the browser caches old tiles.
