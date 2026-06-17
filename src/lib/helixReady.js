/** Home ribbon helix WebGL readiness — gates intro fade until particles can render. */

const READY_EVENT = 'ensemble:helix-ready'
const FAIL_EVENT = 'ensemble:helix-failed'

let homeHelixWebglReady = false

export function isHomeHelixWebglReady() {
  return homeHelixWebglReady
}

export function markHomeHelixWebglReady() {
  if (homeHelixWebglReady) return
  homeHelixWebglReady = true
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(READY_EVENT))
  }
}

export function markHomeHelixWebglFailed() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(FAIL_EVENT))
  }
}

export function resetHomeHelixWebglReady() {
  homeHelixWebglReady = false
}

/**
 * Resolves when helix particles have rendered at least one frame, failed, or timed out.
 * @returns {Promise<'ready' | 'failed' | 'timeout'>}
 */
export function waitForHomeHelixReady({ timeoutMs = 14000 } = {}) {
  if (homeHelixWebglReady) return Promise.resolve('ready')
  if (typeof window === 'undefined') return Promise.resolve('timeout')

  return new Promise((resolve) => {
    const finish = (result) => {
      cleanup()
      resolve(result)
    }

    const onReady = () => finish('ready')
    const onFail = () => finish('failed')
    const timer = window.setTimeout(() => finish('timeout'), timeoutMs)

    const cleanup = () => {
      window.clearTimeout(timer)
      window.removeEventListener(READY_EVENT, onReady)
      window.removeEventListener(FAIL_EVENT, onFail)
    }

    window.addEventListener(READY_EVENT, onReady)
    window.addEventListener(FAIL_EVENT, onFail)
  })
}
