import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Scroll-driven scatter: the tiles begin perfectly stacked at the centre, so
// only one is visible, then fan out onto an orbit while the core statement
// fades up behind them. It reuses the hero's vocabulary -- concentric rings, a
// travelling highlight arc, cards on an orbit -- so it reads as the same site
// rather than a borrowed effect.
//
// All of the motion is driven by a single custom property, --p (0 to 1), set on
// the section by one ScrollTrigger. Every tile derives its own position from it
// in CSS, so scrolling never re-renders the React tree.

// The people behind each part of the platform. Served from
// public/assets/modules/ and capped at 420px by scripts/optimize-images.js,
// since the tiles only ever render at about 120px.
//
// Order matters: index 0 starts at twelve o'clock and the ring runs clockwise
// from there, so these read as a cycle -- sell, plan, build, buy, pay, measure.
const TILES = [
  { file: 'sales.webp', label: 'Sales' },
  { file: 'planning.webp', label: 'Planning' },
  { file: 'projects.webp', label: 'Projects' },
  { file: 'site-execution.webp', label: 'Site execution' },
  { file: 'procurement.webp', label: 'Procurement' },
  { file: 'vendors.webp', label: 'Vendors' },
  { file: 'inventory.webp', label: 'Inventory' },
  { file: 'finance.webp', label: 'Finance' },
  { file: 'analytics.webp', label: 'Analytics' },
  { file: 'leadership.webp', label: 'Leadership' }
];

// Per-tile radius and size multipliers, so the ring is not mechanically even.
const SPREAD = [1, 0.86, 1.06, 0.9, 1.01, 0.87, 1.04, 0.92, 0.99, 0.88];
const SIZES = [1.12, 0.9, 1, 0.86, 1.06, 0.92, 1, 0.88, 1.04, 0.94];

const CSS = `
section.or{position:relative;background:#FCFBF8;overflow:hidden}
.or-view{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 0}
.or-stage{position:relative;width:min(94vw,1280px);height:min(calc(100vh - 64px),900px);margin:0 auto;
  /* One radius: the orbit is a true circle, sized from vmin so it always fits
     the short side. Everything else is derived from it -- tile size, ring size
     and the statement's width -- so the parts can never drift out of
     proportion or collide at some window size I did not test.
     Budget: 2R + tile must stay inside the stage height. */
  --R:clamp(150px,34.5vmin,386px);
  --tile:clamp(80px,15vmin,190px);
  --p:0}

/* Concentric rings, drawn behind everything. */
/* A centred square, so the circles stay circles. It is deliberately wider than
   the stage is tall, so the outer rings run off the top and bottom edges and
   the section clips them -- the rings read as very large, not as a contained
   diagram. */
.or-rings{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  width:calc(var(--R) * 2.3);aspect-ratio:1;height:auto;overflow:visible;pointer-events:none}
.or-rings circle{fill:none;stroke:rgba(12,36,52,.085);stroke-width:1;vector-effect:non-scaling-stroke}
.or-arc{fill:none;stroke:url(#orArc);stroke-width:2.2;stroke-linecap:round;vector-effect:non-scaling-stroke;
  transform-origin:50% 50%;animation:orSpin 26s linear infinite;animation-play-state:var(--flowplay,running)}
@keyframes orSpin{to{transform:rotate(360deg)}}

/* Core: orb + statement, revealed only once the tiles have cleared the middle. */
/* Width is tied to the orbit so the statement can never grow into the tiles. */
.or-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(430px,calc(var(--R) * 1.15));text-align:center;
  /* Held back until the tiles have cleared the middle, so the statement is
     never read through a passing card. */
  --reveal:clamp(0,(var(--p) - .5) * 3,1);
  opacity:var(--reveal)}
.or-orb{width:clamp(38px,5vmin,62px);height:clamp(38px,5vmin,62px);margin:0 auto 22px;border-radius:50%;
  background:radial-gradient(circle at 32% 28%,#86C79A,#2A9460 42%,#136B6B 100%);
  box-shadow:0 14px 30px -12px rgba(19,107,107,.6);
  transform:scale(calc(.6 + .4 * var(--reveal)))}
.or-h2{margin:0;font-size:clamp(26px,3.1vw,46px);line-height:1.1;letter-spacing:-.025em;font-weight:300;color:#12324F}
.or-h2 b{display:block;font-weight:600}
.or-sub{margin:16px auto 0;max-width:360px;font-size:clamp(13px,.95vw,15.5px);line-height:1.6;font-weight:300;color:#5B7183}

/* Tiles. Each carries --cx/--cy (unit circle), --d (stagger) and --k (1/(1-d)). */
.or-tile{position:absolute;left:50%;top:50%;margin:0;z-index:2;
  width:var(--tile);aspect-ratio:1;
  --pi:clamp(0,(var(--p) - var(--d)) * var(--k),1);
  transform:translate(-50%,-50%)
    translate(calc(var(--R) * var(--cx) * var(--pi)),calc(var(--R) * var(--cy) * var(--pi)))
    scale(calc((1.16 - .16 * var(--pi)) * var(--s)))
    rotate(calc(var(--rot) * (1 - var(--pi))));
  will-change:transform}
.or-tile img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 32%;
  border-radius:14px;background:#fff;border:3px solid #fff;
  box-shadow:0 18px 38px -16px rgba(12,36,52,.42),0 0 0 1px rgba(12,36,52,.07)}
/* nowrap matters: the caption is anchored to its bottom edge, so a two-word
   label that wraps grows upward and sits on top of the photo. */
.or-cap{position:absolute;left:0;right:0;bottom:-20px;text-align:center;font-size:9.5px;font-weight:600;
  letter-spacing:.14em;color:#8A9BA8;opacity:var(--reveal2,0);white-space:nowrap}

@media (max-width:900px){
  /* No pin, no scatter: a plain grid with the statement above it. */
  .or-view{min-height:0;padding:72px 0}
  .or-stage{height:auto;width:calc(100% - 48px);display:flex;flex-direction:column;gap:28px}
  .or-rings{display:none}
  .or-core{position:relative;left:auto;top:auto;transform:none;width:100%;opacity:1!important}
  .or-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(92px,1fr));gap:12px}
  .or-tile{position:relative;left:auto;top:auto;width:auto;transform:none!important}
  .or-cap{position:relative;bottom:auto;margin-top:7px;opacity:1}
}
@media (prefers-reduced-motion:reduce){
  .or-arc{animation:none}
  .or-core{opacity:1!important}
}
`;

export default function OrbitReveal() {
  const section = useRef(null);
  const stage = useRef(null);

  useEffect(() => {
    const sec = section.current;
    const st = stage.current;
    if (!sec || !st) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const trigger = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // One custom property drives every tile; no React state per frame.
          onUpdate: (self) => {
            st.style.setProperty('--p', String(self.progress));
            // Captions arrive last, once the tiles have settled.
            st.style.setProperty('--reveal2', String(Math.max((self.progress - 0.72) * 3.6, 0)));
          }
        }
      });

      return () => {
        if (trigger.scrollTrigger) trigger.scrollTrigger.kill();
        trigger.kill();
        st.style.removeProperty('--p');
        st.style.removeProperty('--reveal2');
      };
    });

    return () => mm.revert();
  }, []);

  const tiles = TILES.map((t, i) => {
    // Start at 12 o'clock and go round; the ring reads clockwise.
    const angle = (-90 + (360 / TILES.length) * i) * (Math.PI / 180);
    // Outer tiles set off fractionally later, so the pile unpacks rather than
    // expanding as one rigid shape.
    const d = (i % 4) * 0.055;
    return {
      ...t,
      cx: Math.cos(angle) * SPREAD[i % SPREAD.length],
      cy: Math.sin(angle) * SPREAD[i % SPREAD.length],
      s: SIZES[i % SIZES.length],
      rot: (i % 2 ? 1 : -1) * (6 + (i % 3) * 4),
      d,
      k: 1 / (1 - d)
    };
  });

  return (
    <section className="or" ref={section} aria-labelledby="or-title">
      <style>{CSS}</style>
      <div className="or-view">
        <div className="or-stage" ref={stage}>
          <svg className="or-rings" viewBox="0 0 600 600" aria-hidden="true">
            <defs>
              <linearGradient id="orArc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#86C79A" stopOpacity="0" />
                <stop offset="55%" stopColor="#2A9460" stopOpacity=".85" />
                <stop offset="100%" stopColor="#136B6B" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="300" cy="300" r="286" />
            <circle cx="300" cy="300" r="232" />
            <circle cx="300" cy="300" r="178" />
            <circle cx="300" cy="300" r="124" />
            {/* Travelling highlight, the same device the hero orbit uses. */}
            <path className="or-arc" d="M300 14a286 286 0 0 1 248 143" />
          </svg>

          <div className="or-core">
            <div className="or-orb" aria-hidden="true" />
            <h2 id="or-title" className="or-h2">
              Every workflow.
              <b>One record.</b>
            </h2>
            <p className="or-sub">Capital, projects, procurement and assets stop living in separate systems and start orbiting a single shared record.</p>
          </div>

          <div className="or-grid">
            {tiles.map((t) => (
              <figure
                className="or-tile"
                key={t.file}
                style={{
                  '--cx': t.cx,
                  '--cy': t.cy,
                  '--s': t.s,
                  '--rot': t.rot + 'deg',
                  '--d': t.d,
                  '--k': t.k
                }}
              >
                <img src={'/assets/modules/' + t.file} alt="" loading="lazy" decoding="async" draggable="false" />
                <figcaption className="or-cap">{t.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
