import React, { useState, useEffect } from 'react';
import { ChevronUp, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import useApiData from '../hooks/useApiData';
import { apiPost } from '../api/client';

// lucide-react ships neither the X wordmark nor Pinterest, and the original
// footer uses both — so these two are inlined.
function XIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function PinterestIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const USEFUL_LINKS = [
  { label: 'About Hotel', section: 'about' },
  { label: 'Rooms & Suites', section: 'rooms' },
  { label: 'Reservations', section: 'rooms' },
  { label: 'News & Blogs', section: 'news' },
  { label: 'Contact', section: 'contact' }
];

export default function Footer({ onNavigate }) {
  const { data: footerGallery } = useApiData('/footer-gallery', []);
  const { data: partnerLogos } = useApiData('/partners', []);

  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setError(null);
    try {
      await apiPost('/newsletter', { email });
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    } catch (err) {
      setError(err.message || 'Subscription failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Gold partner bar. The left ~36% stays empty so the logos clear the
          contact card, which rises into this bar from the footer below. */}
      <div className="royella-partner-bar">
        <div className="container">
          <div className="partner-row">
            <div className="partner-spacer" />
            <div className="partner-logos-wrap">
              {partnerLogos.map((brand) => (
                <img key={brand._id} src={brand.src} alt={brand.alt} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="royella-main-footer">
        <div className="container">
          <div className="footer-content-grid">
            <div className="footer-col-contact">
              <div className="footer-contact-card">
                <img
                  className="footer-card-logo"
                  src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/logo-1-2.png"
                  alt="Royella Logo"
                />
                <h3 className="footer-heading">Contact Info</h3>

                <div className="footer-contact-item">
                  <Phone size={15} />
                  <h4>+980 (1234) 567 220</h4>
                </div>

                <div className="footer-contact-item">
                  <Mail size={15} />
                  <h4>example@yahoo.com</h4>
                </div>

                <div className="footer-contact-item">
                  <MapPin size={15} />
                  <h4>
                    102/B New Elephant
                    <br />
                    Rd Dhaka - 1212
                  </h4>
                </div>

                <div className="footer-social-row">
                  <a href="#fb" className="footer-social-btn" onClick={(e) => e.preventDefault()} aria-label="Facebook"><Facebook size={13} /></a>
                  <a href="#x" className="footer-social-btn" onClick={(e) => e.preventDefault()} aria-label="X"><XIcon /></a>
                  <a href="#ig" className="footer-social-btn" onClick={(e) => e.preventDefault()} aria-label="Instagram"><Instagram size={13} /></a>
                  <a href="#pt" className="footer-social-btn" onClick={(e) => e.preventDefault()} aria-label="Pinterest"><PinterestIcon /></a>
                </div>
              </div>
            </div>

            <div className="footer-col-links">
              <h3 className="footer-heading">USEFUL LINKS</h3>
              <ul className="footer-useful-links">
                {USEFUL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={`#${link.section}`}
                      onClick={(e) => { e.preventDefault(); onNavigate(link.section); }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col-gallery">
              <h3 className="footer-heading">GALLERY</h3>
              <div className="footer-gallery-grid">
                {footerGallery.map((img, idx) => (
                  <img key={img._id} src={img.url} alt={`Hotel thumbnail ${idx + 1}`} />
                ))}
              </div>
            </div>

            <div className="footer-col-newsletter">
              <h3 className="footer-heading">NEWSLETTER</h3>
              <p className="footer-newsletter-intro">Subscribe our Newsletter</p>

              {subscribed ? (
                <div className="footer-subscribed">&#10003; Subscribed successfully!</div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    className="footer-newsletter-input"
                    placeholder="Enter Your Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="footer-subscribe-btn" disabled={submitting}>
                    {submitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                  {error && <p style={{ color: '#ffb4b4', fontSize: '0.8rem', marginTop: '8px' }}>{error}</p>}
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom-copyright">
          <div className="container">&copy; 2024, Royella. All Rights Reserved.</div>
        </div>
      </footer>

      {showTop && (
        <button className="floating-back-to-top" onClick={scrollToTop} title="Scroll to Top">
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
}
