# Session log – 2026-06-13 (filter menu opens left)

## Summary
Repositioned case studies filter dropdown menus to expand **left** of each tab (instead of upward), so open menus no longer cover sibling filter tabs on mobile or desktop.

## Changes
- **`src/styles/case-studies-portfolio.css`** — menu `right: calc(100% + gap)`, vertical center on trigger; `overflow: visible` on filter anchor/panel/wrap; mobile max-width + shadow.

## Notes
- Works with accordion behavior (one open menu at a time).
