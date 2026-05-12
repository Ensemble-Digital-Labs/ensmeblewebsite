# Session log – 2026-05-11 — Growth theme site-wide

## Summary

Applied the **pink → coral growth palette** (`#e94e77` → `#f17245`) across CSS variables, Tailwind tokens, headings/keyword gradients, navigation chrome, services/contact sections, loaders/carousels, and JS constants so the site reads as one warm conversion-forward system instead of mixed cyan/gold.

## Changes

- **`src/index.css`** — `:root` brand + interactive vars; hero / section-heading / keyword-reveal / `gradient-brand` utilities; hero eyebrow; scrollbar thumbs; nav conic (legacy `nav-bar-cta` path).
- **`tailwind.config.js`** — `brand.*` fallbacks and new **`growth.{from,to,soft,muted}`**`; interactive colors aligned.
- **`src/lib/growthCtaClasses.js`** — Gradient + focus ring use CSS variables.
- **`src/lib/constants.js`** — `COLORS.brand` / gradient / interactive aligned with growth palette.
- **Sections & UI** — `MissionValues`, `ServiceTiers`, `WhyChooseUs`, `ContactHero`, `Contact.jsx`, `CTA.jsx`, `CTABand`, `HomeProblemSection`, `HomeRoadmapSection`, `Carousel3D`, `FullscreenNav`, `MarketingDocLayout`, `Loader`, `ParallaxDepth`, `CircularTestimonials`, `BackgroundPaths`, `Button.jsx`.
- **Data / animations** — `content.js`, `services.js`, `Portfolio.jsx`, `popprAnimations.js`.

## Notes

- Tailwind **`text-brand-primary`** / **`bg-brand-primary`** now resolve to growth pink via `--color-brand-primary`.
- Secondary CTAs remain glass on dark; primary actions stay gradient pills.

## Next steps

- Spot-check **light cards** (e.g. ServiceTiers) for contrast on white.
- Optional: sweep **`cinematic-footer.css`** / footer magnetic pills if any legacy cyan remains.
