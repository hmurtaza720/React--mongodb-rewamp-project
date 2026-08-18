import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import useApiData from '../hooks/useApiData';
import { apiPost } from '../api/client';

export default function ContactSection() {
  const { data: hotelInfo } = useApiData('/hotel-info', {});
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await apiPost('/contact', formData);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="about-section" id="contact" style={{ background: '#ffffff' }}>
      <div className="container">
        <div className="section-title">
          <img
            src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/10/section-shape1.png"
            alt="Decoration"
            className="section-shape"
          />
          <h5 className="subtitle">Get In Touch</h5>
          <h2 className="title">Contact Royella Hotel</h2>
        </div>

        <div className="about-grid" style={{ alignItems: 'flex-start' }}>
          {/* Contact Info */}
          <div style={{ background: 'var(--bg-pastel)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-brown-dark)', marginBottom: '20px' }}>Contact Information</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <MapPin size={22} color="var(--primary-gold)" style={{ marginTop: '3px' }} />
                <div>
                  <h5 style={{ color: 'var(--primary-brown-dark)', fontSize: '1rem' }}>Address</h5>
                  <p style={{ margin: 0 }}>{hotelInfo.address}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Phone size={22} color="var(--primary-gold)" style={{ marginTop: '3px' }} />
                <div>
                  <h5 style={{ color: 'var(--primary-brown-dark)', fontSize: '1rem' }}>Phone</h5>
                  <p style={{ margin: 0 }}>{hotelInfo.phone} / {hotelInfo.phone2}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Mail size={22} color="var(--primary-gold)" style={{ marginTop: '3px' }} />
                <div>
                  <h5 style={{ color: 'var(--primary-brown-dark)', fontSize: '1rem' }}>Email</h5>
                  <p style={{ margin: 0 }}>{hotelInfo.email}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <Clock size={22} color="var(--primary-gold)" style={{ marginTop: '3px' }} />
                <div>
                  <h5 style={{ color: 'var(--primary-brown-dark)', fontSize: '1rem' }}>Operating Hours</h5>
                  <p style={{ margin: 0 }}>{hotelInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'var(--bg-pastel)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-brown-dark)', marginBottom: '20px' }}>Send Us A Message</h3>

            {sent ? (
              <div style={{ background: '#e6f4ea', color: '#137333', padding: '20px', borderRadius: '4px', textAlign: 'center', fontWeight: 600 }}>
                Message sent successfully! We will get back to you within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {error && (
                  <div style={{ background: '#fdecea', color: '#b3261e', padding: '12px', borderRadius: '4px', fontSize: '0.9rem' }}>
                    {error}
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="booking-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="booking-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="booking-field"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Write your inquiry..."
                  className="booking-field"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <button type="submit" className="btn-royella" disabled={submitting}>
                  <Send size={16} /> {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
