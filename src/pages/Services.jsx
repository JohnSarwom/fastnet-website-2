import { SERVICES } from "../data/constants";

export default function Services() {
  return (
    <section id="services" className="fn-services">
      <div className="fn-svc-head">
        <div className="fn-sec-pill">Our IT Services</div>
        <h2 className="fn-sec-title">Complete IT Solutions, Built<br />for PNG Businesses</h2>
        <p className="fn-sec-sub" style={{ margin: "0 auto", textAlign: "center" }}>
          From digital transformation and secure network infrastructure to websites, training, and cloud services — FASTNet is your end-to-end IT partner across Papua New Guinea.
        </p>
      </div>
      <div className="fn-svc-grid">
        {SERVICES.map((s) => (
          <div key={s.title} className={`fn-svc-card${s.hot ? " hot" : ""}`}>
            <div className="fn-svc-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <a href="#contact" className="fn-lm" style={s.hot ? { color: "rgba(255,255,255,.8)" } : {}}>Learn more</a>
          </div>
        ))}
      </div>
    </section>
  );
}
