# Session log – 2026-06-15 (blog filter bg stable)

## Summary
Stopped background path lines from shifting when switching insight filter tabs — fixed backdrop to viewport; card-only opacity crossfade.

## Changes
- `src/pages/BlogHub.jsx` — `layer1ClassName` fixed `100dvh` backdrop; memoized paths layer; removed grid unmount/slide/layout animations; min-height on card region

## Notes
- Root cause: content-height changes retiled the absolute SVG path field (`preserveAspectRatio: slice`).
