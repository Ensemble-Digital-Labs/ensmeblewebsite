# Session log – 2026-04-16 (BackgroundPaths visible + Card dark mode)

## Summary

Fixed invisible floating paths: the SVG used `viewBox="0 0 696 316"` while path coordinates extend to ~y 875 and negative x, so the browser clipped nearly all strokes. Updated `viewBox` to `-560 -220 1320 1120` with `preserveAspectRatio="xMidYMid slice"`, slightly thicker strokes, and removed conflicting `opacity` keyframes on `motion.path`. Adjusted `Card` dark-mode classes so OS dark preference no longer forces `bg-zinc-950` / unreadable body copy on light marketing cards.

## Changes

- `src/components/ui/BackgroundPaths.jsx` — correct viewBox, slice fit, stroke visibility.
- `src/components/ui/Card.jsx` — `dark:` tokens align with `bg-bg-card` and `text-text-primary`.

## Notes

- Hard-refresh the Insights / Case Studies page after deploy if the old bundle is cached.
