# Asset manifest — Ensemble 2026

Check off each file as you create and drop it into `public/ensemble-2026/`. Filenames must match exactly (wired in `src/lib/ensemble2026Assets.js`).

**Legend:** `[ ]` = needed · dimensions are suggested export targets · **Used by** = where it appears in the app

---

## Branding (`branding/`)

| Status | File | Spec | Used by |
|--------|------|------|---------|
| [ ] | `logo-wordmark-dark.svg` | Light wordmark for dark UI | Loader, fullscreen nav |
| [ ] | `logo-wordmark-light.svg` | Dark wordmark for light surfaces | Top nav, light sections |
| [ ] | `logo-mark.svg` | Icon-only mark | Compact nav, favicon source |
| [ ] | `logo-lockup-light.png` | Raster lockup @2x | Footer light bands |
| [ ] | `favicon/favicon.svg` | 32×32 safe area | Browser tab |

---

## Video (`videos/`)

| Status | File | Spec | Used by |
|--------|------|------|---------|
| [ ] | `intro-loader.mp4` | 1920×1080, muted, no loop (plays once) | `Loader.jsx` *(migrate path)* |

---

## Home — Hero (`home/hero/`)

| Status | File | Spec | Used by |
|--------|------|------|---------|
| [ ] | `hero-background.webp` | 2560×1440, full-bleed, copy-safe left third | Hero bleed / atmosphere |
| [ ] | `hero-portrait.webp` | 1200×1500, physician/practice leader | Hero split column (lg+) |
| [ ] | `masthead-01.webp` | 800×1000 | Hero photo grid tile 1 |
| [ ] | `masthead-02.webp` | 800×1000 | Hero photo grid tile 2 |
| [ ] | `masthead-03.webp` | 800×1000 | Hero photo grid tile 3 |
| [ ] | `masthead-04.webp` | 800×1000 | Hero photo grid tile 4 |

**Art notes:** Real Ensemble clients or aspirational clinical settings; avoid generic Unsplash. Leave headroom for headline overlay on background.

---

## Home — Story / Brand (`home/brand/`)

| Status | File | Spec | Used by |
|--------|------|------|---------|
| [ ] | `story-main.webp` | 1400×1600 | PopArt collage — main image |
| [ ] | `story-overlay-top.webp` | 600×750, rotated card crop | Collage overlay top |
| [ ] | `story-overlay-bottom.webp` | 600×750 | Collage overlay bottom |

---

## Home — Expertise (`home/expertise/`)

| Status | File | Spec | Used by |
|--------|------|------|---------|
| [ ] | `specialty-practices.webp` | 1200×900 | Expertise card + collage |
| [ ] | `pain-msk.webp` | 1200×900 | Expertise card + collage |
| [ ] | `wellness-aesthetics.webp` | 1200×900 | Expertise card + collage |

---

## Home — Mission / Passion (`home/passion/`)

| Status | File | Spec | Used by |
|--------|------|------|---------|
| [ ] | `mission-band.webp` | 1600×900, wide band | Passion chapter full-bleed |

---

## Home — Work (`home/work/<project>/`)

Each project needs a **cover** for cards and carousel. Optional **preview scroll** in `previews/` for browser showcase.

| Status | File | Spec | Used by |
|--------|------|------|---------|
| [ ] | `stl-ioir-clinics/cover.webp` | 1600×900 | Work chapter, case studies |
| [ ] | `arc-wellness/cover.webp` | 1600×900 | Work chapter |
| [ ] | `smart-pain-solutions/cover.webp` | 1600×900 | Work chapter |
| [ ] | `mhw-surgery/cover.webp` | 1600×900 | Work chapter |
| [ ] | `aipstl/cover.webp` | 1600×900 | Work chapter |
| [ ] | `previews/stl-ioir-fullpage.webp` | ~1440×8000 tall capture | Device scroll showcase |
| [ ] | `previews/arc-wellness-fullpage.webp` | tall capture | Device scroll showcase |
| [ ] | `previews/smart-pain-fullpage.webp` | tall capture | Device scroll showcase |
| [ ] | `previews/mhw-surgery-fullpage.webp` | tall capture | Device scroll showcase |
| [ ] | `previews/aipstl-fullpage.webp` | tall capture | Device scroll showcase |

---

## Home — Testimonials (`home/testimonials/`)

| Status | File | Spec | Used by |
|--------|------|------|---------|
| [ ] | `client-01.webp` … `client-05.webp` | 800×1000 portrait, real or licensed | Testimonial carousel |
| [ ] | `client-default.webp` | 800×1000 | Fallback avatar |

**Note:** Replace placeholder SVGs from old `/assets/images/testimonials/`.

---

## Capability icons (`icons/capabilities/`)

Eight SVG icons for the homepage capabilities grid *(currently hotlinked from Influx CDN — replace with local)*.

| Status | File | Used by |
|--------|------|---------|
| [ ] | `seo.svg` | Capabilities grid |
| [ ] | `web-design.svg` | Capabilities grid |
| [ ] | `ppc.svg` | Capabilities grid |
| [ ] | `social.svg` | Capabilities grid |
| [ ] | `content.svg` | Capabilities grid |
| [ ] | `analytics.svg` | Capabilities grid |
| [ ] | `automation.svg` | Capabilities grid |
| [ ] | `strategy.svg` | Capabilities grid |

---

## Marketing pages (`pages/`)

| Status | File | Spec | Route |
|--------|------|------|-------|
| [ ] | `about/hero.webp` | 1920×1080 | `/about` |
| [ ] | `about/team.webp` | 1600×900 | About team section |
| [ ] | `services/hero.webp` | 1920×1080 | `/services` |
| [ ] | `case-studies/hero.webp` | 1920×1080 | `/case-studies` |
| [ ] | `contact/hero.webp` | 1920×1080 | `/contact` |
| [ ] | `insights/hero.webp` | 1920×1080 | `/insights` |

---

## Shared (`shared/`)

| Status | File | Spec | Used by |
|--------|------|------|---------|
| [ ] | `ambient/wash-01.webp` | Soft gradient wash | Section depth / CSS backgrounds |
| [ ] | `ambient/wash-02.webp` | Alternate wash | Section depth |
| [ ] | `backgrounds/section-dark.webp` | 1920×1080 navy plate | Dark section bands |
| [ ] | `backgrounds/section-light.webp` | 1920×1080 light plate | Light section bands |

---

## Legacy assets to retire (do not reuse)

These paths are **not** part of the 2026 library:

- `public/assets/images/dashboards/*` — HUD-style mockups (off-brand)
- `public/assets/images/home-problem/*` — old pain card stubs
- `public/assets/images/parallax-pillars/*` — legacy home-v1 curtains
- `public/revamp-assets/images/hero/home-hero-primary-2026-05.png` — replaced by `home/hero/hero-background.webp`
- Unsplash URLs in `content.js` / `healthcareCaseStudies.js` — replace with `home/work/*` covers

---

## Wiring checklist (code)

After files exist:

1. [x] `src/lib/ensemble2026Assets.js` — path registry
2. [x] `src/lib/homeImagery.js` — homepage imagery
3. [ ] `src/lib/branding.js` — logos
4. [ ] `src/lib/content.js` — `homeCarouselItems` images + hero background key
5. [ ] `src/data/healthcareCaseStudies.js` — case study covers
6. [ ] `src/data/testimonials.js` — testimonial portraits
7. [ ] `src/components/Loader.jsx` — intro video path
8. [ ] `src/components/home/chapters/HomeChapterCapabilities.jsx` — local capability icons
