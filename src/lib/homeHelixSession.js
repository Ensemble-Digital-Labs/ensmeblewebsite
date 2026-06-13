/** Session flag — first home ribbon intro played this tab (skip fade on return visits). */
let homeHelixIntroCompleted = false

export function hasHomeHelixIntroCompleted() {
  return homeHelixIntroCompleted
}

export function markHomeHelixIntroCompleted() {
  homeHelixIntroCompleted = true
}

export function resetHomeHelixIntroSession() {
  homeHelixIntroCompleted = false
}
