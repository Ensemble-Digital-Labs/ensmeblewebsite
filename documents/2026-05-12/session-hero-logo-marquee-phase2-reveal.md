# Session log – 2026-05-12 (hero logo marquee phase-2 reveal)

## Summary
Desktop hero logo strip is hidden until the scrub timeline reaches the same point as phase-2 (`sub`): `gsap.set` matches initial `autoAlpha`/`y`, then `tl.to(..., 0.56)` runs in parallel with the existing `sub` reveal.

## Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — `logoMarqueeRef`, GSAP set/tween, ref on bottom wrapper.

## Notes
- `prefers-reduced-motion` path still skips the whole effect; logo strip stays default-visible in that branch (unchanged).

## Next steps
- None.
