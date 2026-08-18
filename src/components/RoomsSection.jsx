import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Bed } from 'lucide-react';
import useApiData from '../hooks/useApiData';
import RoomDetailModal from './RoomDetailModal';

export default function RoomsSection() {
  const { data: roomsData, loading } = useApiData('/rooms', []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Extend data to create smooth continuous loop
  const roomsList = [...roomsData, ...roomsData];

  useEffect(() => {
    if (roomsData.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roomsData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [roomsData.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? roomsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % roomsData.length);
  };

  return (
    <section className="rooms-section" id="rooms">
      <div className="container">
        {/* Title */}
        <div className="section-title">
          <img
            src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/10/section-shape1.png"
            alt="Decoration"
            className="section-shape"
          />
          <h5 className="subtitle">ROYELLA'S ROOMS & SUITES</h5>
          <h2 className="title">ROOMS & LUXURY SUITES</h2>
          <p className="description">
            Proactively morph optimal infomediaries rather than accurate expertise. Intrinsicly progressive resources rather than resource-leveling.
          </p>
        </div>

        {loading && roomsData.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading rooms...</p>
        ) : roomsData.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No rooms available right now.</p>
        ) : (
          <>
            {/* Rooms Automatic Carousel Slider */}
            <div className="rooms-carousel-wrapper">
              <div
                className="rooms-carousel-track"
                style={{ transform: `translateX(-${currentIndex * (33.333 + 1.5)}%)` }}
              >
                {roomsList.map((room, idx) => (
                  <div key={`${room._id}-${idx}`} className="room-card-slide" onClick={() => setSelectedRoom(room)} style={{ cursor: 'pointer' }}>
                    <div className="room-image-wrap">
                      <img src={room.image} alt={room.title} />
                      <div className="room-price-badge">
                        ${room.price} | {room.priceUnit}
                      </div>
                    </div>

                    <div className="room-content">
                      <span className="room-type">{room.category}</span>
                      <h3 className="room-title">{room.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '15px' }}>{room.size}</p>

                      <div className="room-meta">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Bed size={16} color="var(--primary-gold)" />
                          <span>{room.bed}</span>
                        </div>

                        <div className="room-stars">
                          {[...Array(room.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="var(--primary-gold)" color="var(--primary-gold)" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '35px' }}>
              <button className="btn-royella-outline" style={{ color: 'var(--primary-brown-dark)', borderColor: 'var(--primary-gold)', padding: '10px 18px' }} onClick={handlePrev}>
                <ChevronLeft size={20} />
              </button>
              <button className="btn-royella-outline" style={{ color: 'var(--primary-brown-dark)', borderColor: 'var(--primary-gold)', padding: '10px 18px' }} onClick={handleNext}>
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </section>
  );
}
