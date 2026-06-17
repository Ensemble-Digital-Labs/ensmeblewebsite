# Session log – 2026-06-16 (disable intro loader video)

## Summary
Disabled the full-screen Home intro video loader so the site loads directly into the homepage.

## Changes
- `src/lib/homeLoaderGate.js` — added `HOME_INTRO_LOADER_ENABLED = false`; `isHomeIntroLoaderDone()` returns true when disabled

## Notes
- Set `HOME_INTRO_LOADER_ENABLED` back to `true` to restore the intro video.
