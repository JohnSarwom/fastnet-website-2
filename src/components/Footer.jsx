import { FOOTER_LINKS } from "../data/constants";

export default function Footer() {
  return (
    <footer className="fn-footer">
      <div>
        <div className="fn-flogo">
          FAST<span>Net</span> Limited
        </div>
        <p style={{ marginTop: ".3rem" }}>PO Box 980, Kimbe 621, WNBP</p>
      </div>
      <p>&copy; 2025 FASTNet Limited. All rights reserved.</p>
      <div className="fn-flinks">
        {FOOTER_LINKS.map(({ href, label }) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </div>
    </footer>
  );
}
