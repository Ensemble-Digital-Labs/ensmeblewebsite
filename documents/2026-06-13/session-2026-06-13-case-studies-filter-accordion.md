# Session log – 2026-06-13 (case studies filter accordion)

## Summary
Fixed overlapping filter dropdowns on `/case-studies` — opening a second filter now closes the first (accordion behavior), especially on mobile.

## Changes
- **`src/components/case-studies/CaseStudyPortfolioFilters.jsx`** — parent `openGroupId` state; single open dropdown at a time; close on outside tap.
- **`src/styles/case-studies-portfolio.css`** — z-index for open filter row/menu stacking.

## Notes
- Root cause: per-dropdown `open` state + `stopPropagation` on triggers blocked other dropdowns from closing.
