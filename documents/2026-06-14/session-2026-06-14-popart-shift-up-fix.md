# Session log – 2026-06-14 (popart sudden shift-up fix)

## Summary
Fixed images settling then suddenly shifting up — parallax was attached after mask-in with `start: top bottom`, so scroll progress jumped layers to a mid-range Y offset in one frame.

## Changes
- **`src/hooks/useHomePopArtMotion.js`**
  - Parallax binds at setup (with entrance), not in `onComplete`
  - Parallax `start: top 82%` — same as reveal; Y begins at 0 when images appear
  - `fromTo` from `y: 0`; parallax no longer overwrites `rotation` (entrance/CSS own tilt)

## Notes
- Root cause: late-bound scrub ST + early `top bottom` start = instant Y apply when section already scrolled into view.
