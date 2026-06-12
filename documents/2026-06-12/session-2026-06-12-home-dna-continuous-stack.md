# Session log – 2026-06-12 (home DNA continuous stack)

## Summary
Fixed visible gaps between DNA ribbon tiles: merged 11 heavily overlapping layers into one geometry per edge, plus dual-stack infinite scroll wrap.

## Changes
- `src/lib/homeDnaWebgl.js` — `buildStackedRibbonGeometry`, 64% layer overlap, A/B cycle pairs

## Notes
Prior `SEGMENT_OVERLAP=0.92` was step spacing (only ~8% overlap), causing disconnected blobs.
