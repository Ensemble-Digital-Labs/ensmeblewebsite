# Session log – 2026-05-13 (card curtain hover-only mouse)

## Summary
Adjusted `CardCurtainReveal` so mouse users get a hover-only reveal: default cursor (no click affordance) and primary-button `mousedown` prevented so clicks do not focus-open the curtain; keyboard Tab still focuses and reveals.

## Changes
- Edited `src/components/ui/CardCurtainReveal.jsx` — `cursor-pointer` → `cursor-default`; `onMouseDown` with `preventDefault` when `hoverCapable` and left button.

## Notes
- `tabIndex={0}` and focus ring remain for keyboard / focus-visible users.

## Next steps
- None unless touch / hybrid edge cases need tuning.
