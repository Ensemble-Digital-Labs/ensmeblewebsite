# Session log – 2026-06-17

## Summary
Fixed home DNA helix cold-start issues: fade now waits for WebGL particles to render, mobile GPU load reduced, GLB/Draco preloaded from same origin (Netlify).

## Changes
- Created src/lib/helixReady.js — ensemble:helix-ready / fail events gate intro fade
- Created src/lib/dnaHelixPerformance.js — mobile particle cap (6500), lower pixel ratio, fewer stars
- Updated useHomeHelixIntro.js — start GSAP fade only after waitForHomeHelixReady()
- Updated DnaCapitalHelixCanvas.jsx — signal ready after first frame with helix particles
- Updated dnaCapitalModelParticles.js — self-hosted Draco at /draco/, mobile particle cap
- Updated dnaCapitalShaderHelix.js — mobile renderer options
- Updated Home.jsx — early loadDnaCapitalParticleAssets() prefetch
- Updated index.html — preload GLB + Draco WASM
- Added public/draco/ — Draco decoder files for same-origin load

## Notes
- First visit may still show brief static wash while JS parses; fade no longer runs into empty canvas
- Deploy to Netlify and test private-mode first load on iPhone
# Session log - 2026-06-17 (social dock pointer fix)

## Summary
Fixed mobile social dock: hidden link orbs were still tappable because __orb forced pointer-events: auto.

## Changes
- popart-contact-orb.css - link-orb pointer-events none when closed; visibility hidden on stack
- SocialLinks.jsx - aria-hidden, tabIndex -1, inert when dock closed
## Update - mobile nav logo color shift
- index.css: pause nav lockup glow animation when menu open; no filter override
- fullscreen-nav-menu.css: E mark uses solid fills, normal blend (no hologram screen mode)
## Update - nav showcase frame fit (laptop)
- FullscreenNav.jsx: fs-nav-showcase-media-frame with object-contain
- fullscreen-nav-menu.css: frame styles for laptop; E mark width uses panel not 50vw
## Update - Our work masonry grid alignment
- Equal 4-col spans for all right tiles on laptop (was 3+5 misaligned bottom row)
- Header + CTA span full grid width
- Card media: flex center + padding so logos fit frames
- Tablet: explicit grid placement for tiles 0-4
## Update - Our work masonry frame fit
- object-cover fills card frame; lighter bottom-only gradient overlay
## Update - work masonry logo top visibility
- object-position center top; hover scale 1.02 with transform-origin top
## Update - hide home Process section
- homeDeckActs.js: HOME_PROCESS_SECTION_ENABLED = false
## Update - home logo scroll to top
- NavPixelLink: same-route / click scrolls to top via Lenis or smooth native scroll
