// Populates MongoDB with the site's original hardcoded content so the
// frontend has real data to fetch the first time it runs against the API.
//
// Usage:
//   npm run seed          -> insert (skips collections that already have data)
//   npm run seed:destroy  -> wipe all content collections, then exit

import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';

import HotelInfo from '../models/HotelInfo.js';
import HeroSlide from '../models/HeroSlide.js';
import Room from '../models/Room.js';
import Facility from '../models/Facility.js';
import Service from '../models/Service.js';
import Offer from '../models/Offer.js';
import Testimonial from '../models/Testimonial.js';
import GalleryImage from '../models/GalleryImage.js';
import FooterGalleryImage from '../models/FooterGalleryImage.js';
import PartnerLogo from '../models/PartnerLogo.js';
import NewsPost from '../models/NewsPost.js';

import {
  hotelInfo, heroSlides, rooms, facilities, services, offers,
  testimonials, galleryImages, footerGallery, partnerLogos, newsPosts
} from './seedData.js';

const collections = [
  { Model: HeroSlide, data: heroSlides, name: 'hero slides' },
  { Model: Room, data: rooms, name: 'rooms' },
  { Model: Facility, data: facilities, name: 'facilities' },
  { Model: Service, data: services, name: 'services' },
  { Model: Offer, data: offers, name: 'offers' },
  { Model: Testimonial, data: testimonials, name: 'testimonials' },
  { Model: GalleryImage, data: galleryImages, name: 'gallery images' },
  { Model: FooterGalleryImage, data: footerGallery, name: 'footer gallery images' },
  { Model: PartnerLogo, data: partnerLogos, name: 'partner logos' },
  { Model: NewsPost, data: newsPosts, name: 'news posts' }
];

async function destroy() {
  await connectDB();
  for (const { Model, name } of collections) {
    const { deletedCount } = await Model.deleteMany({});
    console.log(`[Seed] Cleared ${deletedCount} ${name}`);
  }
  await HotelInfo.deleteMany({});
  console.log('[Seed] Cleared hotel info');
  await mongoose.disconnect();
  console.log('[Seed] Done.');
}

async function seed() {
  await connectDB();

  const existingInfo = await HotelInfo.findOne();
  if (!existingInfo) {
    await HotelInfo.create(hotelInfo);
    console.log('[Seed] Created hotel info');
  } else {
    console.log('[Seed] Hotel info already exists, skipping');
  }

  for (const { Model, data, name } of collections) {
    const count = await Model.countDocuments();
    if (count > 0) {
      console.log(`[Seed] ${name} already has ${count} document(s), skipping`);
      continue;
    }
    const inserted = await Model.insertMany(data);
    console.log(`[Seed] Inserted ${inserted.length} ${name}`);
  }

  await mongoose.disconnect();
  console.log('[Seed] Done.');
}

const isDestroy = process.argv.includes('--destroy');
(isDestroy ? destroy() : seed()).catch((err) => {
  console.error('[Seed] Failed:', err);
  process.exit(1);
});
