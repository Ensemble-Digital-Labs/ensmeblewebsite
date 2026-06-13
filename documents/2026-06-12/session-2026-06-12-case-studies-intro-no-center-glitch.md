# Session log – 2026-06-12 (case studies intro no center glitch)

## Summary
Removed leftover “expand from center” glitch: intro starts at 0, only clip-path wipes horizontally; full card size/typography from frame one; no filter opacity flash; all cards reveal in sync.

## Changes
- **`CaseStudyPortfolioGallery.jsx`** — introRef initial 0; dropped size/focus reveal scaling; removed filter fade hook; unified stagger (no center-first)
- **`case-studies-portfolio.css`** — removed link transform-origin during intro

## Notes
- Opacity dip during intro is subtle (55→100%) so wipe reads cleanly without a center burst
