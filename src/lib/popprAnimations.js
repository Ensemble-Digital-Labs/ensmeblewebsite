import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
    circle.style.backgroundColor = '#A374FF'
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
 * Nav hide/show on scroll - matches poppr reference exactly
 * This handles the logo transition, NOT the chasing effect
 * The chasing effect comes from CSS transition on .nav
 */
export function initNavHide() {
  const nav = document.querySelector('.nav')
  if (!nav) return

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
 * Image reveal on hover
 */
export function initImageReveal() {
  const container = document.querySelectorAll('.part')
  const image = document.querySelectorAll('.reveal-image')

  for (let i = 0; i < container.length; i++) {
    container[i].addEventListener('mousemove', function (dets) {
      if (image[i]) {
        image[i].style.opacity = '1'
        image[i].style.top = dets.clientY / 2 + 'px'
        image[i].style.left = dets.clientX + 'px'
      }
    })

    container[i].addEventListener('mouseleave', function () {
      if (image[i]) image[i].style.opacity = '0'
    })
  }
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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      scroller: '#main',
      start: 'top 95%',   // start reveal just before footer enters view
      end: 'top 15%',    // full reveal when footer is well in view
      scrub: 2.2,
    },
  })

  // Purple circle: starts below view, rises and fades in (gradual reveal)
  if (parallaxCircle) {
    tl.fromTo(
      parallaxCircle,
      { yPercent: 85, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: 'none' },
      0
    )
  }
  // Footer content (newsletter, owl, contact): fades and slides up into place
  if (footerContent) {
    tl.fromTo(
      footerContent,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, ease: 'none' },
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

  const isMobile = window.innerWidth <= 500

  // Wait a bit for DOM to be ready
  setTimeout(() => {
    // Mobile-specific
    if (isMobile) {
      initMainImageMovement()
      initLeftArrow()
      initImagesScroll()
      initImageHover()
      initImageReveal()
      initHovered()
      initMainPageAnim()
    } else {
      // Desktop-specific
      initCursorMove()
      initMainImageMovement()
      initLeftArrow()
      initNavHide() // Desktop only - logo hide/show
      initImagesScroll()
      initImageHover()
      initImageReveal()
      initFooterScroll()
      initEyeBall()
      initHovered()
      initMainPageAnim()
    }
  }, 1000)
}
