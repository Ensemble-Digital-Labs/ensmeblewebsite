# Session log – 2026-05-14 (cinematic footer layout)

## Summary
Adjusted `CinematicFooter` so the footer is an in-flow, full-viewport section at the end of `#main` instead of `position: fixed`, fixing cases where it appeared behind sticky/high z-index sections while preserving `100svh` height and scroll-triggered reveal.

## Changes
- Edited `src/components/CinematicFooter.jsx` — `<footer>`: `fixed bottom-0 left-0` → `relative z-10`.

## Notes
- Fixed footers compete with `sticky`/layered home sections in the same scroll root; `relative` keeps natural document order after page content.
- GSAP `ScrollTrigger` still uses the outer wrapper as trigger; scrub behavior remains tied to scrolling through that block.

## Next steps
- None required; spot-check `/home-v1` end-of-page scroll on mobile and desktop.
