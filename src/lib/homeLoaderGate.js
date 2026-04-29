/**
 * Full-screen Home `Loader` should run only once per browser (first real visit).
 * Persists in localStorage so refresh, new tabs, and return navigation do not replay it.
 * In-memory fallback when storage is blocked (e.g. private mode) still avoids repeat
 * during the same tab session.
 */
const STORAGE_KEY = 'ensemble_home_intro_loader_v1'

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
    /* ignore */
  }
  return false
}

export function markHomeIntroLoaderDone() {
  memoryDone = true
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* same-tab navigation still works via memoryDone */
  }
}
