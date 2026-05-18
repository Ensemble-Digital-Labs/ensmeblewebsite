# Session log – 2026-05-14

## Summary
Scaled **supporting / body copy** (not tiny uppercase labels) across the **main marketing pages and shared sections** so paragraph-level text reads closer to the larger Cardinal-style subhead treatment, in line with the prior home-band work.

## Changes (high level)
- **`Card.jsx`**: default `CardDescription` is now `text-base` with relaxed leading.
- **Inner marketing docs**: `MarketingDocLayout` related-link blurbs and section bodies bumped.
- **Pages**: `CaseStudies`, `Work`, `CaseStudyDetail`, `BlogHub`, `Insights`, `Contact` (success copy, hours panel, map blurb).
- **Sections / UI**: `Hero`, `HeroScrollExpand`, `HeroStatsTrustBand`, `ParallaxLayerShowcase`, `HomeRoadmapSection`, `HomeProblemSection`, `Carousel3D`, `ServicesGrid`, `ServiceTiers`, `Process`, `ServicesPreview`, `CaseStudiesPreview`, `Team`, `Testimonials`, `TestimonialsPreview`, `Portfolio`, `FAQ`, `MissionValues`, `HowWeWork`, `WorkDeviceShowcase`, `CircularTestimonials`, `CircularGallery`, `Footer`, `FullscreenNav` (address), `ShareExperienceSection`.

## Decisions / notes
- Left **form labels**, **filter/chip pills**, **mono micro-labels**, and **button sizing** largely unchanged so forms and dense controls do not balloon.
- **`/home`** primary content remains `HomePageSections.jsx` (already tuned earlier); **`/home-v1`** benefits from the shared section updates above.

## Verification
- `npm run build` succeeded after edits.

## Next steps
- Optional: spot-check **320px** on Services tier cards and Case Studies grid after the `text-base` list bumps.
