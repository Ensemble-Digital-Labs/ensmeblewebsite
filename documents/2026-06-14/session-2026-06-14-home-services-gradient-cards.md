# Session log – 2026-06-14 (home services gradient cards)

## Summary
Adapted the `/services` page gradient-border vertical cards to the home **Services** section (`#home-capabilities`) via a shared `ServiceVerticalCard` component.

## Changes
- **`src/components/ui/ServiceVerticalCard.jsx`** — Shared card: gradient border, glass body, icon circle, ambient image, shine sweep, hover CTA.
- **`src/lib/serviceVerticals.js`** — Shared paths, Lucide icons, accent/image helpers for services + extra capabilities (AI, analytics).
- **`src/components/sections/ServicesGrid.jsx`** — Refactored to use `ServiceVerticalCard`.
- **`src/components/home/chapters/HomeChapterCapabilities.jsx`** — Replaced simple glass tiles with full vertical cards; 3-column grid matching services page.

## Notes
- Home section shows all `HOME_INFLUX_CAPABILITIES` (5 verticals + Governed AI + Analytics) with matching styling.
- Fixed broken imports to non-existent `GradientBorderShell` / `serviceAccents`.

## Next steps
- None.
