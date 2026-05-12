# Session log – 2026-05-11

## Summary
Removed the small uppercase eyebrow line (“Who we are”) above the main heading in `ParallaxLayerShowcase`.

## Changes
- `src/components/sections/ParallaxLayerShowcase.jsx` — dropped the `<p>` that rendered `eyebrow`; destructuring now uses `headline`, `lead`, `pillars` only.

## Notes
- `parallaxShowcaseContent.eyebrow` remains in `content.js` for possible reuse; safe to delete later if desired.
