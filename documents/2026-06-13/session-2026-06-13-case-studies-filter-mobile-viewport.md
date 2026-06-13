# Session log – 2026-06-13 (mobile outcome filter menu viewport)

## Summary
Fixed Outcome (and other) filter dropdowns clipping below the mobile viewport on `/case-studies`. Menus now portal to `document.body` with fixed positioning clamped to the visible screen.

## Changes
- **`src/components/case-studies/CaseStudyPortfolioFilters.jsx`** — mobile menu portal + viewport-aware position; mobile panel click handler ignores portaled menu.
- **`src/styles/case-studies-portfolio.css`** — mobile menu opens above trigger by default; `--mobile-fixed` override styles.

## Notes
- Outcome at bottom of filter stack prefers opening above/left; position recalculates on resize/scroll.
