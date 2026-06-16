/** Shared clip-path circle expand helpers (contact orb + fullscreen nav). */

export function originPercent(cx, cy) {
  const w = window.innerWidth || 1
  const h = window.innerHeight || 1
  return {
    x: (cx / w) * 100,
    y: (cy / h) * 100,
  }
}

export function clipCircleAt(x, y, radiusPercent) {
  return `circle(${radiusPercent}% at ${x}% ${y}%)`
}

export function triggerCenter(rect) {
  return {
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height / 2,
  }
}

export function setExpandOrigin(el, origin) {
  if (!el || !origin) return
  el.style.setProperty('--expand-origin-x', `${origin.x}%`)
  el.style.setProperty('--expand-origin-y', `${origin.y}%`)
}
