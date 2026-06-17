import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { DNA_CAPITAL_TOKENS } from './dnaCapitalTokens'
import { getDnaCloneIntroProgress } from './dnaCapitalIntro'
import { loadDnaCapitalParticleAssets } from './dnaCapitalModelParticles'
import { createDnaParticleMaterial, DNA_CLONE_PARTICLE_COLORS } from './dnaParticleCore'
import { DNA_CLONE_HELIX_LAYOUT, ENSEMBLE_DNA_HELIX_LAYOUT, helixScaleFromLayout, resolveHelixFrame } from './dnaHelixLayout'
import {
  getDnaHelixParticleCap,
  getDnaHelixPixelRatio,
  getDnaHelixRendererOptions,
  getDnaHelixStarCount,
} from './dnaHelixPerformance'

/**
 * dnacapital.com WebGL — Codrops-style GLB vertex particles.
 * Scroll phases: helix ribbon → morph/drift → wave grid.
 */

const WAVE_VERTEX = `
uniform float u_time;
uniform float u_waveMix;
attribute float randoms;

void main() {
  vec3 p = position;
  float wave =
    sin(p.x * 1.65 + u_time * 0.9) * 0.14 +
    cos(p.z * 1.35 + u_time * 0.55) * 0.11;
  p.y += wave * u_waveMix;
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (14.0 * randoms + 4.0) * (1.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`

const WAVE_FRAGMENT = `
uniform float u_waveMix;
uniform vec3 u_waveColor;

void main() {
  float alpha = 1.0 - smoothstep(0.22, 0.5, length(gl_PointCoord - vec2(0.5)));
  gl_FragColor = vec4(u_waveColor, alpha * u_waveMix * 0.55);
}
`

const STAR_VERTEX = `
attribute float starSize;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = starSize * (220.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`

const STAR_FRAGMENT = `
uniform float u_brightness;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  float alpha = (1.0 - smoothstep(0.08, 0.5, d)) * 0.55 * u_brightness;
  gl_FragColor = vec4(0.92, 0.94, 1.0, alpha);
}
`

const STAR_VERTEX_ENSEMBLE = `
attribute float starSize;
attribute float starTone;
varying float vTone;
void main() {
  vTone = starTone;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = starSize * (200.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`

const STAR_FRAGMENT_ENSEMBLE = `
uniform float u_brightness;
varying float vTone;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  float alpha = (1.0 - smoothstep(0.1, 0.52, d)) * 0.34 * u_brightness;
  vec3 cyan = vec3(0.22, 0.84, 0.96);
  vec3 warm = vec3(0.98, 0.52, 0.36);
  vec3 violet = vec3(0.62, 0.58, 0.98);
  vec3 col = mix(cyan, warm, vTone);
  col = mix(col, violet, 0.18 + 0.22 * sin(vTone * 9.5));
  gl_FragColor = vec4(col, alpha);
}
`

function buildWaveGrid(cols = 44, rows = 22) {
  const count = cols * rows
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const randoms = new Float32Array(count)

  let i = 0
  for (let rz = 0; rz < rows; rz += 1) {
    for (let cx = 0; cx < cols; cx += 1) {
      const x = (cx / (cols - 1) - 0.5) * 11
      const z = (rz / (rows - 1) - 0.5) * 6.5
      positions[i * 3] = x
      positions[i * 3 + 1] = -3.8 + rz * 0.018
      positions[i * 3 + 2] = z
      randoms[i] = 0.35 + Math.random() * 0.65
      i += 1
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('randoms', new THREE.BufferAttribute(randoms, 1))
  return geometry
}

function buildStarfield(count = 900, ensembleField = false) {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const tones = ensembleField ? new Float32Array(count) : null

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 14
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14
    positions[i * 3 + 2] = -2.5 - Math.random() * 8
    sizes[i] = 0.15 + Math.random() * 0.85
    if (tones) tones[i] = Math.random()
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('starSize', new THREE.BufferAttribute(sizes, 1))
  if (tones) {
    geometry.setAttribute('starTone', new THREE.BufferAttribute(tones, 1))
  }
  return geometry
}

function createHelixMaterial(palette = DNA_CLONE_PARTICLE_COLORS, glow = false) {
  return createDnaParticleMaterial(THREE, palette, { glow })
}

function createBaseScene(width, height, options = {}) {
  const transparentBg = options.transparentBackground === true
  const bloomStrength = options.bloomStrength ?? 0.72
  const ensembleField = options.ensembleField === true

  const scene = new THREE.Scene()
  if (!transparentBg) {
    scene.background = new THREE.Color(DNA_CAPITAL_TOKENS.colors.canvas)
  }

  const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 1000)
  camera.position.set(1.22, 0.02, 6.45)

  const rendererOpts = options.rendererOptions ?? getDnaHelixRendererOptions()
  const renderer = new THREE.WebGLRenderer({
    antialias: rendererOpts.antialias !== false,
    alpha: transparentBg,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(rendererOpts.pixelRatio ?? getDnaHelixPixelRatio())
  if (transparentBg) {
    renderer.setClearColor(0x000000, 0)
  }

  const starCount = options.starCount ?? getDnaHelixStarCount()
  const starGeometry = buildStarfield(starCount, ensembleField)
  const starMaterial = new THREE.ShaderMaterial({
    vertexShader: ensembleField ? STAR_VERTEX_ENSEMBLE : STAR_VERTEX,
    fragmentShader: ensembleField ? STAR_FRAGMENT_ENSEMBLE : STAR_FRAGMENT,
    uniforms: { u_brightness: { value: 1 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)

  const waveColor = '#1954ec'
  const waveGeometry = buildWaveGrid()
  const waveMaterial = new THREE.ShaderMaterial({
    vertexShader: WAVE_VERTEX,
    fragmentShader: WAVE_FRAGMENT,
    uniforms: {
      u_time: { value: 0 },
      u_waveMix: { value: 0 },
      u_waveColor: { value: new THREE.Color(waveColor) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const wave = new THREE.Points(waveGeometry, waveMaterial)
  wave.rotation.x = -0.55
  wave.position.y = -0.6
  scene.add(wave)

  const useDirectRender = transparentBg && ensembleField
  let composer = null
  if (!useDirectRender) {
    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    if (bloomStrength > 0) {
      try {
        composer.addPass(
          new UnrealBloomPass(new THREE.Vector2(width, height), bloomStrength, 0.38, 0.18),
        )
      } catch (e) {
        /* Bloom optional */
      }
    }
  }

  return {
    scene,
    camera,
    renderer,
    composer,
    useDirectRender,
    points: null,
    stars,
    wave,
    material: null,
    starMaterial,
    waveMaterial,
    displacementTexture: null,
    transparentBg,
    ensembleField,
    disposables: [starGeometry, starMaterial, waveGeometry, waveMaterial],
  }
}

function attachDnaParticles(ctx, particleGeometry, palette = DNA_CLONE_PARTICLE_COLORS, glow = false) {
  const material = createHelixMaterial(palette, glow)
  const points = new THREE.Points(particleGeometry, material)
  const layout = ctx.ensembleField
    ? ENSEMBLE_DNA_HELIX_LAYOUT
    : (ctx.helixLayout ?? DNA_CLONE_HELIX_LAYOUT)
  const narrow = typeof window !== 'undefined' && window.innerWidth < 768
  const frame = resolveHelixFrame(layout, narrow)
  const scale = helixScaleFromLayout(layout, 1, narrow)
  points.scale.set(scale.x, scale.y, scale.z)
  points.rotation.z = 0.16
  points.rotation.x = -0.12
  points.rotation.y = -0.08
  points.position.set(frame.helixX, 0.05, 0)
  ctx.scene.add(points)

  ctx.points = points
  ctx.material = material
  ctx.disposables.push(particleGeometry, material)
}

/** Load dna-02.glb particles, then mount WebGL scene. */
export async function createDnaCapitalShaderHelix(width, height, options = {}) {
  const ctx = createBaseScene(width, height, options)
  ctx.getIntroProgress = options.getIntroProgress ?? getDnaCloneIntroProgress
  ctx.helixLayout = options.helixLayout ?? DNA_CLONE_HELIX_LAYOUT
  ctx.starBrightnessScale = options.starBrightnessScale ?? 1

  if (options.includeWave === false && ctx.wave) {
    ctx.wave.visible = false
  }

  if (options.includeHelix !== false) {
    const palette = options.particlePalette ?? DNA_CLONE_PARTICLE_COLORS
    try {
      const { particleGeometry } = await loadDnaCapitalParticleAssets({
        maxPoints: options.maxPoints ?? getDnaHelixParticleCap(),
      })
      attachDnaParticles(ctx, particleGeometry, palette, options.particleGlow === true)
    } catch (error) {
      console.warn('[dnaCapitalShaderHelix] GLB load failed', error)
    }
  }

  return ctx
}

const SMOOTH_KEYS = ['globalProgress', 'drift', 'morph', 'helixMix', 'waveMix', 'cameraLift']

function lerp(a, b, t) {
  return a + (b - a) * t
}

function smoothScrollState(ctx, target, deltaSeconds) {
  if (!ctx.smoothState) {
    ctx.smoothState = { ...target }
    return ctx.smoothState
  }
  const blend = 1 - Math.exp(-deltaSeconds * 5.5)
  for (const key of SMOOTH_KEYS) {
    const next = target[key] ?? 0
    const prev = ctx.smoothState[key] ?? next
    ctx.smoothState[key] = lerp(prev, next, blend)
  }
  return ctx.smoothState
}

export function renderDnaCapitalShaderHelix(ctx, { scrollState, time, deltaMs = 16.67, reducedMotion }) {
  if (!ctx) return
  const { points, stars, wave, material, starMaterial, waveMaterial, composer, camera } = ctx

  const deltaSeconds = Math.min(deltaMs / 1000, 0.05)
  const targetState = scrollState ?? {}
  const {
    globalProgress = 0,
    drift = 0,
    morph = 0,
    helixMix = 1,
    waveMix = 0,
    cameraLift = 0,
  } = smoothScrollState(ctx, targetState, deltaSeconds)

  const intro = ctx.getIntroProgress?.() ?? getDnaCloneIntroProgress()
  const introEase = intro * intro * (3 - 2 * intro)

  if (material) {
    material.uniforms.u_morph.value = morph
    material.uniforms.u_opacity.value = helixMix * introEase
  }

  waveMaterial.uniforms.u_time.value = time * 0.001
  waveMaterial.uniforms.u_waveMix.value = waveMix

  starMaterial.uniforms.u_brightness.value =
    ((0.55 + introEase * 0.35) + drift * 0.35 + waveMix * 0.25) *
    (ctx.ensembleField ? 0.62 : 1) *
    (ctx.starBrightnessScale ?? 1)

  const spin = reducedMotion
    ? globalProgress * Math.PI * 2
    : time * 0.00005 + globalProgress * Math.PI * 1.4 + drift * 0.35

  const narrow = typeof window !== 'undefined' && window.innerWidth < 768
  const layout = ctx.ensembleField
    ? ENSEMBLE_DNA_HELIX_LAYOUT
    : (ctx.helixLayout ?? DNA_CLONE_HELIX_LAYOUT)
  const frame = resolveHelixFrame(layout, narrow)
  const helixX = frame.helixX
  const camX = frame.camX
  const lookX = frame.lookX
  const camZBase = frame.cameraZ
  const camIntroPull = frame.cameraIntroPull

  const frameKey = `${narrow}:${helixX}:${camX}:${lookX}`
  if (ctx.frameKey !== frameKey) {
    ctx.frameKey = frameKey
    ctx.pose = null
    ctx.cameraPose = null
  }

  if (points) {
    if (!ctx.pose) {
      const scale = helixScaleFromLayout(layout, introEase, narrow)
      ctx.pose = {
        rotY: -0.08 + spin,
        rotZ: 0.16,
        rotX: -0.12,
        posY: 0.05,
        posX: helixX,
        scaleX: scale.x,
        scaleY: scale.y,
        scaleZ: scale.z,
      }
    }

    const targetRotY = -0.08 + spin
    const targetRotZ = 0.16 + drift * 0.08 + globalProgress * 0.04
    const targetRotX = -0.12 + Math.sin(globalProgress * Math.PI) * 0.05 + morph * 0.08
    const targetPosY = 0.05 - drift * 2.1 - globalProgress * 0.95
    const targetPosX = helixX + Math.sin(globalProgress * Math.PI * 0.5) * 0.04
    const targetScale = helixScaleFromLayout(layout, introEase, narrow)
    const poseBlend = 1 - Math.exp(-deltaSeconds * 6)

    ctx.pose.rotY = lerp(ctx.pose.rotY, targetRotY, poseBlend)
    ctx.pose.rotZ = lerp(ctx.pose.rotZ, targetRotZ, poseBlend)
    ctx.pose.rotX = lerp(ctx.pose.rotX, targetRotX, poseBlend)
    ctx.pose.posY = lerp(ctx.pose.posY, targetPosY, poseBlend)
    ctx.pose.posX = lerp(ctx.pose.posX, targetPosX, poseBlend)
    ctx.pose.scaleX = lerp(ctx.pose.scaleX, targetScale.x, poseBlend)
    ctx.pose.scaleY = lerp(ctx.pose.scaleY, targetScale.y, poseBlend)
    ctx.pose.scaleZ = lerp(ctx.pose.scaleZ, targetScale.z, poseBlend)

    points.rotation.y = ctx.pose.rotY
    points.rotation.z = ctx.pose.rotZ
    points.rotation.x = ctx.pose.rotX
    points.position.y = ctx.pose.posY
    points.position.x = ctx.pose.posX
    points.scale.set(ctx.pose.scaleX, ctx.pose.scaleY, ctx.pose.scaleZ)
  }

  if (stars) {
    stars.rotation.z = time * 0.000015 + drift * 0.08
    stars.position.y = -drift * 0.6 - cameraLift * 0.35
  }

  if (wave) {
    wave.position.y = -0.6 + cameraLift * 0.85
    wave.position.x = 0.35
    wave.rotation.z = time * 0.00004
  }

  if (!ctx.cameraPose) {
    ctx.cameraPose = {
      x: camX,
      y: 0.02,
      z: camZBase + (1 - introEase) * camIntroPull,
      lookY: 0,
    }
  }

  const targetCamZ = camZBase + (1 - introEase) * camIntroPull - cameraLift * 1.2 - waveMix * 0.4
  const targetCamY = 0.02 + cameraLift * 0.65 + waveMix * 0.3
  const targetCamX = camX + drift * 0.06
  const targetLookY = cameraLift * 0.35 + waveMix * 0.12
  const camBlend = 1 - Math.exp(-deltaSeconds * 5)

  ctx.cameraPose.x = lerp(ctx.cameraPose.x, targetCamX, camBlend)
  ctx.cameraPose.y = lerp(ctx.cameraPose.y, targetCamY, camBlend)
  ctx.cameraPose.z = lerp(ctx.cameraPose.z, targetCamZ, camBlend)
  ctx.cameraPose.lookY = lerp(ctx.cameraPose.lookY, targetLookY, camBlend)

  camera.position.z = ctx.cameraPose.z
  camera.position.y = ctx.cameraPose.y
  camera.position.x = ctx.cameraPose.x
  camera.lookAt(lookX, ctx.cameraPose.lookY, 0)

  if (ctx.useDirectRender) {
    ctx.renderer.setClearColor(0x000000, 0)
    ctx.renderer.clear(true, true, true)
    ctx.renderer.render(ctx.scene, ctx.camera)
  } else {
    ctx.composer.render()
  }
}

export function resizeDnaCapitalShaderHelix(ctx, width, height) {
  if (!ctx) return
  ctx.camera.aspect = width / height
  ctx.camera.updateProjectionMatrix()
  ctx.renderer.setSize(width, height)
  ctx.composer?.setSize(width, height)
}

export function disposeDnaCapitalShaderHelix(ctx) {
  if (!ctx) return
  ctx.disposables.forEach((d) => d.dispose?.())
  ctx.composer?.dispose?.()
  ctx.renderer?.dispose?.()
}
