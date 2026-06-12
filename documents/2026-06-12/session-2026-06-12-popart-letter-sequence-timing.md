# Session log – 2026-06-12 (PopArt letter timing + per-section sequence)

## Summary
Slowed giant-letter wipe and sequenced each section so the gold letter animates first when its block enters the viewport, on all screen sizes including mobile.

## Changes
- `popArtBigLetterReveal.js` — `revealPopArtSectionSequence`, viewport helper, 1.15s timing constants
- `useHomePopArtMotion.js` — ScrollTrigger `top 90%`, sequence on enter
- `usePopArtScrollReveals.js` — popart copy excluded from independent IO; marketing uses sequence
- `useHomeSequentialReveals.js` — failsafe uses in-view sequence only (not all letters at once)
- `HomePopArtSectionLayout.jsx` — `data-popart-sequence`, staggered copy delays after letter
- `index.css` — slower wipe/rev-text; mobile keeps slide-up animation
