import React, { Fragment } from 'react';
import SmartLink from './SmartLink';
import { useDemoModal } from './DemoModal';

// "Sign In" opens the SESOVA CRM in a new tab, keeping the website open.
const SIGN_IN_URL = 'http://app.sesova.in';

// Generated from the SeSova design export; values come from the page hook via `v`.
export default function Header({ v }) {
  const openDemo = useDemoModal();
  return (
    <header style={{ position: "sticky", top: "0", zIndex: "60", padding: "14px 0 0", transition: "transform .5s cubic-bezier(.4,0,.2,1)", transform: v.headerT }}>
      <div className="nbar">
        <SmartLink href="/" className="nbrand" style={{ display: "flex", alignItems: "center", gap: "12px", flex: "none" }}>
          <img className="nlogo" src="/assets/logo.webp" alt="SeSova" style={{ objectFit: "contain", display: "block" }} />
          <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span className="nword" style={{ fontWeight: "600", letterSpacing: "-.01em", lineHeight: "1", color: "#12324F" }}>
              Se
              <span style={{ color: "#4E9E6A" }}>S</span>
              ova
            </span>
            <span className="ntag" style={{ fontSize: "13.5px", fontWeight: "400", lineHeight: "1", color: "#5B7183", whiteSpace: "nowrap" }}>One Ecosystem. Multiple Digital Solutions.</span>
          </span>
        </SmartLink>
        <nav className="nlinks">
          {v.nav.map((n, nIdx) => (
            <Fragment key={nIdx}>
              <SmartLink className="hover-7" href={n.href} style={{ fontWeight: n.w, color: n.c, letterSpacing: ".01em", whiteSpace: "nowrap", transition: "color .25s ease" }}>{n.label}</SmartLink>
            </Fragment>
          ))}
        </nav>
        <a className="nsign hover-2" href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid rgba(12,36,52,.18)", color: "#12324F", fontWeight: "600", borderRadius: "999px", whiteSpace: "nowrap", flex: "none", transition: "border-color .25s ease,color .25s ease" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
          </svg>
          Sign In
        </a>
        <SmartLink className="ncta hover-1" href="/#demo" onClick={openDemo} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#0A2A3A", color: "#fff", fontWeight: "600", borderRadius: "999px", whiteSpace: "nowrap", flex: "none" }}>
          Request a Demo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </SmartLink>
        <button className="ntoggle" onClick={v.toggleMenu} aria-label={v.menuLabel} aria-expanded={v.menuOpen}>
          <span style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
            <span style={{ display: "block", width: "20px", height: "1.6px", background: "#12324F" }} />
            <span style={{ display: "block", width: v.barW, height: "1.6px", background: "#12324F" }} />
            <span style={{ display: "block", width: "20px", height: "1.6px", background: "#12324F" }} />
          </span>
        </button>
      </div>
      <div className="npanel" style={{ height: v.panelH, opacity: v.panelO }}>
        <div style={{ padding: "6px 24px 22px", display: "flex", flexDirection: "column" }}>
          {v.nav.map((n, nIdx) => (
            <Fragment key={nIdx}>
              <SmartLink className="hover-7" href={n.href} onClick={v.closeMenu} style={{ display: "flex", alignItems: "center", minHeight: "48px", fontSize: "15px", fontWeight: "500", color: "#3B5163", borderBottom: "1px solid rgba(12,36,52,.08)" }}>{n.label}</SmartLink>
            </Fragment>
          ))}
          <a className="hover-2" href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer" onClick={v.closeMenu} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "48px", marginTop: "16px", border: "1px solid rgba(12,36,52,.2)", color: "#12324F", fontSize: "14px", fontWeight: "600", borderRadius: "2px" }}>Sign In</a>
          <SmartLink className="hover-1" href="/#demo" onClick={(e) => { v.closeMenu(); openDemo(e); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "48px", marginTop: "10px", background: "#12324F", color: "#fff", fontSize: "14px", fontWeight: "600", borderRadius: "2px" }}>Request a Demo</SmartLink>
        </div>
      </div>
    </header>
  );
}
