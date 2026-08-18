import React from 'react';
import { Star, MapPin, Tag } from 'lucide-react';
import useApiData from '../hooks/useApiData';

export default function OffersCarousel({ onBookOffer }) {
  const { data: offers } = useApiData('/offers', []);

  return (
    <section className="rooms-section" style={{ background: 'var(--bg-pastel)' }}>
      <div className="container">
        <div className="section-title">
          <img
            src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/10/section-shape1.png"
            alt="Decoration"
            className="section-shape"
          />
          <h5 className="subtitle">Special Promotions</h5>
          <h2 className="title">Limited Period Best Offers</h2>
          <p className="description">
            Take advantage of exclusive seasonal discounts on our luxury suites with complimentary breakfasts and spa credits.
          </p>
        </div>

        <div className="rooms-grid">
          {offers.map((offer) => (
            <div key={offer._id} className="room-card">
              <div className="room-image-wrap">
                <img src={offer.image} alt={offer.title} />
                <div
                  className="room-price-badge"
                  style={{ background: 'var(--primary-gold)', color: '#ffffff', top: '15px', bottom: 'auto', left: '15px', right: 'auto' }}
                >
                  <Tag size={16} style={{ marginRight: '4px' }} /> {offer.discount}
                </div>
              </div>

              <div className="room-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  <MapPin size={14} color="var(--primary-gold)" /> {offer.location}
                </div>
                <h3 className="room-title">{offer.title}</h3>

                <div className="room-meta">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {offer.originalPrice}
                    </span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-gold)', fontFamily: 'var(--font-heading)' }}>
                      {offer.offerPrice}
                    </span>
                  </div>

                  <div className="room-stars">
                    <Star size={14} fill="#ffb400" color="#ffb400" />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600, marginLeft: '4px' }}>
                      {offer.rating}
                    </span>
                  </div>
                </div>

                <div className="room-footer">
                  <button className="btn-royella" style={{ width: '100%' }} onClick={() => onBookOffer(offer)}>
                    Claim Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
