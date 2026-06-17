import { useEffect } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { ParallaxDepth } from '../components/ui/ParallaxDepth'
import AiHero from '../components/ai/AiHero'
import AiCapabilitiesGrid from '../components/ai/AiCapabilitiesGrid'
import AiPlaybookDetails from '../components/ai/AiPlaybookDetails'
import FAQ from '../components/sections/FAQ'
import { aiSlugToHubHash } from '../lib/aiHubContent'

/** Unified `/ai` hub — layout aligned with `/services`. */
export function AiPage() {
  const location = useLocation()

  useEffect(() => {
    const prev = document.title
    document.title = 'AI capabilities · Ensemble Digital Labs'
    return () => {
      document.title = prev
    }
  }, [])

  useEffect(() => {
    if (!location.hash) return undefined
    const id = location.hash.replace('#', '')
    const target = document.getElementById(id)
    if (!target) return undefined
    const main = document.querySelector('#main')
    const timer = window.setTimeout(() => {
      if (main) {
        const top = target.getBoundingClientRect().top + main.scrollTop - 96
        main.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 350)
    return () => window.clearTimeout(timer)
  }, [location.hash])

  return (
    <ParallaxDepth
      variant="default"
      tone="dark"
      scrollLayerParallax={false}
      transparentBackdrop
      className="relative z-[1] box-border min-h-screen w-full text-white"
    >
      <AiHero />
      <AiCapabilitiesGrid />
      <AiPlaybookDetails />
      <FAQ />
    </ParallaxDepth>
  )
}

/** Legacy `/ai/:slug` → `/ai#ai-{slug}`. */
export function AiSlugRedirect() {
  const { slug } = useParams()
  return <Navigate to={aiSlugToHubHash(slug)} replace />
}

export default AiPage
