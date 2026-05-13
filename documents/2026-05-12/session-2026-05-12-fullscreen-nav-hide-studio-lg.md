# Session log – 2026-05-12 (fullscreen nav — hide Studio on laptop)

## Summary
On **`lg` (1024px) and up**, the middle **Studio** contact column in the fullscreen menu is hidden so laptop layout is **primary nav | Selected work** only. Below `lg`, Studio remains under the nav as before. GSAP fade for `.nav-contacts` runs only when Studio is visible (viewport below 1024px).

## Changes
- Edited `src/components/FullscreenNav.jsx`: `lg:hidden` on Studio aside; removed unused `lg:` width/border on that block; comment + left-cluster gap cleanup; `studioVisible` guard for contact animation.

## Next steps
- None; users on large screens still reach Contact via nav and top-bar CTA.
