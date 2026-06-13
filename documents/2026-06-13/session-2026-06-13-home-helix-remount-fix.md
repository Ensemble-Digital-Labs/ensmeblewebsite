# Session log – 2026-06-13 (home helix remount fix)

## Summary
Fixed homepage DNA ribbon disappearing after navigating away and back (logo click or browser back). Helix intro was stuck at opacity 0; WebGL did not always reinitialize.

## Changes
- **`src/lib/homeHelixSession.js`** — session flag: skip intro fade on return visits, set intro progress to 1 immediately.
- **`src/hooks/useHomeHelixIntro.js`** — `useLayoutEffect`; instant helix on revisit after first intro.
- **`src/components/dna-clone/DnaCapitalHelixCanvas.jsx`** — reinit on `location.key`, BFCache `pageshow`, `webglcontextlost`; reset `webglFailed` on mount.
- **`src/pages/Home.jsx`** — `key={home-helix-${location.key}}` on helix canvas.

## Notes
- Root cause: shared `dnaCapitalIntro` module at 0 + stale WebGL context after SPA/bfcache navigation.
