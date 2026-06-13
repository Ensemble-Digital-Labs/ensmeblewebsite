# Session log – 2026-06-12 (case studies focus animation)

## Summary
Card **width, height, placement, wordmark size, title, and learn-more** now animate continuously with carousel drag/snap via `--csp-focus` (DNA-style), not binary center/side states.

## Changes
- **`CaseStudyPortfolioGallery.jsx`** — `getFocusEase()`, `getCardDimensions()`, per-frame CSS vars + width/height
- **`case-studies-portfolio.css`** — focus-driven typography and panel size; removed abrupt is-center toggles for sizing
