# Session log – 2026-05-12 (custom cursor — CLICK larger + bolder)

## Summary
When the branded cursor shows the **CLICK** preset (links, buttons, `.cursor-pointer`, etc.), the HUD now adds **`cursor-brand--click`**: **72×72px** disc (vs **48×48** for other labels) and **larger / heavier** label type (**11px**, **800**). Slightly stronger **teal-tinted** disc border/shadow for the click state only.

## Changes
- Edited `src/components/MovingCircle.jsx` — `isClickLabel` + class when `label === 'CLICK'`.
- Edited `src/index.css` — `.cursor-brand--click` sizing, `.cursor-brand--click .cursor-brand__disc-text`, disc accent.
