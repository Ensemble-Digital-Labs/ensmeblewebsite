import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from '../ui/Container'
import StandardCTA from '../StandardCTA'
import PopArtBigLetter, { bigLetterFromTitle } from '../ui/PopArtBigLetter'
import { usePopArtScrollReveals } from '../../hooks/usePopArtScrollReveals'
import { ParallaxDepth } from '../ui/ParallaxDepth'
import { isBlogDocRoute, isMarketingDocAtmosphereRoute } from '../../lib/atmosphericRoutes'
import HomePopArtRevText from '../home/HomePopArtRevText'
import { cn } from '../../lib/utils'

/**
 * Dark, premium inner page — aligned with home bands (growth rose labels, display headings).
 * Blog articles match `/case-studies/:slug` (centered hero, ParallaxDepth shell).
 * @param {{ doc: { path: string, eyebrow: string, title: string, summary: string, sections: Array<{ title?: string, body: string }>, tags?: string[], noIndex?: boolean, relatedLinks?: Array<{ to: string, title: string, description: string }> } }} props
 */
function MarketingDocLayout({ doc }) {
  const location = useLocation()
  const onAtmosphere = isMarketingDocAtmosphereRoute(location.pathname)
  const isBlogDoc = isBlogDocRoute(doc.path)
  const useParallaxShell = onAtmosphere || isBlogDoc

  usePopArtScrollReveals({ immediate: true })

  useEffect(() => {
    const prev = document.title
    document.title = `${doc.title} · Ensemble Digital Labs`
    return () => {
      document.title = prev
    }
  }, [doc.title])

  const ctaRow = (
    <div
      className={cn(
        'mt-12 flex max-w-xl flex-col gap-3 xs:flex-row xs:flex-wrap sm:mt-14',
        isBlogDoc && 'mx-auto justify-center',
      )}
    >
      <StandardCTA
        contactOrbForm="audit"
        variant="tech"
        className="!min-h-[48px] !rounded-xl !px-6 !py-3 !text-sm !font-semibold !normal-case !tracking-wide !shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_32px_-12px_rgba(233,78,119,0.35)]"
      >
        Free practice audit
      </StandardCTA>
      <StandardCTA
        to="/contact"
        variant="outline"
        className="!min-h-[48px] !rounded-xl !border-white/25 !bg-white/[0.04] !px-6 !py-3 !text-sm !font-semibold !text-white/95 !normal-case !tracking-wide hover:!border-white/40"
      >
        Book a strategy call
      </StandardCTA>
      <Link
        to="/services"
        className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/80 transition-colors hover:border-rose-400/40 hover:text-white"
      >
        Explore services
      </Link>
    </div>
  )

  const tagsRow =
    doc.tags?.length > 0 ? (
      <div
        className={cn(
          'mb-10 flex flex-wrap gap-2',
          isBlogDoc ? 'justify-center' : 'justify-center sm:justify-start',
        )}
      >
        {doc.tags.map((t) => (
          <span
            key={t}
            className={cn(
              'rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide',
              isBlogDoc
                ? 'border border-cyan-300/25 bg-cyan-400/10 text-cyan-100/90'
                : 'border border-white/[0.1] bg-white/[0.04] text-white/50',
            )}
          >
            {t}
          </span>
        ))}
      </div>
    ) : null

  const relatedLinksBlock =
    Array.isArray(doc.relatedLinks) && doc.relatedLinks.length > 0 ? (
      <div className={cn('mb-12 max-w-4xl', isBlogDoc && 'mx-auto')}>
        <h2 className="font-display mb-5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-teal-200/90 sm:text-left">
          Capability playbooks
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {doc.relatedLinks.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="group block rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5 no-underline transition hover:border-rose-400/35 hover:bg-white/[0.06]"
              >
                <span className="font-display text-base font-semibold text-white group-hover:text-rose-100/95">
                  {item.title}
                </span>
                <p className="mt-2 text-base leading-relaxed text-white/65">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ) : null

  const sectionsBlock = (
    <div className={cn('max-w-3xl space-y-8', isBlogDoc ? 'mx-auto pt-6' : 'pt-10')}>
      {doc.sections.map((section, i) => (
        <div key={i}>
          {section.title ? (
            <h2 className="font-display mb-3 text-lg font-semibold text-white/95 sm:text-xl">
              {section.title}
            </h2>
          ) : null}
          <p className="text-base leading-relaxed text-white/70 sm:text-lg sm:leading-relaxed">
            {section.body}
          </p>
        </div>
      ))}
    </div>
  )

  const body = (
    <Container
      className={cn(
        'marketing-doc-layout relative z-[1] pb-20 sm:pb-24',
        isBlogDoc && 'marketing-doc-layout--blog',
      )}
    >
      {useParallaxShell ? null : (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(233,78,119,0.1)_0%,transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_30%,rgba(99,102,241,0.06)_0%,transparent_45%)]"
            aria-hidden
          />
        </>
      )}

      {isBlogDoc ? (
        <>
          <header className="mx-auto max-w-3xl text-center" aria-label={doc.title}>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              {doc.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/72">{doc.summary}</p>
            {tagsRow ? <div className="mt-8">{tagsRow}</div> : null}
          </header>

          {relatedLinksBlock}
          {sectionsBlock}
          {ctaRow}
        </>
      ) : (
        <>
          <div className="relative mb-5 max-w-4xl" data-popart-sequence>
            <PopArtBigLetter
              letter={bigLetterFromTitle(doc.title)}
              delay={0.12}
              className="marketing-doc-bigletter"
            />
            <h1 className="section-heading-neon growth-gradient-text relative z-[1] text-center text-[clamp(1.65rem,4.5vw,2.75rem)] leading-tight sm:text-left">
              <HomePopArtRevText delay={0.18}>{doc.title}</HomePopArtRevText>
            </h1>
          </div>
          <p className="mb-10 max-w-3xl text-center text-base leading-relaxed text-white/72 sm:text-left sm:text-lg">
            {doc.summary}
          </p>

          {relatedLinksBlock}
          {tagsRow}
          {sectionsBlock}
          {ctaRow}
        </>
      )}

      {doc.noIndex ? (
        <p
          className={cn(
            'mt-10 text-[10px] uppercase tracking-widest text-white/35',
            isBlogDoc ? 'text-center' : 'text-center sm:text-left',
          )}
        >
          Draft / legal placeholder — noindex in production per counsel
        </p>
      ) : null}
    </Container>
  )

  if (useParallaxShell) {
    return (
      <ParallaxDepth
        variant="default"
        tone="dark"
        scrollLayerParallax={false}
        transparentBackdrop
        className="relative z-[1] box-border min-h-screen w-full text-white"
      >
        {body}
      </ParallaxDepth>
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(233,78,119,0.1)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_30%,rgba(99,102,241,0.06)_0%,transparent_45%)]"
        aria-hidden
      />
      {body}
    </div>
  )
}

export default MarketingDocLayout
