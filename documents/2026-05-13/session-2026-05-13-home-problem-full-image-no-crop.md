# Session log – 2026-05-13

## Summary
Home problem bars with `image`: removed fixed `min-h` and `absolute` + `object-cover` cropping; image is `block w-full h-auto` so the **full artwork** scales to bar width. Copy stays in an `absolute inset-0` overlay (same left/right third layout). No-image bars unchanged.

## Changes
- Edited `src/components/sections/HomeProblemSection.jsx`
