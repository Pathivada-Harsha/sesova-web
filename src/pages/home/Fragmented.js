import React from 'react';
import connectedImage from '../../images/section-03-renewable-energy-city.webp';
import useScrollZoom from '../../hooks/useScrollZoom';

// Section 03 — "The challenge": five separate systems on the left run through
// SeSova in the centre to four connected results on the right. White canvas;
// sizing follows the Hero's compact scale and the shared --page-max content width.
const CSS = `
section.fx{position:relative;padding:92px 0;background:#FFFFFF}
.fx-in{width:calc(100% - 9vw);max-width:var(--page-max);margin:0 auto;display:grid;grid-template-columns:minmax(0,1.05fr) 150px minmax(0,1fr);grid-template-areas:"head head img" "left mid right";column-gap:0;row-gap:26px}
.fx-head{grid-area:head;padding-right:48px}
.fx-label{display:flex;align-items:center;gap:11px;font-size:10.4px;font-weight:600;letter-spacing:.2em;color:#2F7A50}
.fx-label:before{content:"";width:34px;height:1.5px;background:#2F7A50}
.fx-h2{margin:14px 0 0;font-size:clamp(28px,2.85vw,44px);line-height:1.08;letter-spacing:-.022em;font-weight:600;color:#12324F}
.fx-h2 .g{display:block;background:linear-gradient(90deg,#2A9460 0%,#14707A 55%,#2C6FB5 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.fx-p{margin:16px 0 0;max-width:600px;font-size:clamp(13.5px,.98vw,15.5px);line-height:1.62;color:#607789}
/* The image borrows space from the section's top padding and the row gap below,
   so it can be taller than the header text without pushing the cards down much. */
.fx-img{position:relative;grid-area:img;align-self:stretch;margin:-76px 0 -20px;min-height:420px;overflow:hidden}
.fx-img img{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:contain;object-position:right center}
.fx-left,.fx-right{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.fx-left{grid-area:left;grid-template-rows:repeat(5,1fr)}
.fx-right{grid-area:right;grid-template-rows:repeat(4,1fr);gap:12px}
.fx-card{display:flex;align-items:center;gap:14px;min-height:64px;padding:12px 16px;background:#fff;border:1px solid #DDE7EC;border-radius:12px;box-shadow:0 10px 26px -22px rgba(12,36,52,.35)}
.fx-ic{width:40px;height:40px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center}
.fx-t{font-size:13.5px;font-weight:600;color:#12324F;line-height:1.25}
.fx-d{font-size:12px;color:#647B8C;line-height:1.45;margin-top:3px}
.fx-sep{margin-left:auto;flex:none;padding:6px 11px;border-radius:999px;background:#FFF4F3;color:#D86B68;font-size:9px;font-weight:600;letter-spacing:.12em}
.fx-res{position:relative;padding:14px 18px 14px 20px;overflow:hidden}
.fx-res:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--acc)}
.fx-res .fx-ic{width:44px;height:44px}
.fx-res .fx-t{font-size:14px}
.fx-res .fx-d{font-size:12.5px}
.fx-mid{grid-area:mid;position:relative}
.fx-mid>svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.fx-dot{position:absolute;width:7px;height:7px;border-radius:50%;transform:translate(-50%,-50%)}
.fx-core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;text-align:center}
.fx-hex{width:78px;height:78px;border-radius:50%;background:#fff;border:1px solid #DDE7EC;box-shadow:0 0 0 7px rgba(234,246,241,.8),0 16px 30px -18px rgba(12,36,52,.35);display:flex;align-items:center;justify-content:center}
.fx-hex img{width:44px;height:49px;object-fit:contain;display:block}
.fx-cw{margin-top:12px;font-size:17px;font-weight:600;color:#12324F;line-height:1}
.fx-cl{margin-top:6px;font-size:8.5px;font-weight:600;letter-spacing:.2em;color:#14707A;white-space:nowrap}
@media (max-width:1100px){
  .fx-in{grid-template-columns:minmax(0,1fr) 110px minmax(0,1fr)}
  .fx-img{margin:-40px 0 0;min-height:320px}
  .fx-sep{display:none}
  .fx-hex{width:66px;height:66px}
  .fx-hex img{width:38px;height:42px}
}
@media (max-width:900px){
  section.fx{padding:76px 0!important}
  .fx-in{width:calc(100% - 48px);grid-template-columns:1fr;grid-template-areas:"head" "left" "mid" "img" "right";row-gap:22px}
  .fx-img{aspect-ratio:1528/1029;min-height:0;margin:0 auto;width:100%;max-width:560px}
  .fx-img img{object-position:center}
  .fx-left,.fx-right{grid-template-rows:none}
  .fx-head{padding-right:0}
  .fx-sep{display:block}
  .fx-mid{height:170px}
  .fx-mid>svg,.fx-dot{display:none}
  .fx-mid:before,.fx-mid:after{content:"";position:absolute;left:50%;width:0;border-left:1.5px dashed rgba(20,112,122,.45)}
  .fx-mid:before{top:0;height:22px}
  .fx-mid:after{bottom:0;height:22px}
}
@media (max-width:560px){
  .fx-in{width:calc(100% - 40px)}
  .fx-card{align-items:flex-start}
  .fx-sep{display:none}
}
@media (prefers-reduced-motion:reduce){.fx [data-rise]{animation:none!important;opacity:1!important;transform:none}}
`;

// Stroke icons on a 24px grid.
const PATHS = {
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.5a3.3 3.3 0 0 1 0 6.4M18 14.2c2.1.6 3.5 2.6 3.5 5.8',
  wallet: 'M4 7h14.5a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5zM4 7l11-3v3M15.5 13.5h2',
  layers: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5',
  cart: 'M3 4h2.5l2.2 11h10.6L20.5 8H7M9.5 20a1 1 0 1 0 0-.01M17 20a1 1 0 1 0 0-.01',
  doc: 'M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 15.5h7',
  docCheck: 'M6 3h9l4 4v14H6zM15 3v4h4M9 14l2.2 2.2L16 11.5',
  sync: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v5.5c0 1.7 3.6 3 8 3M20 6v4M4 11.5V17c0 1.7 3.6 3 8 3M16 13.5a3.5 3.5 0 0 1 5.5 1.5M21.5 19a3.5 3.5 0 0 1-5.5 1.5M21.5 12.5V15H19M16 23v-2.5h2.5',
  shield: 'M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6zM9 12l2.2 2.2L15.5 10',
  chart: 'M5 20V13M10 20V8M15 20v-5M20 20V5M3 20.5h18'
};
const Icon = ({ name, color, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[name]} />
  </svg>
);

const SYSTEMS = [
  { t: 'CRM & Customer Data', d: 'Customer information lives across different tools.', icon: 'users', c: '#2C6FB5', bg: '#F2F7FC' },
  { t: 'Finance Systems', d: 'Financial data, billing and payments remain fragmented.', icon: 'wallet', c: '#2F7A50', bg: '#EAF6F1' },
  { t: 'Project Systems', d: 'Projects, tasks and execution are tracked independently.', icon: 'layers', c: '#2C6FB5', bg: '#F2F7FC' },
  { t: 'Procurement Systems', d: 'Vendors, purchasing and orders use separate workflows.', icon: 'cart', c: '#14707A', bg: '#EAF6F1' },
  { t: 'Documents & Data', d: 'Important documents and business information are stored across different locations.', icon: 'doc', c: '#2C6FB5', bg: '#F2F7FC' }
];

const RESULTS = [
  { t: 'One record per business', d: 'Customer, operations and business information reference the same connected record.', icon: 'docCheck', acc: '#2C6FB5', c: '#2C6FB5', bg: '#F2F7FC' },
  { t: 'One version of the truth', d: 'Information is connected instead of repeatedly copied between systems.', icon: 'sync', acc: '#14707A', c: '#14707A', bg: '#EAF6F1' },
  { t: 'One place for evidence', d: 'Documents, approvals and important business information stay connected to the workflow where they belong.', icon: 'shield', acc: '#4E9E6A', c: '#2F7A50', bg: '#EAF6F1' },
  { t: 'One view of the business', d: 'Leadership gets a connected view instead of assembling information manually from different systems.', icon: 'chart', acc: '#2C6FB5', c: '#2C6FB5', bg: '#F2F7FC' }
];

// Card centres as a percentage of each list's height (lists stretch to the same row).
const leftY = SYSTEMS.map((_, i) => ((i + 0.5) / SYSTEMS.length) * 100);
const rightY = RESULTS.map((_, i) => ((i + 0.5) / RESULTS.length) * 100);

export default function Fragmented() {
  // Scroll-scrubbed zoom reveal on the city image (see useScrollZoom).
  const zoom = useScrollZoom();

  return (
    <section className="fx" aria-labelledby="fx-title">
      <style>{CSS}</style>
      <div className="fx-in">
        <header className="fx-head" data-rise="">
          <div className="fx-label">03 — THE CHALLENGE</div>
          <h2 id="fx-title" className="fx-h2">
            Your business is connected.
            <span className="g">Your systems should be too.</span>
          </h2>
          <p className="fx-p">
            Businesses rely on different applications, teams and data sources every day. When those systems operate separately, information gets fragmented, workflows slow down and teams spend time connecting the dots.
          </p>
          <p className="fx-p" style={{ marginTop: "10px" }}>
            SeSova brings those digital experiences together so applications, workflows and information can work as one connected ecosystem.
          </p>
        </header>

        <figure className="fx-img" data-rise="" ref={zoom}>
          <img src={connectedImage} alt="Connected technology ecosystem and modern business infrastructure" />
        </figure>

        <ul className="fx-left" aria-label="Separate business systems">
          {SYSTEMS.map((s, i) => (
            <li key={s.t} className="fx-card" data-rise="" style={{ animationDelay: i * 0.05 + 's' }}>
              <span className="fx-ic" style={{ background: s.bg }}><Icon name={s.icon} color={s.c} /></span>
              <div>
                <div className="fx-t">{s.t}</div>
                <div className="fx-d">{s.d}</div>
              </div>
              <span className="fx-sep">SEPARATE</span>
            </li>
          ))}
        </ul>

        {/* Many systems flow into SeSova and out as connected results */}
        <div className="fx-mid" aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            {leftY.map((y, i) => (
              <path key={'l' + i} d={`M6 ${y}C28 ${y} 18 50 34 50`} fill="none" stroke="#2C6FB5" strokeOpacity=".4" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            ))}
            {rightY.map((y, i) => (
              <path key={'r' + i} d={`M66 50C82 50 72 ${y} 94 ${y}`} fill="none" stroke="#4E9E6A" strokeOpacity=".5" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          {leftY.map((y, i) => (
            <span key={'dl' + i} className="fx-dot" style={{ left: "6%", top: y + "%", background: "#2C6FB5" }} />
          ))}
          {rightY.map((y, i) => (
            <span key={'dr' + i} className="fx-dot" style={{ left: "94%", top: y + "%", background: "#4E9E6A" }} />
          ))}
          <div className="fx-core">
            <span className="fx-hex"><img src="/assets/logo.webp" alt="" /></span>
            <div className="fx-cw">Se<span style={{ color: "#4E9E6A" }}>S</span>ova</div>
            <div className="fx-cl">ONE RECORD</div>
          </div>
        </div>

        <ul className="fx-right" aria-label="What connecting the systems delivers">
          {RESULTS.map((r, i) => (
            <li key={r.t} className="fx-card fx-res" data-rise="" style={{ '--acc': r.acc, animationDelay: i * 0.06 + 's' }}>
              <span className="fx-ic" style={{ background: r.bg }}><Icon name={r.icon} color={r.c} size={21} /></span>
              <div>
                <div className="fx-t">{r.t}</div>
                <div className="fx-d">{r.d}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
