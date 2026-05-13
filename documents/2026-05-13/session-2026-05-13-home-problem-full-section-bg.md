# Session log – 2026-05-13

## Summary

Extended **`hero-bg-ensemble-01`** (`ambientAssets.ensemble01`) to the full **`#home-problem`** section: absolute full-height wash + navy gradient scrim behind headline, pain bars, and “Did you know?” band. Removed the intro-only rounded card wrapper.

## Changes

- Edited `src/components/sections/HomeProblemSection.jsx` — section-level background stack (`z-0`); headline restored to simple centered block; pain list wrapper `relative z-[1]`.

## Notes

- Section keeps `bg-[#050816]` as base while the image loads.
- Lead stays `text-zinc-300` for contrast on the wash.
