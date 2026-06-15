/** Shared DNA particle shaders (Codrops / dna-02.glb) — used by clone + home. */

export const HOME_DNA_PARTICLE_VERTEX = `
varying vec2 vUv;
varying float vColorRandom;
varying float vEdge;

attribute float randoms;
attribute float colorRandoms;
attribute float edgeHighlights;

uniform float u_sectionTop;
uniform float u_sizeScale;

void main() {
  vUv = uv;
  vColorRandom = colorRandoms;
  vEdge = edgeHighlights;

  float screenY = position.y + u_sectionTop;
  vec4 mvPosition = modelViewMatrix * vec4(position.x, -screenY, position.z, 1.0);
  float depth = 0.72 + vEdge * 0.55;
  gl_PointSize = clamp((19.0 * randoms + 8.0) * u_sizeScale * depth, 5.0, 34.0);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const HOME_DNA_PARTICLE_FRAGMENT = `
varying vec2 vUv;
varying float vColorRandom;
varying float vEdge;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_rim;
uniform float u_opacity;

void main() {
  float alpha = 1.0 - smoothstep(0.1, 0.46, length(gl_PointCoord - vec2(0.5)));
  vec3 finalColor = mix(u_color1, u_color2, smoothstep(0.0, 0.62, vColorRandom));
  finalColor = mix(finalColor, u_color3, smoothstep(0.38, 1.0, vColorRandom));
  finalColor = mix(finalColor, u_rim, clamp(vEdge, 0.0, 1.0) * 0.82);
  gl_FragColor = vec4(finalColor, alpha * u_opacity);
}
`

/** Home helix intro — scatter cloud morphs into scroll-locked helix chain. */
export const HOME_DNA_INTRO_VERTEX = `
varying vec2 vUv;
varying float vColorRandom;
varying float vEdge;

attribute float randoms;
attribute float colorRandoms;
attribute float edgeHighlights;
attribute vec3 scatter;

uniform float u_sectionTop;
uniform float u_morph;
uniform float u_intro;
uniform float u_sizeScale;

void main() {
  vUv = uv;
  vColorRandom = colorRandoms;
  vEdge = edgeHighlights;

  vec3 helixPos = position;
  vec3 morphed = mix(helixPos, scatter, u_morph);
  float screenY = morphed.y + u_sectionTop;
  vec4 mvPosition = modelViewMatrix * vec4(morphed.x, -screenY, morphed.z, 1.0);
  float depth = 0.72 + abs(morphed.z) * 0.28 + vEdge * 0.42;
  float introScale = 0.38 + u_intro * 0.62;
  gl_PointSize = clamp((19.0 * randoms + 8.0) * u_sizeScale * depth * introScale, 2.0, 34.0);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const HOME_DNA_INTRO_FRAGMENT = `
varying vec2 vUv;
varying float vColorRandom;
varying float vEdge;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_rim;
uniform float u_opacity;

void main() {
  float alpha = 1.0 - smoothstep(0.1, 0.46, length(gl_PointCoord - vec2(0.5)));
  vec3 finalColor = mix(u_color1, u_color2, smoothstep(0.0, 0.62, vColorRandom));
  finalColor = mix(finalColor, u_color3, smoothstep(0.38, 1.0, vColorRandom));
  finalColor = mix(finalColor, u_rim, clamp(vEdge, 0.0, 1.0) * 0.55);
  gl_FragColor = vec4(finalColor, alpha * u_opacity);
}
`

export const DNA_PARTICLE_VERTEX = `
varying vec2 vUv;
varying float vColorRandom;
varying float vEdge;

attribute float randoms;
attribute float colorRandoms;
attribute float edgeHighlights;
attribute vec3 scatter;
uniform float u_morph;
uniform float u_sizeScale;

void main() {
  vUv = uv;
  vColorRandom = colorRandoms;
  vEdge = edgeHighlights;

  vec3 morphed = mix(position, scatter, u_morph);
  vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
  float depth = max(-mvPosition.z, 0.35);
  gl_PointSize = clamp((26.0 * randoms + 8.0) * u_sizeScale * (1.0 / depth), 2.0, 40.0);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const DNA_PARTICLE_FRAGMENT = `
varying vec2 vUv;
varying float vColorRandom;
varying float vEdge;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_rim;
uniform float u_opacity;

void main() {
  float alpha = 1.0 - smoothstep(0.2, 0.52, length(gl_PointCoord - vec2(0.5)));
  vec3 finalColor = u_color1;
  if (vColorRandom > 0.33 && vColorRandom < 0.66) {
    finalColor = u_color2;
  }
  if (vColorRandom >= 0.66) {
    finalColor = u_color3;
  }
  float gradient = smoothstep(0.34, 0.66, vUv.y);
  finalColor = mix(finalColor, u_rim, clamp(vEdge, 0.0, 1.0) * 0.94);
  gl_FragColor = vec4(finalColor, alpha * u_opacity * (0.68 + gradient * 0.32));
}
`

/** DNA Capital bloom look — soft halo + white-hot core (works with transparent canvas). */
export const DNA_PARTICLE_FRAGMENT_GLOW = `
varying vec2 vUv;
varying float vColorRandom;
varying float vEdge;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_rim;
uniform float u_opacity;

void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  float core = 1.0 - smoothstep(0.06, 0.26, d);
  float halo = exp(-d * d * 5.2) * 0.92;
  float alpha = (core * 0.5 + halo * 0.5) * u_opacity;

  vec3 finalColor = u_color1;
  if (vColorRandom > 0.33 && vColorRandom < 0.66) {
    finalColor = u_color2;
  }
  if (vColorRandom >= 0.66) {
    finalColor = u_color3;
  }
  float gradient = smoothstep(0.34, 0.66, vUv.y);
  finalColor = mix(finalColor, u_rim, clamp(vEdge, 0.0, 1.0) * 0.96);
  finalColor = mix(finalColor, u_rim, core * 0.52);
  finalColor += u_rim * halo * 0.18;
  gl_FragColor = vec4(finalColor, alpha * (0.72 + gradient * 0.28));
}
`

export const DNA_PARTICLE_VERTEX_GLOW = `
varying vec2 vUv;
varying float vColorRandom;
varying float vEdge;

attribute float randoms;
attribute float colorRandoms;
attribute float edgeHighlights;
attribute vec3 scatter;
uniform float u_morph;
uniform float u_sizeScale;

void main() {
  vUv = uv;
  vColorRandom = colorRandoms;
  vEdge = edgeHighlights;

  vec3 morphed = mix(position, scatter, u_morph);
  vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
  float depth = max(-mvPosition.z, 0.35);
  gl_PointSize = clamp((34.0 * randoms + 12.0) * u_sizeScale * (1.0 / depth), 2.0, 52.0);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const HOME_DNA_PARTICLE_COLORS = {
  color1: '#9a83ca',
  color2: '#f08292',
  color3: '#faa068',
  rim: '#e8d8f5',
  opacity: 0.9,
  sizeScale: 1.08,
}

export const DNA_CLONE_PARTICLE_COLORS = {
  color1: '#612574',
  color2: '#293583',
  color3: '#1954ec',
  rim: '#e8f7ff',
  opacity: 1,
  sizeScale: 1,
}

/** Ensemble /experiments — same particle palette as home page DNA helix. */
export const ENSEMBLE_DNA_PARTICLE_COLORS = {
  ...HOME_DNA_PARTICLE_COLORS,
  opacity: 0.94,
  sizeScale: 1.05,
}

export function createHomeDnaParticleMaterial(THREE, palette) {
  return new THREE.ShaderMaterial({
    vertexShader: HOME_DNA_PARTICLE_VERTEX,
    fragmentShader: HOME_DNA_PARTICLE_FRAGMENT,
    uniforms: {
      u_sectionTop: { value: 0 },
      u_sizeScale: { value: palette.sizeScale ?? 0.46 },
      u_opacity: { value: palette.opacity ?? 1 },
      u_color1: { value: new THREE.Color(palette.color1) },
      u_color2: { value: new THREE.Color(palette.color2) },
      u_color3: { value: new THREE.Color(palette.color3) },
      u_rim: { value: new THREE.Color(palette.rim) },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

/** Home helix with load intro (scatter → chain morph + fade). */
export function createHomeDnaIntroMaterial(THREE, palette) {
  return new THREE.ShaderMaterial({
    vertexShader: HOME_DNA_INTRO_VERTEX,
    fragmentShader: HOME_DNA_INTRO_FRAGMENT,
    uniforms: {
      u_sectionTop: { value: 0 },
      u_morph: { value: 1 },
      u_intro: { value: 0 },
      u_sizeScale: { value: palette.sizeScale ?? 1.05 },
      u_opacity: { value: palette.opacity ?? 0.94 },
      u_color1: { value: new THREE.Color(palette.color1) },
      u_color2: { value: new THREE.Color(palette.color2) },
      u_color3: { value: new THREE.Color(palette.color3) },
      u_rim: { value: new THREE.Color(palette.rim) },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

/**
 * @param {import('three')} THREE
 * @param {{ color1: string, color2: string, color3: string, rim: string, opacity?: number, sizeScale?: number }} palette
 * @param {{ glow?: boolean }} [opts]
 */
export function createDnaParticleMaterial(THREE, palette, opts = {}) {
  const glow = opts.glow === true
  return new THREE.ShaderMaterial({
    vertexShader: glow ? DNA_PARTICLE_VERTEX_GLOW : DNA_PARTICLE_VERTEX,
    fragmentShader: glow ? DNA_PARTICLE_FRAGMENT_GLOW : DNA_PARTICLE_FRAGMENT,
    uniforms: {
      u_morph: { value: 0 },
      u_opacity: { value: palette.opacity ?? 1 },
      u_sizeScale: { value: palette.sizeScale ?? 1 },
      u_color1: { value: new THREE.Color(palette.color1) },
      u_color2: { value: new THREE.Color(palette.color2) },
      u_color3: { value: new THREE.Color(palette.color3) },
      u_rim: { value: new THREE.Color(palette.rim) },
    },
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}
