# Session log – 2026-05-11 (fullscreen nav font v2)

## Summary
User still saw the overlay menu link typeface on the UI stack. Added a **high-specificity** `#fullscreen-nav … .fs-menu-label` rule in `index.css` (same Runtime stack as the hero) and a **`fs-menu-label`** class on the menu title span. Normalized **Tailwind `fontFamily`** values to plain names (no nested quotes) for predictable emitted CSS.

## Changes
- `src/index.css` — fullscreen primary menu label font rule.
- `src/components/FullscreenNav.jsx` — `fs-menu-label` on the large link text span.
- `tailwind.config.js` — `sans` / `display` / `ui` / `antique` font stacks without extra quote escaping.

## Notes
- If Runtime still does not appear, check the browser network tab for `/fonts/Runtime-Regular.otf` (404 vs 200).
