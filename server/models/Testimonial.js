import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, default: '' },
    avatar: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', TestimonialSchema);
