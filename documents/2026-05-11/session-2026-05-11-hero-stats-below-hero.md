# Session log – 2026-05-11

## Summary
Moved hero **practice outcomes + trust marquee** out of `#page1` into a dedicated section **`HeroStatsTrustBand`** rendered directly under `<Hero />` on Home. Hero messaging column uses full `lg:col-span-12` when no portrait (replacing old split vs col-7 layout).

## Changes
- Added `src/components/sections/HeroStatsTrustBand.jsx` (`#hero-stats-trust`, `data-scroll`, same card UI + marquee).
- `src/components/sections/Hero.jsx` — removed `HeroStatsAndTrust` + `Activity` import; removed stats/trust grid row; messaging `lg:col-span-12` unless portrait split.
- `src/pages/Home.jsx` — `<HeroStatsTrustBand />` after `<Hero />`.
