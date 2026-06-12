import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { aboutPageContent } from '../../lib/content'
import { cn } from '../../lib/utils'

function Team() {
  const { team } = aboutPageContent

  return (
    <section className="relative py-16 lg:py-24">
      <Container>
        <SectionHeading
          title="Our Team"
          subtitle="Meet the Experts"
          align="center"
          invert
          className="mb-12 lg:mb-16"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {team.map((member) => (
            <article
              key={member.id}
              className={cn(
                'group rounded-2xl border border-white/12 bg-white/[0.06] p-6 text-center',
                'shadow-[0_20px_60px_-40px_rgba(0,0,0,0.55)] backdrop-blur-md',
                'transition-all duration-300 hover:-translate-y-1 hover:border-white/22 hover:bg-white/[0.09]',
                'hover:shadow-[0_28px_72px_-32px_rgba(233,78,119,0.18)] lg:p-8',
              )}
            >
              <div className="relative mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-2 border-white/15 bg-white/[0.04] sm:h-32 sm:w-32">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display mb-1.5 text-lg font-bold text-white">{member.name}</h3>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-rose-200/90">
                {member.role}
              </p>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">{member.bio}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Team
