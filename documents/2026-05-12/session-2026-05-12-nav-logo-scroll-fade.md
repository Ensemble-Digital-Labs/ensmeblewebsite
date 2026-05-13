# Session log – 2026-05-12 (nav logo scroll fade)

## Summary
Nav home lockup fades out while the user is scrolling and fades back in after scroll activity stops (~200ms debounce). Works with native `#main` scroll and Lenis (desktop smooth path). Logo stays visible when the fullscreen menu is open and when `prefers-reduced-motion` is set.

## Changes
- Edited `src/components/FullscreenNav.jsx` — scroll listeners + debounced idle state; conditional opacity on the logo `Link`.

## Notes
- Lenis is attached after Locomotive init via short polling (avoids duplicate `on('scroll')` handlers).
- `shouldUseNativeMainScroll()` skips Lenis polling when only native `#main` scroll is used.

## Next steps
- Tune `NAV_LOGO_SCROLL_IDLE_MS` if the logo feels too eager or too slow to return.
