# Session log – 2026-06-12 (case studies card wave placement)

## Summary
Matched DNA Capital `/companies` staggered card placement: vertical wave driven by **ring distance** (not card index), stronger offsets, slightly higher vertical anchor.

## Changes
- **`CaseStudyPortfolioGallery.jsx`** — `getWaveYOffset()` / `waveYAtInteger()`: center level, ±1 opposite vertical, ±2 flip; animates smoothly while dragging
- **`case-studies-portfolio.css`** — carousel anchor nudged up; reduced side padding so edge cards sit closer to screen edges

## Notes
- Pattern: dist −1 down, −2 up, 0 center, +1 up, +2 down (like DNA screenshot)
- Center card settles to y=0 via focus blend; side cards keep wave offset
