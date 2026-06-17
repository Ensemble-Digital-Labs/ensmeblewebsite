import { navAppTiles } from '../data/navMenuIcons'
import { brandLogo } from './branding'
import {
  ensemble2026Home,
  ensemble2026Pages,
  ensemble2026PartnerLogos,
} from './ensemble2026Assets'
import {
  HOME_BRAND_CONTEXTUAL_OVERLAYS,
  HOME_EXPERTISE_CONTEXTUAL_OVERLAYS,
  HOME_EXPERTISE_MAIN_VISUAL,
  HOME_PASSION_CONTEXTUAL_OVERLAYS,
  HOME_PROCESS_CONTEXTUAL_ICONS,
  HOME_SECTION_ACCENT_ICONS,
} from './ensemble2026Icons'
import { getPictureSources, hasWebpSource } from './pictureSources'
import { scheduleWarmImageUrls, warmImageUrls } from './warmImageCache'

/** @param {string | undefined} src */
export function expandRasterWarmupUrls(src) {
  if (!src || typeof src !== 'string') return []
  const sources = getPictureSources(src)
  if (!sources) return [src]
  if (!hasWebpSource(sources)) return [sources.fallback || src]
  return [sources.webp, sources.fallback].filter(Boolean)
}

/** @param {Array<string | { src?: string }>} items */
function uniqueWarmupUrls(items) {
  const out = []
  const seen = new Set()
  for (const item of items) {
    const src = typeof item === 'string' ? item : item?.src
    for (const url of expandRasterWarmupUrls(src)) {
      if (!url || seen.has(url)) continue
      seen.add(url)
      out.push(url)
    }
  }
  return out
}

/** Nav fullscreen menu + logo accordion PNG/SVG art. */
export function getNavMenuImageUrls() {
  return uniqueWarmupUrls(navAppTiles.map((tile) => tile.icon))
}

/** Homepage neon / blend icons — menu, PopArt overlays, section accents. */
export function getHomeIconWarmupUrls() {
  return uniqueWarmupUrls([
    ...Object.values(HOME_SECTION_ACCENT_ICONS),
    ...HOME_PROCESS_CONTEXTUAL_ICONS,
    ...Object.values(HOME_BRAND_CONTEXTUAL_OVERLAYS),
    ...Object.values(HOME_EXPERTISE_CONTEXTUAL_OVERLAYS),
    ...Object.values(HOME_PASSION_CONTEXTUAL_OVERLAYS),
    HOME_EXPERTISE_MAIN_VISUAL,
  ])
}

/** @param {string} pathname */
export function getRouteImageWarmupUrls(pathname) {
  const bare = pathname?.split('?')[0]?.split('#')[0] || '/'

  if (bare === '/') {
    return uniqueWarmupUrls([
      ...getHomeIconWarmupUrls(),
      ensemble2026Home.hero.portrait,
      ensemble2026Home.hero.background,
      ...ensemble2026PartnerLogos.slice(0, 6).map((p) => p.src),
    ])
  }

  const pageHeroByPath = {
    '/about': ensemble2026Pages.about.hero,
    '/services': ensemble2026Pages.services.hero,
    '/case-studies': ensemble2026Pages.caseStudies.hero,
    '/contact': ensemble2026Pages.contact.hero,
    '/blog': ensemble2026Pages.insights.hero,
  }

  const hero = pageHeroByPath[bare]
  return hero ? uniqueWarmupUrls([hero]) : []
}

/**
 * Tiered warmup: brand + nav icons immediately; route/home icons on idle.
 * Does not change visuals — only fills the HTTP cache earlier.
 *
 * @param {{ pathname?: string }} [options]
 */
export function startCriticalImageWarmup({ pathname = '/' } = {}) {
  if (typeof window === 'undefined') return

  const immediate = uniqueWarmupUrls([
    brandLogo.fullOnDark,
    brandLogo.mark,
    brandLogo.favicon,
    ...getNavMenuImageUrls(),
  ])

  warmImageUrls(immediate)

  const routeUrls = getRouteImageWarmupUrls(pathname)
  scheduleWarmImageUrls(routeUrls, { idle: true })

  if (pathname === '/' || pathname === '') {
    scheduleWarmImageUrls(
      uniqueWarmupUrls(ensemble2026PartnerLogos.map((p) => p.src)),
      { timeout: 2200, idle: true },
    )
  }
}
