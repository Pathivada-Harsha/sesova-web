import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PF_LAYERS } from '../../data/content';

// Section 04 — Platform, as a side-scroller: the section pins to the viewport
// and the seven layers travel left while the page scrolls down, so the stack
// reads as one continuous run rather than seven separate blocks.
//
// Content is PF_LAYERS from src/data/content.js -- the richer sibling of the
// LAYERS list the old vertical treatment used, carrying body copy, what each
// layer holds, and which layers it feeds.
const CSS = `
section.ps{position:relative;background:#FCFBF8;overflow:hidden}
/* Full-viewport while pinned, so the track has a stable stage to slide across. */
.ps-view{height:100vh;min-height:620px;display:flex;align-items:center}
.ps-track{display:flex;align-items:stretch;gap:22px;padding:0 max(4.5vw,28px);will-change:transform}

/* First panel carries the section heading, so the title slides away too. */
.ps-intro{flex:0 0 clamp(300px,31vw,440px);display:flex;flex-direction:column;justify-content:center;padding-right:18px}
.ps-label{display:flex;align-items:center;gap:11px;font-size:10.4px;font-weight:600;letter-spacing:.2em;color:#4E9E6A}
.ps-label:before{content:"";width:34px;height:1.5px;background:#4E9E6A}
.ps-h2{margin:18px 0 0;font-size:clamp(28px,2.85vw,42px);line-height:1.1;letter-spacing:-.025em;font-weight:300;color:#12324F}
.ps-h2 b{font-weight:600}
.ps-sub{margin:18px 0 0;font-size:clamp(13.5px,.98vw,16px);line-height:1.65;font-weight:300;color:#41586A}
.ps-hint{display:flex;align-items:center;gap:10px;margin-top:26px;font-size:10.5px;font-weight:600;letter-spacing:.16em;color:#8A9BA8}
.ps-hint svg{color:#14707A}

.ps-card{flex:0 0 clamp(290px,25vw,370px);display:flex;flex-direction:column;padding:30px 28px;background:#fff;border:1px solid rgba(12,36,52,.12);border-radius:16px;box-shadow:0 30px 60px -46px rgba(12,36,52,.4)}
.ps-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
.ps-n{font-size:11px;font-weight:600;letter-spacing:.14em;color:#7A8C99}
.ps-hex{width:12px;height:14px;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)}
.ps-label2{margin:16px 0 0;font-size:21px;font-weight:600;letter-spacing:-.015em;color:#12324F}
.ps-body{margin:11px 0 0;font-size:13.5px;line-height:1.6;font-weight:300;color:#5B7183}
.ps-holds{margin:20px 0 0;padding:0;list-style:none;border-top:1px solid rgba(12,36,52,.1)}
.ps-holds li{display:flex;align-items:flex-start;gap:9px;padding:9px 0 0;font-size:12.5px;line-height:1.45;color:#3B5163}
.ps-holds li:before{content:"";flex:none;width:5px;height:5px;border-radius:50%;margin-top:6px;background:currentColor;opacity:.4}
.ps-feeds{margin-top:auto;padding-top:20px;display:flex;flex-wrap:wrap;align-items:center;gap:7px}
.ps-fk{font-size:9.5px;font-weight:600;letter-spacing:.14em;color:#8A9BA8;width:100%}
.ps-feeds span{padding:5px 10px;border-radius:999px;border:1px solid rgba(12,36,52,.14);font-size:11px;font-weight:500;color:#3B5163}

/* Hairline progress along the foot of the pinned stage. */
.ps-prog{position:absolute;left:0;right:0;bottom:0;height:2px;background:rgba(12,36,52,.1)}
.ps-prog:after{content:"";position:absolute;inset:0;transform-origin:left center;transform:scaleX(var(--ps-p,0));background:linear-gradient(90deg,#2A9460,#136B6B)}

@media (max-width:900px){
  /* No pinning on small screens -- a native swipeable row behaves far better. */
  .ps-view{height:auto;min-height:0;padding:72px 0}
  .ps-track{overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:16px;transform:none!important}
  .ps-intro,.ps-card{scroll-snap-align:start}
  .ps-intro{flex:0 0 78vw}
  .ps-card{flex:0 0 78vw}
  .ps-prog{display:none}
}
@media (prefers-reduced-motion:reduce){
  .ps-view{height:auto;min-height:0;padding:72px 0}
  .ps-track{overflow-x:auto;transform:none!important}
  .ps-prog{display:none}
}
`;

const Hint = () => (
  <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 5h19M16 1l4 4-4 4" />
  </svg>
);

export default function PlatformScroll() {
  const section = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return undefined;

    // gsap.matchMedia sets the effect up and tears it down as the query flips,
    // so a resize across the breakpoint cannot leave a stale pin behind.
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      // Measured in a function so invalidateOnRefresh can re-read it after a
      // resize or once images below have settled.
      const distance = () => Math.max(tr.scrollWidth - window.innerWidth, 1);

      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          // Vertical scroll needed equals the horizontal distance to cover.
          end: () => '+=' + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Set as a CSS variable rather than React state: this fires on every
          // scroll frame and must not re-render the tree.
          onUpdate: (self) => sec.style.setProperty('--ps-p', String(self.progress))
        }
      });

      return () => {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
        gsap.set(tr, { clearProps: 'x' });
        sec.style.removeProperty('--ps-p');
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="platform" className="ps" ref={section} aria-labelledby="ps-title">
      <style>{CSS}</style>
      <div className="ps-view">
        <div className="ps-track" ref={track}>
          <div className="ps-intro">
            <div className="ps-label">04 — PLATFORM</div>
            <h2 id="ps-title" className="ps-h2">
              One operating architecture.
              <br />
              <b>Every critical workflow.</b>
            </h2>
            <p className="ps-sub">Seven layers on one data model. Nothing is re-entered, reconciled or exported between them.</p>
            {/* Not decorative: it tells the visitor the section moves sideways. */}
            <div className="ps-hint"><Hint />SCROLL TO MOVE THROUGH THE LAYERS</div>
          </div>

          {PF_LAYERS.map((l) => (
            <article className="ps-card" key={l.n}>
              <div className="ps-top">
                <span className="ps-n">{l.n}</span>
                <span className="ps-hex" style={{ background: l.c }} aria-hidden="true" />
              </div>
              <h3 className="ps-label2">{l.label}</h3>
              <p className="ps-body">{l.body}</p>
              <ul className="ps-holds">
                {l.holds.map((h) => <li key={h}>{h}</li>)}
              </ul>
              {l.feeds.length > 0 && (
                <div className="ps-feeds">
                  <span className="ps-fk">FEEDS</span>
                  {l.feeds.map((i) => PF_LAYERS[i] && (
                    <span key={i}>{PF_LAYERS[i].n} {PF_LAYERS[i].label}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
      <div className="ps-prog" aria-hidden="true" />
    </section>
  );
}
