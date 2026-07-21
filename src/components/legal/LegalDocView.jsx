import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import HomePopArtRevText from '../home/HomePopArtRevText'
import HomeDeckSectionShell from '../home/HomeDeckSectionShell'
import { DeckMeshBackdrop, DeckPanel } from '../home/HomeDeckPrimitives'
import { usePopArtScrollReveals } from '../../hooks/usePopArtScrollReveals'
import { cn } from '../../lib/utils'

/**
 * @param {string | string[] | undefined} body
 * @param {string} [className]
 */
function SectionBody({ body, className }) {
  if (!body) return null
  const paragraphs = Array.isArray(body) ? body : [body]
  return (
    <div className={cn('space-y-4', className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-base leading-relaxed text-white/72">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

/**
 * Home-deck legal page — privacy, terms, and similar policy docs.
 * @param {{ doc: import('../../data/site/buildPage.js').SitePageDoc }} props
 */
export default function LegalDocView({ doc }) {
  usePopArtScrollReveals({ immediate: true })

  return (
    <div className="legal-doc-page home-influx-deck relative z-[1] text-white">
      <section className="legal-doc-page__hero relative overflow-hidden pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pb-14 lg:pt-36">
        <DeckMeshBackdrop className="opacity-80" />
        <Container className="relative z-10">
          <header className="mx-auto max-w-2xl">
            <h1 className="font-display text-center text-[clamp(1.85rem,calc(0.75rem+3.8vw),3.25rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white">
              <HomePopArtRevText delay={0.06} headline>
                {doc.title}
              </HomePopArtRevText>
            </h1>

            {doc.tags?.length ? (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <p className="mx-auto mt-8 max-w-xl text-center text-[clamp(1rem,0.35rem+1.1vw),1.125rem)] leading-[1.65] text-white/72">
              {doc.summary}
            </p>
          </header>
        </Container>
      </section>

      <HomeDeckSectionShell
        id="legal-content"
        ariaLabel={doc.title}
        bleed
        className="legal-doc-page__content px-8 sm:px-12 md:px-16 pb-12 md:pb-16"
      >
        <DeckMeshBackdrop />
        <div className="mx-auto max-w-2xl space-y-4 md:space-y-5">
          {doc.sections.map((section, index) => {
            const hasTitle = Boolean(section.title)
            const hasBody = Boolean(section.body)
            const hasItems = Boolean(section.items?.length)
            const hasAfter = Boolean(section.afterItems)
            if (!hasTitle && !hasBody && !hasItems && !hasAfter) return null

            return (
              <DeckPanel key={section.title ?? `section-${index}`} className="p-6 md:p-8">
                {hasTitle ? (
                  <h2 className="font-display text-lg font-bold leading-tight text-white md:text-xl">
                    {section.title}
                  </h2>
                ) : null}

                {hasBody ? (
                  <SectionBody body={section.body} className={hasTitle ? 'mt-4' : undefined} />
                ) : null}

                {hasItems ? (
                  <ul
                    className={cn(
                      'list-disc space-y-2 pl-5 text-base leading-relaxed text-white/72',
                      hasTitle || hasBody ? 'mt-4' : '',
                    )}
                  >
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                ) : null}

                {hasAfter ? (
                  <SectionBody
                    body={section.afterItems}
                    className={hasTitle || hasBody || hasItems ? 'mt-4' : undefined}
                  />
                ) : null}
              </DeckPanel>
            )
          })}

          {doc.relatedLinks?.length ? (
            <DeckPanel className="p-6 md:p-8">
              <h2 className="font-display text-lg font-bold leading-tight text-white md:text-xl">
                Related
              </h2>
              <ul className="mt-4 space-y-3">
                {doc.relatedLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="group block rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 transition-colors hover:border-cyan-400/35 hover:bg-white/[0.06]"
                    >
                      <span className="font-display text-base font-semibold text-white group-hover:text-cyan-100/95">
                        {item.title}
                      </span>
                      {item.description ? (
                        <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.description}</p>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </DeckPanel>
          ) : null}
        </div>
      </HomeDeckSectionShell>
    </div>
  )
}
