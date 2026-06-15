# Session log – 2026-06-14 (fix picture layout jump on growth chart)

## Summary
Fixed vigorous growth-chart jump on load caused by unsized `<picture>` wrapper after WebP rollout (not GSAP).

## Changes
- **`src/components/ui/ResponsivePicture.jsx`** — `<picture className="block h-full w-full">` sizing shell; classes stay on inner `<img>`
- **`src/index.css`** — `.home-popart-visual-stack__card--graphic picture` fills card

## Notes
- Before WebP: single `<img h-full w-full>` filled the card immediately.
- After WebP: inline `<picture>` collapsed until decode, then snapped when WebP loaded — looked like violent movement on chart overlays.
