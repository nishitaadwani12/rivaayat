import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// A large sheet of silk that drapes and flows across the hero, with satin
// sheen (specular + fresnel rim) and colour that drifts over the folds like
// light moving across fabric. Full-bleed and immersive.

function Silk() {
  const group = useRef()
  const { pointer } = useThree()

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uC1: { value: new THREE.Color('#6E1B27') }, // deep maroon
          uC2: { value: new THREE.Color('#E4A11B') }, // marigold
          uC3: { value: new THREE.Color('#C97B84') }, // rose
          uC4: { value: new THREE.Color('#1F5C57') }, // teal sheen
        },
        vertexShader: /* glsl */ `
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vViewPos;
          varying vec2 vUv;
          varying float vWave;

          float wave(vec3 p, float t) {
            float w = 0.0;
            w += 0.42 * sin(p.x * 0.9 + t * 0.7);
            w += 0.30 * sin(p.y * 1.2 - t * 0.55 + p.x * 0.4);
            w += 0.16 * sin((p.x + p.y) * 1.7 + t * 1.0);
            w += 0.08 * sin(p.x * 3.1 - t * 1.4);
            return w;
          }

          void main() {
            vUv = uv;
            vec3 p = position;
            float e = 0.06;
            float z  = wave(p, uTime);
            float zx = wave(p + vec3(e, 0.0, 0.0), uTime);
            float zy = wave(p + vec3(0.0, e, 0.0), uTime);
            vWave = z;
            p.z += z;

            vec3 tx = normalize(vec3(e, 0.0, zx - z));
            vec3 ty = normalize(vec3(0.0, e, zy - z));
            vec3 n = normalize(cross(tx, ty));

            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vViewPos = -mv.xyz;
            vNormal = normalize(normalMatrix * n);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform vec3 uC1;
          uniform vec3 uC2;
          uniform vec3 uC3;
          uniform vec3 uC4;
          varying vec3 vNormal;
          varying vec3 vViewPos;
          varying vec2 vUv;
          varying float vWave;

          void main() {
            vec3 N = normalize(vNormal);
            vec3 V = normalize(vViewPos);
            vec3 L = normalize(vec3(0.35, 0.55, 0.85));
            vec3 H = normalize(L + V);

            float diff = max(dot(N, L), 0.0);
            float spec = pow(max(dot(N, H), 0.0), 26.0);
            float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);

            // Colour drifts along the folds over time.
            float t = uTime * 0.12;
            float m = vUv.y * 1.6 + vWave * 0.9 + t;
            vec3 col = mix(uC1, uC2, smoothstep(0.0, 1.0, sin(m) * 0.5 + 0.5));
            col = mix(col, uC3, (sin(m * 0.7 + 1.5) * 0.5 + 0.5) * 0.55);
            col = mix(col, uC4, fres * 0.45);

            col *= (0.42 + diff * 0.78);
            col += spec * vec3(1.0, 0.94, 0.78) * 0.7; // warm satin highlight
            col += fres * 0.12;                        // soft rim

            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    [],
  )

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.12 - group.current.rotation.y) * 0.03
      group.current.rotation.x += (-0.2 - pointer.y * 0.08 - group.current.rotation.x) * 0.03
    }
  })

  return (
    <group ref={group} rotation={[-0.2, 0, 0.05]}>
      <mesh material={material}>
        <planeGeometry args={[18, 12, 180, 140]} />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <Silk />
    </Canvas>
  )
}
