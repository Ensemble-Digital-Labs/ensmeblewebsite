import { homeProblemContent } from '../../lib/content'

function HomeProblemSection() {
  const { headline, lead, pains, stats } = homeProblemContent

  return (
    <section
      id="home-problem"
      data-scroll
      className="relative isolate w-full overflow-x-clip bg-[#050816] py-14 sm:py-16 md:py-20"
      aria-labelledby="home-problem-heading"
    >
      <div className="relative z-[1] mx-auto max-w-[1100px] px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h2
            id="home-problem-heading"
            className="section-heading-neon growth-gradient-text text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.12] mb-4"
          >
            {headline}
          </h2>
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">{lead}</p>
        </div>

        <ul
          className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12 md:mb-14"
        >
          {pains.map((p) => (
            <li
              key={p.title}
              className="rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-4 shadow-[0_16px_48px_-28px_rgba(2,6,23,0.5)] backdrop-blur-md md:px-5 md:py-5"
            >
              <p className="text-sm font-semibold text-white/95 mb-2">{p.title}</p>
              <p className="text-sm leading-relaxed text-zinc-500">{p.text}</p>
            </li>
          ))}
        </ul>

        <div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 pt-10"
        >
          {stats.map((s) => (
            <div key={s.value + s.label} className="text-center max-w-[280px] mx-auto sm:mx-0">
              <p className="growth-gradient-text text-3xl sm:text-4xl font-bold tabular-nums tracking-tight">
                {s.value}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeProblemSection
