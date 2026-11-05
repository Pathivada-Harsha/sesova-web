import React, { lazy } from 'react';
import SmartLink from '../../components/SmartLink';
import { useDemoModal } from '../../components/DemoModal';
import heroBackground from '../../images/sesova-tech-ecosystem-hero-background.webp';
import LazyAccent3D from '../../three/LazyAccent3D';
import useScrollZoom from '../../hooks/useScrollZoom';

// Loaded as its own chunk; three.js never reaches the main bundle.
const HeroDots = lazy(() => import('../../three/scenes/DriftingDots'));

// Hero: "One Ecosystem. Multiple Digital Solutions." on the left, SeSova at the
// centre of its six digital services on the right, over the technology-city
// background. The section slides up under the sticky header (74px desktop /
// 86px mobile) so the background runs behind the floating nav bar.
const HERO_CSS = `
section.hx{position:relative;margin-top:-74px;min-height:max(648px,100vh);overflow:hidden;padding:0!important;background:#F6FAFA}
.hx-bgimg{position:absolute;inset:0;pointer-events:none;background-size:cover;background-position:right bottom;background-repeat:no-repeat}
.hx-3d{position:absolute;inset:0;pointer-events:none}
.hx-wash{position:absolute;inset:0;pointer-events:none;background:
  linear-gradient(180deg,rgba(252,251,248,0) 84%,#FCFBF8 100%),
  radial-gradient(ellipse 40% 56% at 76% 36%,rgba(246,250,250,.86) 0%,rgba(246,250,250,.72) 50%,rgba(246,250,250,0) 100%),
  radial-gradient(ellipse 16% 40% at 93% 28%,rgba(244,249,251,.88) 0%,rgba(244,249,251,.6) 55%,rgba(244,249,251,0) 100%),
  linear-gradient(90deg,rgba(247,251,250,.95) 0%,rgba(247,251,250,.9) 36%,rgba(247,251,250,.6) 49%,rgba(247,251,250,0) 64%)}
.hx-in{position:relative;z-index:2;width:calc(100% - 9vw);max-width:var(--page-max);margin:0 auto;padding:clamp(118px,17.5vh,160px) 0 90px;display:grid;grid-template-columns:minmax(0,48fr) minmax(0,52fr)}
.hx-eyebrow{display:flex;align-items:center;gap:10.8px;font-size:10.4px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#2F7A50}
.hx-eyebrow:before{content:"";width:25px;height:1.5px;background:#2F7A50}
.hx-h1{margin:14px 0 0;font-size:clamp(34px,3.15vw,48px);line-height:1.04;letter-spacing:-.025em;font-weight:500;color:#12324F}
.hx-h1 .l2{display:block;font-weight:600;white-space:nowrap}
.hx-grad-g{background:linear-gradient(90deg,#2A9460 0%,#136B6B 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.hx-grad-b{background:linear-gradient(90deg,#2C8FCF 0%,#2C6FB5 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.hx-lede{margin:16px 0 0;max-width:540px;font-size:clamp(14px,1vw,16px);line-height:1.62;font-weight:400;color:#5B7183}
.hx-ctas{display:flex;flex-wrap:wrap;gap:14px;margin-top:22px}
.hx-btn{display:flex;align-items:center;justify-content:center;gap:10px;height:45px;min-width:180px;padding:0 23px;border-radius:5.4px;font-size:13.5px;font-weight:600;white-space:nowrap;transition:background .25s ease,border-color .25s ease,color .25s ease}
.hx-strip{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));margin-top:30px;max-width:640px}
.hx-si{display:flex;align-items:center;gap:8px;padding:0 10px}
.hx-si:first-child{padding-left:0}
.hx-si+.hx-si{border-left:1px solid rgba(12,36,52,.12)}
.hx-tile{width:26px;height:26px;flex:none;display:flex;align-items:center;justify-content:center}
.hx-sk{font-size:10px;font-weight:600;letter-spacing:.05em;color:#12324F}
.hx-sv{font-size:10.5px;font-weight:400;color:#5B7183;margin-top:2px;line-height:1.3}
.hx-rule{height:1px;background:rgba(12,36,52,.12);margin-top:24px;max-width:600px}
.hx-metrics{display:flex;margin-top:19px}
.hx-m{padding:0 clamp(16px,2vw,28px)}
.hx-m:first-child{padding-left:0}
.hx-m+.hx-m{border-left:1px solid rgba(12,36,52,.12)}
.hx-mv{font-size:clamp(20px,1.55vw,23.4px);font-weight:600;letter-spacing:-.02em;line-height:1.1;white-space:nowrap}
.hx-ml{font-size:clamp(10.8px,.78vw,11.7px);font-weight:400;color:#5B7183;margin-top:5px;white-space:nowrap}
.hx-viz{position:relative;margin:calc(clamp(88px,13vh,125px) - clamp(118px,17.5vh,160px)) 0 0}
.hx-dia{position:relative;width:min(100%,clamp(360px,calc(100vh - 290px),560px));aspect-ratio:1;margin:0 auto;container-type:inline-size}
.hx-dia>svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.hx-pos{position:absolute;transform:translate(-50%,-50%)}
/* Service circles pop in each time the diagram scrolls into view (.inview via useReveal). */
.hx-dia.inview .hx-svc{animation:hPop .8s cubic-bezier(.16,.84,.3,1) both}
.hx-svc{width:24cqw;height:24cqw;border-radius:50%;padding:0 2cqw;background:rgba(255,255,255,.92);border:1px solid rgba(20,112,122,.12);box-shadow:0 0 0 1.2cqw rgba(134,199,154,.08),0 16px 34px -20px rgba(12,36,52,.32);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;opacity:0}
.hx-si2{width:7.2cqw;height:7.2cqw;display:flex;align-items:center;justify-content:center}
.hx-si2 svg{width:100%;height:100%}
.hx-st{font-size:clamp(8px,2.2cqw,12.5px);font-weight:600;line-height:1.2;color:#12324F;margin-top:1.1cqw}
.hx-sd{font-size:clamp(7px,1.65cqw,9.5px);font-weight:400;line-height:1.3;color:#5B7183;margin-top:.6cqw}
.hx-core{width:15.5cqw;aspect-ratio:429/480}
.hx-core img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 16px 24px rgba(12,36,52,.2))}
.hx-core-w{font-size:clamp(12px,4cqw,23px);font-weight:600;letter-spacing:-.01em;color:#12324F;white-space:nowrap;text-align:center;line-height:1}
.hx-core-l{font-size:clamp(6px,1.4cqw,8.5px);font-weight:600;letter-spacing:.14em;color:#14505E;white-space:nowrap;text-align:center;margin-top:.9cqw}
.hx-spin{transform-origin:310px 310px;animation:hxSpin 90s linear infinite}
.hx-dot{transform-box:fill-box;transform-origin:center;animation:breathe 5s ease-in-out infinite}
@keyframes hxSpin{to{transform:rotate(360deg)}}
.hx-note{position:absolute;top:118px;right:2.2%;z-index:2;transform:rotate(-20deg);transform-origin:center;font-family:'Segoe Script','Bradley Hand','Snell Roundhand','Brush Script MT',cursive;line-height:1.2;pointer-events:none;text-align:left}
.hx-note .a{font-size:19px;color:#3B5163}
.hx-note .b{font-size:24px;font-weight:700;color:#2F8F5B;margin-top:4px;margin-left:18px;position:relative;white-space:nowrap}
.hx-note svg{position:absolute;left:0;bottom:-11px;width:100%}
.hx-card{position:absolute;right:max(4.5vw,calc((100% - var(--page-max)) / 2));bottom:72px;z-index:3;display:flex;align-items:center;gap:13px;padding:13px 20px;background:rgba(255,255,255,.92);border:1px solid rgba(20,112,122,.12);border-radius:14px;box-shadow:0 18px 36px -22px rgba(12,36,52,.32);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.hx-card-t{font-size:10.8px;font-weight:600;letter-spacing:.08em;line-height:1.45;color:#145F66}
.hx-scroll{position:absolute;left:50%;bottom:12px;z-index:3;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:7px;color:#3B5163}
.hx-scroll span{font-size:9.5px;font-weight:500;letter-spacing:.2em;white-space:nowrap}
@keyframes hxWheel{0%{transform:translateY(0);opacity:1}70%{transform:translateY(5px);opacity:0}100%{opacity:0}}
.hx-wheel{animation:hxWheel 1.8s ease-in-out infinite}
@media (max-width:1260px){.hx-note{display:none}}
@media (max-width:1062px){
  section.hx{min-height:0}
  .hx-in{grid-template-columns:1fr;padding:135px 0 200px}
  .hx-card{right:24px;bottom:110px}
  .hx-viz{margin:44px 0 0}
  .hx-dia{width:min(520px,100%)}
  .hx-bgimg{opacity:.6;background-position:72% bottom}
  .hx-wash{background:linear-gradient(180deg,rgba(247,251,250,.94) 0%,rgba(247,251,250,.86) 45%,rgba(247,251,250,.5) 75%,rgba(252,251,248,.9) 100%)}
  .hx-scroll{background:rgba(255,255,255,.88);padding:9px 20px 7px;border-radius:16px}
}
@media (max-width:900px){
  section.hx{margin-top:-86px}
  .hx-in{width:calc(100% - 48px);padding:124px 0 200px}
  .hx-strip{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:16px}
  .hx-si:nth-child(odd){padding-left:0;border-left:0}
  .hx-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));row-gap:21px}
  .hx-m:nth-child(3){padding-left:0;border-left:0}
  .hx-h1 .l2{white-space:normal}
  .hx-sk{font-size:11px}
  .hx-sv{font-size:12px}
}
@media (max-width:560px){
  .hx-h1{font-size:36px}
  .hx-ctas{gap:11px}
  .hx-btn{width:100%}
  .hx-sd{display:none}
  .hx-st{font-size:8.5px}
  .hx-card{left:24px;right:24px;justify-content:center}
}
@media (prefers-reduced-motion:reduce){.hx-spin,.hx-dot,.hx-svc,.hx-wheel,.hx [data-float],.hx [data-pulse]{animation:none!important;opacity:1!important}}
`;

const G = 'url(#hxIconGrad)';

// Inline icons (24x24), filled with the shared green-to-teal gradient.
const ICONS = {
  apps: (
    <>
      <path d="M5 20V11h3.2v9zM10.4 20V6h3.2v14zM15.8 20v-6H19v6z" fill={G} />
      <path d="M3 20.6h18v1.6H3z" fill={G} opacity=".7" />
    </>
  ),
  cloud: (
    <path d="M7 19a4.6 4.6 0 0 1-.7-9.15A6.2 6.2 0 0 1 18 8.9 5.1 5.1 0 0 1 17.6 19z" fill="none" stroke="url(#hxIconBlue)" strokeWidth="2.2" strokeLinejoin="round" />
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.8" rx="8" ry="3.2" fill={G} opacity=".7" />
      <path d="M4 8.4c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v4c0 1.8-3.6 3.2-8 3.2s-8-1.4-8-3.2zM4 14.4c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v3.8c0 1.8-3.6 3.2-8 3.2s-8-1.4-8-3.2z" fill={G} />
    </>
  ),
  bulb: (
    <>
      <path d="M12 2.6a6.6 6.6 0 0 0-3.9 11.9c.6.4.9 1 .9 1.7v.9h6v-.9c0-.7.3-1.3.9-1.7A6.6 6.6 0 0 0 12 2.6z" fill={G} />
      <path d="M9 18.4h6v1.3a1.6 1.6 0 0 1-1.6 1.6h-2.8A1.6 1.6 0 0 1 9 19.7z" fill={G} opacity=".75" />
      <path d="M12 6.2l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z" fill="#EDF7F2" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2.2 21 7.2 12 12.2 3 7.2z" fill={G} opacity=".65" />
      <path d="M3 8.6l8.2 4.6v9.1L3 17.7z" fill={G} />
      <path d="M21 8.6l-8.2 4.6v9.1l8.2-4.6z" fill={G} opacity=".82" />
    </>
  ),
  leaf: (
    <>
      <path d="M20.5 3.5C11 3 4.5 7.8 4.5 14.6c0 1.9.6 3.5 1.6 4.8C8 15 11.6 11.5 16.2 9.4 12.4 12 9.4 15.4 7.4 20c1.2.8 2.7 1.2 4.3 1.2 6.4 0 9.6-6.6 8.8-17.7z" fill={G} />
    </>
  ),
  gear: (
    <>
      <g fill={G}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect key={a} x="10.4" y="1.8" width="3.2" height="4.4" rx=".8" transform={`rotate(${a} 12 12)`} />
        ))}
        <circle cx="12" cy="12" r="7" />
      </g>
      <circle cx="12" cy="12" r="2.8" fill="#EDF7F2" />
    </>
  ),
  people: (
    <>
      <circle cx="12" cy="7.2" r="3.3" fill={G} />
      <circle cx="5.4" cy="9" r="2.5" fill={G} opacity=".8" />
      <circle cx="18.6" cy="9" r="2.5" fill={G} opacity=".8" />
      <path d="M6.3 20.5c0-3.5 2.6-6.3 5.7-6.3s5.7 2.8 5.7 6.3z" fill={G} />
      <path d="M.8 19.5c0-2.8 1.9-4.9 4.4-4.9 1 0 1.9.3 2.7.9a7.6 7.6 0 0 0-2.4 4z" fill={G} opacity=".8" />
      <path d="M23.2 19.5c0-2.8-1.9-4.9-4.4-4.9-1 0-1.9.3-2.7.9a7.6 7.6 0 0 1 2.4 4z" fill={G} opacity=".8" />
    </>
  ),
  flow: (
    <>
      <rect x="2.5" y="3.5" width="7" height="6" rx="1.4" fill={G} />
      <rect x="14.5" y="14.5" width="7" height="6" rx="1.4" fill={G} />
      <path d="M6 10v4.5a3 3 0 0 0 3 3h5.5M17.5 14V9.5a3 3 0 0 0-3-3H9.5" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" opacity=".8" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7.4" height="7.4" rx="1.6" fill={G} />
      <rect x="13.1" y="3.5" width="7.4" height="7.4" rx="1.6" fill={G} opacity=".7" />
      <rect x="3.5" y="13.1" width="7.4" height="7.4" rx="1.6" fill={G} opacity=".7" />
      <rect x="13.1" y="13.1" width="7.4" height="7.4" rx="1.6" fill={G} />
    </>
  ),
  insight: (
    <>
      <path d="M3 18l5.2-5.4 4 3.2L20 7.5" fill="none" stroke={G} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.4 6.2H21v5.6z" fill={G} />
    </>
  )
};

const Icon = ({ name, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>
);

const CAPABILITIES = [
  { k: 'PEOPLE', v: 'Connected Teams', icon: 'people' },
  { k: 'PROCESSES', v: 'Smarter Workflows', icon: 'gear' },
  { k: 'DATA', v: 'Unified Information', icon: 'database' },
  { k: 'APPLICATIONS', v: 'Purpose-Built Solutions', icon: 'cube' },
  { k: 'INSIGHTS', v: 'Better Decisions', icon: 'apps' }
];

// Illustrative figures for the hero; not verified statistics.
const METRICS = [
  { v: '100+', l: 'Businesses Empowered', c: '#12324F' },
  { v: '20+', l: 'Digital Solutions', c: '#12324F' },
  { v: '10+', l: 'Industries', c: '#1F5588' },
  { v: '1', l: 'Connected Ecosystem', c: '#14707A' }
];

// Diagram geometry in a 620x620 viewBox: SeSova at the centre, six services on
// a hexagonal orbit (radius 215) starting at the top and going clockwise.
const C = { x: 310, y: 310 };
const R = 225;
// Inner ring around the centre record; wide enough to hold the logo and name.
const IR = 128;
const SERVICES = [
  { t: ['Business', 'Applications'], d: ['Custom solutions', 'for your business'], icon: 'apps' },
  { t: ['Web & Digital', 'Platforms'], d: ['Modern, scalable', 'experiences'], icon: 'cloud' },
  { t: ['Data &', 'Analytics'], d: ['From data', 'to insights'], icon: 'database' },
  { t: ['AI & Intelligent', 'Solutions'], d: ['Unlock new', 'possibilities'], icon: 'bulb' },
  { t: ['Process', 'Automation'], d: ['Smarter workflows,', 'greater efficiency'], icon: 'gear' },
  { t: ['CRM & Client', 'Management'], d: ['Stronger relationships,', 'higher growth'], icon: 'people' }
].map((s, i) => {
  const a = ((-90 + i * 60) * Math.PI) / 180;
  return { ...s, x: C.x + R * Math.cos(a), y: C.y + R * Math.sin(a), ux: Math.cos(a), uy: Math.sin(a), delay: 0.45 + i * 0.1 + 's' };
});
// Connectors: top/bottom run straight to the inner ring; each side pair is
// joined by a vertical line with a horizontal spur into the centre.
const SX = R * Math.cos(Math.PI / 6);
const NR = 75;
const LINKS = [
  [C.x, C.y - R + NR, C.x, C.y - IR],
  [C.x, C.y + R - NR, C.x, C.y + IR],
  [C.x - SX, C.y - R / 2 + NR, C.x - SX, C.y + R / 2 - NR],
  [C.x + SX, C.y - R / 2 + NR, C.x + SX, C.y + R / 2 - NR],
  [C.x - SX, C.y, C.x - IR, C.y],
  [C.x + SX, C.y, C.x + IR, C.y]
];
const JOINTS = [
  [C.x, C.y - R + NR, '#14707A'], [C.x, C.y - IR, '#14707A'],
  [C.x, C.y + R - NR, '#14707A'], [C.x, C.y + IR, '#14707A'],
  [C.x - SX, C.y, '#14707A'], [C.x - IR, C.y, '#2C6FB5'],
  [C.x + SX, C.y, '#14707A'], [C.x + IR, C.y, '#2C6FB5'],
  [C.x - SX, C.y - R / 2 + NR, '#14707A'], [C.x - SX, C.y + R / 2 - NR, '#14707A'],
  [C.x + SX, C.y - R / 2 + NR, '#14707A'], [C.x + SX, C.y + R / 2 - NR, '#14707A']
];
const DOTS = [
  { x: 205, y: 118, r: 4.5, c: '#4E9E6A', d: '0s' },
  { x: 424, y: 110, r: 4, c: '#2C6FB5', d: '1.2s' },
  { x: 560, y: 310, r: 5, c: '#14707A', d: '2.1s' },
  { x: 418, y: 508, r: 4, c: '#86C79A', d: '.6s' },
  { x: 196, y: 505, r: 4.5, c: '#2C6FB5', d: '1.7s' },
  { x: 60, y: 310, r: 4, c: '#86C79A', d: '2.6s' }
];

const pct = (n) => (n / 620) * 100 + '%';

export default function Hero() {
  // Background creeps closer as the hero scrolls away.
  const bgZoom = useScrollZoom({ from: 1, to: 1.14, start: 'top top', end: 'bottom top' });
  const openDemo = useDemoModal();
  return (
    <section className="hx" aria-labelledby="hero-title">
      <style>{HERO_CSS}</style>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="hxIconGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4E9E6A" />
            <stop offset="1" stopColor="#14707A" />
          </linearGradient>
          <linearGradient id="hxIconBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2C8FCF" />
            <stop offset="1" stopColor="#2C6FB5" />
          </linearGradient>
          <radialGradient id="hxHalo" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#fff" stopOpacity=".96" />
            <stop offset=".6" stopColor="#F1F9F5" stopOpacity=".82" />
            <stop offset="1" stopColor="#E3F3EA" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Background: technology-city environment, washed toward the copy */}
      <div className="hx-bgimg" ref={bgZoom} style={{ backgroundImage: `url(${heroBackground})` }} aria-hidden="true" />
      <div className="hx-wash" aria-hidden="true" />
      {/* Drifting 3D dot field, echoing the breathing dots in the diagram. */}
      <LazyAccent3D scene={HeroDots} className="hx-3d" />

      <div className="hx-in">
        {/* Left: message */}
        <div>
          <div className="hx-eyebrow" data-in="">Digital Solutions Ecosystem</div>
          <h1 id="hero-title" className="hx-h1" data-in="" style={{ animationDelay: ".1s" }}>
            One Ecosystem.
            <span className="l2"><span className="hx-grad-g">Multiple Digital</span> <span className="hx-grad-b">Solutions.</span></span>
          </h1>
          <p className="hx-lede" data-in="" style={{ animationDelay: ".2s" }}>SeSova builds unique digital solutions and applications for businesses, bringing people, processes, data and technology together in one connected ecosystem.</p>
          <div className="hx-ctas" data-in="" style={{ animationDelay: ".3s" }}>
            <SmartLink className="hx-btn hover-1" href="/#solutions" style={{ background: "#0A3742", color: "#fff", boxShadow: "0 14px 30px -18px rgba(10,55,66,.7)" }}>
              Explore Our Solutions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </SmartLink>
            <SmartLink className="hx-btn hover-2" href="/#demo" onClick={openDemo} style={{ background: "#fff", color: "#12324F", border: "1px solid rgba(12,36,52,.2)" }}>Request a Demo</SmartLink>
          </div>

          <div className="hx-strip" data-in="" style={{ animationDelay: ".4s" }}>
            {CAPABILITIES.map((c) => (
              <div className="hx-si" key={c.k}>
                <span className="hx-tile"><Icon name={c.icon} size={26} /></span>
                <div>
                  <div className="hx-sk">{c.k}</div>
                  <div className="hx-sv">{c.v}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="hx-rule" data-in="" style={{ animationDelay: ".48s" }} />

          <div className="hx-metrics" data-in="" style={{ animationDelay: ".55s" }}>
            {METRICS.map((m) => (
              <div className="hx-m" key={m.l}>
                <div className="hx-mv" style={{ color: m.c }}>{m.v}</div>
                <div className="hx-ml">{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: SeSova at the centre of its digital services */}
        <div className="hx-viz">
          <div className="hx-dia" role="img" aria-label="SeSova at the centre of one connected ecosystem of digital solutions: business applications, web and digital platforms, data and analytics, AI and intelligent solutions, process automation, and CRM and client management">
            <svg viewBox="0 0 620 620" aria-hidden="true">
              <g fill="none">
                <circle cx={C.x} cy={C.y} r="302" stroke="rgba(20,112,122,.12)" strokeWidth="1" />
                <circle cx={C.x} cy={C.y} r={R} stroke="rgba(20,112,122,.24)" strokeWidth="1.3" />
                <circle cx={C.x} cy={C.y} r="176" stroke="rgba(44,111,181,.12)" strokeWidth="1" />
                <g className="hx-spin">
                  <circle cx={C.x} cy={C.y} r="262" stroke="rgba(78,158,106,.24)" strokeWidth="1" strokeDasharray="2 7" />
                  <circle cx={C.x} cy={C.y - 262} r="3" fill="#86C79A" />
                  <circle cx={C.x + 262} cy={C.y} r="2.5" fill="#14707A" opacity=".6" />
                  <circle cx={C.x - 227} cy={C.y + 131} r="2.5" fill="#2C6FB5" opacity=".6" />
                </g>
                <circle cx={C.x} cy={C.y} r={IR} stroke="rgba(20,112,122,.3)" strokeWidth="1" strokeDasharray="2 4" />
              </g>
              <circle cx={C.x} cy={C.y} r={IR + 14} fill="url(#hxHalo)" />
              {LINKS.map((l, i) => (
                <g key={i}>
                  <line x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="#14707A" strokeWidth="1.4" strokeDasharray="2 4" opacity=".75" />
                  <path data-pulse="" pathLength="1" d={`M${l[0]} ${l[1]}L${l[2]} ${l[3]}`} stroke="#4E9E6A" strokeWidth="3" fill="none" />
                </g>
              ))}
              {JOINTS.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r="3.8" fill={p[2]} />
              ))}
              {DOTS.map((d, i) => (
                <circle key={i} className="hx-dot" cx={d.x} cy={d.y} r={d.r} fill={d.c} style={{ animationDelay: d.d }} />
              ))}
            </svg>

            {/* Logo sits exactly on the centre point; the name sits beneath it. */}
            <div className="hx-pos" style={{ left: pct(C.x), top: pct(C.y) }}>
              <div className="hx-core" data-float="">
                <img src="/assets/logo.webp" alt="SeSova logo" />
              </div>
            </div>
            <div className="hx-pos" style={{ left: pct(C.x), top: pct(C.y + 82) }}>
              <div className="hx-core-w">
                Se<span style={{ color: "#4E9E6A" }}>S</span>ova
              </div>
              <div className="hx-core-l">ONE CONNECTED ECOSYSTEM</div>
            </div>

            {SERVICES.map((s) => (
              <div className="hx-pos" key={s.t.join(' ')} style={{ left: pct(s.x), top: pct(s.y) }}>
                <div className="hx-svc" style={{ animationDelay: s.delay }}>
                  <span className="hx-si2"><Icon name={s.icon} /></span>
                  <div className="hx-st">{s.t[0]}<br />{s.t[1]}</div>
                  <div className="hx-sd">{s.d[0]}<br />{s.d[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial note, closing card and scroll cue */}
      <div className="hx-card" data-in="" style={{ animationDelay: ".9s" }}>
        <Icon name="leaf" size={26} />
        <div className="hx-card-t">
          UNIQUE TECHNOLOGY.
          <br />
          ENDLESS POSSIBILITIES.
        </div>
        <span style={{ width: "26px", height: "1.5px", background: "rgba(20,112,122,.5)", flex: "none" }} />
      </div>

      <div className="hx-note" aria-hidden="true">
        <div className="a" style={{ whiteSpace: "nowrap" }}>Great Ideas.</div>
        <div className="b">
          Meaningful
          <div style={{ marginLeft: "30px" }}>Solutions.</div>
          <svg viewBox="0 0 200 24" fill="none" aria-hidden="true">
            <path d="M4 18C60 10 130 6 196 4" stroke="#2F8F5B" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <SmartLink className="hx-scroll hover-7" href="/#ecosystem" aria-label="Scroll to explore">
        <svg width="18" height="28" viewBox="0 0 22 34" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="currentColor" strokeWidth="1.4" />
          <rect className="hx-wheel" x="10" y="7" width="2" height="6" rx="1" fill="currentColor" />
        </svg>
        <span>SCROLL TO EXPLORE</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </SmartLink>
    </section>
  );
}
