import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reducedMotion } from '../lib/smoothScroll';

// A depth carousel: cards sit on an arc receding into the distance, so the one
// in front is large and square-on while its neighbours shrink, slide back, dim
// and blur. Driven by drag, horizontal wheel and arrow keys.
//
// CSS 3D rather than WebGL on purpose -- perspective + translate3d is
// GPU-composited, costs no extra bundle, and works on phones. three.js is
// installed if a future design needs real mesh bending, but nothing here does.
const CSS = `
section.dc{position:relative;padding:92px 0 84px;background:#F6FAFA;border-top:1px solid rgba(12,36,52,.1);overflow:hidden}
.dc-in{width:calc(100% - 9vw);max-width:var(--page-max);margin:0 auto}
.dc-label{display:flex;align-items:center;gap:11px;font-size:10.4px;font-weight:600;letter-spacing:.2em;color:#14707A}
.dc-label:before{content:"";width:34px;height:1.5px;background:#14707A}
.dc-h2{margin:14px 0 0;font-size:clamp(28px,2.85vw,44px);line-height:1.08;letter-spacing:-.022em;font-weight:300;color:#12324F}
.dc-h2 b{font-weight:600}
.dc-sub{margin:13px 0 0;max-width:520px;font-size:clamp(13.5px,.98vw,15.5px);line-height:1.62;color:#607789}

/* The stage. perspective on the parent is what gives the cards real depth. */
.dc-stage{position:relative;height:clamp(300px,42vw,560px);margin-top:44px;perspective:1600px;perspective-origin:50% 50%;touch-action:pan-y;cursor:grab;user-select:none}
.dc-stage:focus-visible{outline:2px solid #2C6FB5;outline-offset:6px}
.dc-stage[data-dragging="true"]{cursor:grabbing}
.dc-card{position:absolute;top:50%;left:50%;width:min(62%,780px);aspect-ratio:1743/902;margin:0;transition:transform .55s cubic-bezier(.2,.7,.2,1),opacity .55s ease,filter .55s ease;will-change:transform,opacity,filter}
/* While motion is continuous -- a drag, or scroll driving the ribbon -- the
   easing transition would lag a frame behind and feel rubbery. */
.dc-stage[data-live="true"] .dc-card{transition:none}
.dc-card img{display:block;width:100%;height:100%;object-fit:cover;object-position:top left;border-radius:10px;border:1px solid rgba(12,36,52,.14);background:#fff;box-shadow:0 40px 80px -40px rgba(12,36,52,.5);pointer-events:none}
.dc-cap{position:absolute;left:0;right:0;bottom:-30px;text-align:center;font-size:11.5px;font-weight:600;letter-spacing:.1em;color:#8A9BA8;opacity:0;transition:opacity .4s ease}
.dc-card[data-front="true"] .dc-cap{opacity:1}

.dc-bar{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:54px}
.dc-chips{display:flex;flex-wrap:wrap;gap:8px}
.dc-chip{padding:8px 15px;border-radius:999px;border:1px solid #DDE7EC;background:#fff;font:inherit;font-size:11.5px;font-weight:500;color:#3B5163;cursor:pointer;transition:background .22s ease,border-color .22s ease,color .22s ease}
.dc-chip:hover{border-color:#14707A;color:#12324F}
.dc-chip[aria-pressed="true"]{background:#0A3742;border-color:#0A3742;color:#fff}
.dc-right{display:flex;align-items:center;flex:none}
.dc-arrows{display:flex;gap:10px}
.dc-arrow{width:44px;height:44px;border-radius:10px;background:#fff;border:1px solid #DDE7EC;box-shadow:0 8px 18px -14px rgba(12,36,52,.4);color:#12324F;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s ease,background .2s ease}
.dc-arrow:hover{border-color:#14707A;background:#F4F9F8}
.dc-count{font-size:12px;font-weight:500;letter-spacing:.08em;color:#8A9BA8;margin-left:14px}
.dc-count b{font-weight:600;color:#14707A}

@media (max-width:900px){
  section.dc{padding:72px 0 64px}
  .dc-in{width:calc(100% - 48px)}
  .dc-card{width:min(80%,520px)}
  .dc-bar{flex-direction:column;align-items:flex-start}
}
/* Flat, scrollable row -- no perspective, no transforms, nothing auto-moving. */
@media (prefers-reduced-motion:reduce){
  .dc-stage{height:auto;perspective:none;display:flex;gap:16px;overflow-x:auto;cursor:default;padding-bottom:12px}
  .dc-card{position:relative;top:auto;left:auto;width:min(80%,520px);flex:0 0 auto;transform:none!important;opacity:1!important;filter:none!important;transition:none}
  .dc-cap{position:relative;bottom:auto;opacity:1;margin-top:10px}
}
`;

// How far apart the cards sit on the arc.
const STEP_X = 30;   // percent of card width shifted per position
const STEP_Z = 190;  // px pushed backwards per position
const STEP_ROT = 26; // degrees turned per position
const VISIBLE = 3;   // positions either side of the front card that still render

const Arrow = ({ back }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={back ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
);

const clamp = (n, max) => Math.min(Math.max(n, 0), Math.max(max, 0));

export default function DepthCarousel({ groups = [] }) {
  const [group, setGroup] = useState(0);
  // Fractional: whole numbers are settled, decimals are mid-drag.
  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);
  // True whenever position is changing continuously, so the CSS easing is off.
  const [live, setLive] = useState(false);
  const stage = useRef(null);
  const section = useRef(null);
  const drag = useRef(null);
  // When the visitor last took control by hand; scroll yields to them for a
  // moment afterwards so the two inputs do not fight.
  const manual = useRef(0);

  const active = groups[group];
  const cards = active ? active.shots : [];
  const count = cards.length;
  const front = Math.round(pos);

  const go = useCallback((delta) => {
    manual.current = Date.now();
    setPos((p) => clamp(Math.round(p) + delta, count - 1));
  }, [count]);

  // Scroll drives the ribbon: the section's travel through the viewport maps
  // onto the whole set, so the cards turn as the page moves.
  useEffect(() => {
    const el = section.current;
    if (!el || reducedMotion() || count < 2) return undefined;
    let idle;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      end: 'bottom 22%',
      onUpdate: (self) => {
        // Hands win: a recent drag, arrow or key press suspends scroll control.
        if (Date.now() - manual.current < 2500) return;
        setPos(self.progress * (count - 1));
        setLive(true);
        clearTimeout(idle);
        idle = setTimeout(() => setLive(false), 140);
      }
    });
    return () => { clearTimeout(idle); trigger.kill(); };
  }, [count]);

  // Switching group starts its set from the beginning.
  const pickGroup = (i) => { manual.current = Date.now(); setGroup(i); setPos(0); };

  const onPointerDown = (e) => {
    // Touch keeps native vertical scrolling; the arrows cover it there.
    if (reducedMotion() || e.pointerType === 'touch') return;
    drag.current = { x: e.clientX, from: pos, width: stage.current ? stage.current.offsetWidth : 1 };
    manual.current = Date.now();
    setDragging(true);
    setLive(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current) return;
    manual.current = Date.now();
    // One card per STEP_X percent of the stage dragged.
    const moved = (e.clientX - drag.current.x) / (drag.current.width * (STEP_X / 100));
    setPos(clamp(drag.current.from - moved, count - 1));
  };

  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    manual.current = Date.now();
    setDragging(false);
    setLive(false);
    setPos((p) => clamp(Math.round(p), count - 1));
  };

  // Non-passive so a horizontal-intent wheel can be claimed without hijacking
  // ordinary vertical page scrolling.
  useEffect(() => {
    const el = stage.current;
    if (!el || reducedMotion()) return undefined;
    let cooling = false;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (cooling) return;
      cooling = true;
      setTimeout(() => { cooling = false; }, 260);
      go(e.deltaX > 0 ? 1 : -1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [go]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  if (!count) return null;

  return (
    <section className="dc" ref={section} aria-labelledby="dc-title">
      <style>{CSS}</style>
      <div className="dc-in">
        <div data-rise="">
          <div className="dc-label">EVERY SCREEN</div>
          <h2 id="dc-title" className="dc-h2">The product, <b>screen by screen.</b></h2>
          <p className="dc-sub">Drag, scroll sideways or use the arrow keys to move through the modules your teams work in every day.</p>
        </div>

        <div
          className="dc-stage"
          ref={stage}
          data-dragging={dragging}
          data-live={live || dragging}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={active.label + ' screens'}
        >
          {cards.map((c, i) => {
            const d = i - pos;
            const far = Math.abs(d);
            // Cards well off to the side are not rendered at all.
            if (far > VISIBLE) return null;
            const isFront = i === front;
            const transform = 'translate(-50%,-50%)'
              + ' translateX(' + d * STEP_X + '%)'
              + ' translateZ(' + -far * STEP_Z + 'px)'
              + ' rotateY(' + -d * STEP_ROT + 'deg)';
            return (
              <figure
                className="dc-card"
                key={c.file}
                data-front={isFront}
                aria-hidden={!isFront}
                style={{
                  transform,
                  opacity: Math.max(1 - far * 0.26, 0),
                  filter: 'blur(' + Math.min(far * 1.4, 5) + 'px)',
                  // Nearer cards must paint over further ones.
                  zIndex: 100 - Math.round(far * 10)
                }}
              >
                <img src={'/assets/product/' + c.file} alt={isFront ? 'SeSova ' + active.label + ': ' + c.label : ''} draggable="false" decoding="async" loading="lazy" />
                <figcaption className="dc-cap">{c.label}</figcaption>
              </figure>
            );
          })}
        </div>

        <div className="dc-bar">
          <div className="dc-chips">
            {groups.map((g, i) => (
              <button key={g.label} type="button" className="dc-chip" aria-pressed={i === group} onClick={() => pickGroup(i)}>
                {g.label}
              </button>
            ))}
          </div>
          <div className="dc-right">
            <div className="dc-arrows">
              <button type="button" className="dc-arrow" onClick={() => go(-1)} aria-label="Previous screen"><Arrow back /></button>
              <button type="button" className="dc-arrow" onClick={() => go(1)} aria-label="Next screen"><Arrow /></button>
            </div>
            <div className="dc-count" aria-live="polite">
              <b>{String(front + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
