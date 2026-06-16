/**

 * Hybrid home deck: a few pinned "acts" (pixel between acts only).

 * Section order mirrors https://www.influxmarketing.com/

 */



export const HOME_DECK_ACTS = [

  {

    id: 'act-intro',

    label: 'Intro',

    pixelEnter: false,

    sections: ['home-hero'],

  },

  {

    id: 'act-prove',

    label: 'Prove',

    pixelEnter: false,

    sections: ['home-brand', 'home-expertise', 'home-proof'],

  },

  {

    id: 'act-story',

    label: 'Story',

    pixelEnter: false,

    sections: ['home-passion', 'home-work', 'home-process'],

  },

  {

    id: 'act-close',

    label: 'Close',

    pixelEnter: false,

    sections: ['home-capabilities', 'home-cta'],

  },

]



const SECTION_LABELS = {

  'home-hero': 'Intro',

  'home-brand': 'Story',

  'home-expertise': 'Expertise',

  'home-proof': 'Partners',

  'home-passion': 'Mission',

  'home-work': 'Work',

  'home-process': 'Process',

  'home-capabilities': 'Services',

  'home-cta': 'Contact',

}



export const HOME_NARRATIVE_SECTIONS = HOME_DECK_ACTS.flatMap((act) =>

  act.sections.map((sectionId) => ({

    id: sectionId,

    label: SECTION_LABELS[sectionId] ?? sectionId,

    actId: act.id,

  })),

)



export function getActIndexForSection(sectionId) {

  return HOME_DECK_ACTS.findIndex((act) => act.sections.includes(sectionId))

}



export function getActForSection(sectionId) {

  const idx = getActIndexForSection(sectionId)

  return idx >= 0 ? HOME_DECK_ACTS[idx] : null

}


