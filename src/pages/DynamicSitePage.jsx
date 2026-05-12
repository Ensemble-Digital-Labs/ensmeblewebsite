import { useLocation } from 'react-router-dom'
import { getSitePage } from '../data/site/index.js'
import MarketingDocLayout from '../components/site/MarketingDocLayout'
import NotFound from './NotFound'

/** Renders registry-backed marketing pages (AI, services children, specialties, blog posts, portfolio, plans, legal). */
function DynamicSitePage() {
  const { pathname } = useLocation()
  const doc = getSitePage(pathname)
  if (!doc) return <NotFound />
  return <MarketingDocLayout doc={doc} />
}

export default DynamicSitePage
