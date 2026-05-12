# Session log – 2026-05-11

## Summary
Flattened testimonial-area backgrounds to match the rest of Home: **`ParallaxThemedBackdrop`** (rose/coral radials, grid, hairlines) no longer runs behind **TestimonialsCollage** or **ShareExperienceSection**—both pass a **`layer1`** solid `#050816` fill. Share band outer `bg` updated from `#050a12` to **`#050816`**.

## Changes
- `src/components/sections/TestimonialsCollage.jsx` — `ParallaxDepth` `layer1={flat #050816}`.
- `src/components/sections/ShareExperienceSection.jsx` — section `bg-[#050816]`; `ParallaxDepth` `layer1={flat #050816}`.

## Notes
- `ParallaxThemedBackdrop` unchanged for other pages/sections that still want the art.
