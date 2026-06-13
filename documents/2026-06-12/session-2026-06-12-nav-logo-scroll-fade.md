# Session log – 2026-06-12 (nav logo scroll fade fix)

## Summary
Restored nav logo fade-in/out on scroll after route changes (e.g. case studies → home). Scroll listeners were bound once on mount and never reattached when Lenis was destroyed/recreated across routes.

## Changes
- **`src/components/FullscreenNav.jsx`**
  - `usesLenisMainScroll(pathname)` mirrors layout native-only routes
  - Scroll listener effect depends on `location.pathname`
  - Rebinds Lenis or native `#main` scroll on each navigation
  - Listens for `ensemble:scroll-ready` when Lenis initializes after route swap

## Notes
- Logo still fades during user scroll (wheel/touch/keys), reappears ~520ms after scroll stops.
- Unrelated: `ENABLE_NAV_LOGO_SWAP` in `popprAnimations.js` remains false (compact “E” swap still disabled).
