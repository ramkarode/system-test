import React from "react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { image: "/Image/banner-1.jpg", alt: "New sale up to 50 percent off" },
  { image: "/Image/banner-2.jpg", alt: "Online shopping featured offer" }
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const next = () => setActive((index) => (index + 1) % slides.length);
  const previous = () => setActive((index) => (index - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = window.setInterval(next, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero-slider" aria-label="Featured offers">
      {slides.map((slide, index) => (
        <img key={slide.image} className={`hero-banner ${index === active ? "visible" : ""}`} src={slide.image} alt={slide.alt} />
      ))}
      <button className="slider-arrow prev" onClick={previous} aria-label="Previous slide"><ChevronLeft /></button>
      <button className="slider-arrow next" onClick={next} aria-label="Next slide"><ChevronRight /></button>
      <div className="slider-dots">
        {slides.map((item, index) => <button key={item.image} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`} />)}
      </div>
    </section>
  );
}
