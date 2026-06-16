# Session log – 2026-06-15 (showcase clearance left-only)

## Summary
Reverted global expand-shell top padding that pushed the right E-mark logo down. Top clearance now applies only to the left showcase column.

## Changes
- `src/styles/fullscreen-nav-menu.css` — removed `fs-nav-expand-content` lg padding-top bump; `fs-nav-showcase-aside` gets left-only `padding-top`
- `src/components/FullscreenNav.jsx` — restored `lg:pt-[5.25rem]` on expand content; aside uses `lg:pt-0` + CSS clearance

## Notes
- Right logo panel stays vertically centered as before; left column gets extra offset to miss the fixed ENSEMBLE wordmark.
