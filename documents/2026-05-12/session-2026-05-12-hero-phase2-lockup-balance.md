# Session log – 2026-05-12 (hero phase-2 lockup typography balance)

## Summary
Phase-2 left lockup looked “broken” because line 1 and 3 were `text-base` while line 2 used a very large clamp with tight leading (`~1.05`), so one word dominated and descenders collided with tight vertical rhythm. Replaced with a unified three-line scale (similar clamps), bold bookends, slightly stronger middle line, flex column gap, and looser line-height for italics.

## Changes
- Edited `src/components/sections/HeroScrollExpand.jsx` — phase-2 left column only.

## Notes
- Middle line stays italic + `font-extrabold` as light emphasis without poster-scale jump.

## Next steps
- None.
