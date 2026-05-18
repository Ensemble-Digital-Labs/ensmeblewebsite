# Session log – 2026-05-14

## Summary
Matched the home hero secondary CTA (“See what we build”) to the primary gradient pill: same `growthPrimaryHero` classes and trailing arrow pattern as “Free practice audit”.

## Changes
- `src/components/home/HomePageSections.jsx` — hero `/portfolio` `Link` now uses `growthPrimaryHero` + `growthHeroCtaArrow` (wrapped label in `<span>` for layout parity with primary).

## Notes
- Other sections still use `growthSecondaryHero` where ghost/outline secondaries are intended.
