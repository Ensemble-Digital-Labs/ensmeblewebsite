# Session log – 2026-06-16

## Summary
Replaced PopArt plus CTA below-label hover (layout shift) with contact-FAB style script label reveal to the left of the orb — no vertical shift.

## Changes
- **`src/components/home/HomePopArtCircleCta.jsx`** — New component: GSAP char reveal RTL on hover/focus (matches contact orb pattern).
- **`src/components/home/HomePopArtSectionLayout.jsx`** — Uses `HomePopArtCircleCta`.
- **`src/index.css`** — Fixed-size CTA footprint; absolute positioned gradient script label; removed expanding `label-wrap` styles.

## Notes
- Label uses Dancing Script + growth gradient like `ContactOrbCursorMorph`.
- Orb-only size in document flow; label overlays left on hover.
