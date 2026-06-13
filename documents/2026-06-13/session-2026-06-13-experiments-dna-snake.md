# Session log – 2026-06-13 (experiments DNA snake page)

## Summary
Added an internal `/experiments` page for motion lab ideas. First live experiment: a centered DNA helix reusing the home WebGL stack with autonomous top→bottom snake flow (continuous wave + scroll offset loop). Page is background-only — no cards or copy.

## Changes (update 2)
- **`src/lib/experimentDnaLPath.js`** — L-shaped path: vertical leg + corner + horizontal leg; morphs right→left on scroll.
- Rewired snake WebGL to follow L path with scroll-driven anchor (section 1: right↓ + bottom←, section 2: left↓ + bottom→).
- Two invisible `100dvh` scroll sections on `/experiments`; native scroll on experiments route.

## Changes (update 6)
- **Responsive-normalized layout** — x from width fractions, y from height fractions; breakpoint tuning at 320/480/768/1024/1440px.
- Removed `640px` viewport floor (was skewing mobile doc height vs scroll sections).
- Consistent helix turns per cycle + responsive particle `sizeScale` across breakpoints.

## Changes
- **`src/lib/experimentDnaSnake.js`** — Snake helix config, doc-height loop, render with animated offset and boosted wave time.
- **`src/components/experiments/ExperimentDnaSnakeCanvas.jsx`** — Fixed viewport WebGL canvas for snake motion.
- **`src/components/experiments/ExperimentIdeasPage.jsx`** — Full-viewport helix only (no cards/copy).
- **`src/pages/Experiments.jsx`** — Route page wrapper.
- **`src/styles/experiments.css`** — Dark glass card styling over DNA canvas.
- **`src/app/AnimatedRoutes.jsx`** — Route `/experiments`.
- **`src/app/layout.jsx`** — Transparent main surface on experiments; hide site footer on lab page.

## Notes
- Visit **`/experiments`** to preview the snake DNA flow.
- Reuses `createHomeDnaWebgl` / home particle shaders; intro skipped (helix visible immediately).
- `prefers-reduced-motion`: static wash fallback, no RAF loop.

## Next steps
- Tune snake speed / wave amplitude from feedback.
- Add more experiment cards as ideas are tested.
