# Session log – 2026-06-12 (pixel transition return home)

## Summary
Restored pixel wipe when clicking the nav logo to return home from pages like `/case-studies`. The logo used a plain `Link`, and `shouldUsePixelNav` explicitly skipped all routes to `/`.

## Changes
- **`src/lib/pixelNav.js`** — allow pixel transition when navigating to home (still skip same-route clicks)
- **`src/components/NavPixelLink.jsx`** — updated comment
- **`src/components/FullscreenNav.jsx`** — logo + compact mark use `NavPixelLink` instead of `Link`

## Notes
- Home intro loader still runs only once (localStorage); return visits get pixel wipe only.
