# Session log – 2026-05-12 (hero phase-2 sub centered, no glass)

## Summary
For the desktop hero scrub **phase-2** block (`subRef`): removed the **glass / scrim panel** around the subhead, **centered** the subhead + CTA stack in the pinned viewport (`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` + flex column), and strengthened **text-shadow** on the paragraph for legibility without a backing box. Tweaked GSAP initial **`y`** on `sub` (`28` → `20`) to match the subtler center reveal.

## Changes
- `src/components/sections/HeroScrollExpand.jsx`

## Next steps
- If contrast is still weak on a specific frame of the card expand, add a light `drop-shadow` on the paragraph only (avoid reintroducing a full panel).
