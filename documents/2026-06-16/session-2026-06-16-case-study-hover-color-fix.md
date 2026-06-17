# Session log – 2026-06-16 (case study hover color fix)

## Summary
Fixed case study card hover wiping per-card gradient colors by overriding legacy flat background hover rule in v2.

## Changes
- `src/styles/case-studies-portfolio-v2.css` — hover/focus keeps accent gradient and glow; removed background-color transition conflict

## Notes
- Legacy `case-studies-portfolio.css` hover still applies to v1 gallery only.
