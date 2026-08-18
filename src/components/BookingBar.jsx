import React, { useState } from 'react';
import { Calendar, Users, Home, Search } from 'lucide-react';
import { apiPost } from '../api/client';

export default function BookingBar({ onSearchRooms }) {
  const [checkIn, setCheckIn] = useState('2026-08-15');
  const [checkOut, setCheckOut] = useState('2026-08-20');
  const [roomType, setRoomType] = useState('01 Rooms');
  const [guests, setGuests] = useState('02 Adult, 0 Child');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Store the search as a booking inquiry in MongoDB.
      await apiPost('/bookings', { checkIn, checkOut, roomsRequested: roomType, guests });
    } catch (err) {
      // Non-fatal: the visual "searching rooms" flow below still runs even
      // if the API call fails, so the UI stays responsive.
      console.error('Failed to save booking search:', err.message);
    } finally {
      setSubmitting(false);
    }
    onSearchRooms({ checkIn, checkOut, roomType, guests });
  };

  return (
    <div className="booking-bar-container">
      <div className="container">
        <div className="booking-bar">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="booking-input-group">
              <label><Calendar size={16} style={{ marginRight: '6px', color: 'var(--primary-gold)' }} /> Check In</label>
              <input
                type="date"
                className="booking-field"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>

            <div className="booking-input-group">
              <label><Calendar size={16} style={{ marginRight: '6px', color: 'var(--primary-gold)' }} /> Check Out</label>
              <input
                type="date"
                className="booking-field"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>

            <div className="booking-input-group">
              <label><Home size={16} style={{ marginRight: '6px', color: 'var(--primary-gold)' }} /> Rooms</label>
              <select className="booking-field" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                <option value="01 Rooms">01 Rooms</option>
                <option value="02 Rooms">02 Rooms</option>
                <option value="03 Rooms">03 Rooms</option>
                <option value="04 Rooms">04 Rooms</option>
              </select>
            </div>

            <div className="booking-input-group">
              <label><Users size={16} style={{ marginRight: '6px', color: 'var(--primary-gold)' }} /> Guests</label>
              <select className="booking-field" value={guests} onChange={(e) => setGuests(e.target.value)}>
                <option value="01 Adult, 0 Child">01 Adult, 0 Child</option>
                <option value="02 Adult, 0 Child">02 Adult, 0 Child</option>
                <option value="03 Adult, 1 Child">03 Adult, 1 Child</option>
                <option value="04 Adult, 2 Child">04 Adult, 2 Child</option>
              </select>
            </div>

            <button type="submit" className="btn-royella" style={{ height: '48px' }} disabled={submitting}>
              <Search size={18} /> {submitting ? 'Searching...' : 'Book Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
