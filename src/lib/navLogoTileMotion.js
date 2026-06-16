import { gsap } from 'gsap'

function parseRow(tile) {
  const match = tile.className.match(/fs-nav-app-tile--row-(\d)/)
  return match ? Number(match[1]) : 1
}

function isRightTile(tile) {
  return tile.closest('.fs-nav-logo-cell--right') != null
}

function readAccordionVars(accordion) {
  if (!accordion) {
    return { shiftStep: 28, tilt: 14, widthStep: 8 }
  }
  const styles = getComputedStyle(accordion)
  const shiftRaw = styles.getPropertyValue('--logo-shift-step').trim()
  const tiltRaw = styles.getPropertyValue('--logo-bar-tilt').trim()
  const widthStepRaw = styles.getPropertyValue('--logo-width-step').trim()
  const shiftStep = parseFloat(shiftRaw) || 28
  const tilt = parseFloat(tiltRaw) || 14
  const widthStep = parseFloat(widthStepRaw) || 8
  return { shiftStep, tilt, widthStep }
}

function widthForRow(row, widthStep) {
  const narrow = (row - 1) * widthStep
  return narrow === 0 ? '100%' : `calc(100% - ${narrow}%)`
}

function sortTilesForAssemble(tiles) {
  return [...tiles].sort((a, b) => {
    const rowA = parseRow(a)
    const rowB = parseRow(b)
    if (rowA !== rowB) return rowA - rowB
    return (isRightTile(a) ? 1 : 0) - (isRightTile(b) ? 1 : 0)
  })
}

function sortLogoSlices(slices) {
  return [...slices].sort((a, b) => {
    const rowA = Number(a.className.match(/--row-(\d)/)?.[1] ?? 1)
    const rowB = Number(b.className.match(/--row-(\d)/)?.[1] ?? 1)
    if (rowA !== rowB) return rowA - rowB
    const leftA = a.classList.contains('experiments-logo-nav-preview__slice--left') ? 0 : 1
    const leftB = b.classList.contains('experiments-logo-nav-preview__slice--left') ? 0 : 1
    return leftA - leftB
  })
}

function animateSvgLogoNav(slices, { instant = false } = {}) {
  if (!slices?.length) return null

  const ordered = sortLogoSlices(slices)
  gsap.killTweensOf(ordered)

  if (instant) {
    return gsap.set(ordered, { clearProps: 'opacity,visibility,transform' })
  }

  gsap.set(ordered, {
    autoAlpha: 0,
    scale: 0.9,
    transformOrigin: '50% 50%',
  })
  return gsap.to(ordered, {
    autoAlpha: 1,
    scale: 1,
    duration: 0.58,
    stagger: 0.07,
    ease: 'power3.out',
  })
}

/**
 * Full menu reveal — panels slide in, E-mark slices assemble, showcase cards stagger.
 */
export function revealFullscreenNavMenu(content, { instant = false } = {}) {
  if (!content) return null

  const showcaseAside = content.querySelector('.fs-nav-showcase-aside')
  const logoPanel = content.querySelector('.fs-nav-panel-nav')
  const logoMark = content.querySelector('.fs-nav-logo-mark')
  const logoSlices = content.querySelectorAll('.experiments-logo-nav-preview__slice')
  const showcaseCards = content.querySelectorAll('[data-showcase-loop-anim="1"]')
  const animated = [showcaseAside, logoPanel, logoMark, ...logoSlices, ...showcaseCards].filter(
    Boolean,
  )

  gsap.killTweensOf(animated)

  if (instant) {
    gsap.set(content, { autoAlpha: 1, pointerEvents: 'auto' })
    gsap.set(animated, { clearProps: 'opacity,visibility,transform' })
    return null
  }

  gsap.set(content, { autoAlpha: 1, pointerEvents: 'auto' })
  gsap.set(logoMark, { autoAlpha: 1, clearProps: 'transform' })

  if (showcaseAside) {
    gsap.set(showcaseAside, { autoAlpha: 0, x: -36 })
  }
  if (logoPanel) {
    gsap.set(logoPanel, { autoAlpha: 0, x: 40 })
  }
  if (logoSlices.length) {
    gsap.set(logoSlices, {
      autoAlpha: 0,
      scale: 0.9,
      transformOrigin: '50% 50%',
    })
  }
  if (showcaseCards.length) {
    gsap.set(showcaseCards, { autoAlpha: 0, y: 20 })
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (showcaseAside) {
    tl.to(showcaseAside, { autoAlpha: 1, x: 0, duration: 0.74 }, 0)
  }

  if (logoPanel) {
    tl.to(logoPanel, { autoAlpha: 1, x: 0, duration: 0.74 }, 0.05)
  }

  if (logoSlices.length) {
    tl.to(
      logoSlices,
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.58,
        stagger: 0.07,
        ease: 'power3.out',
      },
      0.12,
    )
  }

  if (showcaseCards.length) {
    tl.to(
      showcaseCards,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.52,
        stagger: 0.085,
      },
      0.18,
    )
  }

  return tl
}

export function resetFullscreenNavMenu(content) {
  if (!content) return

  const showcaseAside = content.querySelector('.fs-nav-showcase-aside')
  const logoPanel = content.querySelector('.fs-nav-panel-nav')
  const logoMark = content.querySelector('.fs-nav-logo-mark')
  const logoSlices = content.querySelectorAll('.experiments-logo-nav-preview__slice')
  const showcaseCards = content.querySelectorAll('[data-showcase-loop-anim="1"]')
  const animated = [showcaseAside, logoPanel, logoMark, ...logoSlices, ...showcaseCards].filter(
    Boolean,
  )

  gsap.killTweensOf(animated)
  gsap.set(animated, { clearProps: 'opacity,visibility,transform' })
  resetNavLogoTiles(content)
}

/**
 * Logo nav open — SVG E mark slices (current) or legacy flat bar accordion.
 */
export function animateNavLogoTiles(content, { instant = false } = {}) {
  const svgSlices = content?.querySelectorAll('.experiments-logo-nav-preview__slice')
  if (svgSlices?.length) {
    return animateSvgLogoNav(svgSlices, { instant })
  }

  const tiles = content?.querySelectorAll('.fs-nav-app-tile')
  if (!tiles?.length) return null

  const accordion = content.querySelector('.fs-nav-logo-accordion')
  const spine = content.querySelector('.fs-nav-logo-spine')

  gsap.killTweensOf(tiles)
  gsap.killTweensOf(spine)
  content.querySelectorAll('.fs-nav-app-tile__inner').forEach((inner) => {
    gsap.killTweensOf(inner)
  })

  if (instant) {
    gsap.set(tiles, { clearProps: 'opacity,visibility,transform,width' })
    content.querySelectorAll('.fs-nav-app-tile__inner').forEach((inner) => {
      gsap.set(inner, { clearProps: 'transform' })
    })
    if (accordion) accordion.classList.remove('is-logo-assembling')

    return gsap.fromTo(
      tiles,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: instant ? 0.01 : 0.4,
        stagger: instant ? 0 : 0.05,
        ease: 'power2.out',
      },
    )
  }

  const { shiftStep, tilt, widthStep } = readAccordionVars(accordion)
  const ordered = sortTilesForAssemble(tiles)

  if (accordion) accordion.classList.add('is-logo-assembling')

  ordered.forEach((tile) => {
    gsap.set(tile, { clearProps: 'opacity,visibility,transform,width' })
    const inner = tile.querySelector('.fs-nav-app-tile__inner')
    if (inner) gsap.set(inner, { clearProps: 'transform' })
  })

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      if (accordion) accordion.classList.remove('is-logo-assembling')
      ordered.forEach((tile) => {
        gsap.set(tile, { clearProps: 'transform,width' })
        const inner = tile.querySelector('.fs-nav-app-tile__inner')
        if (inner) gsap.set(inner, { clearProps: 'transform' })
      })
    },
  })

  if (spine) {
    gsap.set(spine, { clearProps: 'opacity,visibility,transform' })
    tl.fromTo(
      spine,
      { autoAlpha: 0, scaleY: 0.35, transformOrigin: '50% 0%' },
      { autoAlpha: 1, scaleY: 1, duration: 0.72, ease: 'power2.out' },
      0.12,
    )
  }

  ordered.forEach((tile, index) => {
    const inner = tile.querySelector('.fs-nav-app-tile__inner')
    if (!inner) return

    const row = parseRow(tile)
    const right = isRightTile(tile)
    const shift = (row - 1) * shiftStep
    const finalX = right ? -shift : shift
    const finalRot = right ? -tilt : tilt
    const finalWidth = widthForRow(row, widthStep)
    const start = 0.04 + index * 0.055

    gsap.set(tile, { autoAlpha: 0, width: '100%', x: 0 })
    gsap.set(inner, {
      rotation: 0,
      transformOrigin: right ? 'left center' : 'right center',
    })

    tl.to(
      tile,
      {
        autoAlpha: 1,
        width: finalWidth,
        x: finalX,
        duration: 0.88,
      },
      start,
    )

    tl.to(
      inner,
      {
        rotation: finalRot,
        duration: 0.88,
      },
      start,
    )
  })

  return tl
}

export function resetNavLogoTiles(content) {
  if (!content) return

  const svgSlices = content.querySelectorAll('.experiments-logo-nav-preview__slice')
  if (svgSlices.length) {
    gsap.killTweensOf(svgSlices)
    gsap.set(svgSlices, { clearProps: 'opacity,visibility,transform' })
    return
  }

  const tiles = content.querySelectorAll('.fs-nav-app-tile')
  const inners = content.querySelectorAll('.fs-nav-app-tile__inner')
  const spine = content.querySelector('.fs-nav-logo-spine')
  const accordion = content.querySelector('.fs-nav-logo-accordion')

  gsap.killTweensOf([...tiles, ...inners, spine].filter(Boolean))
  if (accordion) accordion.classList.remove('is-logo-assembling')
  gsap.set(tiles, { clearProps: 'opacity,visibility,transform,width' })
  gsap.set(inners, { clearProps: 'transform' })
  if (spine) gsap.set(spine, { clearProps: 'opacity,visibility,transform' })
}
