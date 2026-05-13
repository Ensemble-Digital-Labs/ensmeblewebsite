# Session log – 2026-05-12 (fullscreen nav ambient background)

## Summary
Used `ambient-layer-04.png` as the fullscreen navigation menu backdrop via `ambientAssets.layer04`, with a softer navy scrim and slightly lighter grid/orb overlays so the image reads while keeping link contrast.

## Changes
- Edited `src/components/FullscreenNav.jsx`: import `ambientAssets`; full-bleed `<img>` under `#fullscreen-nav`; adjusted gradient/grid/glow layers; `bg-[#050816]` shell; focus ring offset aligned to `#050816`.

## Notes
- Decorative layers remain `pointer-events-none`; main content stays `z-10`.

## Next steps
- None required; tweak scrim opacities if art feels too strong or too muted on specific displays.
