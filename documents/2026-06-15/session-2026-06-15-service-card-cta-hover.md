# Session log – 2026-06-15 (service card CTA hover reveal)

## Summary
Homepage capability cards now reveal “Explore this service” with a smooth eased fade/slide on hover (compact + full card variants).

## Changes
- `src/components/ui/ServiceVerticalCard.jsx` — hidden CTA by default; `cubic-bezier(0.22,1,0.36,1)` reveal; arrow follows with slight delay; touch devices always show CTA
