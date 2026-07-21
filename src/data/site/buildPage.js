/** @typedef {{ title?: string, body?: string | string[], items?: string[], afterItems?: string | string[] }} SiteSection */
/** @typedef {{ path: string, eyebrow: string, title: string, summary: string, sections: SiteSection[], tags?: string[], noIndex?: boolean, relatedLinks?: Array<{ to: string, title: string, description: string }> }} SitePageDoc */

/**
 * @param {string} path
 * @param {string} eyebrow
 * @param {string} title
 * @param {string} summary
 * @param {SiteSection[]} sections
 * @param {{ tags?: string[], noIndex?: boolean, relatedLinks?: Array<{ to: string, title: string, description: string }> }} [opts]
 * @returns {SitePageDoc}
 */
export function page(path, eyebrow, title, summary, sections, opts = {}) {
  return { path, eyebrow, title, summary, sections, ...opts }
}
