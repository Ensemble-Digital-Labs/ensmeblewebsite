# Session log – 2026-05-11 (fullscreen nav menu font)

## Summary
Fixed fullscreen overlay menu link typography so **Runtime** applies: labels used `font-extrabold` (800) while only weights 400–700 are mapped to `Runtime-Regular.otf`, so the browser fell back to the UI stack.

## Changes
- Edited `src/components/FullscreenNav.jsx`: menu label span now uses `font-display` + `font-bold` (700) instead of `font-extrabold` (800).

## Notes
- Index numbers stay `font-mono`; primary labels match hero/display stack.

## Next steps
- None required; optional future `@font-face` for 800 if other components need true extrabold Runtime.
