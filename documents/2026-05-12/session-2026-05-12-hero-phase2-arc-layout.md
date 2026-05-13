# Session log – 2026-05-12 (hero phase-2 Arc-style layout)

## Summary
Rebuilt **`HeroScrollExpand`** desktop phase-2 (scrub) copy into an **Arc-style split**: **left** three-line typographic lockup (calm line / large bold italic / calm line) from **`heroScrollExpandPhase2Lockup`**, **right** supporting paragraph with **gold L-brackets** (same copy as **`subhead`** via **`heroScrollExpandPhase2Aside`** getter), **CTAs** row **left-aligned on `lg+`**, centered on small screens.

## Changes
- `src/lib/content.js` — `heroScrollExpandPhase2Lockup`, `get heroScrollExpandPhase2Aside()`.
- `src/components/sections/HeroScrollExpand.jsx` — phase-2 markup + classes.

## Next steps
- Tune `heroScrollExpandPhase2Lockup` strings to taste; aside stays synced with `heroSubheadSegments`.
