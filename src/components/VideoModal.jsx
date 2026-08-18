import React from 'react';
import { X } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoUrl }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '900px', padding: '0', background: '#000000', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          style={{ color: '#ffffff', zIndex: 10, top: '15px', right: '15px' }}
        >
          <X size={28} />
        </button>

        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            title="Royella Video Tour"
            src="https://www.youtube-nocookie.com/embed/zr4r3n5Smho?autoplay=1"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
