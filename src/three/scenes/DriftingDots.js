import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Reference accent, and the starting point for real ones: a slow field of
// drifting dots in the brand greens and teals. It echoes the `breathe` dots
// already floating in the hero SVG, so it reads as part of the same language
// rather than a 3D showpiece bolted on.
//
// Deliberately plain three.js -- no drei. Nothing here needs a helper, and
// keeping drei out keeps the chunk small.
const COUNT = 110;
const SPREAD = 9;
const PALETTE = ['#2A9460', '#136B6B', '#14707A', '#4E9E6A', '#86C79A'];

export default function DriftingDots() {
  const points = useRef();

  // Built once: positions, per-dot colours, and a drift speed/phase per dot so
  // they do not move as a block.
  const { geometry, drift } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const drift = new Float32Array(COUNT * 2);
    const color = new THREE.Color();

    for (let i = 0; i < COUNT; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.5;

      color.set(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      drift[i * 2] = 0.08 + Math.random() * 0.14;
      drift[i * 2 + 1] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return { geometry, drift };
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    const pos = points.current.geometry.attributes.position;
    for (let i = 0; i < COUNT; i += 1) {
      const speed = drift[i * 2];
      const phase = drift[i * 2 + 1];
      pos.array[i * 3 + 1] += Math.sin(t * speed + phase) * 0.0016;
    }
    pos.needsUpdate = true;
    // A whole-field turn far slower than any one dot, for depth without motion sickness.
    points.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.095}
        vertexColors
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
