/** Home ribbon helix intro — isolated from `/experiments` clone intro state. */
let introProgress = 0

export function getHomeRibbonIntroProgress() {
  return introProgress
}

export function setHomeRibbonIntroProgress(value) {
  introProgress = Math.max(0, Math.min(1, value))
}

export function resetHomeRibbonIntroProgress() {
  introProgress = 0
}
