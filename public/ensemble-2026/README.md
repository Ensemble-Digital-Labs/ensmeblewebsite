# Ensemble 2026 assets

**Canonical folder for all new site media.** The legacy `public/assets/` and `public/revamp-assets/` trees are deprecated — do not add new files there.

Paths are served from the site root, e.g. `/ensemble-2026/home/hero/hero-background.webp`.

## Code registry

All paths are defined in `src/lib/ensemble2026Assets.js`. When you add a file here, use the **exact filename** from that file or from `ASSET-MANIFEST.md`.

## Folder map

| Folder | Purpose |
|--------|---------|
| `branding/` | Logos, favicon, lockups |
| `fonts/` | Self-hosted WOFF2 (optional — Matter lives in `public/assets/fonts/` until moved) |
| `videos/` | Intro loader, hero loops |
| `icons/capabilities/` | Homepage capability grid icons (SVG) |
| `home/` | Homepage chapter photography & collage art |
| `pages/` | Route hero / band art (About, Services, Case Studies, Contact, Insights) |
| `shared/` | Reusable ambient washes and section backgrounds |
| `previews/` | Tall full-page scroll captures for work showcase |

## File rules

- **Photos:** WebP preferred (`.webp`), sRGB, 80–85 quality
- **Logos / icons:** SVG where possible; PNG only when raster is required
- **Video:** MP4 (H.264), muted, loop-friendly for loader
- **Naming:** lowercase, hyphenated — no spaces (e.g. `story-main.webp`)
- **Art direction:** premium healthcare growth — clinical credibility, warm light, navy/teal palette; no cyber HUD, no stock “server room” clichés

## Checklist

See **`ASSET-MANIFEST.md`** for every slot, suggested dimensions, and which component uses each file.

See **`GENERATION-PROMPTS.md`** for copy-paste AI/editorial prompts (anti–AI-stock look).

## Migration status

- `src/lib/homeImagery.js` → wired to this folder
- `src/lib/branding.js`, `content.js`, `Loader.jsx` → migrate next as files land
