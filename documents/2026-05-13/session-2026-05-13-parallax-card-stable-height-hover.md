# Session log – 2026-05-13 (Parallax cards — stable height on hover)

## Summary
Stopped pillar cards from changing height on hover: label is always absolutely positioned (idle: centered over content; revealed: top band) so it does not participate in flex sizing; body copy stays in normal flow with `detachUntilRevealed` removed; dropped Framer `layout` / flexGrow animation drivers; added `h-full` on `li` and key wrappers so grid-stretched cells stay consistent. Split-curtain mode uses a full-bleed absolute label shell.

## Changes
- Edited `src/components/sections/ParallaxLayerShowcase.jsx`.

## Next steps
- None.
