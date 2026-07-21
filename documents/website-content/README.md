# Website content (source documents)

Source copy, marketing collateral, and reference PDFs for the Ensemble Digital Labs website. **Not** deployed assets — live images and video used on the site live under `public/`.

## Folder layout

| Folder | Purpose |
|--------|---------|
| `copy-briefs/` | Word/docs with copy instructions for site sections (e.g. About team) |
| `print/` | Flyers, brochures, conference handouts |
| `decks/` | PowerPoint pitch decks (overview, pain/solution loops) |
| `reference/` | Site map and earlier website content PDFs |

## Current files

### copy-briefs
- **Team Capabilities.docx** — About page team section: 4 capability teams (Leadership, Technology, Design, Performance Marketing) instead of individual bios.

### print
- **ensemble_aip_flyer_v4.png** — AIP Conference 2026 one-pager (St. Louis).
- **Ensemble_4Fold_Brochure.pdf** — Folded print brochure (companion to flyer).

### decks
- **ensemble-aip-conference.pptx** — Main company overview deck (services, clients, 90-day plan, tiers).
- **ensemble-pain-solutions.pptx** — 10 pain-point → solution slides for booth conversations.


### video (moved to site assets)
Promo and event footage now live in ``public/assets/videos/``:
- ``ensemble-brand-reel-primary.mp4`` (was Ensemble_1.mp4)
- ``ensemble-brand-reel-short.mp4`` (was video 1.mp4)
- ``ensemble-event-conference.mp4`` (was Event Video (2).mp4)

Paths are exported from ``src/lib/ensemble2026Assets.js`` as ``ensembleSiteVideos``.


### reference
- **ensemble-sitemap-v2.pdf** — Site structure reference (renamed from root).
- **ensemble-website-v2-updated.pdf** — Earlier website content spec (renamed from root).

## Related

- Session work logs: `documents/YYYY-MM-DD/`
- Deployed static build: `deploy/`
- Live site copy in code: `src/lib/content.js`, `src/data/`

