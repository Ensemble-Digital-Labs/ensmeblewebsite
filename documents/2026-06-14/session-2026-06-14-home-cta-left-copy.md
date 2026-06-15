# Session log – 2026-06-14 (home CTA left copy)

## Summary
Restored missing left-column copy on the home contact/CTA section (`#home-cta`). The paragraph referenced a non-existent `HOME_INFLUX_CTA.sub` field and the title was wrapped in `data-home-reveal`, keeping it hidden while the form stayed visible.

## Changes
- **`src/lib/homeInfluxContent.js`** — Added `body: ctaContent.subhead` to `HOME_INFLUX_CTA`.
- **`src/components/home/chapters/HomeChapterCta.jsx`** — Left column now uses `InfluxEyebrow`, `InfluxSectionTitle`, and `InfluxLead` with `data-home-mask-group` (same pattern as capabilities); shows audit copy + phone link; removed broken `data-home-reveal` + `.sub` usage.

## Notes
- Production (Netlify) showed the full audit paragraph; local was blank because `.sub` was never defined on the content object.
- Form was always visible because it is not gated behind scroll reveal.

## Next steps
- None.
