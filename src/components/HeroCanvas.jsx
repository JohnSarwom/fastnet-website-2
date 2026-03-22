import { useRef } from "react";

export default function HeroCanvas() {
  const heroRef = useRef(null);

  return (
    <section className="fn-hero" ref={heroRef}>
      <div className="fn-hero-glow" />

      <div className="fn-hero-pill">
        <span className="fn-blink" />
        Full-Service IT Solutions for PNG Businesses
      </div>

      <h1>
        Transform Your Business<br />
        With <span className="ac">Smart IT Services</span>
      </h1>

      <p className="fn-hero-sub">
        FASTNet delivers complete IT solutions — from digital transformation and secure networks
        to websites, training, and cloud integration — built specifically for businesses across Papua New Guinea.
      </p>

      <div className="fn-hero-btns">
        <a href="#services" className="fn-btn-main">
          View Our IT Services <span className="fn-btn-arr">→</span>
        </a>
        <a href="#contact" className="fn-btn-ghost">Get a Free Consultation</a>
      </div>

      {/* Floating UI Cards */}
      <div className="fn-hero-cards">
        {/* Left card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="fn-fc">
            <div className="fn-fc-label">IT Services Active</div>
            <div className="fn-fc-big">7+ <span style={{ fontSize: "1rem", color: "rgba(255,255,255,.5)" }}>Solutions</span></div>
            <div className="fn-fc-badge">✓ End-to-End IT</div>
          </div>
          <div className="fn-fc-sm">
            <strong style={{ color: "#fff", display: "block", marginBottom: ".2rem" }}>100% Local Expertise</strong>
            PNG-based IT professionals
          </div>
        </div>

        {/* Center card */}
        <div className="fn-fc-center">
          <div className="fn-fc-center-lbl">FASTNet IT Dashboard</div>
          <div className="fn-fc-center-h">
            Digitalising <span>Businesses</span><br />Across PNG
          </div>
          <div className="fn-prog-track"><div className="fn-prog-fill" style={{ width: "87%" }} /></div>
          <div className="fn-fc-note">87% of clients report improved efficiency after FASTNet's digital transformation 🚀</div>
          <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {["Networks ✓", "Websites ✓", "Training ✓"].map((t) => (
              <span key={t} style={{ background: "rgba(255,255,255,.1)", borderRadius: "6px", padding: ".3rem .7rem", fontSize: ".7rem", fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right card */}
        <div className="fn-fc-right">
          <div className="fn-fc-rbadge">✓ Live Project</div>
          <div className="fn-fc-rtitle">Latest Deployment</div>
          <div className="fn-fc-rh">Secure LAN<br />+ Cloud Setup</div>
          <div className="fn-fc-rsub">40% Faster Operations</div>
          <div className="fn-av-stack">
            <div className="fn-av-row">
              <div className="fn-av" style={{ background: "#4f7bff" }}>A</div>
              <div className="fn-av" style={{ background: "#00d4ff", marginLeft: "-6px" }}>B</div>
              <div className="fn-av" style={{ background: "#7c5cbf", marginLeft: "-6px" }}>C</div>
            </div>
            <span className="fn-av-txt">90% Clients Satisfied</span>
          </div>
        </div>
      </div>
    </section>
  );
}
