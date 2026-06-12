# Session log – 2026-06-12

## Summary
Ran the local extraction tool on [Groote Schuur Hospital Trust](https://www.gshtrust.co.za/). Crawled 8 pages, extracted design tokens, and emitted full artifacts (DESIGN.md, tailwind.css, preview/proof/report HTML).

## Changes made
- Created `extraction tool/output/www.gshtrust.co.za/` (local-only; folder is gitignored)

## Extraction stats
- **Pages crawled:** 8 (home, about-us, financials, media, events, our-impact, our-hospital)
- **DOM elements:** 2,588
- **Colors:** 12 tokens
- **Typography levels:** 15
- **Component types:** 5 (Link, Button, etc.)
- **Framework:** Bootstrap
- **Dark mode:** not detected
- **Screenshots:** 40
- **Proof coverage:** 100% (ΔE < 12)
- **Duration:** ~242s extract + ~26s emit-artifacts

## Key design tokens (from DESIGN.md)
- **Accent red:** `#ed1e2e` (primary buttons)
- **Green:** `#00bf9a`
- **Ink:** `#2b2b2b`
- **Canvas:** `#ffffff`
- **Canvas alt:** `#f0ede1`
- **Fonts:** dazzle-unicase, NOMABold, Poppins

## Output artifacts
- `DESIGN.md`, `tokens.json`, `tailwind.css`, `regenerated-ramp.json`
- `preview.html`, `proof.html`, `report.html`
- `screenshots/`, `components/`, `extraction-report.json`

## Notes
- Component block PNGs: 0 captured (same as some prior runs — full-page screenshots still available)
- Output lives under gitignored `extraction tool/` — not committed to main repo

## Next steps
- Open `extraction tool/output/www.gshtrust.co.za/report.html` for visual review
- Use `DESIGN.md` + screenshots if recreating sections in extraction recreation mode
