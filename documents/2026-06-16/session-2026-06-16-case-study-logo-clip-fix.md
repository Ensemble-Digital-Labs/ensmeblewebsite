# Session log – 2026-06-16 (case study logo clip fix)

## Summary
Fixed case study gallery logos being cut off on active cards by using contain fit, wider logo area, and visible overflow.

## Changes
- `src/styles/case-studies-portfolio-v2.css` — logo `object-fit: contain`, 84–88% panel width, no clip on logo panel during intro

## Notes
- Wide client marks (e.g. Chesterfield Bariatric) should now show fully inside the card.
