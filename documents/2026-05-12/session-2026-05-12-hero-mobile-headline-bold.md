# Session log – 2026-05-12 (hero mobile lead/tail weight)

## Summary
Strengthened headline weight on the **mobile** `< lg` hero stack: **lead** `font-bold` → **`font-extrabold`**, **tail** `font-medium` → **`font-bold`**. Desktop **lead** shutter row **`font-bold` → `font-extrabold`** so it matches the tail line’s extrabold shutter.

## Changes
- `src/components/sections/HeroScrollExpand.jsx`

## Notes
- `heroContent.headlineLines[2]` is already **`agency`** (no period); if the DOM still shows a period, hard-refresh / rebuild.

## Next steps
- None.
