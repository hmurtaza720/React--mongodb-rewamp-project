import mongoose from 'mongoose';

const PartnerLogoSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    src: { type: String, required: true },
    alt: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('PartnerLogo', PartnerLogoSchema);
