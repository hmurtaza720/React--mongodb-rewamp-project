import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('GalleryImage', GalleryImageSchema);
