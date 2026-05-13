# Session log – 2026-05-12 (nav logo closes fullscreen menu)

## Summary
Fullscreen menu stayed open when users clicked the brand logo (`Link` to `/`) because only menu links called `closeOverlay`. Added `onClick={closeOverlay}` to both home `Link`s in `FullscreenNav`.

## Changes
- Edited `src/components/FullscreenNav.jsx`

## Notes
- Safe when menu is already closed (`closeOverlay` is idempotent).

## Next steps
- None.
