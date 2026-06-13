# Session log – 2026-06-12 (case studies gallery card clicks)

## Summary
Gallery cards (center + visible side cards) are now **clickable** and navigate to `/case-studies/:slug`. Drag no longer steals clicks from card links.

## Changes
- **`CaseStudyPortfolioGallery.jsx`** — pointer-events on all visible slides; skip drag when pressing a card link
- **`CaseStudyGalleryCard.jsx`** — entire card (including title strip) wrapped in one `Link`
- **`case-studies-portfolio.css`** — removed side-card `pointer-events: none`; pointer cursor on links
