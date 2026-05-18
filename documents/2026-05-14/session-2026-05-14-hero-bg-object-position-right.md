# Session log – 2026-05-14

## Summary
Hero full-bleed background image uses **`object-right`** on small/medium viewports so the **right-side focal area** (figure + arcs) stays in frame when the crop tightens; **`lg:object-center`** restores centered framing on large desktops.

## Changes
- `src/components/home/HomePageSections.jsx`: hero backdrop `<img>` class `object-center` → `object-right lg:object-center`.

## Verification
- `npm run build` succeeded.
