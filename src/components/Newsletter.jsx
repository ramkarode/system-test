import React from "react";
import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("Thanks for subscribing!");
    setEmail("");
  };
  return (
    <section className="newsletter">
      <div className="newsletter-content"><p className="newsletter-kicker">GOOD THINGS IN YOUR INBOX</p><h2>Join Our Newsletter</h2><p>Get new arrivals and special offers, straight to your inbox.</p>
        <form className="newsletter-form" onSubmit={submit}><Mail size={17} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" aria-label="Email address" /><button type="submit">Subscribe <ArrowRight size={15} /></button></form>
        {message && <p className="newsletter-message" role="status">{message}</p>}
      </div><div className="newsletter-illustration" aria-hidden="true"><span>✉️</span><i>✦</i><b>•••</b></div>
    </section>
  );
}
