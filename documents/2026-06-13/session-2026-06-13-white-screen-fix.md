# Session log – 2026-06-13 (white screen fix)

## Summary
Fixed site-wide white screen: Vite could not resolve missing `HomeMonoReveal.jsx` and `AiHubPage.jsx`, which crashed the entire React app on load.

## Cause
- Imports referenced files that were never committed / missing from disk
- Not related to Lama Lama clone iframe

## Changes
- **Created** `src/components/home/HomeMonoReveal.jsx`
- **Fixed** `src/pages/DynamicSitePage.jsx` — removed missing `AiHubPage` import; `/ai` uses `MarketingDocLayout`
- **Updated** `src/index.css` — mono reveal mask CSS
- **Updated** `src/hooks/useHomeSequentialReveals.js` — `data-home-mono-reveal` support

## Notes
- Restart dev server: `npm run dev` → http://localhost:3000 (or 3001 if 3000 busy)
- Hard refresh browser (Ctrl+Shift+R) if cache stuck
