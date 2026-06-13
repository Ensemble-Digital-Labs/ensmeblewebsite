import { DNA_CLONE_PARTICLE_COLORS } from './dnaParticleCore'
import { ENSEMBLE_DNA_HELIX_LAYOUT } from './dnaHelixLayout'

/** WebGL options for `/experiments` — DNA Capital chain look + transparent field over home atmosphere. */
export const ENSEMBLE_DNA_SHADER_OPTIONS = {
  transparentBackground: true,
  bloomStrength: 0,
  ensembleField: true,
  particlePalette: { ...DNA_CLONE_PARTICLE_COLORS, sizeScale: 1.16 },
  particleGlow: true,
  helixLayout: ENSEMBLE_DNA_HELIX_LAYOUT,
}
