# Session log – 2026-05-11

## Summary
Documented Google Fonts (and others) similar to the commercial **Runtime** display serif, and wired **Fraunces** as the first face in the display stack so headlines use a real multi-weight serif while keeping **Plus Jakarta Sans** and local **Runtime.otf** as fallbacks.

## Changes
- `index.html` — added **Fraunces** stylesheet (weights 400–900).
- `tailwind.config.js` — `fontFamily.display` / `antique`: **Fraunces** first, then Jakarta, then Runtime.
- `src/index.css` — hero, neon headings, fullscreen menu labels, `.logo-txt`: same Fraunces-first stack.
- `src/styles/cinematic-footer.css` — footer giant text: Fraunces-first stack.
- `documents/2026-05-11/runtime-font-similar-alternatives.md` — reference list and swap notes.

## Notes
- Marketplace “Runtime” is typically a **display serif**; Fraunces is the default substitute for weight fidelity. If the team’s OTF is a different “Runtime” (sans), see the sans section in the alternatives doc.
