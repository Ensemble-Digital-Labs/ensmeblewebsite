# Session log – 2026-04-09

## Summary
Added a full Cursor rules pack for Ensemble v2: project context, safe editing, design direction (including responsive quality), session logging, completion priorities, code style, documentation-first workflow, and mobile-first responsive development (320px–2560px). Updated `session-logging.mdc` to match the new logging spec while keeping date-folder conventions.

## Changes
- Created `.cursor/rules/project-context.mdc`
- Created `.cursor/rules/safe-editing.mdc` (includes cross-screen validation note)
- Created `.cursor/rules/design-direction.mdc` (includes responsive-quality paragraph)
- Updated `.cursor/rules/session-logging.mdc`
- Created `.cursor/rules/completion-priorities.mdc`
- Created `.cursor/rules/code-style.mdc`
- Created `.cursor/rules/read-docs-first.mdc`
- Created `.cursor/rules/responsive-mobile-first.mdc`
- Created this log under `documents/2026-04-09/`

## Notes
- All eight rules use `alwaysApply: true` so they apply across the workspace.
- **Global Cursor user rules** (optional, in Cursor Settings → Rules): paste a short workflow rule such as: understand structure before edits; brief plan before major changes; smallest effective change; avoid unrelated files; preserve working behavior unless asked; list files to review after changes; prefer project docs (`README`, `documents/`, `COMPLETION_GUIDE`) over guessing.

## Next steps
- Run an audit prompt: read README, `COMPLETION_GUIDE.md`, and `documents/` logs, then report finished / partial / missing items without code changes.
- Optional: trim `alwaysApply` on specific rules later if the combined context feels heavy (Cursor UI).

---

### Update – preserve existing work rule (same day)

## Summary
Added `preserve-existing-work.mdc` so the AI treats the current site as the base: refine and improve incrementally, avoid replacing or reinventing layouts or systems unless explicitly requested. Strengthened `safe-editing.mdc` with matching bullets on incremental improvement and design intent.

## Changes
- Created `.cursor/rules/preserve-existing-work.mdc`
- Updated `.cursor/rules/safe-editing.mdc`

## Notes
- Guiding line for prompts: *Do not redesign or replace my current work. Use the existing implementation as the base and improve it carefully with the smallest effective changes.*
- Full rules set is now nine files (including `preserve-existing-work.mdc`).

---

### Update – project audit (read-only, no code changes)

## Summary
Repo audit: compared `README`, `COMPLETION_GUIDE.md`, `documents/` logs, `App.jsx`, key components, `content.js`, `public/` assets, and `npm run build`. Findings summarized in chat (finished / partial / gaps / suggested order).

## Changes
- None (audit only). Appended this entry to the session log.

## Notes
- See assistant message dated same session for full audit tables and priorities.

---

### Update – step-by-step completion plan (read-only)

## Summary
Documented a safe, production-first completion order (no site rewrite): fix 404s and dead links, hero video asset, form/newsletter wiring, content/legal/SEO, then QA.

## Changes
- None (plan delivered in chat). This append records the plan for the log.

## Notes
- Full ordered steps are in the assistant reply for this prompt.

---

### Update – premium layout + 3D / motion rule

## Summary
Added `premium-layout-3d-motion.mdc` so Cursor prioritizes clean, sleek, modern, carefully composed UI and intentional use of 3D/canvas/motion (Three.js, Pixi, Theatre, GSAP/Locomotive). Linked from `design-direction.mdc` under Motion.

## Changes
- Created `.cursor/rules/premium-layout-3d-motion.mdc`
- Updated `.cursor/rules/design-direction.mdc`

## Notes
- Rule set is now 10 project rules; all use `alwaysApply: true` unless you change it.

---

### Update – Ensemble logo assets wired

## Summary
Added `src/lib/branding.js` and `public/assets/branding/` for official logo files. Main nav (`FullscreenNav`), `Loader`, and `PageTransition` use `ensemble-logo-on-dark.png` with fallback to the existing letter-based wordmark if the file is missing. CSS for `.logo--has-img` / `.logo-img`. Favicon stays `vite.svg` until `favicon.png` is added (see comment in `index.html`).

## Changes
- Created `src/lib/branding.js`
- Created `public/assets/branding/.gitkeep`
- Updated `src/components/FullscreenNav.jsx`, `Loader.jsx`, `PageTransition.jsx`
- Updated `src/index.css` (logo image sizing)
- Updated `index.html` (comment for future favicon)

## Notes
- **Place PNGs in `public/assets/branding/`:** `ensemble-logo-on-dark.png` (required for image logo), `ensemble-logo-on-light.png`, `ensemble-mark.png`, `favicon.png`. Prefer transparent backgrounds for web. Then switch the favicon `<link>` in `index.html` to `/assets/branding/favicon.png` when ready.

---

### Update – point branding at uploaded company logo files

## Summary
Copied uploaded assets to stable names: `ensemble-logo.svg` (from `LOGO – 88.svg`) and `ensemble-logo-light.png` (from `LOGO – 87 (1).png`). Updated `src/lib/branding.js` to use those paths and set favicon to the SVG. Nav/loader/transition already consume `brandLogo.fullOnDark`.

## Changes
- Added `public/assets/branding/ensemble-logo.svg`, `ensemble-logo-light.png` (copies of existing uploads)
- Updated `src/lib/branding.js`
- Updated `index.html` favicon href

---

### Update – logo without background plate, more prominent

## Summary
Removed the solid `#0c0e0e` background `<rect>` from `ensemble-logo.svg` (and `LOGO – 88.svg`) so the lockup is transparent. Increased nav `.logo-img` size and added a light drop-shadow for contrast on varied backgrounds. Loader and page-transition overlays use dark `#0a0a0b` so the light wordmark stays legible; larger logo dimensions on loader/transition.

## Changes
- Edited `public/assets/branding/ensemble-logo.svg`, `LOGO – 88.svg`
- Updated `src/index.css`, `Loader.jsx`, `PageTransition.jsx`, `src/lib/branding.js` comment

---

### Update – much larger prominent logo

## Summary
Increased nav logo height substantially (`clamp` up to ~12rem), widened max-width, `flex-shrink: 0` + `shrink-0` on the nav link. Loader and page-transition logos use larger `clamp` heights and wider max-width. Mobile breakpoint bumps nav logo further.

## Changes
- `src/index.css` (`.logo-img`, `.logo--has-img`)
- `FullscreenNav.jsx`, `Loader.jsx`, `PageTransition.jsx`

---

### Update – logo larger (SVG crop) + GSAP entrance

## Summary
The SVG used a 1500×1500 artboard with the lockup in a small region, so the logo looked tiny at any CSS height. Tightened `viewBox` on `ensemble-logo.svg` / `LOGO – 88.svg` to crop empty space. Increased nav `.logo-img` sizes again. Added GSAP entrance (scale/fade/slide) on nav logo and loader logo; letter fallback staggers. Respects `prefers-reduced-motion`.

## Changes
- `public/assets/branding/ensemble-logo.svg`, `LOGO – 88.svg`
- `src/components/FullscreenNav.jsx`, `Loader.jsx`
- `src/index.css`
