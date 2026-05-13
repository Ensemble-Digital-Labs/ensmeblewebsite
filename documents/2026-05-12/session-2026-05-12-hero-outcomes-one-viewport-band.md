# Session log – 2026-05-12

## Summary
Made the practice outcomes band (`#hero-stats-trust`) a single **one-screen** viewport (`100svh`): the marble stats/trust strip stays at the bottom of that same section while the header + feature grid live in a scrollable upper pane when vertical space is tight (zoom / short phones).

## Changes
- Edited `src/components/sections/HeroStatsTrustBand.jsx` — fixed wrapper structure (missing close), `h-[100svh]` + `overflow-y-hidden` on the section, inner `overflow-y-auto` for outcomes content, `shrink-0` marble bar, safe-area padding on the strip.

## Notes
- Build: `npm run build` OK.

## Next steps
- If Locomotive height feels off after this lock, trigger `lenis.resize()` / `ScrollTrigger.refresh()` on route focus (already partially handled on Home).
