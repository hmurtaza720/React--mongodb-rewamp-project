import mongoose from 'mongoose';

const NewsPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, default: '' },
    snippet: { type: String, default: '' },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('NewsPost', NewsPostSchema);
