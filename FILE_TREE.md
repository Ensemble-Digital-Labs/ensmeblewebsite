# Project file tree

Generated: 2026-05-12. Reflects the current Ensemble Digital Labs v2 codebase
(Vite + React 18 + Tailwind + GSAP/Locomotive). Regenerate after major
structural changes.

> Excluded from the listing for clarity: `node_modules/`, `dist/`,
> `.git/`, `.vscode/`, `.cursor/` (rules), `documents/` (session logs),
> `refer-website/` (design references), and `package-lock.json`.

```
ensemblev2/
├── .env.example
├── .gitignore
├── CREDITS.md
├── FILE_TREE.md
├── README.md
├── SETUP.md
├── ensemble sitemap v2 (1).pdf
├── ensemble website v2-updated.pdf
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
│
├── public/
│   ├── assets/
│   │   ├── branding/
│   │   │   ├── ensemble-logo.svg          ← favicon + brand mark
│   │   │   ├── ensemble-logo-light.png
│   │   │   ├── LOGO - 87.jpg / 87 (1).png
│   │   │   └── LOGO - 88.jpg / 88.svg
│   │   ├── images/
│   │   │   ├── ambient/                   ← optional decorative PNG washes
│   │   │   │   ├── ambient-layer-01.png … 04.png
│   │   │   │   └── ambient-layer-white-01.png … 03.png  ← light / white variants
│   │   │   ├── backgrounds/               ← hero backdrop PNGs
│   │   │   │   ├── digital-health-network-hero-bg.png
│   │   │   │   ├── hero-scroll-expand-card-bg.png    ← Home #page1 expanding card
│   │   │   │   ├── hero-scroll-expand-outer-bg.png   ← Home #page1 outer plate
│   │   │   │   ├── medical-data-hud-hero-bg.png
│   │   │   │   └── tech-plexus-hero-bg.png
│   │   │   ├── hero-outcomes/             ← #hero-stats-trust feature panel art (3 PNGs)
│   │   │   │   ├── ai-first-strategy.png
│   │   │   │   ├── hipaa-safe-by-design.png
│   │   │   │   ├── how-we-grow-practice-bg.png   ← section backdrop (upper band)
│   │   │   │   └── revenue-obsessed.png
│   │   │   ├── dashboards/                ← transparent product mockups (10 files)
│   │   │   │   ├── ensemble_call_tracking_dashboard_transparent.png
│   │   │   │   ├── ensemble_conversion_funnel_dashboard_transparent.png
│   │   │   │   ├── ensemble_growth_analytics_dashboard_transparent.png
│   │   │   │   ├── ensemble_healthcare_icon_strip_transparent.png
│   │   │   │   ├── ensemble_local_seo_map_dashboard_transparent.png
│   │   │   │   ├── ensemble_medical_analytics_dashboard_transparent.png
│   │   │   │   ├── ensemble_patient_profile_dashboard_transparent.png
│   │   │   │   ├── ensemble_revenue_growth_dashboard_transparent.png
│   │   │   │   ├── ensemble_secure_form_dashboard_transparent.png
│   │   │   │   └── ensemble_security_checklist_dashboard_transparent.png
│   │   │   ├── testimonials/              ← placeholder portraits (SVG)
│   │   │   ├── abstract-medical-lifeline-background.jpg
│   │   │   ├── medical-* (various clinical / hero source art)
│   │   │   └── arrow-up.svg
│   │   └── videos/
│   │       └── hero-background.mp4
│   └── fonts/                             ← reserved for self-hosted WOFF2
│
├── scripts/                               ← repo utilities (see folder)
│
└── src/
    ├── App.jsx                            ← Router + Layout shell
    ├── main.jsx                           ← React root, initTheme()
    ├── index.css                          ← global Tailwind + CSS variables
    │
    ├── animations/
    │   └── gsap.js                        ← shared GSAP setup
    │
    ├── app/
    │   ├── AnimatedRoutes.jsx             ← Framer Motion route transitions
    │   └── layout.jsx                     ← #main scroller, Locomotive,
    │                                        FullscreenNav, MovingCircle,
    │                                        CinematicFooter, ParallaxLayerRegistry
    │
    ├── canvas/
    │   ├── HeroGlobePlexus.jsx            ← Three.js globe (lazy-mountable)
    │   ├── PixiParticlesBackground.jsx    ← PixiJS particle field
    │   ├── ThreeHeroBackground.jsx
    │   └── TheatreController.jsx          ← Theatre.js timeline glue
    │
    ├── components/
    │   ├── AnimatedBrandLogo.jsx
    │   ├── ChatWidget.jsx
    │   ├── CinematicFooter.jsx            ← active footer (#050816, marquee)
    │   ├── EnhancedNavbar.jsx             ← legacy nav (not mounted)
    │   ├── Footer.jsx                     ← legacy footer (not mounted)
    │   ├── FullscreenNav.jsx              ← active fullscreen nav overlay
    │   ├── Loader.jsx                     ← home intro loader (one-shot)
    │   ├── MovingCircle.jsx               ← context-aware custom cursor
    │   ├── Navbar.jsx                     ← legacy
    │   ├── Navigation.jsx                 ← legacy
    │   ├── ParallaxLayerRegistry.jsx      ← parallax stack mount point
    │   ├── StandardCTA.jsx
    │   │
    │   ├── sections/
    │   │   ├── Hero.jsx                   ← Home — page1
    │   │   ├── HeroStatsTrustBand.jsx     ← Home — stats below hero
    │   │   ├── HomeProblemSection.jsx     ← Home — pain points
    │   │   ├── HomeRoadmapSection.jsx     ← Home — 90-day roadmap teaser
    │   │   ├── ParallaxLayerShowcase.jsx  ← Home — "Who we are" pillars
    │   │   ├── Carousel3D.jsx             ← Home — Selected Work carousel
    │   │   ├── TestimonialsCollage.jsx    ← Home — testimonials grid
    │   │   ├── ShareExperienceSection.jsx ← Home — user testimonial form
    │   │   ├── WorkDeviceShowcase.jsx     ← live-preview device mockup
    │   │   ├── CaseStudies.jsx            ← /case-studies grid
    │   │   ├── CaseStudiesPreview.jsx
    │   │   ├── CaseStudyDetail (in pages/)
    │   │   ├── Services.jsx               ← legacy services section
    │   │   ├── ServicesPreview.jsx
    │   │   ├── ServicesGrid.jsx
    │   │   ├── ServicesHero.jsx
    │   │   ├── ServiceTiers.jsx           ← Essentials / Growth / Dominate
    │   │   ├── AboutHero.jsx
    │   │   ├── MissionValues.jsx
    │   │   ├── Team.jsx
    │   │   ├── ContactHero.jsx
    │   │   ├── HowWeWork.jsx
    │   │   ├── Process.jsx                ← legacy
    │   │   ├── Portfolio.jsx              ← legacy
    │   │   ├── Page4.jsx                  ← legacy "Featured insights"
    │   │   ├── Testimonials.jsx
    │   │   ├── TestimonialsPreview.jsx
    │   │   ├── WhyChooseUs.jsx
    │   │   ├── FAQ.jsx
    │   │   ├── CTA.jsx
    │   │   ├── CTABand.jsx
    │   │   └── Footer.jsx                 ← legacy in-page footer
    │   │
    │   ├── site/
    │   │   └── MarketingDocLayout.jsx     ← shell for registry pages
    │   │                                    (DynamicSitePage)
    │   │
    │   └── ui/
    │       ├── BackgroundPaths.jsx
    │       ├── Button.jsx
    │       ├── Card.jsx
    │       ├── CircularGallery.jsx
    │       ├── CircularTestimonials.jsx
    │       ├── Container.jsx
    │       ├── FormButton.jsx
    │       ├── Input.jsx
    │       ├── KeywordReveal.jsx          ← animated keyword spans
    │       ├── ParallaxDepth.jsx
    │       ├── SectionHeading.jsx
    │       ├── Select.jsx
    │       ├── SparklesCore.jsx
    │       ├── Spotlight.jsx
    │       └── Textarea.jsx
    │
    ├── data/
    │   ├── caseStudies.js                 ← short preview cards
    │   ├── healthcareCaseStudies.js       ← long-form case studies
    │   ├── navigation.js                  ← top nav + footer link maps
    │   ├── services.js
    │   ├── testimonials.js
    │   └── site/                          ← registry CMS for DynamicSitePage
    │       ├── aiPages.js
    │       ├── blogPages.js
    │       ├── buildPage.js               ← page() factory + types
    │       ├── corePages.js               ← /privacy-policy, /terms,
    │       │                                /thank-you, /free-practice-audit
    │       ├── index.js                   ← getSitePage(pathname)
    │       ├── plansPages.js
    │       ├── portfolioPages.js
    │       ├── servicesPages.js
    │       └── specialtiesPages.js
    │
    ├── hooks/
    │   └── useScrollReveal.js
    │
    ├── lib/
    │   ├── animationProfile.js            ← desktop/mobile motion variants
    │   ├── backgroundAssets.js            ← public/.../backgrounds/ map
    │   ├── branding.js
    │   ├── cinematicSectionReveal.js      ← shared section reveal hook
    │   ├── constants.js
    │   ├── content.js                     ← largest content source
    │   ├── cursorContext.js               ← cursor label context
    │   ├── dashboardAssets.js             ← public/.../dashboards/ map
    │   ├── growthCtaClasses.js            ← shared CTA Tailwind classes
    │   ├── homeLoaderGate.js              ← one-shot loader gate (session)
    │   ├── locomotive.js                  ← Lenis init + ScrollTrigger proxy
    │   ├── parallaxLayerStacks.js
    │   ├── popprAnimations.js             ← scroll reveal + page anims
    │   ├── theme.js                       ← initTheme(): CSS variable setup
    │   ├── userTestimonialsStorage.js     ← localStorage testimonials
    │   └── utils.js                       ← cn, reduced-motion, scroll helpers
    │
    ├── pages/
    │   ├── About.jsx
    │   ├── BlogHub.jsx                    ← /blog index
    │   ├── CaseStudies.jsx                ← /case-studies
    │   ├── CaseStudyDetail.jsx            ← /case-studies/:slug
    │   ├── Contact.jsx                    ← /contact (form + live Google Map)
    │   ├── DynamicSitePage.jsx            ← renders ANY registry page
    │   ├── Home.jsx                       ← /
    │   ├── Insights.jsx                   ← legacy (route now redirects /insights → /blog)
    │   ├── NotFound.jsx
    │   ├── Services.jsx                   ← /services
    │   └── Work.jsx                       ← legacy
    │
    └── styles/
        └── cinematic-footer.css
```

## Routing summary

Defined in `src/app/AnimatedRoutes.jsx`:

| Path                                | Component             | Notes |
|-------------------------------------|-----------------------|-------|
| `/`                                 | `Home`                | Hand-built. |
| `/case-studies`                     | `CaseStudies`         | |
| `/case-studies/:slug`               | `CaseStudyDetail`     | |
| `/services`                         | `Services`            | |
| `/services/*`                       | `DynamicSitePage`     | Registry-backed children. |
| `/about`                            | `About`               | |
| `/contact`                          | `Contact`             | Real Google Maps embed. |
| `/blog`                             | `BlogHub`             | |
| `/blog/category/:categorySlug`      | `DynamicSitePage`     | |
| `/blog/:articleSlug`                | `DynamicSitePage`     | |
| `/ai`, `/ai/:slug`                  | `DynamicSitePage`     | |
| `/specialties`, `/specialties/:slug`| `DynamicSitePage`     | |
| `/portfolio`, `/portfolio/:slug`    | `DynamicSitePage`     | |
| `/plans`, `/plans/:slug`            | `DynamicSitePage`     | |
| `/free-practice-audit`              | `DynamicSitePage`     | |
| `/privacy-policy`                   | `DynamicSitePage`     | Placeholder legal content. |
| `/terms`                            | `DynamicSitePage`     | Placeholder legal content. |
| `/thank-you`                        | `DynamicSitePage`     | |
| `/insights`                         | redirect → `/blog`    | |
| `/casestudies`                      | redirect → `/case-studies` | |
| `*`                                 | `NotFound`            | |

## Legacy / candidate-for-removal components

The following exist but are **not mounted** in the active Layout. Verify imports
before deleting — some pages may still reference them:

- `src/components/Navbar.jsx`, `Navigation.jsx`, `EnhancedNavbar.jsx`
  (only `FullscreenNav` is rendered in `app/layout.jsx`)
- `src/components/Footer.jsx`, `src/components/sections/Footer.jsx`
  (only `CinematicFooter` is rendered in `app/layout.jsx`)
- `src/pages/Insights.jsx`, `src/pages/Work.jsx` (no active routes)
- `src/components/sections/Page4.jsx`, `Portfolio.jsx`, `Process.jsx`,
  `Services.jsx` (older versions superseded by newer Home / Services sections)
