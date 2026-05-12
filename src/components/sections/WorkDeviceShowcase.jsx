import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

/**
 * Hosts known to send X-Frame-Options / CSP that block embedding on your marketing origin.
 * Add more client domains here if preview is blank until they allow framing or you ship a `scrollImage`.
 */
const EMBED_BLOCKED_HOSTNAMES = new Set(['stlioirclinics.com', 'www.stlioirclinics.com'])

function hostnameFromUrl(url) {
  try {
    return new URL(url).hostname.toLowerCase()
  } catch {
    return ''
  }
}

function isIframeEmbedBlocked(url) {
  if (!url) return false
  return EMBED_BLOCKED_HOSTNAMES.has(hostnameFromUrl(url))
}

/**
 * Live site fills the bezel; the page reflows to the iframe’s width/height (Influx-style “fixed to screen”).
 * Works only when the target allows cross-origin framing.
 */
function IframeFillPreview({ url, title = 'Live site preview' }) {
  return (
    <iframe
      src={url}
      title={title}
      className="block h-full w-full border-0 bg-white"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}

/**
 * Full-length capture — scrolls inside the device like a mini browser.
 */
function ScrollImagePreview({ src }) {
  return (
    <div
      className="work-device-scroll-surface h-full w-full overflow-y-auto overflow-x-hidden overscroll-y-contain [-webkit-overflow-scrolling:touch]"
      tabIndex={0}
      role="region"
      aria-label="Scrollable page preview"
    >
      <img
        src={src}
        alt=""
        className="block h-auto w-full max-w-none select-none"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

function StaticCoverPreview({ src, variant }) {
  return (
    <img
      src={src}
      alt=""
      className={`h-full w-full object-cover ${
        variant === 'phone' ? 'object-[50%_8%]' : 'object-top'
      }`}
      loading="lazy"
      decoding="async"
    />
  )
}

/** When the real site cannot be iframed — poster + open in new tab (still “preview” UX). */
function BlockedEmbedPreview({ slide, variant }) {
  const href = slide.launchUrl ?? slide.previewUrl
  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-950">
      <StaticCoverPreview src={slide.image} variant={variant} />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25"
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center sm:gap-3 sm:p-4">
        <p className="max-w-[14rem] text-[10px] leading-snug text-white/85 sm:max-w-[18rem] sm:text-xs">
          This domain blocks in-frame embedding on other sites. Open the live site, or add a tall{' '}
          <span className="font-mono text-brand-gold-light/95">scrollImage</span> export for scroll inside the
          frame.
        </p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:border-brand-gold/45 hover:bg-white/[0.14] sm:px-4 sm:text-sm"
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
            Open live site
          </a>
        ) : null}
      </div>
    </div>
  )
}

/**
 * @param {{ title: string, description?: string, category?: string, image: string, slug?: string, previewUrl?: string, launchUrl?: string, scrollImage?: string }[]} items
 */
function DeviceBezelContent({ slide, variant }) {
  const scrollSrc = slide.scrollImage
  const url = slide.previewUrl

  if (scrollSrc) {
    return <ScrollImagePreview src={scrollSrc} />
  }
  if (url) {
    if (isIframeEmbedBlocked(url)) {
      return <BlockedEmbedPreview slide={slide} variant={variant} />
    }
    return <IframeFillPreview url={url} title={`Preview: ${slide.title ?? 'site'}`} />
  }
  return <StaticCoverPreview src={slide.image} variant={variant} />
}

function WorkDeviceShowcase({ items }) {
  const [index, setIndex] = useState(0)
  const n = items?.length ?? 0
  const safe = n > 0 ? index % n : 0
  const slide = n > 0 ? items[safe] : null

  const go = useCallback(
    (dir) => {
      if (n < 2) return
      setIndex((i) => (i + dir + n * 10) % n)
    },
    [n]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  if (!slide) return null

  const interactive = Boolean(slide.previewUrl || slide.scrollImage)
  const blockedEmbed = Boolean(slide.previewUrl && !slide.scrollImage && isIframeEmbedBlocked(slide.previewUrl))

  return (
    <div className="work-device-showcase relative mx-auto w-full max-w-[min(1100px,94vw)] px-2 sm:px-4">
      <div className="relative mx-auto pt-2 sm:pt-4">
        {/* Laptop */}
        <div className="relative rounded-xl sm:rounded-2xl border border-white/[0.12] bg-gradient-to-b from-zinc-800/90 to-zinc-950/95 p-2 shadow-[0_40px_100px_-28px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:p-3 md:rounded-[1.35rem] md:p-4">
          <div className="mb-1.5 flex justify-center gap-1.5 sm:mb-2">
            <span className="h-1 w-1 rounded-full bg-red-500/90" aria-hidden />
            <span className="h-1 w-1 rounded-full bg-amber-400/90" aria-hidden />
            <span className="h-1 w-1 rounded-full bg-emerald-500/85" aria-hidden />
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-black/40 bg-black shadow-inner sm:rounded-xl">
            <div
              key={`desk-${safe}-${slide.scrollImage || slide.previewUrl || slide.image}`}
              className="relative h-full w-full"
            >
              <DeviceBezelContent slide={slide} variant="laptop" />
            </div>
            {!interactive ? (
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/[0.03]"
                aria-hidden
              />
            ) : null}
          </div>
        </div>

        {/* Phone overlap */}
        <div className="absolute -bottom-1 right-[2%] z-10 w-[min(30%,220px)] max-w-[200px] sm:right-[4%] sm:bottom-2 md:max-w-[240px]">
          <div className="rounded-[1.35rem] border border-white/15 bg-zinc-900 p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] sm:rounded-[1.65rem] sm:p-2 md:rotate-[-2deg]">
            <div className="mx-auto mb-1 h-1 w-8 rounded-full bg-zinc-700 sm:mb-1.5 sm:w-10" />
            <div className="relative aspect-[9/18.5] w-full overflow-hidden rounded-[1rem] border border-black/50 bg-black sm:rounded-[1.15rem]">
              <div
                key={`mob-${safe}-${slide.scrollImage || slide.previewUrl || slide.image}`}
                className="relative h-full w-full"
              >
                <DeviceBezelContent slide={slide} variant="phone" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption + controls */}
      <div className="relative z-20 mt-8 flex flex-col items-center gap-4 sm:mt-10 md:mt-12">
        <div className="text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-primary sm:text-xs">
            {slide.category}
          </p>
          <h3 className="font-display mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {slide.title}
          </h3>
          {slide.description ? (
            <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-400 sm:text-base">{slide.description}</p>
          ) : null}
          {interactive ? (
            <p className="mx-auto mt-3 max-w-lg text-xs text-zinc-500">
              {slide.scrollImage
                ? 'Scroll inside the laptop or phone to explore the full page capture.'
                : blockedEmbed
                  ? 'Live URL is set for this project; the clinic’s server blocks iframe embedding — use the button inside the frame or add a tall scrollImage for an in-frame scroll.'
                  : 'Click inside the screen, then scroll — the page fills the device like a real browser window.'}
            </p>
          ) : null}
        </div>

        {n > 1 ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white transition-colors hover:border-brand-gold/50 hover:bg-white/[0.1] hover:text-brand-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5" role="group" aria-label="Project slides">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === safe ? 'w-6 bg-brand-gold' : 'w-2 bg-zinc-600 hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-pressed={i === safe}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white transition-colors hover:border-brand-gold/50 hover:bg-white/[0.1] hover:text-brand-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default WorkDeviceShowcase
