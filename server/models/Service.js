import mongoose from 'mongoose';

// "Featured services" band (Gym, Pool, Restaurant, Spa...).
const ServiceSchema = new mongoose.Schema(
  {
    subtitle: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, required: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Service', ServiceSchema);
