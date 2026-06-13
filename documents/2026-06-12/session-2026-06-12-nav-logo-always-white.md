# Session log – 2026-06-12 (nav logo always white)

## Summary
Nav logo always uses the white/light wordmark — removed dark↔light asset swap that caused flicker on route change.

## Changes
- **`src/components/AnimatedBrandLogo.jsx`** — Nav variant always `fullOnDark` + `brand-logo--motion`.
- **`src/components/FullscreenNav.jsx`** — Removed `homeNavBackdropIsDark` / atmosphere tone logic for logo.
- **`src/lib/branding.js`** — Comment update.
