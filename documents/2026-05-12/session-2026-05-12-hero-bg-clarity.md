# Session log – 2026-05-12 (hero background clarity)

## Summary
The hero looked hazy because the full-bleed photo sat under a navy gradient overlay and GSAP further dimmed both layers on desktop. Lightened the gradient stops, raised the initial photo opacity, and lowered the overlay layer multiplier; aligned mobile hero gradient and slightly eased the inner card vignette.

## Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — mobile gradient, desktop overlay gradient, GSAP `bg`/`overlay` initial `set`, card inner gradient.

## Notes
- Scroll-scrub end keys (`bg` / `overlay` opacity toward end of pin) unchanged so the expand sequence still reads the same.

## Next steps
- If white headline contrast drops on a specific asset, nudge `via`/`to` stops slightly darker rather than reverting the full stack.
