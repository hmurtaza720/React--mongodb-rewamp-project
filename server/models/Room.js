import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    priceUnit: { type: String, default: 'Night' },
    image: { type: String, required: true },
    size: { type: String, default: '' },
    bed: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 0, max: 5 },
    guests: { type: String, default: '' },
    description: { type: String, default: '' },
    amenities: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Room', RoomSchema);
