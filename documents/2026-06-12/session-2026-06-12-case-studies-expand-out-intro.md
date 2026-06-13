# Session log – 2026-06-12 (case studies expand-out intro on return)

## Summary
Gallery cards now **expand out from center** (DNA-style) on every visit to `/case-studies`, including when navigating back from a detail page. Page route fade disabled so the card intro is visible.

## Changes
- **`useCaseStudiesGalleryIntro.js`** — `replayKey` (React Router `location.key`) triggers full intro on page entry; filter-only shorter replay; `useCaseStudiesGalleryFiltersIntro`
- **`CaseStudyPortfolioGallery.jsx`** — intro drives `expand` multiplier on x, size, opacity, wave; reset carousel on `pageReplayKey`
- **`CaseStudies.jsx`** — filters intro tied to `location.key`
- **`AnimatedRoutes.jsx`** — skip Framer page fade on case studies gallery route

## Notes
- Expand-out: all cards start stacked at center (small/faded) and animate to carousel positions over ~1.25s
- `prefers-reduced-motion`: layout shows immediately
