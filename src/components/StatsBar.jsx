import { STATS } from "../data/constants";

export default function StatsBar() {
  return (
    <div className="fn-stats-bar">
      {STATS.map(({ n, l }) => (
        <div key={l} className="fn-stat-item">
          <span className="fn-stat-n">{n}</span>
          <span className="fn-stat-l">{l}</span>
        </div>
      ))}
    </div>
  );
}
