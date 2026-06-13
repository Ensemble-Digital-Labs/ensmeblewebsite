/** Default helix framing for DNA Capital WebGL stack. */
export const DNA_CLONE_HELIX_LAYOUT = {
  baseScale: 0.98,
  widthScale: 1,
  heightScale: 1,
  introScaleMin: 0.88,
  cameraZ: 6.45,
  cameraIntroPull: 0.7,
}

/** Wider ribbon on laptop; thinner + tighter on mobile — `/experiments` only. */
export const ENSEMBLE_DNA_HELIX_LAYOUT = {
  baseScale: 1.14,
  widthScale: 1.42,
  heightScale: 1.12,
  introScaleMin: 0.92,
  cameraZ: 5.62,
  cameraIntroPull: 0.52,
  helixX: 2.85,
  camX: 1.18,
  lookX: 0.98,
  narrow: {
    baseScale: 0.9,
    widthScale: 0.74,
    heightScale: 1.04,
    cameraZ: 6.05,
    helixX: 0.36,
    camX: 0.3,
    lookX: 0.24,
  },
}

export function resolveHelixFrame(layout, narrow = false) {
  const branch = narrow && layout.narrow ? { ...layout, ...layout.narrow } : layout
  return {
    baseScale: branch.baseScale,
    widthScale: branch.widthScale,
    heightScale: branch.heightScale,
    introScaleMin: branch.introScaleMin,
    cameraZ: branch.cameraZ,
    cameraIntroPull: branch.cameraIntroPull,
    helixX: branch.helixX ?? (narrow ? 0.42 : 1.58),
    camX: branch.camX ?? (narrow ? 0.38 : 1.18),
    lookX: branch.lookX ?? (narrow ? 0.32 : 0.98),
  }
}

export function helixScaleFromLayout(layout, introEase = 1, narrow = false) {
  const frame = resolveHelixFrame(layout, narrow)
  const introMult = frame.introScaleMin + introEase * (1 - frame.introScaleMin)
  const s = frame.baseScale * introMult
  return {
    x: s * frame.widthScale,
    y: s * frame.heightScale,
    z: s * frame.widthScale,
  }
}
