import { CONTACT_INFO } from "../data/constants";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="fn-contact">
      <div className="fn-contact-wrap">
        <div>
          <div className="fn-sec-pill">Contact Us</div>
          <h2 className="fn-sec-title">Start the<br />Conversation</h2>
          <p className="fn-sec-sub">Tell us about your business needs and we'll recommend the right ICT solution for you.</p>
          <div className="fn-cinfo-list">
            {CONTACT_INFO.map((c) => (
              <div key={c.label} className="fn-cinfo">
                <div className="fn-cinfo-ico">{c.icon}</div>
                <div><h5>{c.label}</h5><p>{c.value}</p></div>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
