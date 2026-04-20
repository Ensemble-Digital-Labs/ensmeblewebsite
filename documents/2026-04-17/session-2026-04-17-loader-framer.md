# Session log – 2026-04-17 (Premium dark Loader + Framer Motion)

## Summary
Replaced the light `bg-bg-primary` loader and immediate GSAP fade with a dark med-tech full-screen loading experience using Framer Motion (entrance, progress line, exit). Honors `prefers-reduced-motion` with shorter timing and no blur motion.

## Changes
- `src/components/Loader.jsx` — Dark gradient base, cyan/violet glows, subtle grid + vignette, hairline; logo entrance animation; gradient progress bar; exit fade via `AnimatePresence`; `onExitComplete` wires `onComplete` for Home gating.

## Notes
- Keeps `id="loader"` for compatibility; removed GSAP from this component.
- Build verified after edit.

## Update — larger loader logo
- `AnimatedBrandLogo` `variant="loader"`: taller steps (`h-[4.5rem]` → `lg:h-32`) and wider `max-w` vs `transition`.
- `Loader.jsx`: content column `max-w` widened to match.
