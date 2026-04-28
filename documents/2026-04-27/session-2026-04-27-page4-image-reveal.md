# Session log – 2026-04-27 (Page4 hover image vertical range)

## Summary
Featured Insights hover cards (`.reveal-image`) felt locked on large screens because `initImageReveal` clamped position to the `.part` box height, while the preview image is taller than that text-only column.

## Changes
- `src/lib/popprAnimations.js` — `initImageReveal`: added proportional slack (and a viewport-based floor) for `left`/`top` clamps so the card can move further up/down (and slightly horizontally) even when `rect.height < ih`.

## Notes
- Absolute children do not expand `.part`’s `getBoundingClientRect()` height; wide layouts shorten the text stack, so the old clamp often collapsed vertical range.
