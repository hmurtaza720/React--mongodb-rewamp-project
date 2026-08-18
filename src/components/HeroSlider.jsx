import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useApiData from '../hooks/useApiData';

export default function HeroSlider({ onExplore }) {
  const { data: slides } = useApiData('/hero-slides', []);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Clamp in case the slide count shrinks (e.g. content deleted in the DB) after fetch.
  useEffect(() => {
    setCurrentSlide((prev) => (slides.length ? prev % slides.length : 0));
  }, [slides.length]);

  if (slides.length === 0) {
    return <section className="hero-slider-section" id="home" />;
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="hero-slider-section" id="home">
      {/* Left Arrow Nav Button */}
      <button className="hero-nav-arrow left" onClick={handlePrev} aria-label="Previous Slide">
        <ChevronLeft size={28} />
      </button>

      {/* Right Arrow Nav Button */}
      <button className="hero-nav-arrow right" onClick={handleNext} aria-label="Next Slide">
        <ChevronRight size={28} />
      </button>

      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              {/* Star rating badge */}
              <div className="hero-star-rating">
                {[...Array(slide.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--primary-gold)" color="var(--primary-gold)" />
                ))}
              </div>

              <h4 className="hero-subtitle">{slide.subtitle}</h4>
              <h1 className="hero-title">{slide.title}</h1>

              <div style={{ marginTop: '30px' }}>
                <button className="btn-royella" onClick={onExplore}>
                  {slide.ctaText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Dots */}
      <div className="hero-controls">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
