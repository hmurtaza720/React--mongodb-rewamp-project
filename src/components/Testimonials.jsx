import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import useApiData from '../hooks/useApiData';

// Matches the original carousel: two cards side by side on desktop, one on mobile.
function usePerView() {
  const [perView, setPerView] = useState(() => (window.innerWidth < 992 ? 1 : 2));

  useEffect(() => {
    const onResize = () => setPerView(window.innerWidth < 992 ? 1 : 2);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return perView;
}

export default function Testimonials() {
  const { data: testimonials } = useApiData('/testimonials', []);
  const perView = usePerView();
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, testimonials.length - perView);

  // Clamp when the breakpoint changes and the current index falls off the end.
  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex, testimonials.length]);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-title">
          <div className="section-image">
            <img
              src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/10/section-shape1.png"
              alt=""
            />
          </div>
          <h2 className="title">Ustomer&rsquo;s Testimoniall</h2>
          <p className="description">
            Proactively morph optimal infomediaries rather than accurate expertise. Intrinsicly
            progressive resources rather than resource-leveling
          </p>
        </div>

        <div className="testimonial-carousel">
          <div
            className="testimonial-track"
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
          >
            {testimonials.map((item) => (
              <div className="testimonial-item" key={item._id} style={{ flexBasis: `${100 / perView}%` }}>
                <div className="testimonial-inner">
                  <div className="testi-star">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>

                  <img
                    className="testi-quote-img"
                    src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/testi-quote.png"
                    alt=""
                  />

                  <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>

                  <div className="testimonial-author">
                    <img src={item.avatar} alt={item.author} />
                    <div className="testimonial-bio">
                      <h4 className="testimonial-name">{item.author}</h4>
                      <h5 className="testimonial-designation">{item.role}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
