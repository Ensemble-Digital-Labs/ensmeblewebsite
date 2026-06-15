# Session log – 2026-06-14 (popart scroll parallax)

## Summary
Replaced PopArt collage load-in wipe animations with scroll-scrubbed parallax (PopArt web-design pattern): images float upward continuously as the user scrolls through brand/expertise sections.

## Changes
- `src/hooks/useHomePopArtMotion.js` — removed clip-path entrance timeline; `bindPopArtStackParallax` on all breakpoints with `start: top bottom` → `end: bottom top`, scrub 1.15
- `src/lib/homeMotionTokens.js` — `popArtScrollScrub`
- `src/index.css` — layers visible by default; `is-scroll-parallax` uses `will-change: transform` only
- `src/lib/popArtBigLetterReveal.js` — in-view copy reveal works for orchestrated stacks
- `src/hooks/useHomeSequentialReveals.js` — simplified failsafe

## Notes
- Copy/letter rev-text still reveals once when section enters ~82% viewport.
- Service capability icons unchanged.
