function clamp01(v) {
  return Math.max(0, Math.min(1, v))
}

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / Math.max(edge1 - edge0, 1))
  return t * t * (3 - 2 * t)
}

function sectionDocTop(mainEl, el) {
  if (!mainEl || !el) return 0
  const mainRect = mainEl.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return mainEl.scrollTop + elRect.top - mainRect.top
}

let cachedSectionLayout = null
let cachedLayoutScroll = -1

function getSectionLayout(mainEl) {
  const scroll = mainEl?.scrollTop ?? 0
  if (cachedSectionLayout && Math.abs(scroll - cachedLayoutScroll) < 2) {
    return cachedSectionLayout
  }
  cachedLayoutScroll = scroll
  cachedSectionLayout = {
    heroTop: sectionDocTop(
      mainEl,
      document.getElementById('dna-clone-hero') || document.getElementById('home-hero'),
    ),
    statsTop: sectionDocTop(
      mainEl,
      document.getElementById('dna-clone-stats') || document.getElementById('home-proof'),
    ),
    teamTop: sectionDocTop(
      mainEl,
      document.getElementById('team') || document.getElementById('home-brand'),
    ),
    approachTop: sectionDocTop(
      mainEl,
      document.getElementById('approach') || document.getElementById('home-cta'),
    ),
  }
  return cachedSectionLayout
}

export function invalidateDnaCapitalScrollLayout() {
  cachedSectionLayout = null
  cachedLayoutScroll = -1
}

/**
 * Scroll phases for dnacapital.com-style WebGL transitions (not home canvas DNA).
 * helix → drift/morph → starfield content → wave grid (approach).
 */
export function computeDnaCapitalScrollState(mainEl) {
  const scroll = mainEl?.scrollTop ?? 0
  const vh = window.innerHeight
  const doc =
    document.getElementById('dna-clone-scroll') || document.getElementById('home-scroll-root')
  const maxScroll = Math.max((doc?.scrollHeight ?? vh) - vh, 1)
  const globalProgress = scroll / maxScroll

  const heroTop = getSectionLayout(mainEl).heroTop
  const statsTop = getSectionLayout(mainEl).statsTop
  const teamTop = getSectionLayout(mainEl).teamTop
  const approachTop = getSectionLayout(mainEl).approachTop

  const heroEnd = statsTop > heroTop ? statsTop : vh * 0.92
  const contentMid = teamTop > heroEnd ? teamTop : heroEnd + vh * 1.1
  const approachStart = approachTop > contentMid ? approachTop : maxScroll * 0.62

  /* Phase 1→2: helix drifts up / rotates (stats + companies) */
  const drift = smoothstep(heroEnd * 0.55, heroEnd + vh * 0.85, scroll)

  /* Phase 2→3: helix morphs into scattered field */
  const morph = smoothstep(heroEnd + vh * 0.25, contentMid + vh * 0.35, scroll)

  /* Helix visibility fades as content takes over */
  const helixMix = 1 - smoothstep(heroEnd + vh * 0.15, approachStart - vh * 0.25, scroll)

  /* Phase 4: wave terrain (approach / ring stats band) */
  const waveMix = smoothstep(approachStart - vh * 0.55, approachStart + vh * 0.05, scroll)

  /* Camera eases from hero close-up to overview */
  const cameraLift = smoothstep(heroEnd * 0.4, approachStart, scroll)

  return {
    globalProgress,
    scroll,
    drift,
    morph,
    helixMix,
    waveMix,
    cameraLift,
  }
}
