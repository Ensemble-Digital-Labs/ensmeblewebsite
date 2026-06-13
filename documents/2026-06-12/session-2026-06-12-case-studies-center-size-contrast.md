# Session log – 2026-06-12 (case studies center vs side card size)

## Summary
Increased DNA-style size contrast: center card much larger than left/right inactive cards; sharper focus falloff and steeper size curve.

## Changes
- **`CaseStudyPortfolioGallery.jsx`** — `getSizeFocus()` (power 1.55); sharper `getFocusEase` (0.82); side/center dimensions ~1.7–1.9× apart on desktop
- **`case-studies-portfolio.css`** — `--csp-size-focus` drives wordmark scale; removed fixed slide width clamp; explicit card height from JS

## Notes
- Side cards at dist=1 now stay at minimum width/height; center grows to ~376×496px desktop
- Typography scales with `--csp-size-focus` so wordmark matches panel scale
