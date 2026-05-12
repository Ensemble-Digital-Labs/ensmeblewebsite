# Session log – 2026-05-11 — Growth CTA button redesign

## Summary

Unified site-wide primary clickables to a **flat pink → coral gradient pill** (`#e94e77` → `#f17245`), white label, **no heavy shadow**. **`StandardCTA`** and **`Button`** primary variants pull from **`growthCtaClasses.js`**. Hero primary uses a **thin text arrow (`→`)** on the same pill (no Lucide circle chip). **`CTABand`** primary is gradient **`Button variant="primary"`**; secondary stays glass outline with lighter hover.

## Changes

- **`src/lib/growthCtaClasses.js`** — Shared Tailwind strings: `growthGradientFill`, `growthPrimaryBase`, `growthPrimaryHero`, `growthPrimaryNav`, `growthPrimaryStandard`, `growthSecondary*`, `growthButtonPrimary`.
- **`src/components/StandardCTA.jsx`** — Primary / tech use gradient standard class; outline uses glass secondary.
- **`src/components/ui/Button.jsx`** — Primary uses `growthButtonPrimary`; outline uses `growthSecondaryBase`; removed rainbow wrapper.
- **`src/components/sections/Hero.jsx`** — Primary pill + inline `→`; secondary uses shared growth classes.
- **`src/components/sections/CTABand.jsx`** — Primary gradient button; secondary outline without lift/shadow hover.
- **`src/components/FullscreenNav.jsx`** — Nav CTA gradient `Link`; `data-nav-cta` for GSAP opacity tween.

## Notes

- Secondary CTAs remain **glass** on dark (not gradient) so hierarchy stays clear.
