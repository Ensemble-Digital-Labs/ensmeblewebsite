# Session log – 2026-05-12

## Summary
Removed the vertical scrollbar inside `#hero-stats-trust` by dropping `overflow-y-auto` on the upper pane (now `overflow-hidden`) and tightening vertical rhythm: smaller headline/CTA, compact feature cards with `line-clamp`, capped hero image height, shorter marble strip padding.

## Changes
- Edited `src/components/sections/HeroStatsTrustBand.jsx`

## Notes
- Descriptions are clamped (`line-clamp-3`, `lg:line-clamp-2`) so the band fits one `100svh` frame on typical laptops; extreme zoom may clip without a local scrollbar.
- The main document scrollbar can still appear for the rest of the Home page below this section.
