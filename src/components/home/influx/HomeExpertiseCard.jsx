import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { HomePhotoCover } from './HomePhoto'

/** Influx homepage expertise selector card — image-first, white text on gradient. */
export default function HomeExpertiseCard({ card, className }) {
  return (
    <Link to={card.to} className={cn('home-influx-expertise-card group block no-underline', className)}>
      <article className="home-influx-card relative flex min-h-[min(420px,72vh)] flex-col overflow-hidden rounded-[15px] border border-white/[0.14] md:min-h-[480px]">
        <HomePhotoCover
          src={card.image}
          alt=""
          objectPosition={card.imagePosition ?? 'center'}
          overlay="bottom"
          className="absolute inset-0 h-full w-full"
        />
        <div className="relative mt-auto flex flex-col p-5 sm:p-6 md:p-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/90">
            {card.subtitle}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white md:text-[1.75rem]">
            {card.title}
          </h3>
          <p className="mt-3 max-w-[34ch] text-sm font-light leading-relaxed text-white/88 md:text-base">
            {card.line}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </article>
    </Link>
  )
}
