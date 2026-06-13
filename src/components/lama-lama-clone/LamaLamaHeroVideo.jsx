import { useEffect, useRef } from 'react'
import { LAMA_LAMA_ASSETS } from '../../lib/lamaLamaAssets'
import { prefersReducedMotion } from '../../lib/utils'

/** Autoplay HLS showreel — matches lamalama.com hero video */
export default function LamaLamaHeroVideo() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || prefersReducedMotion()) return undefined

    const src = LAMA_LAMA_ASSETS.hero.showreel
    let hls

    const play = async () => {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
        try {
          await video.play()
        } catch {
          /* autoplay policy */
        }
        return
      }

      try {
        const { default: Hls } = await import('hls.js')
        if (!Hls.isSupported()) return
        hls = new Hls({ enableWorker: true })
        hls.loadSource(src)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {})
        })
      } catch {
        /* hls unavailable */
      }
    }

    play()

    return () => {
      hls?.destroy()
    }
  }, [])

  if (prefersReducedMotion()) {
    return (
      <img
        className="lama-lama-hero__video-fallback"
        src={LAMA_LAMA_ASSETS.hero.poster}
        alt=""
        loading="eager"
        decoding="async"
      />
    )
  }

  return (
    <video
      ref={videoRef}
      className="lama-lama-hero__video-fallback"
      poster={LAMA_LAMA_ASSETS.hero.poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    />
  )
}
