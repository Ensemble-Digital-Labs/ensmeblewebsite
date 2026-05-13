# Session log – 2026-05-13 (parallax phase-2 inside images)

## Summary
Organized four new phase-2 PNGs from the repo root into `public/assets/images/parallax-pillars/` as `parallax-inside-01.png` … `04.png` (sources: `ChatGPT Image May 13, 2026, 11_17_* (2)(4)(6)(8).png`). Added `parallaxInsideAssets` in `parallaxPillarAssets.js` and set each pillar’s `imageInside` to the matching index with its curtain pair. Updated `FILE_TREE.md`.

## Changes
- `public/assets/images/parallax-pillars/parallax-inside-01.png` … `04.png`
- `src/lib/parallaxPillarAssets.js`, `src/lib/content.js`, `FILE_TREE.md`

## Notes
- Mapping: pillar 1 ↔ curtain01 + inside01, … pillar 4 ↔ curtain04 + inside04. Reassign in `content.js` if art order should differ.

## Next steps
- None.
