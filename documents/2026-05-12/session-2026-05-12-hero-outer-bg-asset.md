# Session log – 2026-05-12 (hero outer background asset)

## Summary
Moved the user-provided hero art from repo root into **`public/assets/images/backgrounds/`** as **`hero-scroll-expand-outer-bg.png`**, registered it in **`backgroundAssets`**, and set **`HeroScrollExpand`** defaults (`bgImageSrc` + video **`posterSrc`**) to use it for the outer / full-bleed hero plate.

## Changes
- Added `public/assets/images/backgrounds/hero-scroll-expand-outer-bg.png` (renamed from `ChatGPT Image May 12, 2026, 03_44_22 PM.png`; root copy removed).
- `src/lib/backgroundAssets.js` — `heroScrollExpandOuter`.
- `src/components/sections/HeroScrollExpand.jsx` — default `bgImageSrc` / `posterSrc` → `heroScrollExpandOuter`.
- `FILE_TREE.md` — listed new background file.

## Notes
- Inner card media remains **`/assets/videos/hero-background.mp4`** unless overridden via props.

## Next steps
- Optional: compress to WebP under same basename if bundle size matters.
