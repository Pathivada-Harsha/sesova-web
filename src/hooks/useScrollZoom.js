import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { reducedMotion } from '../lib/smoothScroll';

// Scroll-scrubbed zoom reveal: the image starts overscaled and settles to its
// natural size as it travels into view. Returns a ref for the clipping wrapper;
// the <img> inside is what moves, so the wrapper needs overflow:hidden.
//
// ScrollTrigger is already registered (and already fed Lenis's scroll position)
// by src/lib/smoothScroll.js, so nothing to set up here.
export default function useScrollZoom({ from = 1.3, to = 1, start = 'top 92%', end = 'top 38%' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const wrap = ref.current;
    // Reduced motion gets the image at its natural size, no scrubbing.
    if (!wrap || reducedMotion()) return undefined;

    const target = wrap.querySelector('img') || wrap;
    const tween = gsap.fromTo(
      target,
      { scale: from },
      { scale: to, ease: 'none', scrollTrigger: { trigger: wrap, start, end, scrub: true } }
    );

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
      // Hand the element back exactly as it was found.
      gsap.set(target, { clearProps: 'transform' });
    };
  }, [from, to, start, end]);

  return ref;
}
