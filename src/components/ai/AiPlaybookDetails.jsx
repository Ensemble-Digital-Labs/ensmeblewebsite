import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { aiHubContent } from '../../lib/aiHubContent'
import { accentForServiceTitle, imageForServiceTitle } from '../../lib/serviceVerticals'
import { cn } from '../../lib/utils'

function AiPlaybookDetails() {
  const { capabilities } = aiHubContent

  return (
    <section className="relative overflow-hidden pb-20 lg:pb-28">
      <Container>
        <SectionHeading
          title="Capability playbooks"
          subtitle="How we deploy"
          className="relative z-10 mb-10 lg:mb-14"
          invert
        />

        <div className="relative z-10 space-y-6 lg:space-y-8">
          {capabilities.map((capability, index) => {
            const accent = accentForServiceTitle(capability.title, index)
            const image = capability.image || imageForServiceTitle(capability.title, index)

            return (
              <article
                key={capability.id}
                id={`ai-${capability.id}`}
                className="group scroll-mt-28"
              >
                <div
                  className={cn(
                    'relative rounded-[2.5rem] bg-gradient-to-br p-[1px] transition-all duration-700 lg:rounded-[3rem]',
                    accent,
                    'group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.55)] motion-reduce:group-hover:shadow-none',
                  )}
                >
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-[2.35rem] border border-white/5 bg-[#0C0E13]/80 p-6 backdrop-blur-2xl transition-all duration-700',
                      'group-hover:border-white/20 group-hover:bg-[#12141B]/90',
                      'sm:p-8 lg:rounded-[2.8rem] lg:p-10',
                    )}
                  >
                    <div className="relative z-20">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-growth-from)]/85">
                        {capability.eyebrow}
                      </p>
                      <h3 className="font-display mt-3 text-2xl font-bold leading-tight text-white lg:text-3xl">
                        {capability.title}
                      </h3>

                      {capability.bullets?.length ? (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {capability.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3 text-base text-white/72">
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[color:var(--color-growth-from)] to-[color:var(--color-growth-to)]"
                                aria-hidden
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {capability.body ? (
                        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/68 lg:text-lg">
                          {capability.body}
                        </p>
                      ) : null}

                      {capability.tags?.length ? (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {capability.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {image ? (
                      <div className="absolute inset-0 z-0 opacity-[0.08] transition-opacity duration-1000 group-hover:opacity-[0.18]">
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover"
                          style={{ objectPosition: capability.imagePosition ?? 'center center' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : null}

                    <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default AiPlaybookDetails
