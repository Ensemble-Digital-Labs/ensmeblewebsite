/**
 * Ensemble Digital Labs — company logo assets in `public/assets/branding/`.
 * `ensemble-logo.svg` — light/white wordmark for nav + dark UI (loader, menu).
 * `ensemble-logo-on-light.svg` — legacy dark wordmark for light canvas (unused in nav).
 */

export const brandLogo = {
  alt: 'Ensemble Digital Labs',
  /** Light wordmark — use on dark UI (loader, menu overlay) */
  fullOnDark: '/assets/branding/ensemble-logo.svg',
  /** Dark wordmark on transparent — nav + light page canvas */
  fullOnLightCanvas: '/assets/branding/ensemble-logo-on-light.svg',
  /** Raster lockup for light footer sections */
  fullOnLight: '/assets/branding/ensemble-logo-light.png',
  /** Compact mark — swap to `ensemble-mark.png` when you have an icon-only export */
  mark: '/assets/branding/ensemble-logo.svg',
  /** Tab icon — uses primary SVG; replace with `favicon.png` if you need a raster favicon */
  favicon: '/assets/branding/ensemble-logo.svg',
}
