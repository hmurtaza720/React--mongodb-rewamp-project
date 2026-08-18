import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    discount: { type: String, required: true },
    originalPrice: { type: String, required: true },
    offerPrice: { type: String, required: true },
    rating: { type: Number, default: 5, min: 0, max: 5 },
    location: { type: String, default: '' },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Offer', OfferSchema);
