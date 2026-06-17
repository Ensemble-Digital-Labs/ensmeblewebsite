import { Phone } from 'lucide-react'
import { HOME_INFLUX_CTA } from '../../../lib/homeInfluxContent'

import { HOME_SECTION_ACCENT_ICONS } from '../../../lib/ensemble2026Icons'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import { InfluxLightBand, InfluxPrimaryButton } from '../influx/HomeInfluxPrimitives'

import { ContextualIconTile } from '../../ui/ContextualIcon'

import { growthPrimaryStandard } from '../../../lib/growthCtaClasses'

import { cn } from '../../../lib/utils'

const FORM_FIELDS = [
  { label: 'Practice specialty', placeholder: 'Pain management, surgery, med spa…' },
  { label: 'Monthly marketing budget', placeholder: 'Approximate monthly spend' },
  { label: 'How did you hear about us?', placeholder: 'Referral, Google, event…' },
]

const CTA_PHONE_HREF = 'tel:+14697040457'

export default function HomeChapterCta({ df, stacked = false, fillViewport = false }) {
  return (
    <HomeDeckSectionShell
      deckFrame={df && !stacked}
      deckInnerOverflowVisible={df && !stacked}
      stacked={stacked}
      viewportBand={fillViewport}
      id="home-cta"
      ariaLabel="Contact"
      bleed
      className="home-cta-section relative overflow-hidden"
    >
      <DeckMeshBackdrop />

      <div className="home-cta-layout relative z-10 flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-14">
        <div className="home-cta-copy w-full max-w-xl text-center lg:max-w-md lg:flex-1 lg:text-left">
          <h2 className="mx-auto max-w-xl font-display text-[clamp(1.75rem,calc(0.5rem+4vw),3rem)] font-bold leading-tight tracking-[-0.02em] text-white lg:mx-0">
            {HOME_INFLUX_CTA.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[clamp(1rem,0.35rem+1.1vw,1.125rem)] leading-[1.65] text-white/72 lg:mx-0">
            {HOME_INFLUX_CTA.body}
          </p>
          {HOME_INFLUX_CTA.phone ? (
            <div className="mt-6 flex justify-center lg:justify-start">
              <a
                href={CTA_PHONE_HREF}
                className={cn(
                  growthPrimaryStandard,
                  'home-cta-phone-btn w-full max-w-sm justify-center gap-2.5 no-underline shadow-lg transition-opacity hover:opacity-95 sm:w-auto',
                )}
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                <span>Call {HOME_INFLUX_CTA.phone}</span>
              </a>
            </div>
          ) : null}
        </div>

        <div className="w-full max-w-xl lg:max-w-md lg:flex-1">
          {HOME_SECTION_ACCENT_ICONS.cta ? (
            <ContextualIconTile
              icon={HOME_SECTION_ACCENT_ICONS.cta}
              size="xl"
              className="home-cta-accent-icon mx-auto mb-6 lg:mx-0"
            />
          ) : null}
          <InfluxLightBand>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Contact interest form">
              {FORM_FIELDS.map((f) => (
                <label key={f.label} className="block">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">{f.label}</span>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    className="mt-2 w-full border-0 border-b border-white/25 bg-transparent py-2.5 text-base text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none"
                  />
                </label>
              ))}
              <InfluxPrimaryButton to="/contact" className="mt-6 w-full justify-center">
                Submit
              </InfluxPrimaryButton>
            </form>
          </InfluxLightBand>
        </div>
      </div>
    </HomeDeckSectionShell>
  )
}
