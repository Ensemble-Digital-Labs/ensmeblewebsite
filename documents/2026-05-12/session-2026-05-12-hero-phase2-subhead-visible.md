# Session log – 2026-05-12 (hero phase-2 subhead visibility)

## Summary
Improved readability of the **subhead + CTAs** block that fades in during the desktop hero scrub: added a **dark glass scrim** behind the body copy, **zinc-100** text + **text-shadow**, **`mix-blend-normal`** on the shell, and moved the GSAP fade-in **earlier** (`0.74` → `0.56`, slightly longer duration) so the “second phase” copy appears sooner over the expanded card.

## Changes
- `src/components/sections/HeroScrollExpand.jsx` — `subRef` markup + `tl.to(sub, …)` timing.

## Notes
- CTAs remain outside the scrim so pills stay visually primary; only the paragraph sits on the scrim.

## Next steps
- None.
