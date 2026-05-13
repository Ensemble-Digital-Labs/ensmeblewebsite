# Session log – 2026-05-12 (fullscreen nav — hide showcase scrollbar)

## Summary
Hid the vertical scrollbar on the **Selected work** scroll rail (`#fullscreen-nav .fs-nav-showcase-scroll`) via CSS (`scrollbar-width: none`, WebKit `::-webkit-scrollbar`, `-ms-overflow-style`). Removed Tailwind **`[scrollbar-gutter:stable]`** so no reserved gutter strip.

## Changes
- Edited `src/index.css`
- Edited `src/components/FullscreenNav.jsx`
