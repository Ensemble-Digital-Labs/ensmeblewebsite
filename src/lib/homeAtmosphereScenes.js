/**
 * Scroll-linked “luxury lighting” palettes for the home atmosphere layer.
 * Warm, marketing-forward blends — not cold infra / cyber cyan.
 */

export const HOME_ATMOSPHERE_NAV_EVENT = 'ensemble:home-atmosphere-nav'

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const num = parseInt(n, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function rgbToHex(r, g, b) {
  const x = (v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')
  return `#${x(r)}${x(g)}${x(b)}`
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function lerpHex(a, b, t) {
  const A = hexToRgb(a)
  const B = hexToRgb(b)
  return rgbToHex(lerp(A.r, B.r, t), lerp(A.g, B.g, t), lerp(A.b, B.b, t))
}

function rgbaLerp(ca, aa, cb, ab, t) {
  const u = Math.max(0, Math.min(1, t))
  const r = Math.round(lerp(ca.r, cb.r, u))
  const g = Math.round(lerp(ca.g, cb.g, u))
  const b = Math.round(lerp(ca.b, cb.b, u))
  const a = lerp(aa, ab, u)
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`
}

/**
 * @typedef {{ color: string, alpha: number }} Blob
 * @typedef {{ base1: string, base2: string, blob1: Blob, blob2: Blob }} AtmosphereScene
 */

/** @type {AtmosphereScene[]} Scroll top → bottom */
export const HOME_ATMOSPHERE_SCENES = [
  {
    label: 'hero',
    base1: '#14122a',
    base2: '#221c4a',
    blob1: { color: '#ea580c', alpha: 0.14 },
    blob2: { color: '#818cf8', alpha: 0.12 },
  },
  {
    label: 'services',
    base1: '#1a2744',
    base2: '#3d2a5c',
    blob1: { color: '#38bdf8', alpha: 0.12 },
    blob2: { color: '#c4b5fd', alpha: 0.16 },
  },
  {
    label: 'results',
    base1: '#3b2419',
    base2: '#6c2710',
    blob1: { color: '#fb923c', alpha: 0.2 },
    blob2: { color: '#fb7185', alpha: 0.12 },
  },
  {
    label: 'portfolio',
    base1: '#0f172a',
    base2: '#3730a3',
    blob1: { color: '#c084fc', alpha: 0.15 },
    blob2: { color: '#1e40af', alpha: 0.26 },
  },
  {
    label: 'cta',
    base1: '#431407',
    base2: '#9a3412',
    blob1: { color: '#fdba74', alpha: 0.22 },
    blob2: { color: '#fb7185', alpha: 0.14 },
  },
]

/**
 * @param {AtmosphereScene} a
 * @param {AtmosphereScene} b
 * @param {number} t 0–1 between adjacent scenes
 */
export function blendHomeAtmosphereScenes(a, b, t) {
  const u = Math.max(0, Math.min(1, t))
  const c1a = hexToRgb(a.blob1.color)
  const c1b = hexToRgb(b.blob1.color)
  const c2a = hexToRgb(a.blob2.color)
  const c2b = hexToRgb(b.blob2.color)
  return {
    base1: lerpHex(a.base1, b.base1, u),
    base2: lerpHex(a.base2, b.base2, u),
    blob1: rgbaLerp(c1a, a.blob1.alpha, c1b, b.blob1.alpha, u),
    blob2: rgbaLerp(c2a, a.blob2.alpha, c2b, b.blob2.alpha, u),
  }
}

export function atmosphereLayerStyle(blended) {
  return {
    background: `
      radial-gradient(ellipse 120% 85% at 14% 18%, ${blended.blob1} 0%, transparent 58%),
      radial-gradient(ellipse 95% 75% at 88% 78%, ${blended.blob2} 0%, transparent 52%),
      linear-gradient(168deg, ${blended.base1} 0%, ${blended.base2} 100%)
    `
      .replace(/\s+/g, ' ')
      .trim(),
  }
}

/** @returns {ReturnType<typeof blendHomeAtmosphereScenes>} */
export function getBlendedHomeAtmosphere(progress, scenes = HOME_ATMOSPHERE_SCENES) {
  if (!scenes.length) {
    return blendHomeAtmosphereScenes(HOME_ATMOSPHERE_SCENES[0], HOME_ATMOSPHERE_SCENES[0], 0)
  }
  if (scenes.length === 1) {
    return blendHomeAtmosphereScenes(scenes[0], scenes[0], 0)
  }
  const n = scenes.length - 1
  const x = Math.max(0, Math.min(1, progress)) * n
  const i = Math.min(Math.floor(x), n - 1)
  const t = x - i
  return blendHomeAtmosphereScenes(scenes[i], scenes[i + 1], t)
}

/** WCAG relative luminance for sRGB hex (0–1). */
export function relativeLuminanceHex(hex) {
  const { r, g, b } = hexToRgb(hex)
  const lin = (v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  const R = lin(r)
  const G = lin(g)
  const B = lin(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

/**
 * Whether the current home atmosphere reads as “dark” behind the nav (use light wordmark SVG).
 * Threshold tuned so navy / plum / rust hero bands stay dark; very light futures can flip.
 */
export function homeAtmosphereBackdropIsDark(progress, threshold = 0.42) {
  const b = getBlendedHomeAtmosphere(progress)
  const L = 0.52 * relativeLuminanceHex(b.base1) + 0.48 * relativeLuminanceHex(b.base2)
  return L < threshold
}

export function applyAtmosphereToElement(el, progress, scenes = HOME_ATMOSPHERE_SCENES) {
  if (!el || scenes.length === 0) return
  const blended = getBlendedHomeAtmosphere(progress, scenes)
  Object.assign(el.style, atmosphereLayerStyle(blended))
}
