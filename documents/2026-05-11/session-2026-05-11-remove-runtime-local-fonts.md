# Session log – 2026-05-11

## Summary
Removed local **Runtime** font assets and all code references. Display typography now relies on **Fraunces** + **Plus Jakarta Sans** (Google Fonts) only.

## Changes
- Deleted **`runtime-font/`** (project root copy + misc).
- Deleted **`public/fonts/Runtime-Regular.otf`** and removed empty **`public/fonts/`** directory.
- **`src/index.css`** — removed all **`@font-face`** rules for `Runtime`; dropped `'Runtime'` from font stacks.
- **`tailwind.config.js`** — `display` / `antique`: removed `Runtime` from stacks.
- **`src/styles/cinematic-footer.css`** — removed `Runtime` from stack.
- **`index.html`** — shortened Fraunces comment.
- **`documents/2026-05-11/runtime-font-similar-alternatives.md`** — updated for no local file; Fraunces row in table.
- **`.cursor/rules/completion-priorities.mdc`**, **`COMPLETION_GUIDE.md`** — font checklist aligned with Google Fonts–first setup.

## Notes
- To use a licensed Runtime (or any) file again: add WOFF2 under `public/fonts/`, `@font-face`, and extend Tailwind `fontFamily` if needed.
