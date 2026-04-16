/**
 * Ensemble Digital Labs — company logo assets in `public/assets/branding/`.
 * Primary SVG has no background plate (transparent). Wordmark is light for use on dark UI.
 */

export const brandLogo = {
  alt: 'Ensemble Digital Labs',
  /** Primary company logo (SVG — transparent background, scales crisply) */
  fullOnDark: '/assets/branding/ensemble-logo.svg',
  /** Lockup for light backgrounds (e.g. footer sections) */
  fullOnLight: '/assets/branding/ensemble-logo-light.png',
  /** Compact mark — swap to `ensemble-mark.png` when you have an icon-only export */
  mark: '/assets/branding/ensemble-logo.svg',
  /** Tab icon — uses primary SVG; replace with `favicon.png` if you need a raster favicon */
  favicon: '/assets/branding/ensemble-logo.svg',
}
