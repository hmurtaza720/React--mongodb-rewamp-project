import mongoose from 'mongoose';

// Singleton document: the whole site only ever needs one hotel-info record.
const HotelInfoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: 'Royella' },
    tagline: { type: String, default: '' },
    phone: { type: String, default: '' },
    phone2: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    hours: { type: String, default: '' },
    socials: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      dribbble: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

export default mongoose.model('HotelInfo', HotelInfoSchema);
