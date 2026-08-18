import express from 'express';
import { createCrudRouter } from './crudFactory.js';

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

import hotelInfoRouter from './hotelInfo.js';
import contactRouter from './contact.js';
import newsletterRouter from './newsletter.js';
import bookingsRouter from './bookings.js';

const router = express.Router();

// Simple content collections all share the same fetch/store/update/manage
// (GET/GET one/POST/PUT/DELETE) behaviour via the CRUD factory.
router.use('/hero-slides', createCrudRouter(HeroSlide));
router.use('/rooms', createCrudRouter(Room));
router.use('/facilities', createCrudRouter(Facility));
router.use('/services', createCrudRouter(Service));
router.use('/offers', createCrudRouter(Offer));
router.use('/testimonials', createCrudRouter(Testimonial));
router.use('/gallery', createCrudRouter(GalleryImage));
router.use('/footer-gallery', createCrudRouter(FooterGalleryImage));
router.use('/partners', createCrudRouter(PartnerLogo));
router.use('/news', createCrudRouter(NewsPost));

// Custom behaviour routes.
router.use('/hotel-info', hotelInfoRouter);
router.use('/contact', contactRouter);
router.use('/newsletter', newsletterRouter);
router.use('/bookings', bookingsRouter);

router.get('/', (req, res) => {
  res.json({
    message: 'Royella Hotel API',
    endpoints: [
      '/api/hotel-info', '/api/hero-slides', '/api/rooms', '/api/facilities',
      '/api/services', '/api/offers', '/api/testimonials', '/api/gallery',
      '/api/footer-gallery', '/api/partners', '/api/news',
      '/api/contact', '/api/newsletter', '/api/bookings'
    ]
  });
});

export default router;
