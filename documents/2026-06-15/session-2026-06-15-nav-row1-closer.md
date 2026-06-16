# Session log – 2026-06-15 (nav row-1 cards closer)

## Summary
Moved the top row nav cards (AI Capability + Services) closer together by adding inward shift on row 1 only.

## Changes
- `src/styles/fullscreen-nav-menu.css` — `--logo-row1-inset` (18px / 26px lg); row-1 `--bar-shift` uses inset.
- `src/lib/navLogoTileMotion.js` — assemble animation respects row-1 inset.

## Notes
- Rows 2–3 taper unchanged; only the top pair moves toward the center spine.
