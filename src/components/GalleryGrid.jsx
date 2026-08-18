import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';
import useApiData from '../hooks/useApiData';

export default function GalleryGrid() {
  const { data: images } = useApiData('/gallery', []);
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-title">
          <img
            src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/10/section-shape1.png"
            alt="Decoration"
            className="section-shape"
          />
          <h5 className="subtitle">Visual Tour</h5>
          <h2 className="title">Photo Gallery Showcase</h2>
        </div>

        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div key={img._id} className="gallery-item" onClick={() => setActiveImage(img.url)}>
              <img src={img.url} alt={`Gallery ${idx + 1}`} />
              <div className="gallery-overlay">
                <Eye size={28} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="modal-backdrop" onClick={() => setActiveImage(null)}>
          <div className="modal-card" style={{ padding: 0, maxWidth: '900px', background: 'transparent' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" style={{ color: '#ffffff', top: '-40px', right: 0 }} onClick={() => setActiveImage(null)}>
              <X size={32} />
            </button>
            <img src={activeImage} alt="Enlarged gallery view" style={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px' }} />
          </div>
        </div>
      )}
    </section>
  );
}
