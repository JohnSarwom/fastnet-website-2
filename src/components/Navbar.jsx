import { NAV_LINKS } from "../data/constants";

export default function Navbar() {
  return (
    <nav className="fn-nav">
      <a className="fn-logo" href="#">
        FAST<span>Net</span>
      </a>
      <ul className="fn-nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href + link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <div className="fn-nav-btns">
        <a href="#" className="fn-nav-login">Log In</a>
        <a href="#contact" className="fn-nav-cta">Contact Us</a>
      </div>
    </nav>
  );
}
