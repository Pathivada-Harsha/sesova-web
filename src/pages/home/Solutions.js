import React from 'react';
import SmartLink from '../../components/SmartLink';
import { useDemoModal } from '../../components/DemoModal';
import useReveal from '../../hooks/useReveal';
import workflowVisual from '../../images/product-workflow-visual.webp';

// Section 06 — Solutions: the five-stage product workflow and the four positions
// it serves on the left, the connected SESOVA product visual on the right.
// The positions come from useHomeVals via `v.solutions`.
const CSS = `
section.wf{position:relative;padding:112px 0;overflow:hidden;isolation:isolate;background:linear-gradient(180deg,#FFFFFF 0%,#F6FAFD 55%,#F3F9F6 100%)}
.wf-glow{position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(38% 48% at 78% 46%,rgba(44,111,181,.11),transparent 72%),radial-gradient(30% 38% at 6% 90%,rgba(78,158,106,.1),transparent 72%)}
.wf-ring{position:absolute;z-index:-1;pointer-events:none;border-radius:50%;border:1px solid rgba(44,111,181,.1)}
.wf-in{position:relative;width:calc(100% - 9vw);max-width:var(--page-max);margin:0 auto;display:grid;grid-template-columns:minmax(0,.74fr) minmax(0,1.26fr);gap:clamp(28px,3.4vw,52px);align-items:center}
.wf-label{display:flex;align-items:center;gap:11px;font-size:10.4px;font-weight:600;letter-spacing:.2em;color:#2F7A50}
.wf-label:before{content:"";width:34px;height:1.5px;background:#2F7A50}
.wf-h2{margin:14px 0 0;font-size:clamp(30px,3vw,46px);line-height:1.1;letter-spacing:-.024em;font-weight:400;color:#12324F}
.wf-h2 b{display:block;font-weight:600}
.wf-h2 .g{background:linear-gradient(90deg,#2A9460 0%,#14707A 55%,#2C6FB5 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.wf-lead{margin:18px 0 0;max-width:470px;font-size:clamp(14px,1vw,15.5px);line-height:1.65;color:#566D7F}
.wf-steps{list-style:none;margin:34px 0 0;padding:0;display:flex;flex-direction:column}
.wf-step{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr);gap:18px;padding-bottom:22px}
.wf-step:last-child{padding-bottom:0}
.wf-step:not(:last-child):before{content:"";position:absolute;left:21.5px;top:46px;bottom:4px;width:1px;background:linear-gradient(180deg,#D3E0E8,rgba(211,224,232,.3))}
.wf-n{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;letter-spacing:.04em;box-shadow:inset 0 0 0 1px rgba(255,255,255,.7),0 8px 18px -14px rgba(12,36,52,.5)}
.wf-t{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px;padding-top:3px}
.wf-t b{font-size:15.5px;font-weight:600;color:#12324F}
.wf-t span{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}
.wf-d{margin:4px 0 0;font-size:13.5px;line-height:1.55;color:#647B8C}
.wf-for{margin-top:30px;padding-top:24px;border-top:1px solid #E1EAEF}
.wf-fk{font-size:10.4px;font-weight:600;letter-spacing:.2em;color:#647B8C}
.wf-pos{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.wf-pos span{display:inline-flex;align-items:center;gap:8px;padding:7px 13px;border-radius:999px;background:rgba(255,255,255,.85);border:1px solid #DCE6EC;font-size:12.5px;font-weight:500;color:#12324F}
.wf-pos i{width:7px;height:7px;border-radius:50%;flex:none}
.wf-more{display:inline-flex;align-items:center;gap:12px;margin-top:28px;font-size:13.5px;font-weight:600;color:#14707A}
.wf-more:hover{color:#0A3742}
.wf-more i{width:36px;height:36px;border-radius:50%;background:#14707A;color:#fff;display:flex;align-items:center;justify-content:center;transition:transform .25s ease}
.wf-more:hover i{transform:translateX(3px)}
.wf-vis{position:relative;opacity:0;transform:translateY(28px) scale(.98);transition:opacity 1s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}
.wf-vis.seen{opacity:1;transform:none}
/* The visual bleeds slightly past the content edge; the section clips it. */
.wf-vis img{display:block;width:calc(100% + clamp(0px,7vw,120px));max-width:none;height:auto;margin-left:calc(-1 * clamp(0px,1.5vw,24px));user-select:none}
@media (max-width:1100px){
  .wf-in{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}
  .wf-vis img{width:calc(100% + 4vw);margin-left:0}
}
@media (max-width:900px){
  section.wf{padding:80px 0}
  .wf-in{width:calc(100% - 40px);grid-template-columns:1fr;gap:40px}
  .wf-lead{max-width:none}
  .wf-vis{max-width:760px;width:100%;margin:0 auto}
  .wf-vis img{width:108%;margin-left:-4%}
}
@media (prefers-reduced-motion:reduce){
  .wf-vis{opacity:1!important;transform:none!important;transition:none}
  .wf [data-rise]{animation:none!important;opacity:1!important;transform:none!important}
}
`;

const STEPS = [
  { n: '01', t: 'Opportunity', tag: 'Leads / CRM', d: 'Capture every enquiry and qualify it into a project.', c: '#2C6FB5', bg: '#EAF2FB' },
  { n: '02', t: 'Financing', tag: 'Sanctions / Disbursements', d: 'Sanction, disburse and track repayment against the same project.', c: '#2F8A55', bg: '#E8F5EE' },
  { n: '03', t: 'Execution', tag: 'Projects / Milestones', d: 'Run delivery by milestone, with progress, costs and documents in one place.', c: '#6552C8', bg: '#EFECFB' },
  { n: '04', t: 'Procurement', tag: 'Purchase Orders / Vendors', d: 'Raise purchase orders, manage vendors and follow each order to delivery.', c: '#C86A1E', bg: '#FCEFE3' },
  { n: '05', t: 'Operations', tag: 'Assets / Performance', d: 'Monitor commissioned assets, maintenance and performance.', c: '#14707A', bg: '#E6F3F2' }
];

export default function Solutions({ v }) {
  const openDemo = useDemoModal();
  useReveal('.wf-vis', 0.2);

  return (
    <section id="solutions" className="wf" aria-labelledby="wf-title">
      <style>{CSS}</style>
      <div className="wf-glow" aria-hidden="true" />
      <span className="wf-ring" aria-hidden="true" style={{ width: '62vw', height: '62vw', right: '-18vw', top: '50%', marginTop: '-31vw' }} />
      <span className="wf-ring" aria-hidden="true" style={{ width: '44vw', height: '44vw', right: '-9vw', top: '50%', marginTop: '-22vw' }} />
      <div className="wf-in">
        <div data-rise="">
          <div className="wf-label">06 — SOLUTIONS</div>
          <h2 id="wf-title" className="wf-h2">
            From opportunity to operations.
            <b>All in <span className="g">one flow.</span></b>
          </h2>
          <p className="wf-lead">
            Four positions in the same ecosystem, one architecture. SESOVA carries a project from the first enquiry to the assets it puts into operation, and every stage works on the same record.
          </p>
          <ol className="wf-steps">
            {STEPS.map((s) => (
              <li className="wf-step" key={s.n}>
                <span className="wf-n" style={{ background: s.bg, color: s.c }}>{s.n}</span>
                <div>
                  <div className="wf-t"><b>{s.t}</b><span style={{ color: s.c }}>{s.tag}</span></div>
                  <p className="wf-d">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="wf-for">
            <div className="wf-fk">BUILT FOR</div>
            <div className="wf-pos">
              {v.solutions.map((s) => (
                <span key={s.kicker}>
                  <i style={{ background: s.c }} aria-hidden="true" />
                  {s.label}
                </span>
              ))}
            </div>
          </div>
          <SmartLink className="wf-more" href="/#demo" onClick={openDemo}>
            <i>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </i>
            See the workflow in a demo
          </SmartLink>
        </div>

        <div className="wf-vis">
          <img
            src={workflowVisual}
            width="1536"
            height="1024"
            loading="lazy"
            decoding="async"
            draggable="false"
            alt="SESOVA product workflow: Leads, Sanction & Financing, Project Overview, Procurement and Assets & Operations screens connected in one flow"
          />
        </div>
      </div>
    </section>
  );
}
