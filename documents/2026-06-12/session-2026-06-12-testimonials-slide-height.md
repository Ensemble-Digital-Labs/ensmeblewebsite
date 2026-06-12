# Session log – 2026-06-12 (testimonials slide height)

## Summary
Fixed home testimonials carousel causing the page to jump vertically when changing slides — varying quote lengths were resizing the section on each slide change.

## Changes
- `src/components/home/influx/HomeInfluxTestimonials.jsx` — stack all slides in one CSS grid cell (opacity crossfade); container height locked to tallest slide; `overflow-anchor: none` on region; subtle avatar placeholder bg

## Notes
- Slide content fades; layout height no longer changes between testimonials
- Dots remain outside the stacked grid so pagination stays stable
