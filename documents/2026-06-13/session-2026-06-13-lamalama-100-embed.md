# Session log – 2026-06-13 (Lama Lama 100% embed)

## Summary
Switched `/lamalama-clone` from a React approximation to a **full-viewport iframe embed** of the real [lamalama.com](https://lamalama.com/) site — the only practical path to 100% fidelity (WebGL hero, theme JS, fonts, expand panels, subpages).

## Changes
- **`src/components/lama-lama-clone/LamaLamaClonePage.jsx`** — iframe to live site; `?mirror=1` uses local HTML snapshot
- **`src/styles/lama-lama-clone.css`** — embed-only styles (overflow lock, full viewport)
- **`src/app/layout.jsx`** — no scroll on `#main` for Lama Lama iframe mode
- **`scripts/mirror-lamalama-home.mjs`** — saves homepage HTML to `public/lamalama-mirror/index.html`
- **`public/lamalama-mirror/index.html`** — mirrored homepage (428KB, absolute CDN URLs)
- **`package.json`** — `npm run mirror:lamalama`

## Notes
- Default URL: `http://localhost:3000/lamalama-clone` → embeds `https://lamalama.com/`
- Offline attempt: `http://localhost:3000/lamalama-clone?mirror=1` (may break if theme JS expects lamalama.com origin)
- Previous React recreation files kept in repo (`LamaLamaHeroVideo.jsx`, `lamaLamaContent.js`, etc.) but no longer routed
- Requires network for live embed; lamalama.com does not send `X-Frame-Options`

## Next steps (optional)
- Full offline mirror: download CSS/JS/fonts + all crawled pages into `public/lamalama-mirror/`
- Remove unused recreation components if no longer needed
