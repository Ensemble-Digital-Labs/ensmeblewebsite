# Session log – 2026-06-12 (case studies carousel cutoff fix)

## Summary
Fixed gallery cards and top labels getting cut off at viewport edges.

## Changes
- **`CaseStudyPortfolioGallery.jsx`** — responsive spacing from viewport width; hide slides beyond ~2 neighbors (fewer on mobile)
- **`case-studies-portfolio.css`** — removed carousel clip-path; gallery padding for titles/filters; side titles wrap instead of ellipsis clip
