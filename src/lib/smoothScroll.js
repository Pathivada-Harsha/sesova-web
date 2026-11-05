import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP plugins are registered once, here, so no component has to remember to.
gsap.registerPlugin(ScrollTrigger);

// Single shared instance: the hash navigation and the back-to-top button both
// need to drive the same scroll position.
let lenis = null;

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Starts Lenis and hands scroll timing to GSAP's ticker so ScrollTrigger and
// the smooth scroll never disagree about where the page is. Returns a teardown.
// Does nothing when the visitor asked for reduced motion -- hijacked scrolling
// is exactly what that setting is asking us not to do.
export function initSmoothScroll() {
  if (lenis || reducedMotion()) return () => {};

  lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.6 });

  // Lenis scrolls outside the normal scroll event, so ScrollTrigger is told
  // to recompute on every frame it moves.
  lenis.on('scroll', ScrollTrigger.update);

  // Lenis wants milliseconds, gsap.ticker reports seconds.
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  // Without this a dropped frame makes Lenis jump instead of glide.
  gsap.ticker.lagSmoothing(0);

  // The page is image-heavy, and a trigger's start/end are measured when it is
  // created. Images landing afterwards move everything below them, so without
  // this recompute a scrubbed animation fires at the wrong scroll position --
  // or appears never to fire at all.
  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoad);

  return () => {
    window.removeEventListener('load', onLoad);
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
}

// Scrolls to a pixel offset or an element, through Lenis when it is running and
// through the platform when it is not (reduced motion, or before init).
export function scrollTo(target, { offset = 0, immediate = false, duration } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, duration });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  const top = typeof target === 'number'
    ? target + offset
    : (el ? el.getBoundingClientRect().top + window.scrollY + offset : 0);
  window.scrollTo(0, top);
}

export const getLenis = () => lenis;

// Remeasure every scroll trigger. Call after anything that changes page height
// -- the preloader lifting, a section expanding.
export const refreshScroll = () => ScrollTrigger.refresh();
