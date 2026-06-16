# Session log – 2026-06-16

## Summary
Fixed brand portrait frame top border clipping by adding visual-stack parallax headroom, easing scroll travel, and adjusting image crop.

## Changes
- **`src/index.css`** — `.home-popart-visual-stack` top/bottom padding; visual column `min-width: 0`.
- **`src/hooks/useHomePopArtMotion.js`** — Reduced desktop parallax Y travel on main/cards.
- **`src/lib/homeImagery.js`** — Brand portrait `object-position` `50% 42%` → `50% 32%`.
- **`src/components/home/HomePopArtVisualStack.jsx`** — Hover scale `1.04` → `1.02` to avoid edge crop.

## Notes
- Parallax was translating the main card upward past the section edge, clipping the rounded border.
