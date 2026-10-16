import React from "react";
import { Store, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand"><a className="brand" href="#"><img className="brand-logo footer-logo" src="/Image/logo.png" alt="E-commerce" /></a><p>59 Selous Ave, Harare, Zimbabwe<br />Support: +263 03 0000052</p><a href="mailto:info@demo.com">info@demo.com</a></div>
        <div className="footer-column"><h3>Help Center</h3><a href="#faq">FAQ</a><a href="#about">About E-Commerce</a><a href="#support">Support Tickets</a><a href="#contact">Contact Us</a></div>
        <div className="footer-column"><h3>Quick Links</h3><a href="#supplier">Become A Supplier</a><a href="#track">Track Order</a><a href="#services">Services & Membership</a><a href="#help">Help & Community</a></div>
        <div className="footer-column"><h3>Buy On E-Commerce</h3><a href="#terms">Terms & Conditions</a><a href="#privacy">Privacy & Rules</a></div>
        <div className="footer-column"><h3>Download App</h3><div className="app-badges"><a href="#google-play">▶ Google Play</a><a href="#app-store">● App Store</a></div></div>
      </div>
      <div className="footer-bottom"><span>© 2026 E-Commerce. All Rights Reserved.</span><div className="socials"><span>Stay Connected:</span><Facebook size={15}/><Twitter size={15}/><Instagram size={15}/><Youtube size={15}/></div></div>
    </footer>
  );
}
