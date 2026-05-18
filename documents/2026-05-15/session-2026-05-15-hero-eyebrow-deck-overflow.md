# Session log – 2026-05-15 (hero eyebrow clipped in deck)

## Summary
The hero eyebrow line was clipped in the pinned deck viewport because it used negative top margins while deck ancestors apply `overflow-hidden`; the text was drawn above the clip rect.

## Changes
- Updated `src/components/home/HomePageSections.jsx` — when `deckFrame` is active (`df`), eyebrow margins use `mt-0` instead of `-mt-*`; stacked layout unchanged when `df` is false.

## Notes
- Cosmetic tightening (`-mt`) is safe when sections are full viewport without deck clipping.
