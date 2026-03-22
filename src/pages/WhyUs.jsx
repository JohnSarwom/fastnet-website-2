import { WHY_POINTS, SPEED_BARS } from "../data/constants";

export default function WhyUs() {
  return (
    <section id="why" className="fn-why">
      <div className="fn-why-inner">
        <div>
          <div className="fn-sec-pill" style={{ background: "var(--pill-orange)", borderColor: "rgba(240, 147, 43, .3)" }}>Why FASTNet</div>
          <h2 className="fn-sec-title">Your Complete IT Partner<br />Across PNG</h2>
          <p className="fn-sec-sub">We go beyond just connectivity — FASTNet handles every layer of your technology needs, from infrastructure to training, so you can focus on running your business.</p>
          <div className="fn-why-pts">
            {WHY_POINTS.map((p) => (
              <div key={p.n} className="fn-why-pt">
                <div className="fn-why-num">{p.n}</div>
                <div><h4>{p.title}</h4><p>{p.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="fn-speed-vis">
          <h4>What FASTNet Delivers</h4>
          {SPEED_BARS.map((b) => (
            <div key={b.name} className="fn-spd-row">
              <div className="fn-spd-meta">
                <span className="fn-spd-name">{b.name}</span>
                <span className="fn-spd-val">{b.val}</span>
              </div>
              <div className="fn-spd-track"><div className="fn-spd-fill" style={{ width: `${b.w}%` }} /></div>
            </div>
          ))}
          <p className="fn-spd-note">FASTNet covers the <strong style={{ color: "#fff" }}>full IT spectrum</strong> — not just connectivity. We're your technology partner from strategy to daily operations.</p>
        </div>
      </div>
    </section>
  );
}
