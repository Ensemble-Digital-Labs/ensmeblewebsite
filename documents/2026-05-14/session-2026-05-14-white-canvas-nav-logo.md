# Session log – 2026-05-14 (white canvas + nav logo)

## Summary
Switched global scroll canvas to white, added `ensemble-logo-on-light.svg` (dark slate wordmark + existing gradient mark), wired nav to use it and swap to the original light-wordmark SVG when the fullscreen menu opens. Tuned cinematic footer for light background; theme primary background set to `#FFFFFF`.

## Changes
- Added `public/assets/branding/ensemble-logo-on-light.svg`
- Edited `src/lib/branding.js`, `src/components/AnimatedBrandLogo.jsx`, `src/components/FullscreenNav.jsx`
- Edited `src/app/layout.jsx`, `src/pages/Home.jsx`, `src/lib/constants.js`, `src/index.css` (`:root` + nav logo keyframes)
- Edited `src/lib/growthCtaClasses.js` (focus ring offset → white)
- Edited `src/components/CinematicFooter.jsx`, `src/styles/cinematic-footer.css` (`--surface-light` tokens)

## Notes
- Loader still uses `ensemble-logo.svg` (light wordmark on dark overlay).
- Other routes may still assume dark section backgrounds; adjust per page as the light theme rolls out.

## Next steps
- Spot-check `/home-v1` and inner pages for contrast on `#main` white.
