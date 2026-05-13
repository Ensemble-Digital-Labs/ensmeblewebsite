# Session log – 2026-05-12 (fullscreen nav — laptop work showcase)

## Summary
Added an HLK-style **right-hand vertical scrolling “Selected work” rail** on the fullscreen menu for **`lg` and up** only. Below `lg`, layout and content match the previous mobile/tablet experience (no showcase column). Portfolio rows use `caseStudies` from `src/lib/content.js` with links to `/case-studies/:slug`, title + category/client line + image. GSAP stagger extended to `.fs-nav-showcase-card` on menu open.

## Changes
- Edited `src/components/FullscreenNav.jsx`: import `caseStudies`; wrapper `min-h-0` + `lg:items-stretch`; left cluster (primary nav + Studio); right `<aside>` hidden until `lg`, scrollable list with cards.

## Notes
- Right column width: `min(44vw,480px)` / `xl: min(42vw,520px)`; inner `overflow-y-auto` + `overscroll-y-contain` + stable scrollbar gutter.
- Decorative `alt=""` on showcase thumbs (titles are visible).

## Next steps
- Optional: tune column split or cap visible studies if the list grows very long.
