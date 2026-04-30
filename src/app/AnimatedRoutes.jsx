import { useState, useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Home from '../pages/Home'
import CaseStudies from '../pages/CaseStudies'
import CaseStudyDetail from '../pages/CaseStudyDetail'
import Services from '../pages/Services'
import About from '../pages/About'
import Insights from '../pages/Insights'
import Contact from '../pages/Contact'

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
          <Route path="/casestudies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
