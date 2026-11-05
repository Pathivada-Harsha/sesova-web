import React, { Suspense, lazy } from 'react';
import useCanRender3D from '../hooks/useCanRender3D';

const Accent3D = lazy(() => import('./Accent3D'));

// The only way an accent should be mounted.
//
// `scene` must be a component created with React.lazy at module scope in the
// calling file, e.g.
//
//   const Orbit = lazy(() => import('../../three/scenes/Orbit'));
//   <LazyAccent3D scene={Orbit} fallback={<img src={still} alt="" />} />
//
// Passing the scene rather than children is what keeps three.js in its own
// chunk: importing meshes directly into a section file would pull the whole
// engine into the main bundle and defeat the lazy boundary.
//
// `fallback` renders for everyone who does not get the accent -- reduced
// motion, narrow viewports, no WebGL -- and while the chunk is in flight, so
// it should be a real static visual, not a spinner.
export default function LazyAccent3D({ scene: Scene, fallback = null, children, ...canvasProps }) {
  if (!useCanRender3D()) return fallback;

  return (
    <Suspense fallback={fallback}>
      <Accent3D {...canvasProps}>{Scene ? <Scene /> : children}</Accent3D>
    </Suspense>
  );
}
