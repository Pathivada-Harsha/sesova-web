import React from 'react';
import { Canvas } from '@react-three/fiber';

// Shared <Canvas> for every decorative 3D accent on the page. Nothing imports
// this directly -- go through LazyAccent3D so three.js stays out of the main
// bundle.
export default function Accent3D({ children, className, style, dpr = [1, 1.5], frameloop = 'always', camera, gl, ...rest }) {
  return (
    <Canvas
      className={className}
      // Accents are ornaments sitting over real copy and CTAs; they must never
      // swallow a click. Pass pointerEvents through `style` if one needs them.
      style={{ pointerEvents: 'none', ...style }}
      // Capped rather than uncapped devicePixelRatio: retina screens would
      // otherwise render 4x the pixels for a background flourish.
      dpr={dpr}
      frameloop={frameloop}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', ...gl }}
      camera={{ fov: 45, position: [0, 0, 5], ...camera }}
      {...rest}
    >
      {children}
    </Canvas>
  );
}
