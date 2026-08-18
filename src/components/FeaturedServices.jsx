import React from 'react';
import { ArrowRight } from 'lucide-react';
import useApiData from '../hooks/useApiData';

export default function FeaturedServices({ onNavigate }) {
  const { data: services } = useApiData('/services', []);

  return (
    <section className="featured-services-section">
      <div className="container">
        {services.map((item, index) => (
          <div key={item._id} className={`service-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
            <div className="service-image">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="service-info">
              <div className="service-num">{String(index + 1).padStart(2, '0')}</div>
              <h5 className="subtitle">{item.subtitle}</h5>
              <h2 className="title">{item.title}</h2>
              <p className="description" style={{ marginBottom: '25px', color: 'var(--text-muted)' }}>
                {item.description}
              </p>
              <button className="btn-royella-outline" onClick={() => onNavigate('facilities')}>
                Explore Service <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
