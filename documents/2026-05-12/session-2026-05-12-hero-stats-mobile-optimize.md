# Session log – 2026-05-12

## Summary
Mobile-first pass on `#hero-stats-trust` (`HeroStatsTrustBand`): tighter vertical rhythm, horizontal scroll snap + overscroll containment, visible feature icons under `sm`, shorter preview image caps on narrow viewports, compact marble grid padding, and slightly smaller stat/trust type on very small widths.

## Changes
- `src/components/sections/HeroStatsTrustBand.jsx` — padding/headline/CTA spacing; feature rail `snap-x snap-mandatory`, `snap-center` cards, `scroll-pl/pr`, `overscroll-x-contain`, `touch-pan-x`, `items-stretch`; card width `calc(100vw - 2.25rem)` for edge breathing room; icon row always visible; image `max-h` stepped by breakpoint; marble cells `py-4 px-2` below `sm`; trust + big stat clamps tuned for ~320px.

## Notes
- `lg:snap-none` / `lg:touch-auto` so desktop column layout is unchanged.
