# Session log – 2026-06-16 (mission marketing-collateral showcase)

## Summary
Wired marketing-collateral-showcase.webp into the homepage Our mission (#home-passion) PopArt visual column, replacing the blend-icon stack and floating overlays.

## Changes
- src/lib/homeImagery.js — HOME_PASSION_VISUAL / HOME_PASSION_IMAGE now point to ensemble2026Home.showcase.marketingCollateral
- src/components/home/chapters/HomeChapterPassion.jsx — uses HOME_PASSION_VISUAL only (no overlay cards)
- src/lib/ensemble2026Assets.js — documented showcase asset as wired to mission section
- src/index.css — mission visual stack styles for square showcase crop

## Notes
- Source art is 1254x1254; cropped in the left column to emphasize the floating icon collage

## Update — no crop
- Mission showcase switched from object-fit cover to contain with 1:1 frame so full marketing-collateral image is visible.
- Files: homeImagery.js (fit: contain), index.css (contain + center, larger lg max-width).

## Update — way bigger
- Mission showcase max-width scaled up across breakpoints (up to ~58rem on 2xl).
- Desktop grid widened to 7/5 (visual/copy) for mission only.
- Removed image padding and mobile translateY shrink on passion stack.

## Update — mission copy breathing room
- Rebalanced desktop grid to 5/7 (visual/copy) so mission statement is not squeezed.
- Copy column stretches full width, hugs right edge (minimal right padding, margin-inline-start auto).
- Image capped to its grid column (max-width 100%) instead of vw overflow.

## Update — shift right toward sidebar
- Mission block aligned to right rail: auto left margin, rail gutter padding only, helix/DNA left-column overrides removed for #home-passion.

## Update — bigger showcase + surrounding icons
- Mission visual scaled up (up to ~48rem desktop) with left bleed; copy column unchanged (7/12 grid).
- Added 4 floating blend overlays: telehealth-heartbeat, practice-growth, digital-health-network, healthcare-partnership.

## Update — circular center + scattered icons + copy shift
- Main showcase clipped to circle with soft border (no square frame).
- Supporting icons repositioned wider across mission visual field.
- Our mission copy column shifted right via margin/padding only (no type scale changes).

## Update — mission copy further right
- Increased copy column margin-left and grid gap; nudged visual stack left to clear overlap.
- copy-inner max-width locks line length so text does not squish when shifted.

## Update — large laptop blank space fix
- Removed 56rem cap on helix-rail PopArt sections; they now fill the content column.
- Widened popart chapter inner container to 80rem (1280px+) / 84rem (1440px+) minus helix gutter.

## Update — larger mission statement text
- #home-passion headline and body paragraph font sizes increased via CSS only.

## Update — icons orbit circle rim
- Mission supporting icons repositioned to circle edge via center-orbit layout; biased left/away from copy column.

## Fix — mission icons stacking
- Switched icon placement from transform to top/left calc orbit positions.
- Added end-of-file !important overrides to beat global PopArt card rules that were resetting positions.

## Update — work section top cleanup
- Removed accent icon tile above work heading.
- Removed fake browser chrome bar (traffic dots + View case study) above featured case study preview.
