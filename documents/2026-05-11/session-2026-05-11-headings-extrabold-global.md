# Session log – 2026-05-11 (headings extrabold global)

## Summary
Enforced heavier semantic headings site-wide: registered Runtime at `font-weight: 800` and added a `#root` rule so `h1`–`h6` use extrabold unless they explicitly use `font-black`.

## Changes
- Edited `src/index.css` — Runtime `@font-face` for 800; global `#root :where(h1–h6):not(.font-black) { font-weight: 800 !important; }`

## Notes
- Lighter utilities on headings (`font-medium`, `font-semibold`, `font-bold`) no longer win over the global heading minimum. `font-black` (900) is preserved.

## Next steps
- Spot-check hero and any heading that should stay at 700 only; add `font-black` or a scoped exception if needed.
