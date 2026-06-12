/**
 * Full-screen Home `Loader` should run once per user (browser/device).
 * Persist to localStorage so refresh/new tab does not replay it.
 */
const STORAGE_KEY = 'ensemble_home_intro_loader_v2'

let memoryDone = false

export function isHomeIntroLoaderDone() {
  if (typeof window === 'undefined') return false
  if (memoryDone) return true
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === '1') {
      memoryDone = true
      return true
    }
  } catch {
    /* ignore blocked storage */
  }
  return false
}

export function markHomeIntroLoaderDone() {
  memoryDone = true
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* fallback to in-memory only */
  }
}
