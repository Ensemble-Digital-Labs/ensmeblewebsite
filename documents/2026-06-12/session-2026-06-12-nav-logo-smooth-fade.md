# Session log – 2026-06-12 (nav logo smooth fade)

## Summary
Fixed logo “blink” during scroll: restored ~0.85s opacity easing on `.nav .logo`, lengthened scroll-idle debounce to 520ms (Lenis smooth scroll gaps), and only trigger hide once per scroll session.

## Changes
- `src/components/FullscreenNav.jsx` — idle 520ms; hide only on first scroll event in a burst; removed `pointerdown` user-intent (false triggers); opacity transition via CSS not Tailwind
- `src/index.css` — explicit `opacity` transition on `.nav .logo` with original poppr easing

## Notes
- User-intent gating for programmatic scroll unchanged
- Blink was caused by 200ms idle firing between Lenis frames + 300ms opacity vs old 1s `transition: all`
