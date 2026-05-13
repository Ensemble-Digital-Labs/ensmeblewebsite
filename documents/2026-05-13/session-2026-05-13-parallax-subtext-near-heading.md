# Session log – 2026-05-13 (Parallax subtext closer to heading)

## Summary
Tightened vertical rhythm between Phase-2 titles and body copy: reduced reserved `padding-top` on glass `ParallaxPillarDescription`, switched split interior from `justify-end` + large `pt-20` to **`justify-start`** with top padding aligned under the static heading, gradient flipped to `bg-gradient-to-b` for top-anchored copy, and slightly tighter **`leading-snug`** + small **`mt-0.5` / `sm:mt-1`** on paragraphs.

## Changes
- Edited `src/components/sections/ParallaxLayerShowcase.jsx`.

## Next steps
- If a two-line Phase-2 title ever collides with copy on very small widths, bump `ParallaxPillarDescription` `pt-*` slightly.
