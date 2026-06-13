# Session log – 2026-06-12 (remove section eyebrow pills)

## Summary
Removed small pill badges (dot + uppercase label) from home sections and marketing pages per user request — e.g. “OUR EXPERTISE” style labels above section headings.

## Changes
- `HomeSectionHeader.jsx` — no longer renders eyebrow pills
- Home chapters — removed `InfluxEyebrow` from Process, Testimonials, Passion, Work, Capabilities; removed capability tag pills strip
- `HomeChapterTrust.jsx` — removed credential pill row
- Marketing sections — removed pills from `ServicesHero`, `Services`, `AboutHero`, `ContactHero`, `WhyChooseUs`, `ServiceTiers`
- `AboutHero.jsx` — dropped GSAP timeline step for `.about-badge`

## Notes
- Section headings and body copy unchanged; only the small label pills removed
- `HomeCapabilityTags.jsx` kept in repo but unused on home capabilities section
