# Session log – 2026-06-12 (case studies mobile filter panel toggle)

## Summary
Mobile filters now collapse to a **Filter by** button; tapping opens the full filter panel (Discipline / Capability / Outcome) above the button. Desktop unchanged.

## Changes
- **`CaseStudyPortfolioFilters.jsx`** — `mobileOpen` state, toggle button, outside-click close, `useMobileFiltersLayout()`
- **`case-studies-portfolio.css`** — hide dropdown list until `.is-mobile-open`; panel card styling; column-reverse so panel sits above trigger

## Notes
- Active filters highlight the Filter by label via `.has-active-filters`
- Tap outside panel to close on mobile
