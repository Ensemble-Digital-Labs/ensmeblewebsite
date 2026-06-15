# Session log – 2026-06-14 (popart animation ease)

## Summary
Softened PopArt collage overlay entrance animations (brand/expertise): longer duration, gentler ease, wider stagger, lighter rotation drift, subtle vertical float-in.

## Changes
- `src/lib/homeMotionTokens.js` — added `popArtRevealDuration`, `popArtStagger`, `popArtEase`, `popArtCtaStart`, `popArtRotationDelta`
- `src/hooks/useHomePopArtMotion.js` — collage layers use PopArt tokens; parallax scrub eased to 1.05

## Notes
- Hero and other scroll reveals unchanged (`revealDuration` 0.78s / `power3.out`).
