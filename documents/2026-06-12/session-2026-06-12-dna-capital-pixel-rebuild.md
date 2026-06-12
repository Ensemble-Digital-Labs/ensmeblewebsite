# Session log – 2026-06-12 (DNA Capital pixel rebuild)

## Summary
Extracted dnacapital.com tokens, rebuilt clone with dark theme + particle shader. Fixed white screen on `/dna-capital-clone`.

## View
`npm run dev` → http://localhost:3000/dna-capital-clone

## White screen fix
- Hero was GSAP-hidden (`autoAlpha: 0`) before ScrollTrigger init → blank page
- Root background was transparent on white `#main` fallback
- WebGL shader referenced missing `uv` on Points geometry
- Lenis `overflow-hidden` blocked scroll on clone route

Fixes: native scroll on clone, solid `#070708` bg, hero visible immediately, shader uv removed, WebGL try/catch.

## White screen fix (follow-up — flash then blank)
User still saw brief flash then blank page on refresh.

Root cause: Lenis still initialized ~500ms after load on clone route and conflicted with native `#main` scroll.

Additional fixes:
- `useLocomotiveScroll(..., { nativeOnly: isDnaClone })` in `layout.jsx` — 0ms init, no Lenis
- Tear down stale `window.locomotiveScroll` when entering clone route
- Skip `ScrollTrigger.scrollerProxy` on clone (no GSAP scroll scenes there)
- Removed GSAP section reveals from `DnaCapitalClonePage.jsx`; stats use `IntersectionObserver`
- Deferred WebGL mount 500ms so content paints first
- `AnimatedRoutes.jsx`: bypass Framer Motion wrapper on clone route (no opacity exit)

## Extraction
`extraction tool/output/www.dnacapital.com/` — tokens, 30 screenshots

## Key files
- `src/lib/dnaCapitalShaderHelix.js`
- `src/lib/dnaCapitalTokens.js`
- `src/components/dna-clone/DnaCapitalClonePage.jsx`
- `src/styles/dna-capital-clone.css`
