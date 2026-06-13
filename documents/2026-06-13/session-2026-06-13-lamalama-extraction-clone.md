# Session log – 2026-06-13 (Lama Lama extraction + clone)

## Summary
Ran extraction tool on [lamalama.com](https://lamalama.com/) (10 pages) and built an isolated homepage recreation at `/lamalama-clone` using extracted tokens and site copy.

## Extraction
- **Output:** `extraction tool/output/lamalama.com/`
- **Pages:** home, about-us, contact, work, services (×4), nl
- **Artifacts:** DESIGN.md, tokens.json, tailwind.css, 55 screenshots, report.html, proof.html
- **Tokens:** canvas `#f9f4eb`, ink `#010101`, nav `#1a1c1c`, fonts SuisseBPIntl + Sometype

## Clone (Phase 1 — homepage)
- **`/lamalama-clone`** — loader %, nav, hero video panel, featured work, services, client marquee, culture, contact
- **`src/lib/lamaLamaTokens.js`**, **`lamaLamaContent.js`**
- **`src/styles/lama-lama-clone.css`**
- **`src/components/lama-lama-clone/LamaLamaClonePage.jsx`**
- Layout/routes: native scroll, no Ensemble nav/footer (same pattern as DNA clone)

## Notes
- Component block PNGs: 0 (interaction capture timed out on heavy WebGL site)
- Review extraction: `extraction tool/output/lamalama.com/report.html`
- **Assets wired (2026-06-13):** hero HLS showreel, project stills, client logos, culture/contact backgrounds, team portrait strip — hotlinked from lamalama.com CDN
- **Still not pixel-perfect:** WebGL hero, expand interactions, pitchdeck section, about subpages, SuisseBPIntl font license

## Update — real assets wired
- **`src/lib/lamaLamaAssets.js`** — scraped media URLs (hero m3u8, Hear/Moov/Gardeners/NeuronsLab, client PNGs, culture + contact)
- **`src/components/lama-lama-clone/LamaLamaHeroVideo.jsx`** — HLS autoplay via `hls.js` (Safari native fallback)
- **`LamaLamaClonePage.jsx`** — replaced gradient placeholders with real images/video
- **`lama-lama-clone.css`** — project image overlays, logo marquee, culture/contact photo backgrounds
- **`npm install hls.js`**

## Next steps
- Optionally download assets to `public/assets/lamalama-clone/` for offline/CORS resilience
- Add work page + service pages as sub-routes
- Match bracket typography and `( View + − )` expand panels from live site
