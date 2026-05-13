# Session log – 2026-05-13

## Summary

Removed the **“Did you know?”** band from Home: dropped the aside + `hero-bg-ensemble-04` wrapper from `HomeProblemSection`, deleted `HomeProblemStatsReveal.jsx`, and removed `stats` / `statsSectionTitle` / `statsSectionSubtitle` from `homeProblemContent`.

## Changes

- Edited `src/components/sections/HomeProblemSection.jsx` — no stats import or aside; pain list wrapper `pb-*` removed (section `pb-*` unchanged).
- Edited `src/lib/content.js` — trimmed `homeProblemContent` to pains-only for that object.
- Deleted `src/components/sections/HomeProblemStatsReveal.jsx`.
- Edited `FILE_TREE.md` — removed `HomeProblemStatsReveal.jsx` entry.

## Notes

- `ambientAssets.ensemble04` remains in `ambientAssets.js` for reuse elsewhere.
