# Session log – 2026-06-13 (CTA button typography)

## Summary
Fixed gradient pill CTAs still rendering Plus Jakarta — added `data-ensemble-cta`, descendant span rules, footer/deck overrides, and moved editorial CSS last in the bundle.

## Changes
- Updated `src/lib/growthCtaClasses.js` — `ensembleCtaAttr`, medium editorial weight
- Updated `src/styles/ensemble-editorial-type.css` — broader selectors + nested labels
- Updated `src/main.jsx` — load editorial CSS after footer styles
- Updated `InfluxPrimaryButton`, `StandardCTA`, `Button`, `FormButton`, `FullscreenNav`, `CinematicFooter`, `Contact.jsx`

## Notes
- Hard refresh after pull; Fraunces on pills should match hero editorial type (serif, not bold sans)
