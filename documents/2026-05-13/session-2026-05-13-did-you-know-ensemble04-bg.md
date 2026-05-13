# Session log – 2026-05-13

## Summary

Added **`hero-bg-ensemble-04.png`** (`ambientAssets.ensemble04`) behind the **“Did you know?”** band: rounded shell, full-bleed `object-cover` image, navy gradient scrim, and existing copy/magnifier UI on `z-[1]`.

## Changes

- Edited `src/components/sections/HomeProblemSection.jsx` — wrapped aside in a `relative isolate` card with image + overlay; removed flat-only `bg-[#050816]` on that column (section root fallback unchanged).

## Notes

- Image `loading="lazy"`; path from `ambientAssets.ensemble04` → `/assets/images/ambient/hero-bg-ensemble-04.png`.
