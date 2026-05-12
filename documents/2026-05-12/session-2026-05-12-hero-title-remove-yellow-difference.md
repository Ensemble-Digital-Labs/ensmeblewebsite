# Session log – 2026-05-12 — Hero title: remove yellow cast from "see-through" text

## Summary
The desktop hero title (`WELCOME TO` / `ENSEMBLE` / `DIGITAL LABS`) was reading visibly yellow because we'd put `mix-blend-difference` on the wrappers and the hero plate is dominated by navy/blue. `difference(white, blue) ≈ yellow`, so the math forced the cast — it wasn't a font color issue. Switched the desktop lines to plain white with a soft black drop-shadow so they stay readable over the image without any color shift.

## Why it was yellow
`mix-blend-difference` per pixel does `|fg − bg|` per channel. With `text-white` (`255,255,255`) over a navy-blue backdrop (low R, low G, high B), the result is roughly `(255, 255, 0)` — pure yellow. The hero bg image (`digital-health-network-hero-bg.png`) plus the navy gradient overlay (`#050816`) are very blue-dominant, so every letter shifted warm.

## Changes
- `src/components/sections/HeroScrollExpand.jsx`
  - Desktop `wordTop` (`<p>` "Welcome to"): `mix-blend-difference` removed; added `drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]`.
  - Desktop `wordMid` (`<h1>` "Ensemble"): `mix-blend-difference` removed; added `drop-shadow-[0_4px_28px_rgba(0,0,0,0.6)]`.
  - Desktop `wordBottom` (`<p>` "Digital Labs"): same treatment as `wordMid`.
  - Updated the `ShutterWord` JSDoc to explain why we no longer use `mix-blend-difference` here (and that the slice colors are still normal-blend on top).

Mobile/tablet branch was left alone in this pass — I'll follow up if the same yellow-cast issue appears at small widths.

## Notes
- The shutter slice colors (`--color-growth-from` for top, white-ish for mid, `--color-growth-to` for bot) are still normal-blend, so the entry/exit shutter still flashes with the growth accent palette. Only the resolved base color changed (yellow → clean white).
- Drop-shadow values picked to match the existing depth language on the hero card (`shadow-[0_50px_140px_-30px_rgba(0,0,0,0.7)]`) — soft, far-throw, low opacity, no halo.
- If a true "see-through" effect is needed later without the warm shift, the right technique is `background-clip: text` with the bg image as the fill (or `mix-blend-exclusion` with a non-saturated backdrop). Not doing that now per "safe-editing" — the simpler fix matches what the user asked for ("not yellow").

## Next steps
- Visual check across 1024 / 1440 / 1920 / 2560 to confirm the shadow stays subtle and doesn't muddy the text on bright frames of the video card.
