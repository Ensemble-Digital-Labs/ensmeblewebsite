# Session log – 2026-06-17

## Summary
Swapped WhyChooseUs panel images from Unsplash to local hero-outcomes brand assets. Local paths skip touch viewport resizing in WhyChooseUs.

## Changes
- `src/lib/content.js` — `whyChooseUs.stats[].image` → `/assets/images/hero-outcomes/*.webp`
- `src/components/sections/WhyChooseUs.jsx` — `panelImageForViewport` returns local paths unchanged

## Notes
- Mapping: HIPAA → healthcare exclusive; AI-first → full-stack; revenue-obsessed → revenue card; how-we-grow-practice-bg → one contract card
