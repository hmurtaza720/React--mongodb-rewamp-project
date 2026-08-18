import mongoose from 'mongoose';

// Stores every "Book Now" / room-search submission from the booking bar
// and the room-detail "Confirm Reservation" button.
const BookingSchema = new mongoose.Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: false },
    roomTitle: { type: String, default: '' },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    guests: { type: String, default: '' },
    roomsRequested: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', BookingSchema);
