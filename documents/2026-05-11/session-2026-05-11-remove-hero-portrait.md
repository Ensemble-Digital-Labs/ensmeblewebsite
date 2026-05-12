# Session log – 2026-05-11 (remove hero portrait)

## Summary
Removed the large hero portrait (Unsplash lab-coat image) while keeping the split hero look: gradients, Runtime headline style, and concentric arcs.

## Changes
- `src/lib/content.js` — `heroPortraitSrc: null`, added `heroLayout: 'split'` so split mode does not depend on a portrait URL.
- `src/components/sections/Hero.jsx` — `splitHero` from `heroLayout === 'split' || Boolean(heroPortraitSrc)`; `showPortraitColumn` gates the right-column image; when split without portrait, `HeroGrowthArcs` render as an absolute decorative layer; messaging column uses `lg:col-span-12` when no portrait.

## Notes
- To restore a portrait later: set `heroPortraitSrc` to a root-relative or absolute image URL (and optionally keep `heroLayout: 'split'`).
- For full-bleed background hero instead: set `heroLayout: 'fullBleed'` (or any value other than `'split'`) with `heroPortraitSrc: null`.
