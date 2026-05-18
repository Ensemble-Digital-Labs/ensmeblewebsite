# Session log – 2026-05-15 (home pixel section transition)

## Summary
Applied a Codrops-inspired full-screen pixel grid transition when jumping between homepage narrative sections via the numbered index: cover with staggered tiles → smooth scroll to target → reveal. Respects reduced motion and the app’s `reduced-motion` HTML class.

## Changes
- Added `src/components/home/HomePixelTransition.jsx` — `HomePixelTransitionProvider`, `useHomePixelJump`, portal-based GSAP grid overlay (z-index 92)
- Updated `src/lib/utils.js` — `scrollMainToTargetAsync()` to sequence scroll after the overlay covers the viewport
- Updated `src/pages/Home.jsx` — wrap home content in `HomePixelTransitionProvider`
- Updated `src/components/home/HomeSectionIndex.jsx` — use `jumpToSection` when context is present; fallback to `scrollMainToTarget`

## Decisions / notes
- Transition is **only wired to the home section index** (`/`), not wheel scroll or `/home-v1` / `/home-v2`.
- Grid density: **8×13** desktop, **6×10** mobile (`max-width: 639px`); tile fill `#14122a` with a thin inset highlight to match home atmosphere, not pure black “bunker.”
- Overlay is portaled to **`document.body`** so it isn’t clipped by Lenis/`#main` transforms.
- **Fullscreen nav** remains above the effect (nav z-index in the 999998 range).

## Next steps (optional)
- Reuse `useHomePixelJump` for other home CTAs that should “chapter jump” with the same affordance.
- Tune duration / grid size if motion feels long on low-end devices.
