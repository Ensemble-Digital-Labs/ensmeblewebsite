# Session log – 2026-05-12 (fullscreen nav — showcase 50% + snap + titles)

## Summary
On laptop, **Selected work** is **exactly half** the overlay (`lg:w-1/2`), with the nav column taking the other half and a light read surface + border. The showcase list uses a **fixed-height scrollport** (`~72svh`), **`scroll-snap-type: y mandatory`**, and **`snap-center`** on each card with tall **`min-h`** slots so **one case dominates** with **small vertical peeks** of neighbors. Case titles use a **larger `clamp`** on `lg` and **`line-clamp-3`** so slot height stays predictable. Image uses **`absolute` + `object-cover`** inside a flex-growing frame.

## Changes
- Edited `src/components/FullscreenNav.jsx`: full-width row on `lg` (`lg:max-w-none lg:gap-0`); nav half + subtle `bg` / `border-r`; showcase half + scroll snap + `.fs-nav-showcase-scroll`.
- Edited `src/index.css`: reduced-motion disables showcase scroll snap.

## Notes
- Below `lg`, layout unchanged (no showcase column).
- `prefers-reduced-motion`: `scroll-snap-type` disabled on `.fs-nav-showcase-scroll` in `index.css`.
