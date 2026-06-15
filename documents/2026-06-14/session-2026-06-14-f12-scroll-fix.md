# Session log – 2026-06-14 (F12 devtools scroll fix)

## Summary
Fixed scroll breaking after using F12 / responsive device mode: scroll mode (native vs Lenis) now re-inits when viewport profile changes, and Lenis/ScrollTrigger refresh on resize, visualViewport, and visibility changes.

## Root cause
`#main` switched between `overflow-y-auto` (narrow / touch) and `overflow-hidden` (Lenis) via layout state, but `useLocomotiveScroll` only used `nativeOnly` for clone routes — Lenis stayed attached after DevTools resize, leaving scroll dead when closing F12.

## Changes
- **`src/app/layout.jsx`** — Pass `nativeOnly: useMainNativeScroll` so scroll re-inits on breakpoint/profile change; `skipScrollerProxy` for clone/gallery only.
- **`src/lib/locomotive.js`** — Debounced resize/visualViewport/orientation/visibility handlers; destroy Lenis when entering native mode; `skipScrollerProxy` separate from native scroll path.

## Notes
- Home mobile/tablet still uses native `#main` scroll with GSAP scroller proxy (not clone skip path).
- Optional env escape hatch unchanged: `VITE_USE_NATIVE_MAIN_SCROLL=true`.

## Next steps
- Verify: desktop → F12 device toolbar (375px) → scroll → close F12 → wheel scroll works on `/`.
