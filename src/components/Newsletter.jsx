import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { apiPost } from '../api/client';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
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
      }, 4000);
    } catch (err) {
      setError(err.message || 'Subscription failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <div className="newsletter-text">
            <h3>Subscribe To Our Newsletter</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
              Receive exclusive offers, VIP discounts, and seasonal updates directly to your inbox.
            </p>
          </div>

          {subscribed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-gold)', fontSize: '1.1rem', fontWeight: 600 }}>
              <CheckCircle2 size={24} /> Thank you for subscribing to Royella!
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-royella" disabled={submitting}>
                <Send size={16} /> {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
              {error && <p style={{ color: '#ffb4b4', fontSize: '0.85rem', width: '100%' }}>{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
