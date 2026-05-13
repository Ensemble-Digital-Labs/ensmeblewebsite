# Session log – 2026-05-12

## Summary
Switched `#hero-stats-trust` bottom stat/trust strip (`.hero-outcomes-marble-bar`) from CSS “marble” gradients to `ambient-layer-01.png` as full-bleed cover background, with `#050816` fallback.

## Changes
- `src/index.css` — `.hero-outcomes-marble-bar` `background-image` → `/assets/images/ambient/ambient-layer-01.png` (`cover`, `center`, no repeat); kept subtle inset + drop shadow.

## Notes
- Grid cells still use `bg-zinc-950/35` + `backdrop-blur` for stat readability over the ambient art.
