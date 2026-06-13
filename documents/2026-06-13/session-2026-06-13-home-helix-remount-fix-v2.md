# Session log – 2026-06-13 (home helix remount fix v2)

## Summary
Diagnosed and fixed homepage DNA ribbon helix disappearing after SPA navigation (logo click, browser back). Root causes: shared intro progress reset by `/experiments` unmount, and helix rendered inside Framer Motion `motion.div` (transform breaks `position: fixed` + opacity fade).

## Changes
- Created `src/lib/homeRibbonIntro.js` — separate intro state for home ribbon (isolated from clone/experiments)
- Updated `src/lib/dnaCapitalShaderHelix.js` — `getIntroProgress` callback on WebGL ctx
- Updated `src/hooks/useHomeHelixIntro.js` — uses home ribbon intro module
- Updated `src/components/dna-clone/DnaCapitalHelixCanvas.jsx` — `introSource` prop, ResizeObserver for mount sizing
- Updated `src/app/layout.jsx` — home helix mounted at `#main` level (outside route transition wrapper); instant intro=1 on return visits
- Updated `src/pages/Home.jsx` — removed inline helix (now in layout)

## Notes
- Helix opacity = `helixMix * introEase`; intro stuck at 0 when `resetDnaCloneIntroProgress()` ran on experiments unmount
- Refresh worked because full reload skips AnimatePresence enter fade (`initial={false}`) and re-inits WebGL cleanly
- `/experiments` continues using `dnaCapitalIntro`; home uses `homeRibbonIntro`

## Next steps
- Verify: home → about → logo home, home → experiments → home, browser back/forward
