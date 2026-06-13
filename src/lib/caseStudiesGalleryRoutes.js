/** Gallery hub routes — DNA-style carousel (production + v2 sandbox). */
export const CASE_STUDIES_GALLERY_PATH = '/case-studies'
export const CASE_STUDIES_GALLERY_V2_PATH = '/case-studies-v2'

export function isCaseStudiesGalleryRoute(pathname) {
  return pathname === CASE_STUDIES_GALLERY_PATH || pathname === CASE_STUDIES_GALLERY_V2_PATH
}

export function isCaseStudiesGalleryV2Route(pathname) {
  return pathname === CASE_STUDIES_GALLERY_V2_PATH
}
