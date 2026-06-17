import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clamp, prefersReducedMotion } from './utils'
import {
  getAnimationVariant,
  scrollRevealProfiles,
  footerScrollProfiles,
} from './animationProfile'

gsap.registerPlugin(ScrollTrigger)

const DEBUG_SCROLL_REVEAL = false

/**
 * Initialize Locomotive Scroll with GSAP ScrollTrigger integration
 * This is handled by useLocomotiveScroll hook, so this is just a placeholder
 * The actual initialization happens in locomotive.js
 */
export function initLocomotiveScroll(mainElement) {
  // Locomotive Scroll is initialized in useLocomotiveScroll hook
  // This function is kept for compatibility but does nothing
  return null
}

/**
 * Cursor move - matches poppr reference
 */
export function initCursorMove() {
  const mouse = document.querySelector('.moving-circle')
  if (!mouse) return

  document.body.addEventListener('mousemove', function (dets) {
    mouse.style.left = `${dets.clientX}px`
    mouse.style.top = `${dets.clientY}px`
  })
}

/**
 * Main image movement - 3D tilt effect
 */
export function initMainImageMovement(targetSelector = '#page1', visualSelector = '.video > video') {
  const visual = document.querySelector(visualSelector)
  const target = document.querySelector(targetSelector)
  if (!visual || !target) return

  target.addEventListener('mousemove', function (dets) {
    const rotx = (window.innerWidth / 2 - dets.clientX) / 17
    const roty = -(window.innerHeight / 2 - dets.clientY) / 10
    visual.style.transform = `rotateX(${rotx}deg) rotateY(${-roty}deg)`
  })
}

/**
 * Left arrow hover effects
 */
export function initLeftArrow(containerSelector = '.left-arrow') {
  const container = document.querySelector(containerSelector)
  if (!container) return

  const circle = container.querySelector('.arrow-circle')
  const arrowInitial = container.querySelector('#arrow-initial')
  const arrowAfter = container.querySelector('#arrow-after')
  const arrowdiv = container.querySelector('.arrow')

  if (!circle || !arrowInitial || !arrowAfter || !arrowdiv) return

  container.addEventListener('mouseover', function () {
    circle.style.scale = '0.3'
    circle.style.backgroundColor = '#e94e77'
    arrowInitial.style.top = '15vh'
    arrowAfter.style.top = '3.5vh'
    arrowdiv.style.scale = '3'
  })

  container.addEventListener('mouseleave', function () {
    circle.style.scale = 'initial'
    arrowInitial.style.top = '3.5vh'
    arrowAfter.style.top = '-7vh'
    arrowdiv.style.scale = 'initial'
    circle.style.backgroundColor = 'transparent'
  })
}

/**
 * Nav hide/show on scroll - optional: hide full "ENSEMBLE", reveal compact "E"
 * Disabled by default so the full logo stays visible on scroll (set ENABLE_NAV_LOGO_SWAP to true to restore)
 */
const ENABLE_NAV_LOGO_SWAP = false

export function initNavHide() {
  const nav = document.querySelector('.nav')
  if (!nav) return

  if (!ENABLE_NAV_LOGO_SWAP) {
    // Keep full "ENSEMBLE" visible; ensure compact logo stays hidden
    const reveal = document.querySelector('.nav .reveal')
    if (reveal) reveal.style.display = 'none'
    return
  }

  gsap.to('.hide', {
    scrollTrigger: {
      trigger: '.nav',
      scroller: '#main',
      start: '100% 10%',
      end: 'top 20%',
      scrub: true,
    },
    display: 'none',
  })

  gsap.to('.reveal', {
    scrollTrigger: {
      trigger: '.nav',
      scroller: '#main',
      start: '100% 10%',
      end: 'top 20%',
      scrub: true,
    },
    display: 'initial',
  })
}

/**
 * Images scroll animation
 */
export function initImagesScroll() {
  const images = document.querySelectorAll('.images')
  const zoomed = document.querySelectorAll('.zoomed')

  if (images.length === 0 && zoomed.length === 0) {
    // Elements not found, skip animation
    return
  }

  if (images.length > 0) {
    gsap.to('.images', {
      scrollTrigger: {
        trigger: '.images',
        scroller: '#main',
        scrub: true,
      },
      x: '-60vw',
    })
  }

  if (zoomed.length > 0) {
    gsap.to('.zoomed', {
      scrollTrigger: {
        trigger: '.zoomed',
        scroller: '#main',
        scrub: true,
      },
      width: '45vw',
    })
  }
}

/**
 * Image hover effects
 */
export function initImageHover() {
  const image = document.querySelectorAll('.image')
  const zoom = document.querySelectorAll('.zoomed')
  const text = document.querySelectorAll('.texts')
  const spanColor = document.querySelectorAll('.label')

  for (let i = 0; i < image.length; i++) {
    image[i].addEventListener('mouseenter', function (dets) {
      const color = dets.path[0].dataset.color
      if (spanColor[i]) spanColor[i].style.color = color
      if (text[i]) text[i].style.opacity = '1'
      if (zoom[i]) zoom[i].style.transform = 'scale(1.1)'
    })

    image[i].addEventListener('mouseleave', function () {
      if (text[i]) text[i].style.opacity = '0'
      if (zoom[i]) zoom[i].style.transform = 'scale(1)'
    })
  }

  const container = document.querySelector('.mySwiper')
  const dragcursor = document.querySelector('.drag-cursor')

  if (container && dragcursor) {
    container.addEventListener('mousemove', function (e) {
      dragcursor.style.opacity = '1'
      dragcursor.style.left = e.clientX + 'px'
      dragcursor.style.top = e.pageY / 2.5 + 'px'
    })

    container.addEventListener('mouseleave', function () {
      dragcursor.style.opacity = '0'
    })
  }
}

/**
 * Image reveal on hover — cursor-follow preview cards inside each `.part` (e.g. #page4).
 * Uses coordinates relative to the column, not the viewport (fixes wrong/off-screen placement).
 */
export function initImageReveal() {
  if (prefersReducedMotion()) return

  const parts = document.querySelectorAll('.part')

  parts.forEach((part) => {
    if (part.dataset.revealBound === 'true') return
    const img = part.querySelector('.reveal-image')
    if (!img) return

    part.dataset.revealBound = 'true'

    part.addEventListener('mousemove', (e) => {
      const rect = part.getBoundingClientRect()
      const iw = img.offsetWidth || 1
      const ih = img.offsetHeight || 1
      /* `.reveal-image` is out of flow, so `rect.height` is only the text stack — often shorter
       * than `ih` on large viewports → clamp collapsed to ~0 vertical travel. Slack + vw floor
       * restores a usable follow range without fighting layout. */
      const slackX = Math.max(40, iw * 0.22)
      const slackY = Math.max(64, ih * 0.38, window.innerHeight * 0.065)
      let left = e.clientX - rect.left - iw / 2
      let top = e.clientY - rect.top - ih / 2
      left = clamp(left, -slackX, Math.max(-slackX, rect.width - iw + slackX))
      top = clamp(top, -slackY, Math.max(-slackY, rect.height - ih + slackY))
      img.style.opacity = '1'
      img.style.left = `${left}px`
      img.style.top = `${top}px`
    })

    part.addEventListener('mouseleave', () => {
      img.style.opacity = '0'
    })
  })
}

/**
 * Footer scroll reveal – poppr-style: footer gradually shows up as you scroll to the bottom
 * Purple circle and content rise and fade in over the scroll range.
 */
export function initFooterScroll() {
  const footer = document.querySelector('footer')
  const footerCover = document.querySelector('.footer-cover-parallax')
  const parallaxCircle = document.querySelector('.parallax-circle')
  const footerContent = document.querySelector('.footer-content')
  if (!footer || !footerCover) return

  const variant = getAnimationVariant()
  const fp = footerScrollProfiles[variant]

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      scroller: '#main',
      start: 'top 95%',   // start reveal just before footer enters view
      end: 'top 25%',    // full reveal earlier so content is sharp (was 15%)
      scrub: fp.scrub,
    },
  })

  // Curved block: starts below view, rises and fades in (gradual reveal)
  if (parallaxCircle) {
    tl.fromTo(
      parallaxCircle,
      { yPercent: fp.parallaxFrom, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: 'none' },
      0
    )
  }
  // Footer content: slide up only (no opacity animation so text stays sharp)
  if (footerContent) {
    tl.fromTo(
      footerContent,
      { y: fp.contentY },
      { y: 0, ease: 'none' },
      0.15
    )
  }

  setTimeout(() => ScrollTrigger.refresh(), 100)
}

/**
 * Eye ball tracking
 */
export function initEyeBall() {
  const balls = document.getElementsByClassName('ball')
  if (balls.length === 0) return

  document.addEventListener('mousemove', function (e) {
    const x = (e.clientX * 100) / window.innerWidth + '%'
    const y = (e.clientY * 100) / window.innerHeight + '%'

    for (let i = 0; i < 2; i++) {
      if (balls[i]) {
        balls[i].style.left = x
        balls[i].style.top = y
        balls[i].style.transform = `translate(-${x}, -${y})`
      }
    }
  })
}

/**
 * Menu hover effects
 */
export function initHovered() {
  const elem = document.querySelectorAll('#offering h4')
  const line = document.querySelectorAll('.cross-line')

  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener('mouseover', function () {
      if (line[i]) {
        line[i].style.width = '100%'
        line[i].style.right = '0%'
        line[i].style.animation = 'lineAnim 1s linear both'
      }
    })

    elem[i].addEventListener('mouseleave', function () {
      if (line[i]) {
        line[i].style.width = '0%'
        line[i].style.animation = 'lineAnimBack 1s linear both'
      }
    })
  }
}

/**
 * Loader animation
 */
export function initLoader() {
  // Only if loader exists
  const loader = document.querySelector('#loader')
  if (!loader) return

  gsap.to('#loader', {
    y: '-100%',
    opacity: '0',
    zIndex: '-1',
    delay: 5,
  })

  // Textillate requires jQuery - skip for now or implement alternative
  // gsap.from("#loader>h3", { ... })
}

/**
 * Scroll reveal: sections smoothly fade in (+ slide up) as they enter view.
 * Single long scroll, no snap – uses Lenis/Locomotive scroller (#main).
 * Initial state via CSS so content isn’t hidden by GSAP before trigger fires.
 */
export function initScrollReveal(mainElement) {
  if (prefersReducedMotion() || getAnimationVariant() === 'mobile') return

  const scroller = mainElement || document.querySelector('#main')
  if (!scroller) {
    if (DEBUG_SCROLL_REVEAL) console.warn('[ScrollReveal] No scroller element (#main or mainElement)')
    return
  }

  // Kill existing scroll-reveal triggers so we can re-run on route change (e.g. back to Home)
  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger && t.trigger.hasAttribute && t.trigger.hasAttribute('data-scroll-section')) {
      t.kill()
    }
  })

  const sections = document.querySelectorAll('[data-scroll-section]')
  if (!sections.length) {
    if (DEBUG_SCROLL_REVEAL) console.warn('[ScrollReveal] No [data-scroll-section] elements found')
    return
  }

  if (DEBUG_SCROLL_REVEAL) {
    console.log('[ScrollReveal] Init', {
      scroller: scroller.id || scroller.className || scroller.tagName,
      scrollerIsMain: scroller.id === 'main',
      sectionCount: sections.length,
      sectionIds: [...sections].map((s) => s.id || s.className || '(no id)'),
    })
  }

  const variant = getAnimationVariant()
  const sr = scrollRevealProfiles[variant]

  sections.forEach((section, i) => {
    const label = section.id || `section-${i}`
    gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: sr.duration,
      delay: sr.delayFactor * i,
      ease: sr.ease,
      overwrite: 'auto',
      scrollTrigger: {
        trigger: section,
        scroller,
        start: sr.start,
        end: sr.end,
        toggleActions: 'play none none none',
        once: true,
        onEnter: () => {
          if (DEBUG_SCROLL_REVEAL) console.log('[ScrollReveal] onEnter', label)
        },
        onRefresh: (self) => {
          if (DEBUG_SCROLL_REVEAL && i === 0) {
            console.log('[ScrollReveal] refresh (first trigger)', {
              start: self.start,
              end: self.end,
              direction: self.direction,
              progress: self.progress,
            })
          }
        },
      },
    })
  })

  ScrollTrigger.refresh()

  // Immediately reveal any section already in or near the viewport (fixes returning to Home with scroll at 0)
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    if (rect.top < viewportH * 1.35) {
      gsap.set(section, { opacity: 1, y: 0 })
    }
  })

  if (DEBUG_SCROLL_REVEAL) {
    const triggers = ScrollTrigger.getAll().filter((t) => t.trigger && t.trigger.hasAttribute && t.trigger.hasAttribute('data-scroll-section'))
    console.log('[ScrollReveal] ScrollTrigger count for sections', triggers.length)
  }
}

/**
 * Main page animation
 */
export function initMainPageAnim() {
  gsap.from('.main-text', {
    left: '-30%',
    delay: '5',
    yoyo: true,
  })
}

/**
 * Initialize all animations based on viewport width
 * Matches poppr reference exactly
 */
export function initAllAnimations(mainElement) {
  if (typeof window === 'undefined') return

  const variant = getAnimationVariant()
  const isMobile = variant === 'mobile'

  // Wait a bit for DOM to be ready
  setTimeout(() => {
    if (isMobile) {
      initLeftArrow()
      initImagesScroll()
      initImageHover()
      initImageReveal()
      initHovered()
      initMainPageAnim()
      return
    }

    initScrollReveal(mainElement) // Fade-in sections — timing differs by `scrollRevealProfiles`
    initLeftArrow()
    initImagesScroll()
    initImageHover()
    initImageReveal()
    initHovered()
    initMainPageAnim()
    initFooterScroll() // both variants; strength from `footerScrollProfiles`

    initCursorMove()
    initNavHide()
    initEyeBall()
  }, 1000)
}
