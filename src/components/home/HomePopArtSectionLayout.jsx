import HomePopArtCircleCta from './HomePopArtCircleCta'
import { cn } from '../../lib/utils'
import { HOME_MOTION } from '../../lib/homeMotionTokens'
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
    <div
      className={cn(
        'home-popart-section relative',
        reverse && 'home-popart-section--reverse',
        className,
      )}
      data-home-popart-section
      data-popart-sequence
    >
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
            'home-popart-section__copy relative min-w-0 lg:col-span-7',
            reverse ? 'lg:order-1' : 'lg:order-2',
          )}
        >
          {title ? (
            <HomeChapterMonogram title={title} className="home-popart-section__monogram" delay={0} />
          ) : null}

          <div className="home-popart-section__copy-inner relative z-[1]">
            {title ? (
              <h2 className="font-display text-[clamp(2rem,calc(1rem+3.5vw),3.25rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-white">
                <HomePopArtRevText delay={0} headline>
                  {title}
                </HomePopArtRevText>
              </h2>
            ) : null}

            {subtitle ? (
              <HomePopArtRevText
                as="p"
                delay={HOME_MOTION.lineStagger}
                className="home-popart-section__subtitle mt-5"
              >
                {subtitle}
              </HomePopArtRevText>
            ) : null}

            {paragraphs.map((para, i) => (
              <HomePopArtRevText
                key={`${i}-${para.slice(0, 24)}`}
                as="p"
                delay={
                  subtitle
                    ? HOME_MOTION.lineStagger * 2 + i * HOME_MOTION.stagger
                    : HOME_MOTION.lineStagger + i * HOME_MOTION.stagger
                }
                className={cn(
                  'text-[clamp(0.9375rem,calc(0.5rem+0.9vw),1.0625rem)] leading-[1.68] text-white/72',
                  i === 0 ? 'mt-5' : 'mt-4',
                )}
              >
                {para}
              </HomePopArtRevText>
            ))}

            {cta ? (
              <div className="home-popart-section__cta home-popart-cta--pending relative z-[1] mt-8">
                <HomePopArtCircleCta to={cta.to} label={cta.label} hoverLabel={cta.hoverLabel} />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {children ? <div className="relative z-[1] mt-12 lg:mt-16">{children}</div> : null}
    </div>
  )
}
