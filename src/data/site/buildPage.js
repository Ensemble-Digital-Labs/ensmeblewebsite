/** @typedef {{ title?: string, body: string }} SiteSection */
/** @typedef {{ path: string, eyebrow: string, title: string, summary: string, sections: SiteSection[], tags?: string[], noIndex?: boolean }} SitePageDoc */

/**
 * @param {string} path
 * @param {string} eyebrow
 * @param {string} title
 * @param {string} summary
 * @param {SiteSection[]} sections
 * @param {{ tags?: string[], noIndex?: boolean }} [opts]
 * @returns {SitePageDoc}
 */
export function page(path, eyebrow, title, summary, sections, opts = {}) {
  return { path, eyebrow, title, summary, sections, ...opts }
}
