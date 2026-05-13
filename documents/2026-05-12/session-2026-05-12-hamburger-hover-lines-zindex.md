# Session log – 2026-05-12 (hamburger visible during hover ripple)

## Summary
Hover ripple circles were painting above the burger bars during `multiColor`. Raised `#line1`–`#line3` with `z-[2]`, kept ripples at `z-0`, and documented the same in `.anim-circle` in global CSS.

## Changes
- Edited `src/components/FullscreenNav.jsx`: `z-[2]` on three line divs; `z-0` on `#an-cir1` / `#an-cir2`.
- Edited `src/index.css`: `z-index: 0` on `.anim-circle` and comment.

## Notes
- Open-state X (light lines on glassy circle) also stays above ripples on hover.
