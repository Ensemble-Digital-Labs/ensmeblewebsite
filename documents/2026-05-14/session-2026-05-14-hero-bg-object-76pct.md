# Session log – 2026-05-14

## Summary
Adjusted hero full-bleed **`object-position`** on viewports below `lg`: from flush **`object-right`** (100%) to **`object-[76%_center]`** so the crop sits **a bit left of hard-right**, keeping the right-side highlight visible without hugging the edge. Large screens unchanged (`lg:object-center`).

## Changes
- `src/components/home/HomePageSections.jsx`: hero backdrop `<img>` positioning.
- Follow-up: **`76%` → `70%`** horizontal `object-position` (below `lg`) for a slightly leftward crop.

## Verification
- `npm run build` succeeded.
