import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Rivaayat's signature: a length of silk rippling in 3D. A custom shader
// displaces a fine plane with layered waves and lights it analytically, so it
// drapes and shimmers like real fabric. Deliberately unlike anything else.

function Silk() {
  const mat = useRef()
  const group = useRef()
  const { pointer } = useThree()

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color('#7A1F2B') }, // maroon
          uColorB: { value: new THREE.Color('#E4A11B') }, // marigold
          uColorC: { value: new THREE.Color('#1F5C57') }, // teal shimmer
          uLightDir: { value: new THREE.Vector3(0.4, 0.7, 0.8).normalize() },
        },
        vertexShader: /* glsl */ `
          uniform float uTime;
          varying vec3 vNormal;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 p = position;
            float a1 = 0.22, a2 = 0.14, a3 = 0.08;
            float f1 = 2.0, f2 = 3.1, f3 = 5.0;
            float z =
              a1 * sin(p.x * f1 + uTime * 1.1) +
              a2 * sin(p.y * f2 + uTime * 1.6 + p.x * 0.8) +
              a3 * sin(p.x * f3 - uTime * 2.2);
            float dzdx = a1 * f1 * cos(p.x * f1 + uTime * 1.1)
                       + a2 * 0.8 * cos(p.y * f2 + uTime * 1.6 + p.x * 0.8)
                       + a3 * f3 * cos(p.x * f3 - uTime * 2.2);
            float dzdy = a2 * f2 * cos(p.y * f2 + uTime * 1.6 + p.x * 0.8);
            vec3 n = normalize(vec3(-dzdx, -dzdy, 1.0));
            vNormal = normalize(normalMatrix * n);
            p.z += z;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform vec3 uColorC;
          uniform vec3 uLightDir;
          varying vec3 vNormal;
          varying vec2 vUv;
          void main() {
            vec3 nrm = normalize(vNormal);
            float diff = max(dot(nrm, normalize(uLightDir)), 0.0);
            // Woven gradient down the length, with a teal sheen on the folds.
            vec3 base = mix(uColorA, uColorB, smoothstep(0.0, 1.0, vUv.y));
            base = mix(base, uColorC, pow(diff, 3.0) * 0.35);
            // Fine warp/weft threads.
            float weave = 0.90
              + 0.06 * sin(vUv.x * 130.0)
              + 0.04 * sin(vUv.y * 170.0);
            vec3 col = base * weave * (0.42 + diff * 0.85);
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    [],
  )

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
    if (group.current) {
      // Gentle drift toward the pointer, like fabric catching a breeze.
      group.current.rotation.y += (pointer.x * 0.25 - group.current.rotation.y) * 0.04
      group.current.rotation.x += (0.12 - pointer.y * 0.15 - group.current.rotation.x) * 0.04
    }
  })

  return (
    <group ref={group} rotation={[0.12, 0, -0.18]}>
      <mesh material={material} ref={mat}>
        <planeGeometry args={[3.6, 4.6, 70, 90]} />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 42 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <Silk />
    </Canvas>
  )
}
