# Session log – 2026-05-15 (hero eyebrow: no clip, move line only)

## Summary
The eyebrow was clipping again because deck `SectionShell` used `overflow-y-auto` on the inner wrapper, which crops negative top margins. Added `deckInnerOverflowVisible` so the **hero** slide uses `overflow-y-visible` on that inner shell; restored full hero vertical padding; eyebrow uses a slightly stronger `-mt-*` only in deck (`df`).

## Changes
- `src/components/home/HomePageSections.jsx` — `SectionShell` supports `deckInnerOverflowVisible`; hero passes it with `df`; hero `className` uses one padding scale again; eyebrow deck branch `-mt-2.5 … lg:-mt-4`.

## Notes
- Other deck slides keep `overflow-y-auto` so long sections still scroll inside the pin.
