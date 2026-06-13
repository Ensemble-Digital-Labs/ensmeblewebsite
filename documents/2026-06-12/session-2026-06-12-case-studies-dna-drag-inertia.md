# Session log – 2026-06-12 (DNA drag inertia carousel)

## Summary
Matched [DNA Capital /companies](https://dnacapital.com/companies) drag feel: 1:1 finger tracking, release momentum, friction decay, smooth snap to center. Drag works across full carousel (cards included); tap still navigates when not moved.

## Changes
- **`CaseStudyPortfolioGallery.jsx`** — physics loop (velocity, friction, snap lerp); wheel impulse; removed instant snap-on-release
- **`case-studies-portfolio.css`** — `touch-action: none`, `user-select: none` on slides

## Notes
- Tunables: `DRAG_FRICTION`, `SNAP_STRENGTH`, `WHEEL_IMPULSE`.
