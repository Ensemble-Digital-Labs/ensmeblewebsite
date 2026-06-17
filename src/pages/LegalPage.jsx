import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'
import LegalDocView from '../components/legal/LegalDocView'
import NotFound from './NotFound'
import { getSitePage } from '../data/site/index.js'

const LEGAL_PATHS = new Set(['/privacy-policy', '/terms'])

/** Home-style legal pages (privacy, terms). */
export default function LegalPage() {
  const { pathname } = useLocation()
  const doc = getSitePage(pathname)

  useEffect(() => {
    if (!doc) return undefined
    const prev = document.title
    document.title = `${doc.title} · Ensemble Digital Labs`
    return () => {
      document.title = prev
    }
  }, [doc])

  if (!doc || !LEGAL_PATHS.has(doc.path)) {
    return <NotFound />
  }

  return (
    <ParallaxDepth
      variant="default"
      tone="dark"
      scrollLayerParallax={false}
      transparentBackdrop
      className="relative z-[1] box-border min-h-screen w-full"
    >
      <LegalDocView doc={doc} />
    </ParallaxDepth>
  )
}
