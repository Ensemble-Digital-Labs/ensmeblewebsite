import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../styles/lama-lama-clone.css'

/** Self-hosted mirror — run `npm run mirror:lamalama` to refresh */
const LAMA_LAMA_LOCAL_URL = '/lamalama-mirror/index.html'
const LAMA_LAMA_LIVE_URL = 'https://lamalama.com/'

/**
 * lamalama.com — `/lamalama-clone`
 * Local full-site mirror (default). Add `?live=1` to embed live site instead.
 */
export default function LamaLamaClonePage() {
  const [searchParams] = useSearchParams()
  const useLive = searchParams.get('live') === '1'

  const src = useMemo(
    () => (useLive ? LAMA_LAMA_LIVE_URL : LAMA_LAMA_LOCAL_URL),
    [useLive],
  )

  useEffect(() => {
    document.documentElement.classList.add('lama-lama-clone-active')
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.classList.remove('lama-lama-clone-active')
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <iframe
      className="lama-lama-clone-iframe"
      src={src}
      title="Lama Lama"
      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}

