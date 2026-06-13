# Session log – 2026-06-12 (case studies mobile filters fix)

## Summary
Fixed non-working “Filter by” controls on mobile: triggers were `display: none` with invisible zero-height native selects — only the label showed with no tap target.

## Changes
- **`case-studies-portfolio.css`** — show dropdown triggers on mobile; 44px tap targets; z-index 50; sr-only native select; extra carousel bottom padding
- **`CaseStudyPortfolioFilters.jsx`** — stopPropagation on filter trigger pointer/click so carousel drag does not steal taps

## Notes
- Mobile now uses same custom dropdown as desktop (Discipline / Capability / Outcome labels visible and tappable)
