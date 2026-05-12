# Session log – 2026-05-11 — Runtime font for section headings

## Summary

Copied **`runtime-font/RuntimeRegular-m2Odx.otf`** to **`public/fonts/Runtime-Regular.otf`**, registered **`@font-face` `Runtime`**, set Tailwind **`fontFamily.display`** (and `antique`) to **Runtime → Cormorant Garamond** fallbacks, updated **`.section-heading-neon`**, **`.section-heading-neon--line2`**, **`.hero-headline-gradient`**, and **cinematic footer giant text** to use Runtime. Added **`font-display`** to section **`<h1>` / `<h2>`** that previously used body sans only (Services, CTA, HowWeWork, MissionValues, ServiceTiers, WhyChooseUs, ContactHero, ServicesHero, AboutHero, CaseStudyDetail, CircularGallery slide titles, MarketingDocLayout section titles, BlogHub cards). Hero split headline uses **`font-display`** instead of **`font-ui`**.

## Changes

- **`public/fonts/Runtime-Regular.otf`** (copy of project `runtime-font` asset)
- **`src/index.css`** — `@font-face` Runtime; heading component classes
- **`tailwind.config.js`** — `display` / `antique` stacks
- **`src/styles/cinematic-footer.css`** — `.footer-giant-bg-text`
- **Section & page components** — `font-display` on primary headings (see Summary)

## Notes

- **`runtime-font/info.txt`** lists a **demo** license; replace with a full license before production if required by the foundry.
- Only **Regular** weight is embedded; **`font-bold` / `font-semibold`** may use synthetic bold in the browser.

---

## Update — Hero headline + portrait scale (same day)

Larger **split-hero** `<h1>` (responsive clamps through `xl`), **`font-bold`**, slightly tighter tracking; larger **full-bleed** `section-heading-neon` clamps. **Portrait column**: higher `min-h`, wider `max-w` pre-lg, taller **`max-h`** on the image (`sm` / `lg` / `xl`). Edits in **`src/components/sections/Hero.jsx`**.
