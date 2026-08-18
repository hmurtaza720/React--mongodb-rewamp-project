import mongoose from 'mongoose';

const HeroSlideSchema = new mongoose.Schema(
  {
    bgImage: { type: String, required: true },
    subtitle: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: Number, default: 5, min: 0, max: 5 },
    ctaText: { type: String, default: 'Discover More' },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('HeroSlide', HeroSlideSchema);
