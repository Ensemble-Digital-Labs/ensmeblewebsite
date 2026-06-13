# Session log – 2026-06-12 (case studies side card images)

## Summary
Side carousel cards now show **full visible project images** instead of small inverted thumbnails that read as gray boxes.

## Changes
- **`src/styles/case-studies-portfolio.css`** — inactive slides: image fills card panel, no invert filter, lighter panel scrim
- **`src/components/case-studies/CaseStudyPortfolioGallery.jsx`** — higher opacity floor for adjacent cards (~0.48+)

## Notes
- Center card unchanged: large wordmark + title line + learn more.
