# Session log – 2026-06-15 (hide orb when nav open)

## Summary
Hide contact orb FAB while fullscreen nav menu is open — avoids competing CTAs in the corner.

## Changes
- `src/styles/popart-contact-orb.css` — `html.ensemble-nav-overlay .ensemble-contact-orb` fades out and disables pointer events (uses existing `setNavOverlayActive` from `FullscreenNav`)

## Notes
- Portaled contact panel unchanged; only the floating trigger is hidden when nav overlay is active.
