import { corePages } from './corePages.js'
import { aiPages } from './aiPages.js'
import { servicesPages } from './servicesPages.js'
import { specialtiesPages } from './specialtiesPages.js'
import { blogPages } from './blogPages.js'
import { portfolioPages } from './portfolioPages.js'
import { plansPages } from './plansPages.js'

/** All marketing document pages keyed by exact pathname (excludes `/blog` index, see `BlogHub`). */
export const ALL_SITE_PAGES = [
  ...corePages,
  ...aiPages,
  ...servicesPages,
  ...specialtiesPages,
  ...blogPages,
  ...portfolioPages,
  ...plansPages,
]

/** @type {Record<string, import('./buildPage.js').SitePageDoc>} */
export const sitePageByPath = Object.fromEntries(ALL_SITE_PAGES.map((p) => [p.path, p]))

/**
 * @param {string} pathname
 * @returns {import('./buildPage.js').SitePageDoc | undefined}
 */
export function getSitePage(pathname) {
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  return sitePageByPath[normalized]
}

export { blogArticleSummaries } from './blogPages.js'
