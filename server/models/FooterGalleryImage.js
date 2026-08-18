import mongoose from 'mongoose';

const FooterGalleryImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('FooterGalleryImage', FooterGalleryImageSchema);
