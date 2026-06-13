# Session log – 2026-06-12 (case studies left-edge horizontal intro)

## Summary
Initial gallery animation now matches DNA Capital: cards stay in final carousel positions, show a thin **left edge**, then **expand horizontally to the right** via clip-path reveal (center card first, neighbors stagger).

## Changes
- **`CaseStudyPortfolioGallery.jsx`** — `getStaggeredIntroExpand()`, `getIntroClipRight()`; full x/y/size positions from frame 0; clip-path wipe
- **`useCaseStudiesGalleryIntro.js`** — slightly longer page-entry duration (1.35s)
- **`case-studies-portfolio.css`** — slide overflow hidden during reveal

## Notes
- Replaces prior “expand from center” cluster animation
- Typography/focus vars scale with local reveal progress
