import { ABOUT_CARDS } from "../data/constants";

export default function About() {
  return (
    <section id="about" className="fn-about">
      <div className="fn-about-inner">
        <div>
          <div className="fn-sec-pill">Who We Are</div>
          <h2 className="fn-sec-title">PNG's Leading<br />IT Services Company</h2>
          <p className="fn-sec-sub" style={{ marginBottom: "2rem" }}>
            FASTNet is a full-service IT solutions company based in Kimbe, West New Britain Province. We help businesses across PNG modernise their operations, secure their networks, build their online presence, and upskill their teams — all under one roof.
          </p>
          <a href="#contact" className="fn-btn-main">Get Started <span className="fn-btn-arr">→</span></a>
        </div>
        <div className="fn-about-cards">
          {ABOUT_CARDS.map((c) => (
            <div key={c.badge} className="fn-vm-card">
              <div className="fn-vm-badge">{c.badge}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
