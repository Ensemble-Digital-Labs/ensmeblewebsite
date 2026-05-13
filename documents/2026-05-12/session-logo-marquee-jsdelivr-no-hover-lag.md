# Session log – 2026-05-12 (logo marquee reliability + hover lag)

## Summary
Replaced `cdn.simpleicons.org` color URLs with pinned **jsDelivr** raw SVGs (`simple-icons@16.19.0/icons/{slug}.svg`) and `brightness-0 invert` for consistent white marks. Added `onError` to hide any failed fetch. Removed hover-driven `animationDuration` updates from `InfiniteSlider` (they restarted the CSS keyframes and caused cursor lag). Hero marquee wrapper is `pointer-events-none` so the custom cursor does not fight the strip.

## Changes
- Edited `src/lib/heroLogoCloudLogos.js`
- Edited `src/components/ui/InfiniteSlider.jsx`
- Edited `src/components/ui/LogoCloud.jsx`
- Edited `src/components/sections/HeroScrollExpand.jsx`

## Notes
- If a slug is ever renamed in Simple Icons, swap the slug or vendor the SVG under `public/`.

## Next steps
- None.
