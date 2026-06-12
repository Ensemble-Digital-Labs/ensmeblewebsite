import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { DNA_CAPITAL_TOKENS } from './dnaCapitalTokens'

const VERTEX_SHADER = `
uniform float u_time;
varying float vColorRandom;

attribute float randoms;
attribute float colorRandoms;

void main() {
  vColorRandom = colorRandoms;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = (22.0 * randoms + 4.0) * (1.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`

const FRAGMENT_SHADER = `
varying float vColorRandom;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

void main() {
  float alpha = 1.0 - smoothstep(0.2, 0.5, length(gl_PointCoord - vec2(0.5)));
  vec3 finalColor = u_color1;
  if (vColorRandom > 0.33 && vColorRandom < 0.66) {
    finalColor = u_color2;
  }
  if (vColorRandom >= 0.66) {
    finalColor = u_color3;
  }
  gl_FragColor = vec4(finalColor, alpha * 0.92);
}
`

function buildHelixGeometry(particleCount = 24000) {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const randoms = new Float32Array(particleCount)
  const colorRandoms = new Float32Array(particleCount)

  const row = 100
  for (let i = 0; i < particleCount; i += 1) {
    randoms[i] = Math.random()
    colorRandoms[i] = Math.random()

    const theta = 0.01 * Math.PI * 2 * Math.floor(i / row)
    const radius = 0.03 * ((i % row) - 50)
    const x = radius * Math.cos(theta)
    const y = 0.1 * Math.floor(i / row)
    const z = radius * Math.sin(theta)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('randoms', new THREE.BufferAttribute(randoms, 1))
  geometry.setAttribute('colorRandoms', new THREE.BufferAttribute(colorRandoms, 1))
  geometry.center()

  return geometry
}

/** Codrops / Immersive Garden–style particle DNA with bloom (dnacapital.com). */
export function createDnaCapitalShaderHelix(width, height) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(DNA_CAPITAL_TOKENS.colors.canvas)

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.set(0, 0.4, 5.2)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const geometry = buildHelixGeometry(12000)
  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    uniforms: {
      u_time: { value: 0 },
      u_color1: { value: new THREE.Color(DNA_CAPITAL_TOKENS.colors.particle1) },
      u_color2: { value: new THREE.Color(DNA_CAPITAL_TOKENS.colors.particle2) },
      u_color3: { value: new THREE.Color(DNA_CAPITAL_TOKENS.colors.particle3) },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  try {
    composer.addPass(
      new UnrealBloomPass(new THREE.Vector2(width, height), 0.85, 0.55, 0.18),
    )
  } catch (e) {
    /* Bloom optional — render without post-processing if unsupported */
  }

  return {
    scene,
    camera,
    renderer,
    composer,
    points,
    material,
    disposables: [geometry, material],
  }
}

export function renderDnaCapitalShaderHelix(
  ctx,
  { progress, time, reducedMotion },
) {
  if (!ctx) return
  const { points, material, composer, camera } = ctx
  material.uniforms.u_time.value = time * 0.001
  points.rotation.y = reducedMotion ? progress * Math.PI * 2 : time * 0.00012 + progress * Math.PI * 2.2
  points.rotation.x = Math.sin(progress * Math.PI) * 0.08
  points.position.y = -progress * 2.4
  camera.position.z = 5.2 - progress * 0.6
  camera.lookAt(0, 0.2, 0)
  composer.render()
}

export function resizeDnaCapitalShaderHelix(ctx, width, height) {
  if (!ctx) return
  ctx.camera.aspect = width / height
  ctx.camera.updateProjectionMatrix()
  ctx.renderer.setSize(width, height)
  ctx.composer.setSize(width, height)
}

export function disposeDnaCapitalShaderHelix(ctx) {
  if (!ctx) return
  ctx.disposables.forEach((d) => d.dispose?.())
  ctx.composer?.dispose?.()
  ctx.renderer?.dispose?.()
}
