# Session log – 2026-05-11

## Summary
Removed faint full-width **section divider lines** on dark Home bands (and marketing doc body) by dropping `border-t` / `border-b` utilities that sat on section wrappers or wide headers.

## Changes
- `src/components/sections/HeroStatsTrustBand.jsx` — removed top border on the practice outcomes / trust strip.
- `src/components/sections/HomeProblemSection.jsx` — removed top border above the stats row.
- `src/components/sections/Carousel3D.jsx` — removed bottom border under the carousel intro header block.
- `src/components/site/MarketingDocLayout.jsx` — removed top border above article body (same subtle line treatment).

## Notes
- Card `border` and fullscreen nav menu row borders are unchanged (component chrome, not full-bleed section cutoffs).
