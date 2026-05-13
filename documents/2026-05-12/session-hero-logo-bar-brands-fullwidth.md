# Session log – 2026-05-12 (hero logo bar — brands + full width)

## Summary
Hero bottom marquee now uses Simple Icons CDN marks for Google, GitHub, Cursor, NVIDIA, and OpenAI (white `#ffffff` on dark). Enlarged logo heights, wider gap/speed, softer edge mask, and `inset-x-0 w-full max-w-none` on the strip so it spans the hero pin edge-to-edge. No headline lines (never added “Trusted by…” copy here). Infinite loop unchanged (`InfiniteSlider` + CSS keyframes).

## Changes
- Edited `src/lib/heroLogoCloudLogos.js`
- Edited `src/components/ui/LogoCloud.jsx`
- Edited `src/components/sections/HeroScrollExpand.jsx`

## Notes
- Logos load from `cdn.simpleicons.org` (browser); for offline/air-gapped builds, vendor SVGs under `public/` and point `src` there.
- `referrerPolicy="no-referrer-when-downgrade"` on `<img>`.

## Next steps
- If any icon slug fails in a region, swap to a hosted local SVG for that brand.
