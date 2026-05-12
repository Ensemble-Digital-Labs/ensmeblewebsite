# Session log – 2026-05-11

## Summary
Re-enabled the custom DOM cursor (`MovingCircle`) with **hlk-style contextual labels**: a dark circle shows short uppercase copy based on hover (`CLICK`, `DRAG`, custom `data-cursor-label`, etc.). Wired layout, new `cursorContext` resolver, CSS for labeled state, and hints on hero globe + 3D carousel cards.

## Changes
- `src/lib/cursorContext.js` — `resolveCursorLabel`, `isInteractiveTarget`; documents `data-cursor-label` / `data-cursor-intent`.
- `src/components/MovingCircle.jsx` — uses resolver; labeled vs default HUD; remounted from layout.
- `src/app/layout.jsx` — `<MovingCircle />` after overlay.
- `src/index.css` — `html.ensemble-custom-cursor { cursor: none }`; `.cursor-brand--labeled`, `__disc`, `__disc-text`, transitions.
- `src/canvas/HeroGlobePlexus.jsx` — `data-cursor-intent="drag"` on globe root.
- `src/components/ui/CircularGallery.jsx` — `data-cursor-intent="drag"` on gallery region; `data-cursor-label="See it"` on each project card.

## Notes
- Disabled on **touch / coarse pointer** and **`prefers-reduced-motion`** (unchanged).
- Firefly stylesheet in `index.html` may still load; `html.ensemble-custom-cursor` uses `cursor: none !important` to prioritize the custom cursor on desktop hover.
- Add `data-cursor-label="Your text"` on any element for a custom chip (max 12 chars, uppercased in UI).
