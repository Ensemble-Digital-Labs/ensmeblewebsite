# Session log – 2026-06-13 (Lama Lama local mirror)

## Summary
Built a **full local mirror** of lamalama.com under `public/lamalama-mirror/` — 25 HTML pages, 400+ assets, theme CSS/JS/fonts, and Vite code-split chunks. `/lamalama-clone` now defaults to the local mirror.

## How to use
```bash
npm run mirror:lamalama      # full crawl + assets + JS chunks
npm run dev                  # open http://localhost:3000/lamalama-clone
```
- `?live=1` — fallback to live lamalama.com iframe

## Changes
- **`scripts/mirror-lamalama-site.mjs`** — crawl pages, download wp-content, rewrite URLs to `/lamalama-mirror/`
- **`scripts/fetch-lamalama-js-chunks.mjs`** — downloads Vite chunks (WebGL app bundle)
- **`LamaLamaClonePage.jsx`** — local mirror default
- **`.gitignore`** — mirror assets excluded (run script locally); `manifest.json` + `.gitkeep` tracked

## Mirrored
- Home, About, Contact, Work, 4× Services, NL + 16 case study pages
- SuisseBPIntl + Sometype fonts, main CSS/JS, 23 JS chunks
- Images/uploads referenced from HTML

## Limitations
- **HLS video** (bunny CDN `.m3u8`) stays remote — needs network for showreel playback
- Some meta-tag false positives in failed asset list (harmless)
- Re-run `mirror:lamalama` to refresh after lamalama.com updates
