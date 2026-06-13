import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { cn } from '../../lib/utils'
import HomeChapterMonogram from './HomeChapterMonogram'
import HomePopArtRevText from './HomePopArtRevText'
import HomePopArtVisualStack from './HomePopArtVisualStack'

/**
 * PopArt-style chapter block — visual collage + monogram headline column.
 * @param {{ reverse?: boolean, body?: string | string[] }} props
 */
export default function HomePopArtSectionLayout({
  title,
  subtitle,
  body,
  cta,
  visual,
  reverse = false,
  children,
  className,
}) {
  const paragraphs = Array.isArray(body) ? body : body ? [body] : []

  return (
    <div className={cn('home-popart-section relative', className)} data-home-popart-section data-popart-sequence>
      <div className="home-popart-section__grid-lines pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <div
          className={cn(
            'home-popart-section__visual lg:col-span-5',
            reverse ? 'lg:order-2' : 'lg:order-1',
          )}
        >
          <HomePopArtVisualStack {...visual} />
        </div>

        <div
          className={cn(
            'home-popart-section__copy relative lg:col-span-7',
            reverse ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          {title ? (
            <HomeChapterMonogram title={title} className="home-popart-section__monogram" delay={0} />
          ) : null}

          <div className="home-popart-section__copy-inner relative z-[1]">
            {title ? (
              <h2 className="font-display text-[clamp(2rem,calc(1rem+3.5vw),3.25rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
                <HomePopArtRevText delay={0}>{title}</HomePopArtRevText>
              </h2>
            ) : null}

            {subtitle ? (
              <HomePopArtRevText
                as="p"
                delay={0.14}
                className="home-popart-section__subtitle mt-4 text-[clamp(1rem,calc(0.5rem+1.2vw),1.2rem)] font-medium leading-relaxed text-cyan-100/85"
              >
                {subtitle}
              </HomePopArtRevText>
            ) : null}

            {paragraphs.map((para, i) => (
              <HomePopArtRevText
                key={`${i}-${para.slice(0, 24)}`}
                as="p"
                delay={0.24 + i * 0.1}
                className={cn(
                  'text-[clamp(0.9375rem,calc(0.5rem+0.9vw),1.0625rem)] leading-[1.68] text-white/72',
                  i === 0 ? 'mt-5' : 'mt-4',
                )}
              >
                {para}
              </HomePopArtRevText>
            ))}
          </div>

          {cta ? (
            <div className="home-popart-section__cta relative z-[1] mt-8">
              <Link
                to={cta.to}
                className="home-popart-circle-cta group inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/35 bg-gradient-to-br from-cyan-400/90 to-orange-400/85 text-[#0a0f1c] shadow-[0_12px_40px_-12px_rgba(34,211,238,0.55)] transition-transform duration-300 hover:scale-105 motion-reduce:hover:scale-100"
                aria-label={cta.label}
                title={cta.label}
              >
                <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.5} />
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {children ? <div className="relative z-[1] mt-12 lg:mt-16">{children}</div> : null}
    </div>
  )
}
