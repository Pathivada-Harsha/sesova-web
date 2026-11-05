import { useEffect, useState } from 'react';

// Below this the hero background already drops back (see the 1062px breakpoint
// in Hero.js), so there is nothing for a 3D accent to sit on and plenty of
// reason not to spend a phone's battery on one.
const MIN_WIDTH = 1062;

// Probed once: creating a throwaway context per mount is wasteful, and the
// answer cannot change during a session.
let webgl = null;
function supportsWebGL() {
  if (webgl !== null) return webgl;
  try {
    const c = document.createElement('canvas');
    webgl = !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) {
    webgl = false;
  }
  return webgl;
}

// Whether a decorative 3D accent should mount at all. Starts false so the first
// paint is always the static fallback, then upgrades if the visitor qualifies.
export default function useCanRender3D() {
  const [can, setCan] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);
    const check = () => setCan(!motion.matches && wide.matches && supportsWebGL());
    check();
    motion.addEventListener('change', check);
    wide.addEventListener('change', check);
    return () => {
      motion.removeEventListener('change', check);
      wide.removeEventListener('change', check);
    };
  }, []);

  return can;
}
