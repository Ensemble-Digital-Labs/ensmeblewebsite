# Session log – 2026-05-13 (CardCurtainReveal + Parallax pillars)

## Summary
Ported the user’s curtain-reveal card pattern to this Vite repo using `framer-motion` (not `motion/react`), added `src/components/ui/CardCurtainReveal.jsx` with context + compound subcomponents, and wired `ParallaxLayerShowcase` pillar cards so body copy uses the clip-path curtain on hover-capable desktop while labels stay visible. Touch / coarse pointers and `prefers-reduced-motion` always show full copy; keyboard users get `tabIndex={0}` + `focus-visible` ring and focus-within reveal.

## Changes
- Created `src/components/ui/CardCurtainReveal.jsx`
- Edited `src/components/sections/ParallaxLayerShowcase.jsx`
- Edited `FILE_TREE.md` (ui entry)

## Notes
- `CardCurtain` uses a restrained teal/amber gradient instead of `mix-blend-difference` to stay on the healthcare / premium palette; override via `className` if needed.
- `CardCurtainRevealTitle` / `CardCurtainRevealFooter` exported for reuse; this section only uses label + `CardCurtainRevealDescription` + `CardCurtain`.

## Next steps
- None required.
