import React, { useEffect, useRef } from 'react';
import SmartLink from '../../components/SmartLink';
import { useDemoModal } from '../../components/DemoModal';
import architectureBackground from '../../images/operating-architecture-bg.webp';

// Section 05 — "The operating architecture": nine stage tabs over one content
// card. Stage data and state (active stage, auto-advance while visible, pinning
// on click) come from useHomeVals via `v.stages` / `v.active`.
const CSS = `
section.ax{position:relative;padding:92px 0;background:#F8FBFA;overflow:hidden}
.ax-bg{position:absolute;inset:0;pointer-events:none;background-size:cover;background-position:center;background-repeat:no-repeat}
.ax-in{position:relative;z-index:1;width:calc(100% - 9vw);max-width:var(--page-max);margin:0 auto}
.ax-label{display:flex;align-items:center;gap:11px;font-size:10.4px;font-weight:600;letter-spacing:.2em;color:#2F7A50}
.ax-label:before{content:"";width:34px;height:1.5px;background:#2F7A50}
.ax-h2{margin:14px 0 0;font-size:clamp(28px,2.85vw,44px);line-height:1.08;letter-spacing:-.022em;font-weight:400;color:#12324F}
.ax-h2 b{display:block;font-weight:600}
.ax-h2 .g{background:linear-gradient(90deg,#2A9460 0%,#14707A 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.ax-sub{margin:12px 0 0;max-width:520px;font-size:clamp(13.5px,.98vw,15.5px);line-height:1.62;color:#607789}
.ax-tabs{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));margin-top:34px;background:#fff;border:1px solid #DDE7EC;border-radius:12px;box-shadow:0 14px 34px -28px rgba(12,36,52,.3);overflow:hidden}
.ax-tab{position:relative;display:flex;align-items:center;justify-content:space-between;gap:6px;min-width:0;padding:16px 14px;background:#fff;border:0;cursor:pointer;font:inherit;text-align:left;color:#12324F;transition:background .25s ease,color .25s ease}
.ax-tab+.ax-tab{box-shadow:inset 1px 0 0 #E6EDF1}
.ax-tab:hover{background:#F4F9F8}
.ax-tab[aria-selected="true"]{background:#0A3742;color:#fff;box-shadow:none}
.ax-tn{display:block;font-size:10px;font-weight:600;letter-spacing:.12em;color:#8A9BA8}
.ax-tab[aria-selected="true"] .ax-tn{color:rgba(255,255,255,.7)}
.ax-tl{display:block;margin-top:5px;font-size:12.5px;font-weight:500;white-space:nowrap}
.ax-ti{flex:none;color:#3B5163;opacity:.85}
.ax-tab[aria-selected="true"] .ax-ti{color:#fff;opacity:1}
.ax-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);margin-top:14px;background:#fff;border:1px solid #DDE7EC;border-radius:16px;box-shadow:0 24px 50px -40px rgba(12,36,52,.35);overflow:hidden}
.ax-main{padding:36px 40px 34px;border-right:1px solid #E6EDF1}
.ax-side{padding:36px 40px 34px;background:#F7FBFA}
.ax-fade{animation:axIn .45s cubic-bezier(.2,.7,.2,1) both}
@keyframes axIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.ax-kick{font-size:11px;font-weight:700;letter-spacing:.16em;color:#14707A}
.ax-head{margin:16px 0 0;max-width:500px;font-size:clamp(20px,1.85vw,28px);line-height:1.18;letter-spacing:-.018em;font-weight:600;color:#12324F}
.ax-body{margin:14px 0 0;max-width:500px;font-size:13.5px;line-height:1.65;color:#607789}
.ax-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.ax-tags span{padding:7px 14px;border-radius:7px;background:#E8F5EF;color:#1E6B4A;font-size:12px;font-weight:500}
.ax-more{display:inline-flex;align-items:center;gap:12px;margin-top:24px;font-size:13.5px;font-weight:600;color:#14707A}
.ax-more:hover{color:#0A3742}
.ax-more i{width:36px;height:36px;border-radius:50%;background:#14707A;color:#fff;display:flex;align-items:center;justify-content:center}
.ax-wmf{font-size:10.5px;font-weight:600;letter-spacing:.2em;color:#647B8C}
.ax-list{list-style:none;margin:22px 0 0;padding:0;display:flex;flex-direction:column;gap:20px}
.ax-list li{display:flex;align-items:center;gap:18px}
.ax-hex{width:50px;height:50px;flex:none;border-radius:12px;display:flex;align-items:center;justify-content:center}
.ax-it{font-size:14px;font-weight:600;color:#12324F}
.ax-is{font-size:12.5px;line-height:1.5;color:#647B8C;margin-top:3px}
.ax-foot{display:flex;justify-content:flex-end;align-items:center;gap:18px;margin-top:22px}
.ax-arrow{width:44px;height:44px;border-radius:50%;background:#fff;border:1px solid #E3EBF0;box-shadow:0 10px 22px -14px rgba(12,36,52,.35);color:#12324F;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s ease}
.ax-arrow:hover{border-color:#14707A}
.ax-count{font-size:13px;font-weight:500;color:#647B8C;letter-spacing:.04em}
.ax-count b{color:#14707A;font-weight:600}
@media (max-width:1180px){
  .ax-tabs{display:flex;overflow-x:auto;scrollbar-width:thin}
  .ax-tab{flex:0 0 132px}
}
@media (max-width:900px){
  section.ax{padding:76px 0!important}
  .ax-in{width:calc(100% - 48px)}
  .ax-card{grid-template-columns:1fr}
  .ax-main{border-right:0;border-bottom:1px solid #E6EDF1}
  .ax-main,.ax-side{padding:26px 22px}
  .ax-foot{justify-content:center}
}
@media (prefers-reduced-motion:reduce){.ax-fade,.ax [data-rise]{animation:none!important;opacity:1!important;transform:none!important}}
`;

// Stroke icons on a 24px grid.
const PATHS = {
  capital: 'M3 9l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18',
  projects: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5',
  financing: 'M4 7h14.5a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5zM4 7l11-3v3M15.5 13.5h2',
  epc: 'M4 17a8 8 0 0 1 16 0zM12 9V5M9.5 5h5M2.5 17h19v2.5h-19z',
  procurement: 'M3 4h2.5l2.2 11h10.6L20.5 8H7M9.5 20a1 1 0 1 0 0-.01M17 20a1 1 0 1 0 0-.01',
  suppliers: 'M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5v3h-7M6.5 18.5a1.5 1.5 0 1 0 0-.01M17.5 18.5a1.5 1.5 0 1 0 0-.01',
  assets: 'M3 21V10l6 3.5V10l6 3.5V5h6v16zM3 21h18M17.5 9h1M17.5 13h1M17.5 17h1',
  portfolios: 'M12 3v9h9A9 9 0 1 1 12 3zM15 3.5A8 8 0 0 1 20.5 9H15z',
  intelligence: 'M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8zM6 15l.6 1.5L8 17l-1.4.5L6 19l-.6-1.5L4 17l1.4-.5z',
  hex: 'M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9zM12 9.2l2.6 1.5v3l-2.6 1.5-2.6-1.5v-3z',
  left: 'M19 12H5M11 6l-6 6 6 6',
  right: 'M5 12h14M13 6l6 6-6 6'
};
const Icon = ({ name, size = 22, width = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[name]} />
  </svg>
);
const TAB_ICONS = ['capital', 'projects', 'financing', 'epc', 'procurement', 'suppliers', 'assets', 'portfolios', 'intelligence'];
// Alternating soft tiles for the three "what moves forward" items.
const TILES = [{ bg: '#EAF2FB', c: '#2C6FB5' }, { bg: '#E8F5EF', c: '#14707A' }, { bg: '#EAF2FB', c: '#2C6FB5' }];

export default function Architecture({ v }) {
  const openDemo = useDemoModal();
  const stages = v.stages;
  const idx = Math.max(0, stages.findIndex((s) => s.fg === '#fff'));
  const a = v.active;
  const n = stages.length;
  const pad = (x) => String(x).padStart(2, '0');
  const step = (d) => stages[(idx + d + n) % n].onClick();
  const tabsRef = useRef(null);

  // Keep the active tab visible when the tab row scrolls (tablet/mobile).
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row && row.children[idx];
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' });
  }, [idx]);

  return (
    <section id="architecture" className="ax" aria-labelledby="ax-title">
      <style>{CSS}</style>
      <div className="ax-bg" style={{ backgroundImage: `url(${architectureBackground})` }} aria-hidden="true" />
      <div className="ax-in">
        <header data-rise="">
          <div className="ax-label">05 — THE OPERATING ARCHITECTURE</div>
          <h2 id="ax-title" className="ax-h2">
            Capital enters here.
            <b><span className="g">Certainty comes</span> out.</b>
          </h2>
          <p className="ax-sub">Select any stage to see what SeSova holds at that point in the flow.</p>
        </header>

        <div className="ax-tabs" ref={tabsRef} role="tablist" aria-label="Operating stages">
          {stages.map((s, i) => (
            <button key={s.n} type="button" role="tab" id={`ax-tab-${i}`} aria-selected={i === idx} aria-controls="ax-panel" className="ax-tab" onClick={s.onClick}>
              <span>
                <span className="ax-tn">{s.n}</span>
                <span className="ax-tl">{s.label}</span>
              </span>
              <span className="ax-ti"><Icon name={TAB_ICONS[i]} /></span>
            </button>
          ))}
        </div>

        <div className="ax-card" id="ax-panel" role="tabpanel" aria-labelledby={`ax-tab-${idx}`}>
          <div className="ax-main">
            <div className="ax-fade" key={'m' + idx}>
              <div className="ax-kick">{a.n} / {a.label.toUpperCase()}</div>
              <h3 className="ax-head">{a.head}</h3>
              <p className="ax-body">{a.body}</p>
              <div className="ax-tags">
                {a.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <SmartLink className="ax-more" href="/#demo" onClick={openDemo}>
                <i><Icon name="right" size={16} width={2.2} /></i>
                Learn More
              </SmartLink>
            </div>
          </div>
          <div className="ax-side">
            <div className="ax-fade" key={'s' + idx}>
              <div className="ax-wmf">WHAT MOVES FORWARD</div>
              <ul className="ax-list">
                {a.flow.map((f, i) => (
                  <li key={f.t}>
                    <span className="ax-hex" style={{ background: TILES[i].bg, color: TILES[i].c }}><Icon name="hex" size={24} width={1.7} /></span>
                    <div>
                      <div className="ax-it">{f.t}</div>
                      <div className="ax-is">{f.s}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="ax-foot">
          <button type="button" className="ax-arrow" onClick={() => step(-1)} aria-label="Previous stage"><Icon name="left" size={18} width={2} /></button>
          <span className="ax-count" aria-live="polite"><b>{pad(idx + 1)}</b> / {pad(n)}</span>
          <button type="button" className="ax-arrow" onClick={() => step(1)} aria-label="Next stage"><Icon name="right" size={18} width={2} /></button>
        </div>
      </div>
    </section>
  );
}
