# Session log – 2026-05-12 (fullscreen nav — infinite showcase scroll)

## Summary
Selected work rail **loops vertically**: list is rendered **three times**; on scroll, when position nears the **bottom** or **top** band, **`scrollTop`** jumps by **one catalog height** so content is seamless. Starts on the **middle** copy (double `requestAnimationFrame` + delayed **380ms** re-center after images layout). **`prefers-reduced-motion`**: single list, no loop handler. **GSAP** staggers only **`[data-showcase-loop-anim="1"]`** (middle copy). Removed **scroll-snap** on this rail so it does not fight seam jumps.

## Changes
- Edited `src/components/FullscreenNav.jsx`
