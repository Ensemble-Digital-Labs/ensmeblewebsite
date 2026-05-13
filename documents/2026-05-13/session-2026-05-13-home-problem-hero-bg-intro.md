# Session log – 2026-05-13

## Summary

Applied **`hero-bg-ensemble-01.png`** behind the Home problem intro (“What’s holding your practice back?” headline + lead) as a contained card with `object-cover`, navy gradient scrim, and slightly brighter lead text for contrast.

## Changes

- Edited `src/components/sections/HomeProblemSection.jsx` — import `ambientAssets`; wrap headline block in a `rounded-2xl` shell with background image (`ambientAssets.ensemble01`), gradient overlay, and inner padding; lead uses `text-zinc-300/95`.

## Notes

- Pain bars and “Did you know?” band unchanged; section shell remains `bg-[#050816]`.
- Image `loading="eager"` + `fetchPriority="high"` since it’s above the fold on Home.
