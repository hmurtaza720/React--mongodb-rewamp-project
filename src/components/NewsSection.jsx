import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import useApiData from '../hooks/useApiData';

export default function NewsSection() {
  const { data: newsPosts } = useApiData('/news', []);

  return (
    <section className="rooms-section" id="news">
      <div className="container">
        <div className="section-title">
          <img
            src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/10/section-shape1.png"
            alt="Decoration"
            className="section-shape"
          />
          <h5 className="subtitle">Latest News</h5>
          <h2 className="title">Blog & Hotel Articles</h2>
        </div>

        <div className="rooms-grid">
          {newsPosts.map((article) => (
            <div key={article._id} className="room-card">
              <div className="room-image-wrap">
                <img src={article.image} alt={article.title} />
              </div>

              <div className="room-content">
                <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: 'var(--primary-gold)', marginBottom: '10px' }}>
                  <span><Calendar size={14} /> {article.date}</span>
                  <span><User size={14} /> {article.author}</span>
                </div>

                <h3 className="room-title" style={{ fontSize: '1.4rem' }}>{article.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  {article.snippet}
                </p>

                <div className="room-footer" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '15px' }}>
                  <button className="btn-royella-outline" style={{ width: '100%' }}>
                    Read Article <ArrowRight size={16} />
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
