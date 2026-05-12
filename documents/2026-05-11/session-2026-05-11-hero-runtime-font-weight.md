# Session log – 2026-05-11 — Hero H1 Runtime + font-weight fix

## Summary

Hero **“Not just a marketing agency.”** (`#page1 h1[data-hero-slide="1"]`) could stay on **Plus Jakarta** because only **`@font-face` weight 400** was registered while the heading uses **`font-bold` (700)** — some browsers then skip the custom family. **Fix:** four **`@font-face`** entries for **Runtime** (same `Runtime-Regular.otf`) at **400 / 500 / 600 / 700**. Added **scoped CSS** `#page1 h1[data-hero-slide='1']` + **`.hero-main-heading`** with explicit Runtime stack. Re-applied **minimal Google Fonts** (Plus Jakarta only), **Tailwind font stacks**, removed **Antique Olive** `@font-face`, **`growthPrimaryNav`** uses **`font-display`** again, **cinematic-footer** duplicate import removed.

## Changes

- **`src/index.css`** — Runtime multi-weight faces; hero title selectors; stacks without Cormorant; body / eyebrow / logo-txt / newsletter
- **`index.html`** — single Plus Jakarta font link
- **`tailwind.config.js`** — `sans` / `display` / `ui` / `mono` / `antique`
- **`src/lib/growthCtaClasses.js`** — `growthPrimaryNav` uses `font-display`
- **`src/components/sections/Hero.jsx`** — `hero-main-heading` on both headline variants
- **`src/styles/cinematic-footer.css`** — remove `@import`; Inter → `ui-sans-serif`; footer giant text stack

## Notes

- If the file is missing at **`/fonts/Runtime-Regular.otf`**, headings fall back to Plus Jakarta.

**Note:** Re-copied **`runtime-font/RuntimeRegular-m2Odx.otf`** → **`public/fonts/Runtime-Regular.otf`** (folder had been empty / untracked).
