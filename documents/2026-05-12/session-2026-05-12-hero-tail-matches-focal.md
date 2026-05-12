# Session log – 2026-05-12 — Hero "Digital Labs" matches "Ensemble"

## Summary
On the laptop (`lg+`) hero, made the "Digital Labs" line use the same size and weight as the focal "Ensemble" word so the two read as a unified two-line wordmark. Mobile/tablet composition untouched.

## Changes
- `src/components/sections/HeroScrollExpand.jsx`
  - Bottom tail line (`wordBottom`):
    - `font-medium` → `font-extrabold`
    - `fontSize` `clamp(1.85rem, 3.8vw, 3.25rem)` → `clamp(4rem, 11vw, 10rem)` (matches focal `ENSEMBLE`)
    - Kept existing `italic`, `uppercase`, `tracking-[0.1em]` and shutter rig — only size + weight changed per request.
  - GSAP initial-state stack repositioned to give the two now-equal-size lines breathing room (no overlap at 1920px+):
    - `wordTop` `y: -150` → `y: -180`
    - `wordMid` `y: -20` → `y: -10`
    - `wordBottom` `y: 110` → `y: 180`

## Notes
- Change is scoped to the desktop branch (`(min-width: 1024px)` matchMedia + the `hidden lg:block` tree). The `< lg` static hero keeps its smaller, calmer tail style.
- Exit animation diagonals (`wordTop` → top-left, `wordBottom` → bottom-right) still clear the viewport cleanly because they translate by `±innerWidth * 0.45` / `±innerHeight * 0.4`, which dominates the initial y offset.
- Shutter entry/exit timings unchanged.

## Update — mirror `ENSEMBLE` exactly
- Per follow-up, the tail line should match the focal word's typography fully — not just size + weight. So on the desktop `wordBottom`:
  - Removed `italic`
  - `tracking-[0.1em]` → `tracking-tight` (same as the focal `<h1>`)
- Final desktop tail classes: `font-display font-extrabold uppercase tracking-tight` with `fontSize: clamp(4rem, 11vw, 10rem)` — character-for-character mirror of `ENSEMBLE`.

## Update — tighter stack + real see-through on all three lines
Two issues called out:
1. The three lines felt too spread out as a wordmark.
2. Only `ENSEMBLE` looked like it "punched through" the background — the lead/tail lines just read as flat white.

Root cause for (2): `mix-blend-difference` was set on the inner per-character base `<span>` inside `ShutterWord`. Each title's wrapping `<p>`/`<h1>` is `position: absolute` + `z-20`, which forms its own stacking context, so the inner span's blend had nothing to mix against — the bg image was outside the blend scope. That's why no line was actually see-through (`ENSEMBLE` just happened to sit over the brightest part of the composition).

Fix:
- `src/components/sections/HeroScrollExpand.jsx`
  - `ShutterWord` base span: dropped `mix-blend-difference`, kept `text-white`.
  - Added `text-white mix-blend-difference` to all three desktop title elements (`wordTop` `<p>`, `wordMid` `<h1>`, `wordBottom` `<p>`). Now the entire title element blends against the bg image / overlay / card behind it.
  - Updated the JSDoc on `ShutterWord` to explain why the blend lives on the wrapper, not the inner span.
  - Tightened the GSAP initial-state stack: `wordTop` `y: -180 → -125`, `wordMid` `y: -10` (kept), `wordBottom` `y: 180 → 168`. Picked these so at the 10rem font cap (2560px+), both gaps stay roughly 12–18px without clipping.

Mobile/tablet branch already had `text-white mix-blend-difference` on each line — no change there.
