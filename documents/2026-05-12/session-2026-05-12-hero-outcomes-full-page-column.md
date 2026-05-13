# Session log – 2026-05-12

## Summary
Restructured `#hero-stats-trust` so the “How we grow your practice” block and the marble stats strip share one full-viewport flex column (`data-hero-outcomes-full-page`), instead of the bar sitting as a sibling outside the main content stack.

## Changes
- `src/components/sections/HeroStatsTrustBand.jsx` — nested marble bar inside the same `flex-1 flex-col` stack as the `max-w-7xl` body; added responsive `gap-*` between body and bar; trimmed body bottom padding (spacing now from gap); removed extra `mt-*` on marble bar.

## Notes
- Section remains `h-[100svh]`; marble strip stays full-bleed width; `#hero-stats-trust` CSS selectors unchanged.

## Next steps
- None unless visual QA wants more/less gap between grid and bar at specific breakpoints.
