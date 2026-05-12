# Session log – 2026-05-11

## Summary
Idle hollow cursor ring now uses the **same 72×72px** footprint as the labeled (CLICK) disc; ring fills the box via `inset: 0`. Removed labeled `scale(1.08)` so both states match visually.

## Changes
- `src/index.css` — `.cursor-brand--idle` 72px; `.cursor-brand__idle` full-bleed ring; dropped `__hud--interactive` rules.
- `src/components/MovingCircle.jsx` — no `cursor-brand__hud--interactive` class.
