# Session log – 2026-06-15 (nav open/close expand parity)

## Summary
Aligned menu open with close: page stays visible during circle expand; menu content reveals after expand completes; logo/close button stay above backdrop.

## Changes
- `src/components/FullscreenNav.jsx` — delay `setNavOverlayActive(true)` until expand onComplete; close restores page at collapse start; backdrop `autoAlpha` lifecycle
- `src/styles/fullscreen-nav-menu.css` — nav chrome z-index; backdrop hidden when closed

## Notes
- Open flash was `ensemble-nav-overlay` hiding `#main` before the circle covered the viewport; close did the opposite (page visible during collapse).
