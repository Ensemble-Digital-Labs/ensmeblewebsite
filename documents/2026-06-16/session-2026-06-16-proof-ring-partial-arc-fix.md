# Session log – 2026-06-16 (proof ring partial arc fix)

## Summary
Fixed partial blue ring arc in Partners stats: replaced `<circle>` + GSAP CSS dash props with an explicit SVG path, `stroke-dasharray`/`stroke-dashoffset` as string attributes (avoids GSAP `px` units), and a single GSAP proxy tween driving count + ring together.

## Changes
- `src/hooks/useDnaStyleCountUp.js` — `RING_PROGRESS_PATH`, `measureRingLength`, attribute-based `setRingDrawProgress`, proxy `animState.progress`
- `src/components/shared/DnaStyleStatRing.jsx` — progress stroke is now a `<path>` starting at 12 o'clock
- `src/styles/dna-style-stat-ring.css` — removed SVG `rotate(-90deg)` (path handles start point)

## Notes
- GSAP `strokeDasharray: number` can serialize as `289px`, which breaks SVG circle draw math and shows only a partial arc.
- Two-value dasharray (`length length`) + measured `getTotalLength()` on the path keeps dash math aligned.

## Next steps
- Hard refresh; scroll to Partners — rings should draw fully around each stat.
