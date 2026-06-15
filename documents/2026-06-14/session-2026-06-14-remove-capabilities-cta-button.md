# Session log – 2026-06-14 (remove capabilities CTA button)

## Summary
Removed the "Schedule a free strategy session" button below the home services/capabilities card grid per user request.

## Changes
- **`src/components/home/chapters/HomeChapterCapabilities.jsx`** — Removed `InfluxPrimaryButton` block and unused import.

## Notes
- Service cards still link to individual vertical pages via `ServiceVerticalCard`.

## Next steps
- None.

---

## Update — 2-column last-row center

Centered the lone last card when the capabilities grid is in 2-column mode (tablet).

- **`src/index.css`** — `:last-child:nth-child(odd)` spans full row, single-column width, centered.
