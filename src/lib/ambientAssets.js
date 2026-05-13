/**
 * Decorative ambient PNGs — `public/assets/images/ambient/`.
 * Use sparingly as overlays, soft section washes, or future motion/canvas layers
 * (keep restraint per design-direction — no noisy full-screen stacks).
 */
const base = '/assets/images/ambient'

export const ambientAssets = {
  layer01: `${base}/ambient-layer-01.png`,
  layer02: `${base}/ambient-layer-02.png`,
  layer03: `${base}/ambient-layer-03.png`,
  layer04: `${base}/ambient-layer-04.png`,
}

/** Lighter / high-key ambient variants (same folder). */
export const ambientWhiteAssets = {
  layer01: `${base}/ambient-layer-white-01.png`,
  layer02: `${base}/ambient-layer-white-02.png`,
  layer03: `${base}/ambient-layer-white-03.png`,
}

/** All ambient URLs in stable order (01 → 04). */
export const ambientAssetList = [
  ambientAssets.layer01,
  ambientAssets.layer02,
  ambientAssets.layer03,
  ambientAssets.layer04,
]

/** White ambient set (01 → 03). */
export const ambientWhiteAssetList = [
  ambientWhiteAssets.layer01,
  ambientWhiteAssets.layer02,
  ambientWhiteAssets.layer03,
]
