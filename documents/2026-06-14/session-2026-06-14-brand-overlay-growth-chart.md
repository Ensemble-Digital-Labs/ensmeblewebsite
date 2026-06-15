# Session log – 2026-06-14 (brand overlay growth chart)

## Summary

Added the dark-background growth chart graphic to the two small PopArt overlay cards (top-left and bottom-right) in the homepage Ensemble brand section.

## Changes

- Added `public/ensemble-2026/home/brand/growth-chart-accent.png`
- Updated `src/lib/homeImagery.js` — `HOME_BRAND_OVERLAY_IMAGES` with contain fit config
- Updated `src/components/home/chapters/HomeChapterBrand.jsx` — pass overlay objects through
- Updated `src/components/home/HomePopArtVisualStack.jsx` — `object-contain` + navy fill for graphic overlays

## Notes

- Main collage slot still expects `story-main.webp` (may show broken until that asset exists).
- Same image used on both overlays for preview; can split into two assets later.

## Update (black border fix)

Overlay cards were wide/tall rectangles (`16:10`, `3:4`) with `object-contain` on a **square** PNG — empty letterbox bars showed as black/navy strips. Fixed with square cards + `object-cover` + removed solid navy fill.

## Update (zoom)

Graphic overlay images scaled to **1.52×** (center crop) so the chart reads larger in the small cards.
