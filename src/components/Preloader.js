import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getLenis, reducedMotion, refreshScroll } from '../lib/smoothScroll';

// First-load curtain: logo, wordmark and a hairline progress rule, then a wipe
// upward. The page is image-heavy, so this covers the moment where backgrounds
// and the hero diagram would otherwise pop in piecemeal.
//
// It is deliberately hard to get stuck behind:
//  - reduced motion skips it entirely
//  - it lifts on window load OR after CAP ms, whichever comes first
//  - it shows once per tab, so in-page navigation never replays it
const CSS = `
.pl{position:fixed;inset:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;background:#FCFBF8;transition:transform .9s cubic-bezier(.76,0,.24,1),opacity .55s ease .25s}
.pl[data-leaving="true"]{transform:translateY(-100%);opacity:0}
.pl-mark{display:flex;align-items:center;gap:13px;animation:plIn .8s cubic-bezier(.2,.7,.2,1) both}
.pl-mark img{width:34px;height:39px;object-fit:contain;display:block}
.pl-word{font-size:25px;font-weight:300;letter-spacing:-.025em;color:#12324F}
.pl-word b{font-weight:600;color:#4E9E6A}
.pl-label{font-size:9.5px;font-weight:600;letter-spacing:.2em;color:#8A9BA8;animation:plIn .8s cubic-bezier(.2,.7,.2,1) .12s both}
.pl-track{position:relative;width:min(210px,42vw);height:1px;background:rgba(12,36,52,.14);overflow:hidden}
.pl-bar{position:absolute;inset:0;transform-origin:left center;background:linear-gradient(90deg,#2A9460,#136B6B);transition:transform .35s cubic-bezier(.3,.8,.3,1)}
@keyframes plIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.pl{display:none}}
`;

// Longest the curtain may ever stay up, even if window load never fires.
const CAP = 2600;
// Shortest it stays, so a warm cache does not make it flash.
const MIN = 650;
const KEY = 'sesova:preloaded';

const seenThisTab = () => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch (e) {
    // Private mode or blocked storage: treat as unseen, the caps still apply.
    return false;
  }
};

export default function Preloader() {
  // Decided once, before first paint, so the curtain is never shown and yanked.
  const [show, setShow] = useState(() => !reducedMotion() && !seenThisTab());
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0.04);
  const timers = useRef([]);

  // Pauses the sections' entrance animations so they are not spent behind the
  // curtain. Must be a layout effect: it has to land before useReveal's effect
  // adds `.inview` and starts them.
  useLayoutEffect(() => {
    if (!show) return undefined;
    document.documentElement.classList.add('preloading');
    return () => document.documentElement.classList.remove('preloading');
  }, [show]);

  useEffect(() => {
    if (!show) return undefined;

    // Lenis is created by App's own effect, and child effects run first, so it
    // may not exist yet. Resolve it afresh each time and stop it again next
    // frame, which makes this correct whichever order the two run in.
    const stopScroll = () => { const l = getLenis(); if (l) l.stop(); };
    const startScroll = () => { const l = getLenis(); if (l) l.start(); };
    stopScroll();
    const raf = requestAnimationFrame(stopScroll);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const after = (fn, ms) => { timers.current.push(setTimeout(fn, ms)); };

    // Creep toward 90% while waiting; real completion supplies the last 10%.
    const creep = setInterval(() => setProgress((p) => p + (0.9 - p) * 0.09), 70);

    const started = Date.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearInterval(creep);
      setProgress(1);
      // Hold the full bar briefly, respecting MIN, then wipe.
      const wait = Math.max(MIN - (Date.now() - started), 0) + 260;
      after(() => {
        setLeaving(true);
        try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* storage blocked; caps still apply */ }
        // Unmount after the wipe so the overlay stops intercepting anything.
        after(() => {
          setShow(false);
          startScroll();
          document.body.style.overflow = prevOverflow;
          // Page height is only final now, so remeasure the scroll triggers.
          refreshScroll();
        }, 950);
      }, wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish);
    // The guarantee: it lifts whether or not the page ever reports loaded.
    after(finish, CAP);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(creep);
      window.removeEventListener('load', finish);
      timers.current.forEach(clearTimeout);
      timers.current = [];
      startScroll();
      document.body.style.overflow = prevOverflow;
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="pl" data-leaving={leaving} role="status" aria-live="polite" aria-label="Loading SeSova">
      <style>{CSS}</style>
      <div className="pl-mark">
        <img src="/assets/logo.webp" alt="" />
        <span className="pl-word">Se<b>S</b>ova</span>
      </div>
      <div className="pl-label">ONE CONNECTED ECOSYSTEM</div>
      <div className="pl-track">
        <div className="pl-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}
