# Session log – 2026-05-14

## Summary
Made the home hero “Signal” metrics card expandable with Framer Motion (height + opacity, reduced-motion instant). Tightened hero vertical spacing, grid gap, and typography under short viewports so the band fits one screen more reliably; expanding details intentionally adds height.

## Changes
- Added `src/components/home/HeroSignalExpandable.jsx` (Details / Less toggle, animated panel, bullets from content).
- `src/lib/content.js` — `heroContent.signalExpandBullets` (three practice-safe lines).
- `src/components/home/HomePageSections.jsx` — hero section padding, grid `items-center`, margins, short `max-height` Tailwind variants, replaced inline Signal card with `HeroSignalExpandable`.

## Notes
- `data-home-reveal` kept on a wrapper `div` around the card so the existing hero reveal timeline still targets one block.
- One-viewport fit is best-effort via density + `@media(max-height:…)` utilities; opening “Details” will extend the hero.

## Next steps
- Optional: scroll the expanded panel only or cap max-height with internal scroll if long copy is added later.
