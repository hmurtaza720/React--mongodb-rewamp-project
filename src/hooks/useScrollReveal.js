import { useEffect } from 'react';

/**
 * Scroll-reveal animation driver.
 *
 * Tags every element matching REVEAL_TARGETS with the `.reveal` class (styled in
 * index.css), then flips `.is-visible` on as each one scrolls into view. Items that
 * belong to the same grid/row get a staggered transition-delay so cards cascade in
 * rather than all appearing at once.
 *
 * Kept as a single hook instead of wrapping all 22 components so the animation
 * behaviour lives in one reusable place.
 */

// [selector, variant, stagger?] — variant maps to the .reveal-* modifiers in index.css
const REVEAL_TARGETS = [
  ['.section-title', '', false],
  ['.facility-card', 'reveal-zoom', true],
  ['.room-card', '', true],
  ['.room-card-slide', '', true],
  ['.gallery-item', 'reveal-zoom', true],
  // Revealed as one block: the off-screen carousel slides would never intersect
  // and would stay stuck at opacity 0 once the track advanced to them.
  ['.testimonial-carousel', 'reveal-zoom', false],
  ['.manager-card', '', false],
  ['.newsletter-box', '', false],
  ['.about-slider-wrap', 'reveal-left', false],
  ['.about-stats-grid', 'reveal-right', false],
  ['.stat-item', '', true],
  ['.footer-contact-card', 'reveal-left', false],
];

const STAGGER_MS = 110;
const MAX_STAGGER_STEPS = 6;

export default function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const elements = [];

    // Always (re)collect every target. Class marks are applied idempotently rather
    // than used as a "skip" guard, because StrictMode invokes this effect twice —
    // a guard would leave the second observer with nothing to watch.
    REVEAL_TARGETS.forEach(([selector, variant, stagger]) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        if (variant) el.classList.add(variant);
        if (stagger) {
          const step = i % MAX_STAGGER_STEPS;
          el.style.transitionDelay = `${step * STAGGER_MS}ms`;
        }
        elements.push(el);
      });
    });

    // Reduced motion: reveal everything immediately, skip the observer entirely.
    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // Alternating service rows slide in from the side they sit on.
    document.querySelectorAll('.service-row').forEach((row) => {
      const image = row.querySelector('.service-image');
      const info = row.querySelector('.service-info');
      const flipped = row.classList.contains('reverse');
      if (image) {
        image.classList.add('reveal', flipped ? 'reveal-right' : 'reveal-left');
        elements.push(image);
      }
      if (info) {
        info.classList.add('reveal', flipped ? 'reveal-left' : 'reveal-right');
        elements.push(info);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // reveal once, then stop watching
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
