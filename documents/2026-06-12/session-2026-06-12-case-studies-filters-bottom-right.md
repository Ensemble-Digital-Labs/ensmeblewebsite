# Session log – 2026-06-12 (case studies filters bottom-right)

## Summary
Moved case studies gallery filter dropdowns from top-right (overlapping nav CTAs) to the **bottom-right corner** of the viewport. Dropdown menus open upward.

## Changes
- **`src/styles/case-studies-portfolio.css`**
  - `.case-studies-portfolio-filters--dropdown` → `position: fixed`, bottom-right + safe-area inset
  - Mobile: column stack aligned to bottom-right
  - Filter menus flip to open above triggers

## Notes
- z-index 12 — above carousel, below global nav overlay.
