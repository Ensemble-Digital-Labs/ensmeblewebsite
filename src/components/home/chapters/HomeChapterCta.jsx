import { HOME_INFLUX_CTA } from '../../../lib/homeInfluxContent'

import HomeDeckSectionShell from '../HomeDeckSectionShell'

import { DeckMeshBackdrop } from '../HomeDeckPrimitives'

import { InfluxLightBand, InfluxPrimaryButton, InfluxSectionTitle } from '../influx/HomeInfluxPrimitives'



const FORM_FIELDS = [

  { label: 'Practice specialty', placeholder: 'Pain management, surgery, med spa…' },

  { label: 'Monthly marketing budget', placeholder: 'Approximate monthly spend' },

  { label: 'How did you hear about us?', placeholder: 'Referral, Google, event…' },

]



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

      className="relative overflow-hidden py-12 md:py-20"

    >

      <DeckMeshBackdrop />

      <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-start">

        <div className="lg:col-span-5">

          <div data-home-reveal className="mt-2">

            <InfluxSectionTitle>{HOME_INFLUX_CTA.title}</InfluxSectionTitle>

          </div>

          <p data-home-reveal className="mt-5 text-base leading-relaxed text-white/65">

            {HOME_INFLUX_CTA.sub}

          </p>

        </div>



        <div className="lg:col-span-7">

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

              <p className="text-center text-[11px] text-white/40">Form preview — full flow on the contact page.</p>

            </form>

          </InfluxLightBand>

        </div>

      </div>

    </HomeDeckSectionShell>

  )

}


