# Session log – 2026-05-11 — Display serif (RUNTIME-like)

## Summary

Switched headline/display typography to a **luxury high-contrast serif** similar to the RUNTIME specimen: **Cormorant Garamond** from Google Fonts for `font-display`, CSS heading utilities, and footer watermark. Added **`font-ui`** (Space Grotesk stack) for dense UI like the sticky nav CTA. Removed unused **Orbitron** from the font link.

## Changes

- **`index.html`** — Load Cormorant Garamond (500–700 + italic); drop Orbitron.
- **`tailwind.config.js`** — `display` → Cormorant Garamond; new `ui` → Space Grotesk for controls.
- **`src/index.css`** — `.section-heading-neon` / `--line2` use Cormorant + ligature features; `.logo-txt` serif for wordmark.
- **`src/styles/cinematic-footer.css`** — `.footer-giant-bg-text` serif.
- **`src/components/FullscreenNav.jsx`** — Nav pill CTA uses `font-ui`.

## Notes

- **RUNTIME** (Brandsemut Studio) is commercial; Cormorant Garamond matches the editorial/luxury direction without a license file. To use RUNTIME: add WOFF2 under `public/fonts`, `@font-face`, then set `fontFamily.display` to `"Runtime"` or the actual family name.

## Next steps

- Optional: license RUNTIME and swap `display` stack.
