/**
 * Canonical asset paths for the 2026 Ensemble site refresh.
 * Drop raster sources (PNG/JPEG) into `public/` — `npm run images:webp` or `vite build`
 * writes matching `.webp` siblings. `HomePhoto` / `ResponsivePicture` serve WebP with
 * PNG/JPEG fallback via `<picture>`.
 */

const BASE = '/ensemble-2026'

/** @param {string} segment Path after `/ensemble-2026/` */
export function ensembleAsset(segment) {
  return `${BASE}/${segment.replace(/^\/+/, '')}`
}

export const ensemble2026Branding = {
  alt: 'Ensemble Digital Labs',
  wordmarkOnDark: ensembleAsset('branding/logo-wordmark-dark.svg'),
  wordmarkOnLight: ensembleAsset('branding/logo-wordmark-light.svg'),
  mark: ensembleAsset('branding/logo-mark.svg'),
  lockupLightPng: ensembleAsset('branding/logo-lockup-light.png'),
  favicon: ensembleAsset('branding/favicon/favicon.svg'),
}

/** Site-wide video paths under `public/assets/videos/` (served at `/assets/videos/…`). */
export const ensembleSiteVideos = {
  loader: '/assets/videos/ensemble-website.mp4',
  heroBackground: '/assets/videos/hero-background.mp4',
  brandReelPrimary: '/assets/videos/ensemble-brand-reel-primary.mp4',
  brandReelShort: '/assets/videos/ensemble-brand-reel-short.mp4',
  eventConference: '/assets/videos/ensemble-event-conference.mp4',
}

export const ensemble2026Video = {
  introLoader: ensembleAsset('videos/intro-loader.mp4'),
}

export const ensemble2026Home = {
  hero: {
    background: ensembleAsset('home/hero/hero-background.webp'),
    portrait: ensembleAsset('home/hero/hero-portrait.webp'),
    masthead: [
      ensembleAsset('home/hero/masthead-01.png'),
      ensembleAsset('home/hero/masthead-02.png'),
      ensembleAsset('home/hero/masthead-03.png'),
      ensembleAsset('home/hero/masthead-04.png'),
    ],
  },
  brand: {
    main: ensembleAsset('home/brand/story-main.webp'),
    overlayTop: ensembleAsset('home/brand/story-overlay-top.webp'),
    overlayBottom: ensembleAsset('home/brand/story-overlay-bottom.webp'),
  },
  expertise: {
    collageMain: ensembleAsset('home/expertise/collage-main.webp'),
    specialty: ensembleAsset('home/expertise/specialty-practices.webp'),
    pain: ensembleAsset('home/expertise/pain-msk.webp'),
    wellness: ensembleAsset('home/expertise/wellness-aesthetics.webp'),
  },
  passion: ensembleAsset('home/passion/mission-band.webp'),
  /** Agency marketing showcase art */
  showcase: {
    socialMedia: ensembleAsset('home/showcase/social-media-showcase.webp'),
    /** Wired to homepage mission (`#home-passion`) PopArt visual */
    marketingCollateral: ensembleAsset('home/showcase/marketing-collateral-showcase.webp'),
  },
  partners: {
    stlIoir: ensembleAsset('home/partners/stl-ioir-clinics.webp'),
    arcWellness: ensembleAsset('home/partners/arc-wellness.webp'),
    smartPain: ensembleAsset('home/partners/smart-pain-solutions.webp'),
    mhwSurgery: ensembleAsset('home/partners/mhw-surgery.webp'),
    aipstl: ensembleAsset('home/partners/aipstl.webp'),
    spineCare: ensembleAsset('home/partners/spine-care.webp'),
    chesterfieldBariatric: ensembleAsset('home/partners/chesterfield-bariatric.webp'),
    agafayWeightLoss: ensembleAsset('home/partners/agafay-weight-loss.webp'),
  },
  work: {
    stlIoir: {
      cover: ensembleAsset('home/work/stl-ioir-clinics/cover.webp'),
      previewScroll: ensembleAsset('previews/stl-ioir-fullpage.webp'),
    },
    arcWellness: {
      cover: ensembleAsset('home/work/arc-wellness/cover.webp'),
      previewScroll: ensembleAsset('previews/arc-wellness-fullpage.webp'),
    },
    smartPain: {
      cover: ensembleAsset('home/work/smart-pain-solutions/cover.webp'),
      previewScroll: ensembleAsset('previews/smart-pain-fullpage.webp'),
    },
    mhwSurgery: {
      cover: ensembleAsset('home/work/mhw-surgery/cover.webp'),
      previewScroll: ensembleAsset('previews/mhw-surgery-fullpage.webp'),
    },
    aipstl: {
      cover: ensembleAsset('home/work/aipstl/cover.webp'),
      previewScroll: ensembleAsset('previews/aipstl-fullpage.webp'),
    },
    spineCare: {
      cover: ensembleAsset('home/work/spine-care/cover.webp'),
    },
    chesterfieldBariatric: {
      cover: ensembleAsset('home/work/chesterfield-bariatric/cover.webp'),
    },
    agafayWeightLoss: {
      cover: ensembleAsset('home/work/agafay-weight-loss/cover.webp'),
    },
  },
  testimonials: [
    ensembleAsset('home/testimonials/client-01.webp'),
    ensembleAsset('home/testimonials/client-02.webp'),
    ensembleAsset('home/testimonials/client-03.webp'),
    ensembleAsset('home/testimonials/client-04.webp'),
    ensembleAsset('home/testimonials/client-05.webp'),
  ],
  testimonialFallback: ensembleAsset('home/testimonials/client-default.webp'),
}

export const ensemble2026Pages = {
  about: {
    hero: ensembleAsset('pages/about/hero.webp'),
    team: ensembleAsset('pages/about/team.webp'),
  },
  services: {
    hero: ensembleAsset('pages/services/hero.webp'),
  },
  caseStudies: {
    hero: ensembleAsset('pages/case-studies/hero.webp'),
  },
  contact: {
    hero: ensembleAsset('pages/contact/hero.webp'),
  },
  insights: {
    hero: ensembleAsset('pages/insights/hero.webp'),
  },
}

export const ensemble2026Shared = {
  ambient: {
    wash01: ensembleAsset('shared/ambient/wash-01.webp'),
    wash02: ensembleAsset('shared/ambient/wash-02.webp'),
  },
  backgrounds: {
    sectionDark: ensembleAsset('shared/backgrounds/section-dark.webp'),
    sectionLight: ensembleAsset('shared/backgrounds/section-light.webp'),
  },
}

/** Client logo marks — `public/ensemble-2026/home/partners/` */
export const ensemble2026PartnerLogos = [
  { name: 'STL IOIR Clinics', src: ensemble2026Home.partners.stlIoir },
  { name: 'Arc Wellness', src: ensemble2026Home.partners.arcWellness },
  { name: 'Smart Pain Solutions', src: ensemble2026Home.partners.smartPain },
  { name: 'MHW Surgery', src: ensemble2026Home.partners.mhwSurgery },
  { name: 'AIPSTL', src: ensemble2026Home.partners.aipstl },
  { name: 'Spine Care', src: ensemble2026Home.partners.spineCare },
  { name: 'Chesterfield Bariatric Surgery', src: ensemble2026Home.partners.chesterfieldBariatric },
  { name: 'Agafay Weight Loss', src: ensemble2026Home.partners.agafayWeightLoss },
]

/** Ordered work carousel covers — matches `homeCarouselItems` in content.js */
export const ensemble2026WorkCarouselCovers = [
  ensemble2026Home.work.stlIoir.cover,
  ensemble2026Home.work.arcWellness.cover,
  ensemble2026Home.work.smartPain.cover,
  ensemble2026Home.work.mhwSurgery.cover,
  ensemble2026Home.work.aipstl.cover,
]
