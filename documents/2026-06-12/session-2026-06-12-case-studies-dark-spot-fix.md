# Session log – 2026-06-12 (case studies refresh dark spot fix)

## Summary
Fixed center dark flash on refresh: gallery hidden until `useLayoutEffect` positions cards; slides default invisible; DNA helix scatter intro skipped on case studies page.

## Changes
- **`CaseStudyPortfolioGallery.jsx`** — `useLayoutEffect` + `is-layout-ready` gate before paint
- **`case-studies-portfolio.css`** — gallery opacity 0 until layout; slides hidden until JS layout
- **`CaseStudiesDnaCanvas.jsx`** — `setHomeDnaIntroProgress(1)` immediately (no scatter intro)

## Notes
- Root cause: all slides stacked at `left: 50%` before transform ran, dark card panels overlapped at viewport center
