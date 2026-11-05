import React from 'react';
import sectionBackground from '../../images/sesova-ecosystem-section-background.webp';

// Section 02 — "Why SeSova": disconnected tools on the left, the SeSova
// ecosystem on the right, then a strip of platform values.
// Sizing follows the Hero's compact scale and the shared --page-max content width.
const CSS = `
section.ws{position:relative;padding:92px 0;background:#FFFFFF;overflow:hidden}
.ws-bg{position:absolute;inset:0;pointer-events:none;background-size:cover;background-position:center;background-repeat:no-repeat}
.ws-bg:after{content:"";position:absolute;inset:0;background:rgba(255,255,255,.35)}
.ws-in{position:relative;z-index:1;width:calc(100% - 9vw);max-width:var(--page-max);margin:0 auto}
.ws-head{text-align:center}
.ws-label{display:inline-flex;align-items:center;gap:11px;font-size:10.4px;font-weight:600;letter-spacing:.2em;color:#12324F}
.ws-label:before{content:"";width:34px;height:1.5px;background:#14707A}
.ws-h2{margin:16px 0 0;font-size:clamp(26px,2.45vw,38px);line-height:1.12;letter-spacing:-.02em;font-weight:600;color:#12324F}
.ws-g{background:linear-gradient(90deg,#2A9460 0%,#14707A 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.ws-b{background:linear-gradient(90deg,#2C8FCF 0%,#2C6FB5 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.ws-sub{margin:14px auto 0;max-width:960px;font-size:clamp(13.5px,.98vw,15.5px);line-height:1.6;color:#647B8C}
.ws-panels{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:40px}
.ws-panel{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.95fr);gap:18px;align-items:center;padding:28px 28px 30px;background:rgba(255,255,255,.86);border:1px solid #DDE7EC;border-radius:18px;box-shadow:0 22px 50px -34px rgba(12,36,52,.22)}
.ws-badge{display:inline-block;padding:6px 12px;border-radius:999px;font-size:9.5px;font-weight:600;letter-spacing:.14em}
.ws-pt{margin:16px 0 0;font-size:clamp(20px,1.6vw,25px);line-height:1.15;letter-spacing:-.015em;font-weight:600;color:#12324F}
.ws-pd{margin:12px 0 0;font-size:12.5px;line-height:1.6;color:#647B8C}
.ws-list{list-style:none;margin:16px 0 0;padding:0;display:flex;flex-direction:column;gap:10px}
.ws-list li{display:flex;align-items:center;gap:10px;font-size:12.5px;line-height:1.35;color:#3B5163}
.ws-mark{width:17px;height:17px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center}
.ws-vis{position:relative;width:min(100%,300px);aspect-ratio:1;margin:0 auto;container-type:inline-size}
.ws-vis>svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.ws-pos{position:absolute;transform:translate(-50%,-50%)}
.ws-tool{width:19cqw;padding:2.6cqw 0 2cqw;border-radius:3.6cqw;background:#fff;border:1px solid #E3EBF0;box-shadow:0 10px 22px -16px rgba(12,36,52,.3);display:flex;flex-direction:column;align-items:center;gap:1.2cqw}
.ws-tool svg{width:8.4cqw;height:8.4cqw}
.ws-tool span{font-size:clamp(7.5px,3cqw,9.5px);font-weight:500;color:#647B8C;white-space:nowrap}
.ws-hub{width:34cqw;height:34cqw;border-radius:50%;background:#F3F6F8;border:1px solid #E3EBF0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.4cqw}
.ws-hub svg{width:11cqw;height:11cqw}
.ws-hub span{font-size:clamp(9px,4.2cqw,13px);font-weight:600;line-height:1.1;color:#12324F;text-align:center}
.ws-mod{width:22cqw;padding:2.8cqw 0 2.4cqw;border-radius:3.8cqw;background:rgba(255,255,255,.95);border:1px solid #DDE7EC;box-shadow:0 12px 24px -16px rgba(12,36,52,.28);display:flex;flex-direction:column;align-items:center;gap:1.4cqw}
.ws-mod svg{width:9cqw;height:9cqw}
.ws-mod span{font-size:clamp(7.5px,3.3cqw,10.5px);font-weight:600;color:#12324F;white-space:nowrap}
.ws-core{width:20cqw;aspect-ratio:429/480}
.ws-core img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 12px 18px rgba(12,36,52,.16))}
.ws-core-w{font-size:clamp(12px,6.4cqw,20px);font-weight:600;color:#12324F;text-align:center;line-height:1;white-space:nowrap}
.ws-core-l{font-size:clamp(7px,2.7cqw,9px);font-weight:600;letter-spacing:.06em;color:#12324F;text-align:center;white-space:nowrap;margin-top:1.4cqw}
.ws-arrow{position:absolute;left:50%;top:50%;z-index:2;transform:translate(-50%,-50%);width:58px;height:58px;border-radius:50%;background:#fff;border:1px solid #DDE7EC;box-shadow:0 14px 30px -16px rgba(12,36,52,.3);display:flex;align-items:center;justify-content:center;color:#12324F}
.ws-values{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));margin-top:28px;padding:22px 26px;background:rgba(255,255,255,.88);border:1px solid #DDE7EC;border-radius:18px;box-shadow:0 22px 50px -38px rgba(12,36,52,.2)}
.ws-v{display:flex;align-items:center;gap:14px;padding:0 18px}
.ws-v:first-child{padding-left:0}
.ws-v+.ws-v{border-left:1px solid #DDE7EC}
.ws-vi{width:48px;height:48px;flex:none;border-radius:50%;background:#EAF6F1;display:flex;align-items:center;justify-content:center;color:#0A3742}
.ws-vt{font-size:13.5px;font-weight:600;color:#12324F}
.ws-vs{font-size:12px;color:#647B8C;margin-top:3px}
.ws-dash{stroke-dasharray:2.4 2.2}
@keyframes wsFlow{to{stroke-dashoffset:-18}}
.ws-flow{stroke-dasharray:1.4 2.4;animation:wsFlow 3s linear infinite}
@media (max-width:1300px){
  .ws-panel{grid-template-columns:1fr;gap:22px}
  .ws-vis{width:min(100%,300px)}
}
@media (max-width:1100px){
  .ws-values{grid-template-columns:repeat(3,minmax(0,1fr));row-gap:20px}
  .ws-v:nth-child(4){padding-left:0;border-left:0}
}
@media (max-width:900px){
  section.ws{padding:76px 0!important}
  .ws-in{width:calc(100% - 48px)}
  .ws-panels{grid-template-columns:1fr;gap:18px}
  .ws-arrow{position:static;margin:0 auto;transform:rotate(90deg)}
  .ws-values{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ws-v:nth-child(4){padding-left:18px;border-left:1px solid #DDE7EC}
  .ws-v:nth-child(odd){padding-left:0;border-left:0}
}
@media (max-width:560px){
  .ws-panel{padding:22px 18px}
  .ws-values{grid-template-columns:1fr;padding:18px}
  .ws-v{padding:0!important;border-left:0!important}
  .ws-sub br{display:none}
}
@media (prefers-reduced-motion:reduce){.ws [data-rise],.ws-flow{animation:none!important;opacity:1!important;transform:none}}
`;

// Stroke icons on a 24px grid; colour comes from `currentColor`.
const PATHS = {
  building: 'M5 21V4h9v17M14 9h5v12M3 21h18M8 7.5h3M8 11h3M8 14.5h3M16.5 12.5h.01M16.5 16h.01',
  sheet: 'M4 4h16v16H4zM4 9.3h16M4 14.7h16M9.5 4v16',
  mail: 'M3.5 6h17v12h-17zM3.5 6.5l8.5 6.5 8.5-6.5',
  chat: 'M4 5h16v10H9l-5 4zM8.5 9h7M8.5 12h4.5',
  folder: 'M3.5 6.5h6l2 2h9v10h-17z',
  doc: 'M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 15.5h7',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.5a3.3 3.3 0 0 1 0 6.4M18 14.2c2.1.6 3.5 2.6 3.5 5.8',
  megaphone: 'M4 10v4h3l7 4V6L7 10zM17 9.5a3.5 3.5 0 0 1 0 5M7 14l1.5 5',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13.5l1.6 1.2-2 3.4-1.9-.7a7 7 0 0 1-2 1.2l-.3 2h-4l-.3-2a7 7 0 0 1-2-1.2l-1.9.7-2-3.4 1.6-1.2a7 7 0 0 1 0-3L2.9 9.3l2-3.4 1.9.7a7 7 0 0 1 2-1.2l.3-2h4l.3 2a7 7 0 0 1 2 1.2l1.9-.7 2 3.4-1.6 1.2a7 7 0 0 1 0 3z',
  bars: 'M5 20V12M10 20V6M15 20v-9M20 20V9M3 20.5h18',
  database: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z',
  shield: 'M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6zM9 12l2.2 2.2L15.5 10',
  leaf: 'M20 4C10.5 3.5 4.5 8 4.5 14.5c0 1.8.5 3.3 1.4 4.6M20 4c.8 10.5-2.6 16-8.6 16-1.6 0-3-.4-4.1-1.1M5.9 19.1C8 14.5 11.5 11 16 9',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
  x: 'M8.5 8.5l7 7M15.5 8.5l-7 7',
  check: 'M7.5 12.3l3 3 6-6.3',
  arrow: 'M5 12h14M13 6l6 6-6 6'
};
const Icon = ({ name, size = 24, width = 1.8, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[name]} />
  </svg>
);

const CHALLENGES = [
  'Data scattered across multiple platforms',
  'Manual and repetitive processes',
  'Poor visibility and slower decision making',
  'Higher costs and lower productivity',
  'Limited collaboration across teams'
];
const BENEFITS = [
  'Unified data across all business functions',
  'Automated and streamlined processes',
  'Real-time visibility and better decisions',
  'Higher efficiency and lower operational costs',
  'Seamless collaboration across teams'
];

// Separate tools around "Your Business" (percent positions in the visual box),
// deliberately a little irregular so they read as unconnected.
const TOOLS = [
  { label: 'Spreadsheets', icon: 'sheet', c: '#3B8B5E', x: 25, y: 20 },
  { label: 'Email', icon: 'mail', c: '#C2554A', x: 58, y: 11 },
  { label: 'Team Chat', icon: 'chat', c: '#7E5AA6', x: 86, y: 30 },
  { label: 'Files', icon: 'folder', c: '#2C6FB5', x: 86, y: 67 },
  { label: 'Notes & Docs', icon: 'doc', c: '#3B5163', x: 58, y: 89 },
  { label: 'CRM', icon: 'users', c: '#2C8FCF', x: 22, y: 80 },
  { label: 'Marketing', icon: 'megaphone', c: '#C97A2B', x: 11, y: 49 }
];

// SeSova's connected capabilities, evenly placed on the ring (radius 38%).
const MODULES = [
  { label: 'People', icon: 'users' },
  { label: 'Processes', icon: 'gear' },
  { label: 'Insights', icon: 'bars' },
  { label: 'Data', icon: 'database' },
  { label: 'Applications', icon: 'bulb' }
].map((m, i) => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return { ...m, x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) };
});

const VALUES = [
  { t: 'Secure', s: 'Built for trust', icon: 'shield' },
  { t: 'Scalable', s: 'Grows with you', icon: 'bars' },
  { t: 'Flexible', s: 'Adapts to your needs', icon: 'users' },
  { t: 'Innovative', s: 'Powered by automation', icon: 'leaf' },
  { t: 'Industry Ready', s: 'Works across industries', icon: 'globe' }
];

export default function Ecosystem() {
  return (
    <section className="ws" id="ecosystem" aria-labelledby="ws-title">
      <style>{CSS}</style>
      <div className="ws-bg" style={{ backgroundImage: `url(${sectionBackground})` }} aria-hidden="true" />

      <div className="ws-in">
        <header className="ws-head" data-rise="">
          <div className="ws-label">WHY SESOVA</div>
          <h2 id="ws-title" className="ws-h2">
            From Disconnected Tools to a <span className="ws-g">Connected</span> <span className="ws-b">Ecosystem.</span>
          </h2>
          <p className="ws-sub">
            Most businesses use multiple tools, scattered data and manual processes.{" "}
            <br />
            SeSova brings everything together in one connected ecosystem, so you can work smarter, faster and grow with confidence.
          </p>
        </header>

        <div className="ws-panels">
          {/* The challenge */}
          <article className="ws-panel" data-rise="">
            <div>
              <span className="ws-badge" style={{ background: "#FCECEA", color: "#B8473C" }}>THE CHALLENGE</span>
              <h3 className="ws-pt">Disconnected Tools.<br />Limited Growth.</h3>
              <p className="ws-pd">Different tools, different data, different teams. It creates silos, slows you down and makes it harder to grow.</p>
              <ul className="ws-list">
                {CHALLENGES.map((t) => (
                  <li key={t}>
                    <span className="ws-mark" style={{ background: "#E4655A" }}><Icon name="x" size={11} width={2.6} color="#fff" /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ws-vis" role="img" aria-label="A business surrounded by separate, unconnected tools">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <g fill="none" stroke="#C5D2DA" strokeWidth=".45" className="ws-dash">
                  <path d="M31 16C40 9 49 8 52 9" />
                  <path d="M65 10C74 13 80 19 83 24" />
                  <path d="M89 37C93 46 92 55 89 60" />
                  <path d="M82 74C76 83 70 87 65 88" />
                  <path d="M50 92C40 92 32 89 28 85" />
                  <path d="M16 74C11 67 9 60 9 55" />
                  <path d="M10 42C12 33 16 27 20 24" />
                  <path d="M30 26L38 35M60 17L56 30M80 34L68 42M80 64L68 58M55 83L53 70M27 74L37 64M17 49L31 50" />
                </g>
                <g fill="#9FB2BE">
                  <circle cx="52" cy="9" r=".9" /><circle cx="83" cy="24" r=".9" /><circle cx="89" cy="60" r=".9" />
                  <circle cx="28" cy="85" r=".9" /><circle cx="38" cy="35" r=".9" /><circle cx="68" cy="58" r=".9" />
                </g>
              </svg>
              <div className="ws-pos" style={{ left: "50%", top: "50%" }}>
                <div className="ws-hub">
                  <Icon name="building" color="#3B5163" width={1.6} />
                  <span>Your<br />Business</span>
                </div>
              </div>
              {TOOLS.map((t) => (
                <div className="ws-pos" key={t.label} style={{ left: t.x + "%", top: t.y + "%" }}>
                  <div className="ws-tool">
                    <Icon name={t.icon} color={t.c} />
                    <span>{t.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="ws-arrow" aria-hidden="true"><Icon name="arrow" size={22} width={2} /></div>

          {/* The SeSova way */}
          <article className="ws-panel" data-rise="" style={{ animationDelay: ".1s" }}>
            <div>
              <span className="ws-badge" style={{ background: "#EAF6F1", color: "#2F7A50" }}>THE SESOVA WAY</span>
              <h3 className="ws-pt">One Ecosystem.<br /><span className="ws-g">Greater Possibilities.</span></h3>
              <p className="ws-pd">SeSova connects your people, processes, data and applications in a single ecosystem so your business can move forward.</p>
              <ul className="ws-list">
                {BENEFITS.map((t) => (
                  <li key={t}>
                    <span className="ws-mark" style={{ background: "#4E9E6A" }}><Icon name="check" size={12} width={2.6} color="#fff" /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ws-vis" role="img" aria-label="SeSova at the centre, connecting people, processes, insights, data and applications">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#14707A" strokeWidth=".45" strokeOpacity=".45" strokeDasharray="1.2 1.8" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="#14707A" strokeWidth=".35" strokeOpacity=".3" strokeDasharray="1 1.6" />
                {MODULES.map((m) => (
                  <line key={m.label} x1="50" y1="50" x2={m.x} y2={m.y} stroke="#2C6FB5" strokeWidth=".35" strokeOpacity=".35" className="ws-flow" />
                ))}
                {[18, 90, 162, 234, 306].map((d) => {
                  const a = (d * Math.PI) / 180;
                  return <circle key={d} cx={50 + 38 * Math.cos(a)} cy={50 + 38 * Math.sin(a)} r="1" fill="#14707A" />;
                })}
                {[54, 126, 198, 270, 342].map((d) => {
                  const a = (d * Math.PI) / 180;
                  return <circle key={d} cx={50 + 25 * Math.cos(a)} cy={50 + 25 * Math.sin(a)} r=".7" fill="#2C6FB5" opacity=".7" />;
                })}
              </svg>
              <div className="ws-pos" style={{ left: "50%", top: "50%" }}>
                <div className="ws-core" style={{ margin: "0 auto" }}>
                  <img src="/assets/logo.webp" alt="SeSova logo" />
                </div>
                <div className="ws-core-w" style={{ marginTop: "2cqw" }}>
                  Se<span style={{ color: "#4E9E6A" }}>S</span>ova
                </div>
                <div className="ws-core-l">ONE CONNECTED ECOSYSTEM</div>
              </div>
              {MODULES.map((m) => (
                <div className="ws-pos" key={m.label} style={{ left: m.x + "%", top: m.y + "%" }}>
                  <div className="ws-mod">
                    <Icon name={m.icon} color="#14707A" width={1.9} />
                    <span>{m.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="ws-values" data-rise="">
          {VALUES.map((v) => (
            <div className="ws-v" key={v.t}>
              <span className="ws-vi"><Icon name={v.icon} size={22} /></span>
              <div>
                <div className="ws-vt">{v.t}</div>
                <div className="ws-vs">{v.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
