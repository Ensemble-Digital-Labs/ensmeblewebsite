# Session log – 2026-06-12 (case studies mobile heading above cards)

## Summary
Moved “CASE STUDIES GALLERY” out of the mobile nav and placed it above the carousel cards; desktop keeps heading beside logo in nav.

## Changes
- **`CaseStudies.jsx`** — mobile-visible `h1` above gallery
- **`FullscreenNav.jsx`** — nav heading class `nav__page-heading--in-bar` (hidden on mobile)
- **`case-studies-portfolio.css`** — mobile page heading styles; simplified nav row; reduced stage/gallery top padding

## Notes
- Only one visible `h1` per breakpoint: page heading on mobile, nav heading on tablet+.
