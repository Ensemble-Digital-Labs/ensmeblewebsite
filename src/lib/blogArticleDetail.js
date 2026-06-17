import { blogArticleSummaries } from '../data/site/blogPages.js'

/** @param {string} slug */
export function getBlogArticleBySlug(slug) {
  return blogArticleSummaries.find((article) => article.slug === slug)
}

/** Hide placeholder copy until full articles are written. */
export function isBlogArticleScaffold(body) {
  return /^(\s*)(Long-form )?Article scaffold:/i.test(body ?? '')
}

/** @param {Array<{ title?: string, body: string }>} sections */
export function getPublishableSections(sections) {
  return (sections ?? []).filter((section) => !isBlogArticleScaffold(section.body))
}
