# Session log – 2026-05-12 – Hero scroll-expand: text through image

## Summary
Applied `mix-blend-difference` to all three title lines on both desktop and
mobile, mirroring the `textBlend` mode in the reference `ScrollExpandMedia`
component. The title now "punches through" the layered images behind it:
white letterforms invert against bright areas of the background and card
image and stay light against the dark navy canvas.

## Changes
- **Edited:** `src/components/sections/HeroScrollExpand.jsx`
  - Added `mix-blend-difference` to:
    - Desktop lead `<p>`, focal `<h1>`, tail `<p>` (the absolutely-positioned
      animated lines)
    - Mobile lead `<p>`, focal `<h1>`, tail `<p>` (the static stacked lines)
  - Removed the `drop-shadow-[...]` utilities from those elements — drop
    shadows are rasterized through the blend and read as dim halos, which
    fights the punched-through effect. Pure flat color is what the blend
    needs to look crisp.
  - Did **not** add `isolation: isolate` on the text elements — that creates
    a new stacking context for the element, which means the blend has
    nothing behind it to blend against. The text needs to sit in the *same*
    stacking context as the bg + card layers so it can see them.

## How the effect reads
- Over the dark navy background → letters stay near-white (white minus dark
  navy ≈ white), so legibility is preserved.
- Over the bright card image → letters invert toward the complementary
  color of the pixel behind them, giving the "ink soaked into the image"
  appearance from the reference screenshot.
- During scroll, as the card grows behind the title and the title slides
  off-screen, the inverted colors shift in real time.

## Decisions / notes
- Kept overlays as-is for now (bg overlay GSAP-driven `0.55 → 0.22`, card
  gradient `from-black/35 ... to-black/15`). If the user wants the blend
  more dramatic, the bg / card overlays can be softened in a follow-up.
- Drop shadows could be re-introduced as a non-blended outer halo via a
  sibling element if the user wants extra depth, but starting clean.

## Files touched
- Edited: `src/components/sections/HeroScrollExpand.jsx`
