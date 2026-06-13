# Session log – 2026-06-12 (case studies DNA carousel + no footer)

## Summary
Rebuilt `/case-studies` to match DNA Capital `/companies` more closely: transform-based drag carousel (not scroll track), dropdown filters top-right, DNA card structure (title line, pink arrow, active wordmark), full-viewport stage with no footer.

## Changes
- **`src/components/case-studies/CaseStudyPortfolioGallery.jsx`** — absolute slides + `translate3d` carousel, drag/wheel/keyboard snap.
- **`src/components/case-studies/CaseStudyGalleryCard.jsx`** — DNA `portfolio-item` DOM (background panel, logo/wordmark, learn more + SVG arrow).
- **`src/components/case-studies/CaseStudyPortfolioFilters.jsx`** — `variant="dropdown"` (Geography/Stage/Status pattern).
- **`src/pages/CaseStudies.jsx`** — single full-height stage, no page title block.
- **`src/styles/case-studies-portfolio.css`** — carousel + dropdown + card tokens (`#1954ec`, `#ff3d7d`).
- **`src/app/layout.jsx`** — hide `CinematicFooter` on `/case-studies`; native scroll; `case-studies-gallery-active` class; dark `#main` surface.

## Notes
- Detail pages (`/case-studies/:slug`) still show footer.
- `npm run build` passes.
