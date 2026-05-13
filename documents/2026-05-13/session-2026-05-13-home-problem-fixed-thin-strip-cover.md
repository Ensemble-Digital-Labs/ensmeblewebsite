# Session log – 2026-05-13

## Summary
Home problem pain bars with images use a **single responsive height** (`clamp(6.75rem, calc(5rem + 6vw), 10rem)`) and **`object-cover`** so art always fills the thin strip and may crop; consistent bar thickness across viewports.

## Changes
- Edited `src/components/sections/HomeProblemSection.jsx`
- Edited `src/lib/content.js` — `pains` image note
