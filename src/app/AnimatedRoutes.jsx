import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Home from '../pages/Home'
import { isDnaCapitalCloneRoute } from '../lib/dnaCapitalRoutes'
import { isCaseStudiesGalleryRoute } from '../lib/caseStudiesGalleryRoutes'

const HomeV1 = lazy(() => import('../pages/HomeV1'))
const HomeV2 = lazy(() => import('../pages/HomeV2'))
const CaseStudies = lazy(() => import('../pages/CaseStudies'))
const CaseStudiesV2 = lazy(() => import('../pages/CaseStudiesV2'))
const CaseStudyDetail = lazy(() => import('../pages/CaseStudyDetail'))
const Services = lazy(() => import('../pages/Services'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))
const DynamicSitePage = lazy(() => import('../pages/DynamicSitePage'))
const AiPage = lazy(() => import('../pages/AiPage'))
const AiSlugRedirect = lazy(() => import('../pages/AiPage').then((m) => ({ default: m.AiSlugRedirect })))
const LegalPage = lazy(() => import('../pages/LegalPage'))
const BlogHub = lazy(() => import('../pages/BlogHub'))
const BlogArticleDetail = lazy(() => import('../pages/BlogArticleDetail'))
const NotFound = lazy(() => import('../pages/NotFound'))
const LamaLamaClone = lazy(() => import('../pages/LamaLamaClone'))
const Experiments = lazy(() => import('../pages/Experiments'))

const EASE = [0.22, 1, 0.36, 1]

/**
 * Cross-page transition: fade + light vertical drift (muted when reduced motion).
 * `key={location.pathname}` lets AnimatePresence run exit before the next route mounts.
 */
function AnimatedRoutes() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const isDnaClone = isDnaCapitalCloneRoute(location.pathname)
  const isLamaLamaClone = location.pathname === '/lamalama-clone'
  const isCloneRoute = isDnaClone || isLamaLamaClone
  const isCaseStudiesGallery = isCaseStudiesGalleryRoute(location.pathname)

  const duration = reduceMotion || isCloneRoute || isCaseStudiesGallery ? 0.05 : 0.38
  const initial =
    reduceMotion || isCloneRoute || isCaseStudiesGallery ? false : { opacity: 0, y: 12 }
  const animate = { opacity: 1, y: 0 }
  const exit =
    reduceMotion || isCloneRoute || isCaseStudiesGallery ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }

  const routes = (
    <Suspense fallback={null}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/home-v1" element={<HomeV1 />} />
        <Route path="/home-v2" element={<HomeV2 />} />

        <Route path="/insights" element={<Navigate to="/blog" replace />} />
        <Route path="/casestudies" element={<Navigate to="/case-studies" replace />} />

        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies-v2" element={<CaseStudiesV2 />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/*" element={<DynamicSitePage />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/blog" element={<BlogHub />} />
        <Route path="/blog/category/:categorySlug" element={<DynamicSitePage />} />
        <Route path="/blog/:articleSlug" element={<BlogArticleDetail />} />

        <Route path="/ai" element={<AiPage />} />
        <Route path="/ai/:slug" element={<AiSlugRedirect />} />

        <Route path="/specialties" element={<DynamicSitePage />} />
        <Route path="/specialties/:slug" element={<DynamicSitePage />} />

        <Route path="/portfolio" element={<DynamicSitePage />} />
        <Route path="/portfolio/:slug" element={<DynamicSitePage />} />

        <Route path="/plans" element={<DynamicSitePage />} />
        <Route path="/plans/:slug" element={<DynamicSitePage />} />

        <Route path="/free-practice-audit" element={<DynamicSitePage />} />
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />
        <Route path="/thank-you" element={<DynamicSitePage />} />

        <Route path="/lamalama-clone" element={<LamaLamaClone />} />
        <Route path="/experiments" element={<Experiments />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )

  if (isDnaClone || isLamaLamaClone) {
    return <div className="w-full min-h-0">{routes}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{ duration, ease: EASE }}
        className="w-full min-h-0"
      >
        {routes}
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
