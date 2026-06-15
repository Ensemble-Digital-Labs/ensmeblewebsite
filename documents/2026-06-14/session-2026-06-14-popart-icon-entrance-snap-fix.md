# Session log – 2026-06-14 (popart icon entrance snap fix)

## Summary
Fixed PopArt collage overlay icons (brand/expertise) snapping into place instead of animating on scroll. A 600ms failsafe was adding `is-popart-ready` too early, which forced `clip-path: none` and bypassed the GSAP wipe entrance.

## Changes
- `src/hooks/useHomeSequentialReveals.js` — skip orchestrated PopArt sections in early failsafe; add 4s late failsafe via `finishPopArtStacksFailsafe`
- `src/hooks/useHomePopArtMotion.js` — export `finishPopArtStacksFailsafe` for stuck stacks
- `src/index.css` — hide `[data-home-popart-layer]` until GSAP reveals (prevents pre-hydration flash)

## Notes
- Service capability icons unaffected.
- Brand/expertise overlays should now wipe in with main collage on scroll at ~88% viewport.
