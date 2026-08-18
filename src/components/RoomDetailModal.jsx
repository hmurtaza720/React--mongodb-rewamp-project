import React, { useState } from 'react';
import { X, Check, Star, Users, Maximize, Bed } from 'lucide-react';
import { apiPost } from '../api/client';

export default function RoomDetailModal({ room, onClose }) {
  const [booked, setBooked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!room) return null;

  const handleBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const today = new Date();
      const checkIn = today.toISOString().slice(0, 10);
      const checkOutDate = new Date(today);
      checkOutDate.setDate(checkOutDate.getDate() + 1);
      const checkOut = checkOutDate.toISOString().slice(0, 10);

      await apiPost('/bookings', {
        roomId: room._id,
        roomTitle: room.title,
        checkIn,
        checkOut,
        guests: room.guests
      });
      setBooked(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div style={{ borderRadius: '8px', overflow: 'hidden', height: '300px', marginBottom: '25px' }}>
          <img src={room.image} alt={room.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
              {room.category}
            </span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-brown-dark)', margin: '4px 0' }}>{room.title}</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--primary-gold)' }}>
              ${room.price}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}> / {room.priceUnit}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', margin: '20px 0', padding: '15px 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Maximize size={18} color="var(--primary-gold)" /> {room.size}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bed size={18} color="var(--primary-gold)" /> {room.bed}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={18} color="var(--primary-gold)" /> {room.guests}</div>
        </div>

        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '25px' }}>
          {room.description}
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-brown-dark)', marginBottom: '15px' }}>Room Amenities & Included Services</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '30px' }}>
          {room.amenities.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'var(--text-main)' }}>
              <Check size={16} color="var(--primary-gold)" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {booked ? (
          <div style={{ background: '#e6f4ea', color: '#137333', padding: '15px', borderRadius: '4px', textAlign: 'center', fontWeight: 600 }}>
            🎉 Room Booking Request Confirmed! Our team will contact you shortly.
          </div>
        ) : (
          <>
            {error && (
              <div style={{ background: '#fdecea', color: '#b3261e', padding: '12px', borderRadius: '4px', marginBottom: '12px', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}
            <button className="btn-royella" style={{ width: '100%' }} onClick={handleBooking} disabled={submitting}>
              {submitting ? 'Booking...' : `Confirm Reservation For $${room.price}/${room.priceUnit}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
