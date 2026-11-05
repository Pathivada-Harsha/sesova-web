import React, { Fragment } from 'react';
import SmartLink from './SmartLink';
import { useDemoModal } from './DemoModal';

// Generated from the SeSova design export; values come from the page hook via `v`.
export default function Footer({ v }) {
  const openDemo = useDemoModal();
  return (
    <footer style={{ background: "#08262E", color: "rgba(255,255,255,.62)", padding: "72px 0 40px" }}>
      <div className="wrap" style={{ maxWidth: "calc(var(--page-max) + 80px)", margin: "0 auto", padding: "0 40px" }}>
        <div className="fgrid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "44px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
              <img src="/assets/logo.webp" alt="SeSova" style={{ width: "27px", height: "31px", objectFit: "contain", display: "block" }} />
              <span style={{ fontSize: "18px", fontWeight: "600", color: "#fff" }}>
                Se
                <span style={{ color: "#86C79A" }}>S</span>
                ova
              </span>
            </div>
            <p style={{ margin: "18px 0 0", maxWidth: "280px", fontSize: "13.5px", lineHeight: "1.6", fontWeight: "300" }}>The operating architecture of renewable energy. Connecting Portfolios. Commanding Certainty.</p>
          </div>
          {v.footer.map((f, fIdx) => (
            <Fragment key={fIdx}>
              <div>
                <div style={{ fontSize: "10.5px", fontWeight: "600", letterSpacing: ".14em", color: "#86C79A" }}>{f.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "11px", marginTop: "18px" }}>
                  {f.links.map((l, lIdx) => (
                    <Fragment key={lIdx}>
                      <SmartLink className="hover-8" href={l.href} onClick={l.modal ? openDemo : undefined} style={{ fontSize: "13.5px", fontWeight: "300", color: "rgba(255,255,255,.62)" }}>{l.label}</SmartLink>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <div style={{ marginTop: "56px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,.12)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px", fontSize: "12px", fontWeight: "300" }}>
          <span>© 2026 SeSova. All rights reserved.</span>
          <span>Figures shown across this site are illustrative demo data.</span>
        </div>
      </div>
    </footer>
  );
}
