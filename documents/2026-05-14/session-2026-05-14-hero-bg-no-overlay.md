# Session log – 2026-05-14

## Summary
Removed all **navy / gradient overlay layers** on the home hero full-bleed background image so the photo is shown **without** a color wash on top.

## Changes
- `src/components/home/HomePageSections.jsx`: `fullBleedBackdrop` now contains only the `<img>`.
- `public/revamp-assets/README.md`: note updated (no overlay).

## Notes
- If contrast on busy art becomes an issue, prefer adjusting the **source image** or **typography** (stroke/shadow) rather than reintroducing a full-bleed wash without an explicit art direction ask.

## Verification
- `npm run build` succeeded.
