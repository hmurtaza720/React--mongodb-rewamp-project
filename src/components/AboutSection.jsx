import React, { useState, useEffect } from 'react';

const ABOUT_IMAGES = [
  "https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/about-thumb.png",
  "https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/about-thumb-2.jpg"
];

export default function AboutSection({ onNavigate }) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Image Slider Side with Dots */}
          <div className="about-slider-wrap">
            <div className="about-image-wrapper">
              <img
                src={ABOUT_IMAGES[currentImg]}
                alt="Royella Luxury Hotel Resort"
              />
            </div>
            <div className="about-slider-dots">
              {ABOUT_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  className={`about-dot ${idx === currentImg ? 'active' : ''}`}
                  onClick={() => setCurrentImg(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Text & Stats Side */}
          <div>
            <div className="section-title left">
              <h5 className="subtitle">LUXURY HOTEL AND RESORT</h5>
              <h2 className="title">LUXURY BEST HOTEL IN CITY CALIFORNTA, USA</h2>
              <p className="description">
                Rapidiously myocardinate cross-platform intellectual capital after marketing an model. Appropriately create interactive infrastructures after maintainable are Holisticly facilitate stand-alone inframe Compellingly create premier open data through economically.
              </p>
            </div>

            {/* Statistics */}
            <div className="about-stats-grid">
              <div className="stat-item">
                <div className="stat-number">250+</div>
                <div className="stat-label">Luxury Rooms</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4.9</div>
                <div className="stat-label">Customers Ratting</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">12k+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
            </div>

            <button className="btn-royella" onClick={() => onNavigate('contact')}>
              ABOUT MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
