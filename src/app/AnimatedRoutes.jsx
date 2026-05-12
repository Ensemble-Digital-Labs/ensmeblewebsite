import { useState, useLayoutEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Home from '../pages/Home'
import CaseStudies from '../pages/CaseStudies'
import CaseStudyDetail from '../pages/CaseStudyDetail'
import Services from '../pages/Services'
import About from '../pages/About'
import Contact from '../pages/Contact'
import DynamicSitePage from '../pages/DynamicSitePage'
import BlogHub from '../pages/BlogHub'
import NotFound from '../pages/NotFound'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Cross-page transition: fade + light vertical drift (muted when reduced motion).
 * Uses a frozen `displayLocation` so the outgoing view keeps the previous route during exit.
 */
function AnimatedRoutes() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const reduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setDisplayLocation(location)
    }
  }, [location, displayLocation])

  const duration = reduceMotion ? 0.05 : 0.38
  const initial = reduceMotion ? false : { opacity: 0, y: 12 }
  const animate = { opacity: 1, y: 0 }
  const exit = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={displayLocation.pathname}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{ duration, ease: EASE }}
        className="w-full min-h-0"
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />

          <Route path="/insights" element={<Navigate to="/blog" replace />} />
          <Route path="/casestudies" element={<Navigate to="/case-studies" replace />} />

          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

          <Route path="/services" element={<Services />} />
          <Route path="/services/*" element={<DynamicSitePage />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/blog" element={<BlogHub />} />
          <Route path="/blog/category/:categorySlug" element={<DynamicSitePage />} />
          <Route path="/blog/:articleSlug" element={<DynamicSitePage />} />

          <Route path="/ai" element={<DynamicSitePage />} />
          <Route path="/ai/:slug" element={<DynamicSitePage />} />

          <Route path="/specialties" element={<DynamicSitePage />} />
          <Route path="/specialties/:slug" element={<DynamicSitePage />} />

          <Route path="/portfolio" element={<DynamicSitePage />} />
          <Route path="/portfolio/:slug" element={<DynamicSitePage />} />

          <Route path="/plans" element={<DynamicSitePage />} />
          <Route path="/plans/:slug" element={<DynamicSitePage />} />

          <Route path="/free-practice-audit" element={<DynamicSitePage />} />
          <Route path="/privacy-policy" element={<DynamicSitePage />} />
          <Route path="/terms" element={<DynamicSitePage />} />
          <Route path="/thank-you" element={<DynamicSitePage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
