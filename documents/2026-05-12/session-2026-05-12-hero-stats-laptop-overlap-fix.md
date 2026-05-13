# Session log – 2026-05-12

## Summary
Reduced overlap between `#hero-stats-trust` left feature stack and the marble stat strip on smaller laptops: extra bottom padding above the bar, shorter marble cell vertical padding (tiered `lg`/`xl`/`2xl`), lower `lg` image min-height with `xl` bump, tighter feature body line-clamps on `lg`, left column `lg:overflow-y-auto` + `justify-start`, and feature cards no longer `flex-1`/`h-full` on `lg` so they size naturally and scroll inside the rail.

## Changes
- `src/components/sections/HeroStatsTrustBand.jsx` — layout/spacing, marble bar padding, image `min-h`, feature scroll + card flex behavior.

## Notes
- Existing `#hero-stats-trust .hero-outcomes-scroll` scrollbar hiding in `index.css` still applies when the column scrolls vertically on `lg`.
