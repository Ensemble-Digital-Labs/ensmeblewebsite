# Session log – 2026-06-12 (Market Partners extraction)

## Summary

Ran the local extraction tool on [Market Partners](https://www.marketpartners.com.au/). Crawled 8 pages, extracted design tokens, and emitted full artifacts (DESIGN.md, tailwind.css, preview/proof/report HTML).

## Changes made

- Created `extraction tool/output/www.marketpartners.com.au/` (local-only; folder is gitignored)

## Extraction stats

- **Pages crawled:** 8 (home, about, people, services, portfolio-management, private-wealth, trade-execution)
- **DOM elements:** 2,609
- **Colors:** 8 tokens
- **Typography levels:** 27
- **Component types:** 5 (Link, Footer, Input, Navigation, Button)
- **Framework:** Tailwind CSS (+ Webflow classes: `w-nav`, `w-tabs`, etc.)
- **Dark mode:** not detected
- **Screenshots:** 40
- **Component block PNGs:** 0
- **Duration:** ~286s extract + ~78s emit-artifacts

## Key design tokens (from DESIGN.md)

- **Primary mint:** `#05e0b4` (`--mp-green`)
- **Dark surface:** `#0f1231` (`--mp-dark-blue`)
- **Violet tone:** `#515072` (`--mp-medium-blue`)
- **Blue tone:** `#24243f`
- **Ink:** `#333333`
- **Canvas:** `#ffffff`
- **Font:** Hanken Grotesk (light weights 100/300 on large body copy)

## Site patterns (from live content)

- Hero: large display headline with italic emphasis on key word (“your”)
- Services grid: Portfolio management, Private wealth, Trade execution
- Tabbed “Our approach” section (philosophy, pragmatic, journey)
- Values + people proof bands
- Market Matters partnership promo
- Insights/blog cards + newsletter signup
- Premium financial-services tone: trust, transparency, legacies

## Output artifacts

- `DESIGN.md`, `tokens.json`, `tailwind.css`, `regenerated-ramp.json`
- `preview.html`, `proof.html`, `report.html`
- `screenshots/`, `components/` (empty component PNGs)

## Notes

- Proof color coverage reported 0% (image-heavy layout; use screenshots + DESIGN.md for recreation)
- Output lives under gitignored `extraction tool/` — not committed to main repo

## Next steps

- Open `extraction tool/output/www.marketpartners.com.au/report.html` for visual review
- Pick sections to recreate (hero, services cards, approach tabs) in extraction recreation mode if desired
