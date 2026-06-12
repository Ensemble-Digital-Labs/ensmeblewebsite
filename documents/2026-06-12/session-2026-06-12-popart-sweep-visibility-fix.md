# Session log – 2026-06-12 (PopArt sweep visibility fix)

## Summary
Letter now appears **140ms after sweep starts** (PopArt timing), sweep keeps running ~820ms; removed `animationend` + early `::before` hide that delayed or cut off the reveal.

## Changes
- `popArtBigLetterReveal.js` — rAF-triggered sweep, instant `is-letter-visible`
- `index.css` — letter hidden with transparent fill only; sweep runs at full opacity
