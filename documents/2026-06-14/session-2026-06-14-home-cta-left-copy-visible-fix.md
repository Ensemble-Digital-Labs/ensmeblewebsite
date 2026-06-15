# Session log – 2026-06-14 (home CTA left copy visible fix)

## Summary
Fixed the home contact CTA left text block staying invisible. Mask scroll-reveal animations (`InfluxEyebrow`, `InfluxSectionTitle`, `InfluxLead`) kept copy clipped at `translateY(110%)` because the CTA section’s reveal trigger did not reliably fire on scroll.

## Changes
- **`src/components/home/chapters/HomeChapterCta.jsx`** — Replaced mask-reveal components with always-visible typography; removed `data-home-mask-group`.
- **`src/index.css`** — Added `#home-cta .home-cta-copy` z-index for stacking clarity.

## Notes
- Form was always visible (no mask gating); left column depended on GSAP mask group that missed the last viewport band.
- Critical conversion copy should not depend on scroll reveal.

## Next steps
- None.
