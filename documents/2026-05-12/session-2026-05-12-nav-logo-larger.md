# Session log – 2026-05-12 (nav logo scale)

## Summary
Increased the default **nav** lockup size for `AnimatedBrandLogo` so the header logo reads larger at all breakpoints, with a higher max width on wide screens.

## Changes
- Edited `src/components/AnimatedBrandLogo.jsx` — nav variant: `h-11…lg:h-[3.75rem]` → `h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32`; `max-w-[min(52vw,340px)]` → `max-w-[min(78vw,560px)]`.

## Notes
- Footer, loader, and transition variants unchanged.
- Nav bar uses flex + `min-height` clamp; taller logo should expand the bar naturally.

## Next steps
- If the lockup crowds the “Get in touch” + menu cluster on very narrow widths, nudge only `max-w` vw down slightly for `<375px` (optional).
