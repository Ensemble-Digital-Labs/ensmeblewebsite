# Session log – 2026-06-13 (homepage hero copy sync)

## Summary
Homepage hero now uses the same three-line headline as `/experiments`: Marketing, software / and infrastructure for / healthcare practices.

## Changes
- Created `src/lib/ensembleHeroLines.js` — single source of truth
- Updated `src/lib/homeInfluxContent.js` — `HOME_INFLUX_HERO.lines` from shared copy
- Updated `src/lib/dnaCapitalTokens.js` — `ENSEMBLE_DNA_HERO_LINES` re-exports shared lines
- Updated `src/components/home/HomeHeroTitle.jsx` — typography for uniform 3-line lockup (line 1 gradient accent)

## Notes
- Home and experiments stay in sync via `ENSEMBLE_HERO_LINES`
