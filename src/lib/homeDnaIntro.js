/** 0→1 intro progress for home page DNA helix (scatter → chain, fade in). */
let introProgress = 0

export function getHomeDnaIntroProgress() {
  return introProgress
}

export function setHomeDnaIntroProgress(value) {
  introProgress = Math.max(0, Math.min(1, value))
}

export function resetHomeDnaIntroProgress() {
  introProgress = 0
}

/** Smoothstep ease — matches DNA Capital clone intro feel. */
export function easeHomeDnaIntro(t) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}
