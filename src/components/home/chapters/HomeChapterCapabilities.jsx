import {
  HOME_CAPABILITY_TAGS,
  HOME_INFLUX_CAPABILITIES,
  HOME_INFLUX_WIN,
} from '../../../lib/homeInfluxContent'

import { influxIcon } from '../../../lib/influxAssets'

import { Link } from 'react-router-dom'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import HomeCapabilityTags from '../HomeCapabilityTags'

import HomeChapterMonogram from '../HomeChapterMonogram'

import {
  InfluxEyebrow,
  InfluxLead,
  InfluxPrimaryButton,
  InfluxSectionTitle,
} from '../influx/HomeInfluxPrimitives'

export default function HomeChapterCapabilities({ df, stacked = false, fillViewport = false }) {
  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-capabilities"
      ariaLabel="Capabilities"
      bleed
      className="py-10 md:py-16"
    >
      <DeckMeshBackdrop />

      <div className="relative">
        <HomeChapterMonogram letter="S" />

        <div className="relative z-[1]" data-home-mask-group>
          <InfluxEyebrow>{HOME_INFLUX_WIN.eyebrow}</InfluxEyebrow>

          <div className="mt-4 max-w-3xl">
            <InfluxSectionTitle>{HOME_INFLUX_WIN.title}</InfluxSectionTitle>
          </div>

          <InfluxLead className="mt-5 max-w-3xl">{HOME_INFLUX_WIN.body}</InfluxLead>
        </div>

        <HomeCapabilityTags tags={HOME_CAPABILITY_TAGS} className="relative z-[1]" />
      </div>

      <ul className="relative z-[1] mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_INFLUX_CAPABILITIES.map((cap) => (
          <li key={cap.title} data-home-reveal>
            <Link
              to={cap.to}
              className="home-influx-card group flex h-full flex-col rounded-[15px] border border-white/[0.1] bg-white/[0.04] p-5 no-underline transition-colors hover:border-cyan-400/30 hover:bg-white/[0.08] sm:p-6"
            >
              <img src={influxIcon(cap.icon)} alt="" className="h-8 w-8 object-contain opacity-90" loading="lazy" />
              <h3 className="mt-4 font-display text-sm font-bold text-white group-hover:text-cyan-100">{cap.title}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-white/60">{cap.line}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div data-home-reveal className="relative z-[1] mt-10 text-center sm:text-left">
        <InfluxPrimaryButton to="/free-practice-audit">Schedule a free strategy session</InfluxPrimaryButton>
      </div>
    </HomeDeckSectionShell>
  )
}
