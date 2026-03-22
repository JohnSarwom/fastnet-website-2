import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ first: "", last: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ first: "", last: "", email: "", service: "", message: "" });
  };

  return (
    <form className="fn-cform" onSubmit={submit}>
      <div className="fn-frow">
        <div className="fn-fg"><label>First Name</label><input name="first" value={form.first} onChange={handle} placeholder="John" /></div>
        <div className="fn-fg"><label>Last Name</label><input name="last" value={form.last} onChange={handle} placeholder="Doe" /></div>
      </div>
      <div className="fn-fg"><label>Email Address</label><input type="email" name="email" value={form.email} onChange={handle} placeholder="john@company.com.pg" /></div>
      <div className="fn-fg">
        <label>Service Interested In</label>
        <select name="service" value={form.service} onChange={handle}>
          <option value="">Select a service...</option>
          <option>Internet Services (LEO Satellite)</option>
          <option>Digital Business Processes</option>
          <option>Website & Online Presence</option>
          <option>Secure Network Infrastructure</option>
          <option>WiFi Deployment</option>
          <option>Digital Training & Upskilling</option>
          <option>Tailored Technology Solutions</option>
        </select>
      </div>
      <div className="fn-fg">
        <label>Message</label>
        <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your business and connectivity needs..." />
      </div>
      <button type="submit" className="fn-fsub">
        {sent ? "✓ Message Sent!" : "Send Message →"}
      </button>
    </form>
  );
}
