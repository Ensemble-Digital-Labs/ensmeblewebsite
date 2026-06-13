# Session log – 2026-06-13 (DNA Capital hero font)

## Summary
Applied DNA Capital editorial hero typography (Cormorant Garamond 300 + soft white-to-blue gradient) to homepage and experiments hero headlines.

## Changes
- Updated `index.html` — load Cormorant Garamond (300/400)
- Updated `src/components/home/HomeHeroTitle.jsx` — removed Fraunces/bold utilities; CSS-driven DNA style
- Updated `src/index.css` — `.home-hero-title` Cormorant, weight 300, DNA gradient clip
- Updated `src/styles/dna-capital-clone.css` — enforce weight 300 on clone hero lines

## Notes
- Matches dnacapital.com reference: high-contrast serif, light weight, editorial line breaks
- Overrides global `#root h1 { font-weight: 800 }` for hero lines
