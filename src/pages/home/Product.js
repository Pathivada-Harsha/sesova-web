import React, { useEffect, useRef, useState } from 'react';
import productBackground from '../../images/product-section-background.webp';

// Product experience: six module tabs, per-module screen pills and one CSS laptop
// that cross-fades between the real product screenshots in public/assets/product/.
// Module/screen state and the auto presentation come from useHomeVals via `v`.
const CSS = `
section.pd{position:relative;padding:112px 0 120px;background:#F3F8FC;overflow:hidden;isolation:isolate}
.pd-bg{position:absolute;inset:0;z-index:-1;pointer-events:none;background-size:cover;background-position:center;background-repeat:no-repeat}
.pd-bg:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(252,251,248,.6) 0%,rgba(252,251,248,.2) 38%,rgba(252,251,248,.4) 100%)}
.pd-in{position:relative;width:calc(100% - 9vw);max-width:var(--page-max);margin:0 auto}
.pd-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px}
.pd-label{display:flex;align-items:center;gap:11px;font-size:10.4px;font-weight:600;letter-spacing:.2em;color:#2F7A50}
.pd-label:before{content:"";width:34px;height:1.5px;background:#2F7A50}
.pd-h2{margin:14px 0 0;font-size:clamp(30px,3.1vw,48px);line-height:1.08;letter-spacing:-.024em;font-weight:400;color:#12324F}
.pd-h2 b{display:block;font-weight:600}
.pd-h2 .g{background:linear-gradient(90deg,#2A9460 0%,#14707A 55%,#2C6FB5 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.pd-badge{display:inline-flex;align-items:center;gap:10px;padding:9px 16px;border-radius:999px;background:rgba(255,255,255,.75);border:1px solid rgba(47,122,80,.26);box-shadow:0 10px 24px -20px rgba(12,36,52,.45);font-size:10.5px;font-weight:600;letter-spacing:.14em;color:#2F7A50;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.pd-badge i{width:7px;height:7px;border-radius:50%;background:#3FA46A;animation:pdPing 2.4s ease-out infinite}
@keyframes pdPing{0%{box-shadow:0 0 0 0 rgba(63,164,106,.45)}70%,100%{box-shadow:0 0 0 7px rgba(63,164,106,0)}}
.pd-tabs{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin-top:44px;padding:6px;background:rgba(255,255,255,.8);border:1px solid #DDE7EC;border-radius:14px;box-shadow:0 14px 34px -28px rgba(12,36,52,.3);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.pd-tab{min-width:0;padding:13px 16px;border:0;border-radius:10px;background:transparent;font:inherit;text-align:left;color:#12324F;cursor:pointer;transition:background .25s ease,color .25s ease,box-shadow .25s ease}
.pd-tab:hover{background:#EEF4F7}
.pd-tab[aria-selected="true"]{background:#0A3742;color:#fff;box-shadow:0 12px 24px -16px rgba(10,55,66,.75)}
.pd-tn{display:block;font-size:10px;font-weight:600;letter-spacing:.14em;color:#8A9BA8;transition:color .25s ease}
.pd-tab[aria-selected="true"] .pd-tn{color:#86C79A}
.pd-tl{display:block;margin-top:4px;font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pd-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px 32px;margin:26px 0 34px}
.pd-subs{display:flex;flex-wrap:wrap;gap:8px}
.pd-sub{padding:8px 16px;border-radius:999px;border:1px solid #D5E0E7;background:rgba(255,255,255,.88);font:inherit;font-size:12.5px;font-weight:500;color:#12324F;cursor:pointer;transition:background .25s ease,border-color .25s ease,color .25s ease}
.pd-sub:hover{border-color:#14707A;color:#14707A}
.pd-sub[aria-selected="true"]{background:#14707A;border-color:#14707A;color:#fff}
.pd-desc{margin:0;max-width:470px;font-size:13.5px;line-height:1.6;color:#4E6577;animation:pdIn .45s cubic-bezier(.2,.7,.2,1) both}
@keyframes pdIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.pd-device{position:relative;max-width:1240px;margin:0 auto}
.pd-device:after{content:"";position:absolute;left:6%;right:6%;bottom:-30px;height:44px;z-index:-1;background:radial-gradient(50% 50% at 50% 50%,rgba(12,36,52,.3),transparent 72%);filter:blur(10px)}
.pd-lid{position:relative;padding:clamp(7px,1.15vw,15px) clamp(7px,1.15vw,15px) clamp(9px,1.4vw,19px);background:#0F1C26;border-radius:clamp(12px,1.6vw,22px) clamp(12px,1.6vw,22px) 5px 5px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 44px 70px -42px rgba(12,36,52,.6)}
.pd-cam{position:absolute;top:clamp(2px,.4vw,5px);left:50%;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:#2E4250}
.pd-screen{position:relative;aspect-ratio:1912/990;overflow:hidden;border-radius:3px;background:#F4F6F8}
.pd-screen img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top left;opacity:0;transform:scale(1.015);transition:opacity .6s ease,transform .8s cubic-bezier(.16,1,.3,1)}
.pd-screen img.on{opacity:1;transform:none}
.pd-screen:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(118deg,rgba(255,255,255,.07) 0%,transparent 38%)}
.pd-base{position:relative;height:clamp(10px,1.3vw,18px);margin:0 -6%;background:linear-gradient(180deg,#EDF1F4 0%,#CDD6DD 62%,#AFBBC5 100%);border-radius:2px 2px clamp(10px,1.4vw,20px) clamp(10px,1.4vw,20px)}
.pd-base:before{content:"";position:absolute;top:0;left:50%;width:15%;height:45%;transform:translateX(-50%);background:#BAC5CE;border-radius:0 0 8px 8px}
.pd-foot{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:40px;font-size:12px;letter-spacing:.06em;color:#647B8C}
.pd-foot b{color:#14707A;font-weight:600}
.pd-track{position:relative;width:140px;height:2px;border-radius:2px;background:rgba(18,50,79,.14);overflow:hidden}
.pd-prog{position:absolute;inset:0;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,#2A9460,#2C6FB5)}
.pd-prog[data-run="true"]{animation:pdProg linear forwards}
@keyframes pdProg{to{transform:scaleX(1)}}
@media (max-width:1100px){
  .pd-tabs{display:flex;overflow-x:auto;scrollbar-width:thin;scroll-snap-type:x proximity}
  .pd-tab{flex:0 0 auto;min-width:150px;scroll-snap-align:start}
}
@media (max-width:900px){
  section.pd{padding:80px 0 88px}
  .pd-in{width:calc(100% - 40px)}
  .pd-bar{flex-direction:column;align-items:flex-start}
  .pd-desc{max-width:none}
}
@media (max-width:560px){
  .pd-tabs{margin-top:32px}
  .pd-tab{min-width:136px;padding:11px 14px}
  .pd-sub{padding:7px 13px;font-size:12px}
  .pd-base{margin:0 -3%}
  .pd-foot{margin-top:30px}
}
@media (prefers-reduced-motion:reduce){
  .pd-screen img{transform:none!important;transition:opacity .2s ease}
  .pd-badge i,.pd-desc,.pd [data-rise]{animation:none!important;opacity:1!important;transform:none!important}
}
`;

export default function Product({ v }) {
  const { mods, subs, screens } = v;
  const modIdx = Math.max(0, mods.findIndex((m) => m.on));
  const active = Math.max(0, screens.findIndex((s) => s.on));
  const next = (active + 1) % screens.length;
  const pad = (x) => String(x).padStart(2, '0');
  const tabsRef = useRef(null);

  // Only mount screens that have been shown, plus the next one in the sequence,
  // so the page doesn't download all 14 screenshots up front.
  const [seen, setSeen] = useState(() => new Set([active, next]));
  useEffect(() => {
    setSeen((s) => (s.has(active) && s.has(next) ? s : new Set([...s, active, next])));
  }, [active, next]);

  // Keep the active module tab visible when the tab row scrolls (tablet/mobile).
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row && row.children[modIdx];
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' });
  }, [modIdx]);

  // Pause the presentation while a mouse is over the showcase or keyboard focus is in it.
  const hold = {
    onPointerEnter: (e) => { if (e.pointerType === 'mouse') v.holdProduct(true); },
    onPointerLeave: (e) => { if (e.pointerType === 'mouse') v.holdProduct(false); },
    onFocus: (e) => { if (e.target.matches(':focus-visible')) v.holdProduct(true); },
    onBlur: (e) => { if (!e.currentTarget.contains(e.relatedTarget)) v.holdProduct(false); }
  };

  return (
    <section id="product" className="pd" aria-labelledby="pd-title">
      <style>{CSS}</style>
      <div className="pd-bg" style={{ backgroundImage: `url(${productBackground})` }} aria-hidden="true" />
      <div className="pd-in">
        <header className="pd-head" data-rise="">
          <div>
            <div className="pd-label">05 — PRODUCT EXPERIENCE</div>
            <h2 id="pd-title" className="pd-h2">
              The interfaces your teams
              <b><span className="g">actually work in.</span></b>
            </h2>
          </div>
          <div className="pd-badge"><i aria-hidden="true" />ACTUAL PRODUCT SCREENS</div>
        </header>

        <div {...hold}>
          <div className="pd-tabs" ref={tabsRef} role="tablist" aria-label="Product modules">
            {mods.map((m, i) => (
              <button key={m.label} type="button" role="tab" id={`pd-tab-${i}`} aria-selected={m.on} aria-controls="pd-panel" className="pd-tab" onClick={m.onClick}>
                <span className="pd-tn">{m.n}</span>
                <span className="pd-tl">{m.label}</span>
              </button>
            ))}
          </div>

          <div className="pd-bar">
            <div className="pd-subs" role="tablist" aria-label={`${mods[modIdx].label} screens`}>
              {subs.map((s) => (
                <button key={s.label} type="button" role="tab" aria-selected={s.on} aria-controls="pd-panel" className="pd-sub" onClick={s.onClick}>{s.label}</button>
              ))}
            </div>
            <p className="pd-desc" key={v.shotDesc}>{v.shotDesc}</p>
          </div>

          <div className="pd-device">
            <div className="pd-lid">
              <span className="pd-cam" aria-hidden="true" />
              <div className="pd-screen" id="pd-panel" role="tabpanel" aria-labelledby={`pd-tab-${modIdx}`}>
                {screens.map((s, i) => (seen.has(i) ? (
                  <img key={s.file} src={`/assets/product/${s.file}`} alt={s.on ? s.alt : ''} aria-hidden={!s.on} className={s.on ? 'on' : undefined} decoding="async" draggable="false" />
                ) : null))}
              </div>
            </div>
            <div className="pd-base" aria-hidden="true" />
          </div>

          <div className="pd-foot" aria-hidden="true">
            <span><b>{pad(active + 1)}</b> / {pad(screens.length)}</span>
            <span className="pd-track">
              <span className="pd-prog" key={v.prodTick} data-run={v.prodRunning} style={{ animationDuration: `${v.prodDelay}ms` }} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
