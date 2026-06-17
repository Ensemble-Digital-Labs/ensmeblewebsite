import { Link } from 'react-router-dom'
import { Brain } from 'lucide-react'
import { aiPages } from '../../../data/site/aiPages'
import HomeDeckSectionShell from '../HomeDeckSectionShell'
import { DeckMeshBackdrop } from '../HomeDeckPrimitives'
import { InfluxDisplayTitle, InfluxTextLink, InfluxCard } from '../influx/HomeInfluxPrimitives'

export default function HomeChapterAi({ df, stacked = false, fillViewport = false }) {
  const tiles = (aiPages.find((p) => p.path === '/ai')?.relatedLinks ?? []).slice(0, 3)

  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-ai"
      ariaLabel="AI engine"
      className="py-10 md:py-16"
    >
      <DeckMeshBackdrop />
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div data-home-reveal>
            <InfluxDisplayTitle lines={['Governed AI for', 'healthcare', 'growth']} accentIndex={1} />
          </div>
          <p data-home-reveal className="mt-5 text-white/68">
            Predictive targeting, workflow automation, and reporting, HIPAA-aware, measurable, under your team&apos;s control.
          </p>
          <div data-home-reveal className="mt-6">
            <InfluxTextLink to="/ai">Explore AI capabilities</InfluxTextLink>
          </div>
        </div>
        <ul className="space-y-3">
          <li data-home-reveal>
            <InfluxCard className="flex gap-4 p-5">
              <Brain className="h-10 w-10 shrink-0 text-cyan-300" strokeWidth={1.5} aria-hidden />
              <div>
                <h3 className="font-display font-bold text-white">Operating system for growth</h3>
                <p className="mt-2 text-sm text-white/65">Intelligence that supports your roadmap, not a black box.</p>
              </div>
            </InfluxCard>
          </li>
          {tiles.map((tile) => {
            const anchor = tile.to.replace('/ai/', '')
            return (
              <li key={tile.to} data-home-reveal>
                <Link to={`/ai#ai-${anchor}`} className="block no-underline">
                  <InfluxCard className="p-4 transition-colors hover:border-[color:var(--color-growth-from)]/30">
                    <h3 className="text-sm font-bold text-white">{tile.title}</h3>
                    <p className="mt-1 text-xs text-white/60">{tile.description}</p>
                  </InfluxCard>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </HomeDeckSectionShell>
  )
}
