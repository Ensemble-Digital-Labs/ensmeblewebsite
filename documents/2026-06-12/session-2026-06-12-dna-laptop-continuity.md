# Session log – 2026-06-12 (DNA helix laptop continuity)

## Summary
Fixed DNA strands diverging and stopping mid-page on laptop by bounding horizontal helix lean to viewport size (was scaling with full document height) and improving scroll-height measurement.

## Changes
- `src/lib/homeDnaHelix.js` — lean uses `leanSpan` not `axisLen` for X; edge-based fade; extended y0/y1
- `src/components/home/HomePageDnaCanvas.jsx` — reliable doc height via getBoundingClientRect, scroll/resize remeasure

## Notes
- Root cause: `axisX = cx + sin(tilt) * axisLen * t` pushed edge helices thousands of pixels inward on long pages, then center-fade hid them.
- Follow-up: restored twist via modular sine weaves (`curveLean`) + stronger amp/turns — curves repeat per viewport module so strands stay visible edge-to-edge for full scroll.
