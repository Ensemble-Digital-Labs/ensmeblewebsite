# Session log – 2026-05-13 (parallax curtain images organized + phase 1)

## Summary
Moved root `curtain 1.png` … `4.png` to `public/assets/images/parallax-pillars/parallax-curtain-01.png` … `04.png`. Added `src/lib/parallaxPillarAssets.js` and wired `parallaxShowcaseContent.pillars[].imageOutside` to those URLs for split-curtain **phase 1**. Relaxed split mode to activate when only `imageOutside` is set; **phase 2** uses optional `imageInside` or a navy glass-style interior with copy until inside art exists. Updated `ParallaxLayerShowcase`, `FILE_TREE.md`.

## Changes
- `public/assets/images/parallax-pillars/parallax-curtain-01.png` … `04.png` (organized from repo root).
- Created `src/lib/parallaxPillarAssets.js`.
- Edited `src/lib/content.js`, `src/components/sections/ParallaxLayerShowcase.jsx`, `FILE_TREE.md`.

## Next steps
- Add `imageInside` per pillar when inside artwork is ready.
