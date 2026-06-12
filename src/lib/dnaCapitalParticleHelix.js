import * as THREE from 'three'

function helixPoint(t, strandOffset, height, radius, turns) {
  const y = (t - 0.5) * height
  const angle = t * Math.PI * 2 * turns + strandOffset
  return new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
}

function buildPoints(positions, color, size, opacity) {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  const material = new THREE.PointsMaterial({
    color,
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity,
    depthWrite: false,
  })
  return new THREE.Points(geometry, material)
}

/** Particle double-helix — closer to dnacapital.com / Codrops replication. */
export function createDnaCapitalParticleHelix() {
  const group = new THREE.Group()
  const disposables = []

  const helixHeight = 34
  const radius = 0.62
  const turns = 6.2
  const strandSteps = 1400

  const strandPositions = []
  for (let s = 0; s < 2; s += 1) {
    const strandOffset = s * Math.PI
    for (let p = 0; p < strandSteps; p += 1) {
      const t = p / (strandSteps - 1)
      const pt = helixPoint(t, strandOffset, helixHeight, radius, turns)
      strandPositions.push(pt.x, pt.y, pt.z)
    }
  }

  const rungPositions = []
  const rungCount = 48
  for (let r = 0; r <= rungCount; r += 1) {
    const t = r / rungCount
    const a = helixPoint(t, 0, helixHeight, radius, turns)
    const b = helixPoint(t, Math.PI, helixHeight, radius, turns)
    const steps = 10
    for (let m = 0; m <= steps; m += 1) {
      const mix = m / steps
      rungPositions.push(
        THREE.MathUtils.lerp(a.x, b.x, mix),
        THREE.MathUtils.lerp(a.y, b.y, mix),
        THREE.MathUtils.lerp(a.z, b.z, mix),
      )
    }
  }

  const strands = buildPoints(strandPositions, 0x1a1a1a, 0.026, 0.88)
  const rungs = buildPoints(rungPositions, 0x2e2e2e, 0.018, 0.5)

  group.add(strands, rungs)
  disposables.push(strands.geometry, strands.material, rungs.geometry, rungs.material)

  return { group, disposables }
}

export function updateDnaCapitalHelix(group, { progress, time, reducedMotion }) {
  if (!group) return
  const spin = reducedMotion ? 0 : time * 0.00006
  group.rotation.y = spin + progress * Math.PI * 1.85
  group.position.y = -progress * 16 + 1.5
  group.position.x = -0.42 + Math.sin(progress * Math.PI * 1.5) * 0.12
  group.rotation.z = Math.sin(progress * Math.PI) * 0.04
}

export function disposeDnaCapitalHelix(disposables = []) {
  disposables.forEach((item) => item?.dispose?.())
}
