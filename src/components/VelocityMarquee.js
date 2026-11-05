import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getLenis, reducedMotion } from '../lib/smoothScroll';

// A drifting band of capability labels that reacts to scroll velocity: scroll
// faster and it speeds up and leans into the direction of travel; scroll up and
// it runs backwards; stop and it settles to a slow idle drift.
//
// The copy comes from MARQUEE in src/data/content.js via useHomeVals, which
// already hands over the list twice -- the duplicate is what makes the -50%
// wrap seamless.
const CSS = `
section.mq{position:relative;padding:30px 0;background:#F6FAFA;border-top:1px solid rgba(12,36,52,.1);border-bottom:1px solid rgba(12,36,52,.1);overflow:hidden}
.mq-mask{position:relative}
/* Feathered edges so labels enter and leave instead of being cut off. */
.mq-mask:before,.mq-mask:after{content:"";position:absolute;top:0;bottom:0;width:clamp(40px,9vw,160px);z-index:2;pointer-events:none}
.mq-mask:before{left:0;background:linear-gradient(90deg,#F6FAFA,rgba(246,250,250,0))}
.mq-mask:after{right:0;background:linear-gradient(270deg,#F6FAFA,rgba(246,250,250,0))}
.mq-track{display:flex;align-items:center;gap:0;width:max-content;will-change:transform}
.mq-item{display:inline-flex;align-items:center;gap:11px;padding:0 26px;font-size:12.5px;font-weight:500;letter-spacing:.015em;color:#3B5163;white-space:nowrap}
.mq-item i{width:6px;height:6px;border-radius:50%;flex:none}
/* Hairline divider between labels, in keeping with the rest of the page. */
.mq-item+.mq-item:before{content:"";position:absolute;width:1px;height:13px;background:rgba(12,36,52,.14);margin-left:-26px}
@media (max-width:900px){
  section.mq{padding:22px 0}
  .mq-item{font-size:11.5px;padding:0 18px}
  .mq-item+.mq-item:before{margin-left:-18px}
}
/* No drift, no skew: the labels simply sit there, scrollable like any list. */
@media (prefers-reduced-motion:reduce){
  .mq-track{width:auto;flex-wrap:wrap;justify-content:center;row-gap:10px;transform:none!important}
  .mq-mask:before,.mq-mask:after{display:none}
}
`;

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

// Seconds for one full pass at idle. Slow -- it should read as ambient.
const IDLE_DURATION = 46;

export default function VelocityMarquee({ items = [] }) {
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    if (!el || !items.length || reducedMotion()) return undefined;

    const drift = gsap.to(el, { xPercent: -50, duration: IDLE_DURATION, ease: 'none', repeat: -1 });
    const lenis = getLenis();
    // Without Lenis there is no velocity to read, so the idle drift is the whole effect.
    if (!lenis) return () => drift.kill();

    let settle;
    const onScroll = ({ velocity = 0 }) => {
      // Sign carries direction, so scrolling up runs the band backwards.
      const dir = velocity < 0 ? -1 : 1;
      gsap.to(drift, { timeScale: dir * clamp(1 + Math.abs(velocity) * 0.22, 1, 7), duration: 0.45, overwrite: true });
      gsap.to(el, { skewX: clamp(-velocity * 0.55, -9, 9), duration: 0.45, overwrite: 'auto' });

      // Lenis stops emitting once scrolling ends, so ease back deliberately.
      clearTimeout(settle);
      settle = setTimeout(() => {
        gsap.to(drift, { timeScale: 1, duration: 0.9, overwrite: true });
        gsap.to(el, { skewX: 0, duration: 0.9, overwrite: 'auto' });
      }, 140);
    };

    lenis.on('scroll', onScroll);
    return () => {
      clearTimeout(settle);
      lenis.off('scroll', onScroll);
      drift.kill();
    };
  }, [items.length]);

  if (!items.length) return null;

  return (
    <section className="mq" aria-label="What SeSova connects">
      <style>{CSS}</style>
      <div className="mq-mask">
        <div className="mq-track" ref={track}>
          {items.map((m, i) => (
            // The list arrives doubled for the seamless wrap; the second pass is
            // the same copy, so it is hidden from assistive tech.
            <span
              className="mq-item"
              key={m.label + i}
              style={{ position: 'relative' }}
              aria-hidden={i >= items.length / 2 ? 'true' : undefined}
            >
              <i style={{ background: m.c }} aria-hidden="true" />
              {m.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
