# Session log – 2026-06-15 (remove nav Get in touch)

## Summary
Removed the sticky nav “Get in touch” gradient pill from `FullscreenNav` (visible on hero / site-wide nav bar). Menu hamburger remains.

## Changes
- `src/components/FullscreenNav.jsx` — removed `NavPixelLink` CTA and related `navCta` opacity toggles; dropped unused `growthCtaClasses` import

## Notes
- Contact orb and hero CTAs unchanged; users can still reach contact via menu, orb, and page CTAs.
