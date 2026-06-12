/** Shared 0→1 intro progress for DNA clone hero + WebGL (dnacapital.com load sequence). */
let introProgress = 0

export function getDnaCloneIntroProgress() {
  return introProgress
}

export function setDnaCloneIntroProgress(value) {
  introProgress = Math.max(0, Math.min(1, value))
}

export function resetDnaCloneIntroProgress() {
  introProgress = 0
}
