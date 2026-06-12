/**
 * Homepage imagery — Ensemble 2026 asset library (`public/ensemble-2026/`).
 */

import { testimonialsPreview } from './content'
import {
  ensemble2026Home,
  ensemble2026WorkCarouselCovers,
} from './ensemble2026Assets'

export function photoUrl(src) {
  if (!src) return ''
  return src
}

/** Hero masthead tiles — `public/ensemble-2026/home/hero/masthead-*.png` */
const HERO_MASTHEAD_VERSION = '20260612'

export const HOME_HERO_MASTHEAD = ensemble2026Home.hero.masthead.map(
  (src) => `${src}?v=${HERO_MASTHEAD_VERSION}`,
)

export const HOME_HERO_IMAGERY = {
  background: ensemble2026Home.hero.background,
  portrait: ensemble2026Home.hero.portrait,
  portraitPosition: '50% 22%',
}

export const HOME_BRAND_IMAGE = {
  src: ensemble2026Home.brand.main,
  alt: 'Healthcare digital growth team at work',
  position: '50% 35%',
}

export const HOME_PASSION_IMAGE = {
  src: ensemble2026Home.passion,
  alt: 'Practice growth outcomes',
  position: '50% 40%',
}

/** Trust metrics replace third-party partner badge rows on the homepage. */
export const HOME_PARTNER_LOGOS = []

export const HOME_EXPERTISE_CARDS = [
  {
    id: 'specialty',
    title: 'Specialty practices',
    subtitle: 'Surgical, interventional & high-acuity care',
    line: 'Physician-grade positioning, local SEO, and conversion paths tuned for how patients choose specialty care in competitive markets.',
    image: ensemble2026Home.expertise.specialty,
    imagePosition: '50% 25%',
    to: '/specialties',
  },
  {
    id: 'pain',
    title: 'Pain & musculoskeletal',
    subtitle: 'Performance marketing that converts',
    line: 'We build demand engines for pain management and related practices — HIPAA-safe tracking, high-intent landing pages, and campaigns calibrated to booked visits.',
    image: ensemble2026Home.expertise.pain,
    imagePosition: '50% 30%',
    to: '/case-studies',
  },
  {
    id: 'wellness',
    title: 'Wellness & aesthetics',
    subtitle: 'Premium web + patient acquisition',
    line: 'Luxury builds, booking integration, and brand elevation for med spas, wellness clinics, and physician-led aesthetics — built to win local comparisons.',
    image: ensemble2026Home.expertise.wellness,
    imagePosition: '50% 35%',
    to: '/services/websites-local-seo',
  },
]

export const HOME_INFLUX_TESTIMONIALS = testimonialsPreview.map((item, index) => ({
  id: item.id,
  quote: item.quote,
  author: item.author,
  role: item.role,
  image: ensemble2026Home.testimonials[index] ?? ensemble2026Home.testimonialFallback,
  imagePosition: '50% 50%',
}))

export const HOME_WORK_IMAGES = {
  featured: ensemble2026WorkCarouselCovers[0],
  secondary: ensemble2026WorkCarouselCovers.slice(1, 3),
}

export const HOME_WORK_SHOWCASE_SCROLL = ensemble2026WorkCarouselCovers

/** PopArt brand collage overlays (reuse hero masthead until dedicated overlays exist). */
export const HOME_BRAND_OVERLAY_IMAGES = {
  top: ensemble2026Home.brand.overlayTop,
  bottom: ensemble2026Home.brand.overlayBottom,
}
