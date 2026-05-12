# Session log – 2026-05-11 — Larger header / nav

## Summary

Increased the sticky header presence: taller nav bar, larger logo asset, bigger “Get in touch” CTA and hamburger control, aligned scroll padding and hero/carousel top offsets.

## Changes

- **`src/components/AnimatedBrandLogo.jsx`** — Nav lockup height/max-width scaled up (e.g. up to `lg:h-[3.75rem]`, `max-w` 340px).
- **`src/index.css`** — `.nav` padding + `min-height`; `.nav .button-menu` gap uses responsive clamp.
- **`src/components/FullscreenNav.jsx`** — CTA and menu button sizes; hamburger line spacing ±10px / `w-7`; fullscreen menu link clamp slightly larger; inner overlay top padding increased.
- **`src/app/layout.jsx`** — `#main` `scroll-pt` 5.5rem → 6.75rem.
- **`src/components/sections/Hero.jsx`** — Top padding increased so content clears the taller bar.
- **`src/components/sections/Carousel3D.jsx`** — Sticky section top padding increased to match.
