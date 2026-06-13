# Session log – 2026-06-13 (filter menu laptop same as mobile)

## Summary
Extended bottom-aligned, left-opening filter dropdown positioning to laptop/desktop — same portal + fixed anchor behavior as mobile.

## Changes
- **`src/components/case-studies/CaseStudyPortfolioFilters.jsx`** — portal menu on all breakpoints when open; renamed hook to `useFilterMenuPortalLayout`.
- **`src/styles/case-studies-portfolio.css`** — restored base menu styles; `--portal-fixed` class; removed desktop-only upward menu override.
