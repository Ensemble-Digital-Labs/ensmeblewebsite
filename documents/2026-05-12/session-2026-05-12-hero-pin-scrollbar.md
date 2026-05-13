# Session log – 2026-05-12 (hero pin scrollbar)

## Summary
Addressed a **vertical scrollbar / grey bar** appearing on the right inside the home hero after scroll by clipping the desktop pin stack, sizing the expanded card to **`documentElement.clientWidth`** (not `innerWidth` × vw), and forcing **`#page1 .pin-spacer`** to hide overflow + scrollbars.

## Changes
- `src/components/sections/HeroScrollExpand.jsx` — `lg:overflow-hidden` on `#page1`; desktop wrapper `min-w-0 max-w-full overflow-hidden`; pin shell `max-w-full min-w-0 overscroll-none`; `endCardW` uses `clientWidth`.
- `src/index.css` — `#page1 .pin-spacer` overflow + scrollbar hiding.

## Notes
- If ScrollTrigger pin behavior regresses in an edge browser, relax `overflow: hidden !important` on `.pin-spacer` and keep only scrollbar-width / webkit hiding.

## Next steps
- None unless QA still sees a gutter on a specific OS/browser.
