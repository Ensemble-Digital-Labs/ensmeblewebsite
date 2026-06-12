/**

 * Image URLs from https://www.influxmarketing.com/ (design reference).

 */



export const INFLUX_IMG_BASE = 'https://www.influxmarketing.com/assets/img'



/** @param {string} path Path under /assets/img/ (e.g. `masthead/home/01.jpg`) */

export function influxImg(path) {

  const clean = path.replace(/^\//, '')

  return `${INFLUX_IMG_BASE}/${clean}`

}



/** @param {string} path Path under /assets/img/icon/ or full icon path */

export function influxIcon(path) {

  const clean = path.replace(/^\//, '')

  const full = clean.startsWith('icon/') ? clean : `icon/${clean}`

  return influxImg(full)

}


