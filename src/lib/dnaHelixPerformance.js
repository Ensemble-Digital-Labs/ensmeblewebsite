import { isMobileAnimationVariant } from './animationProfile'

export const DNA_HELIX_PARTICLE_CAP_DESKTOP = 14000
export const DNA_HELIX_PARTICLE_CAP_MOBILE = 6500
export const DNA_HELIX_STAR_COUNT_DESKTOP = 900
export const DNA_HELIX_STAR_COUNT_MOBILE = 480

export function isDnaHelixMobileProfile() {
  if (typeof window === 'undefined') return false
  return isMobileAnimationVariant() || window.innerWidth < 768
}

export function getDnaHelixParticleCap() {
  return isDnaHelixMobileProfile()
    ? DNA_HELIX_PARTICLE_CAP_MOBILE
    : DNA_HELIX_PARTICLE_CAP_DESKTOP
}

export function getDnaHelixPixelRatio() {
  if (typeof window === 'undefined') return 1
  const dpr = window.devicePixelRatio || 1
  if (isDnaHelixMobileProfile()) return Math.min(dpr, 1.25)
  return Math.min(dpr, 2)
}

export function getDnaHelixStarCount() {
  return isDnaHelixMobileProfile() ? DNA_HELIX_STAR_COUNT_MOBILE : DNA_HELIX_STAR_COUNT_DESKTOP
}

export function getDnaHelixRendererOptions() {
  return {
    antialias: !isDnaHelixMobileProfile(),
    pixelRatio: getDnaHelixPixelRatio(),
  }
}
