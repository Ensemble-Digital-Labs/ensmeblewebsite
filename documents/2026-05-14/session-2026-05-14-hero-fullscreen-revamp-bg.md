# Session log – 2026-05-14

## Summary
Switched the revamp hero image from a **right-column strip** to a **full-viewport background** behind the entire home hero: `SectionShell` now supports optional `fullBleedBackdrop`, the hero uses layered `#050816` scrims for readability, and `heroContent` uses `homeHeroFullBleedBackgroundSrc` (replacing `homeHeroRightArtSrc`). Stats card is back to a compact glass panel only.

## Changes
- `src/components/home/HomePageSections.jsx`: `fullBleedBackdrop` on `SectionShell`; hero passes absolute `img` + gradients; stats card without embedded image.
- `src/lib/content.js`: renamed / repurposed field to `homeHeroFullBleedBackgroundSrc`.
- `public/revamp-assets/README.md`, `FILE_TREE.md`: copy updated for full-screen hero usage.

## Verification
- `npm run build` succeeded.
