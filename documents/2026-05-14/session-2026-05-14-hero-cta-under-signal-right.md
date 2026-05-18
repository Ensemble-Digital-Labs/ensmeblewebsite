# Session log – 2026-05-14

## Summary
Moved the two home hero CTAs from the left copy column to the right column, directly under the Signal dashboard, with `lg:justify-end` so they align to the right on laptop/desktop. Below `lg`, the column stacks after the subhead (Signal, then CTAs); small breakpoints keep centered/wrapped row layout for tap targets.

## Changes
- `src/components/home/HomePageSections.jsx` — hero CTA `<div>` relocated under `HeroSignalExpandable` (outside the tilt wrapper so buttons stay unrotated).

## Notes
- Hero reveal stagger order now runs eyebrow → headline → subhead → signal → CTAs.
