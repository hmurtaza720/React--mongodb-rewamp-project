// Initial content for MongoDB, carried over from the old src/data/hotelData.js
// hardcoded arrays so the site looks identical the first time it runs against
// the database.

export const hotelInfo = {
  name: 'Royella',
  tagline: 'Resort & Luxury Hotel',
  phone: '(111) 111-111-1111',
  phone2: '+1 800 555 0199',
  email: 'info@royellahotel.com',
  address: 'Chicago 12, Melborne City, California, USA',
  hours: 'Week Days: 09.00 to 18.00 | Sunday: Closed',
  socials: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    dribbble: 'https://dribbble.com'
  }
};

export const heroSlides = [
  {
    bgImage: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/hero-bg2.jpg',
    subtitle: 'Luxury Hotel And Resort',
    title: 'The Best Luxury Hotel In California',
    rating: 5,
    ctaText: 'Discover More',
    order: 1
  },
  {
    bgImage: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/12/hero-bg.jpg',
    subtitle: 'Exclusive Coastal Retreat',
    title: 'Experience World-Class Elegance & Comfort',
    rating: 5,
    ctaText: 'Explore Rooms',
    order: 2
  },
  {
    bgImage: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/12/single-room1-1.jpg',
    subtitle: 'Premium Hospitality',
    title: 'Your Private Oasis of Peace & Relaxation',
    rating: 5,
    ctaText: 'Book Your Stay',
    order: 3
  }
];

export const rooms = [
  {
    title: 'Delux Family Rooms',
    category: 'Luxury Room',
    price: 560,
    priceUnit: 'Night',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/10/room-1.jpg',
    size: '1500 SQ.FT',
    bed: '2 King Bed',
    rating: 5,
    guests: '4 Guests',
    description: 'Spacious luxury room featuring panoramic ocean views, master suite layout, private balcony, marble bathroom, and 24/7 dedicated butler service.',
    amenities: ['Free High-Speed Wi-Fi', 'Private Jacuzzi', 'Smart Home Automation', 'Mini Bar', '24h Room Service']
  },
  {
    title: 'Double Suite Rooms',
    category: 'Luxury Suite',
    price: 460,
    priceUnit: 'Day',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/room-2.jpg',
    size: '1350 SQ.FT',
    bed: '2 King Bed',
    rating: 4,
    guests: '3 Guests',
    description: 'Elegantly furnished double suite designed for ultimate comfort, featuring plush bedding, relaxing lounge area, and serene garden view.',
    amenities: ['Free High-Speed Wi-Fi', 'Espresso Coffee Machine', 'Flat Screen TV', 'Mini Bar', 'Daily Breakfast']
  },
  {
    title: 'Superior Bed Rooms',
    category: 'Deluxe Room',
    price: 260,
    priceUnit: 'Night',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/room-3.jpg',
    size: '1100 SQ.FT',
    bed: '1 King Bed',
    rating: 5,
    guests: '2 Guests',
    description: 'Modern superior room combining minimalist aesthetic with warm homely tones. Ideal for couples seeking a cozy getaway.',
    amenities: ['Free High-Speed Wi-Fi', 'Air Conditioning', 'In-room Safe', 'Rain Shower', 'Work Desk']
  },
  {
    title: 'Deluxe Double Rooms',
    category: 'Deluxe Room',
    price: 340,
    priceUnit: 'Night',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/room-2.jpg',
    size: '1250 SQ.FT',
    bed: '2 Queen Bed',
    rating: 4,
    guests: '4 Guests',
    description: 'Comfortable double bedroom suite with stylish contemporary decor, complimentary luxury toiletries, and soundproof acoustics.',
    amenities: ['Free High-Speed Wi-Fi', 'Satellite TV', 'Balcony View', 'Mini Fridge', 'Bathrobes']
  }
];

export const facilities = [
  { name: 'Room Services', icon: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/feature-1.png', order: 1 },
  { name: 'Wi-Fi Internet', icon: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/feature-2-1.png', order: 2 },
  { name: 'Smart Key', icon: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/feature-3.png', order: 3 },
  { name: 'Breakfast', icon: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/feature-4.png', active: true, order: 4 },
  { name: 'Swimming Pool', icon: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/feature-5.png', order: 5 },
  { name: 'Wi-Fi Internet', icon: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/feature-2-1.png', order: 6 }
];

export const services = [
  {
    subtitle: 'FITNESS & HEALTH',
    title: 'Gym Training Grounds',
    description: 'State-of-the-art cardiovascular and strength training equipment staffed by certified personal trainers to maintain your fitness routine in luxury.',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/facilities-thumb-1.jpg',
    order: 1
  },
  {
    subtitle: 'SWIMMING POOL',
    title: 'Indoor Heated Swimming Pool',
    description: 'Immerse yourself in our crystal-clear temperature-controlled indoor pool surrounded by comfortable lounge cabanas and soothing music.',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/facilities-thumb-2.jpg',
    order: 2
  },
  {
    subtitle: 'RESTAURANT & FINE DINING',
    title: 'The Restaurant Center',
    description: 'Indulge in an exquisite culinary journey curated by Michelin-starred chefs using organic locally sourced ingredients and vintage wines.',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/facilities-thumb-3.jpg',
    order: 3
  },
  {
    subtitle: 'WELLNESS & SPA',
    title: 'Spa & Holistic Wellness',
    description: 'Reinvigorate your mind and body with tailored hydrotherapy treatments, essential oil massages, sauna retreats, and skin care therapies.',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/facilities-thumb-4.jpg',
    order: 4
  }
];

export const offers = [
  {
    title: 'Double Suite Room',
    discount: '25% OFF',
    originalPrice: '$280',
    offerPrice: '$200',
    rating: 4.5,
    location: 'California, USA',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/offers-2.jpg'
  },
  {
    title: 'Superior Bed Room',
    discount: '28% OFF',
    originalPrice: '$260',
    offerPrice: '$185',
    rating: 4.8,
    location: 'Sydney, Australia',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/offers-2-1.jpg'
  },
  {
    title: 'Deluxe Family Room',
    discount: '35% OFF',
    originalPrice: '$560',
    offerPrice: '$364',
    rating: 4.9,
    location: 'Vancouver, Canada',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/offers-3.jpg'
  }
];

export const testimonials = [
  {
    quote: 'Professionally repurpose flexible testing procedures via molla in customer service. Dynamically reconceptualize value-added the systems before manufactured products. Enthusiastically envisioneer emerging best',
    author: 'Allena Gomez',
    role: 'Manager',
    avatar: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/testi-author-2.png'
  },
  {
    quote: 'Professionally repurpose flexible testing procedures via molla in customer service. Dynamically reconceptualize value-added the systems before manufactured products. Enthusiastically envisioneer emerging best',
    author: 'John D. Alexon',
    role: 'Manager',
    avatar: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/testi-author.png'
  },
  {
    quote: 'Professionally repurpose flexible testing procedures via molla in customer service. Dynamically reconceptualize value-added the systems before manufactured products. Enthusiastically envisioneer emerging best',
    author: 'Allena Gomez',
    role: 'Manager',
    avatar: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/testi-author-2.png'
  },
  {
    quote: 'Professionally repurpose flexible testing procedures via molla in customer service. Dynamically reconceptualize value-added the systems before manufactured products. Enthusiastically envisioneer emerging best',
    author: 'John D. Alexon',
    role: 'Manager',
    avatar: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/testi-author.png'
  }
];

export const galleryImages = [
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/hero-bg2.jpg',
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/10/room-1.jpg',
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/facilities-thumb-3.jpg',
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/facilities-thumb-4.jpg',
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/offers-2.jpg',
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2024/01/videoimg.jpg'
].map((url, i) => ({ url, order: i + 1 }));

export const footerGallery = [
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/2.jpg',
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/3.jpg',
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/5.jpg',
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/6.jpg',
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/1.jpg',
  'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/4.jpg'
].map((url, i) => ({ url, order: i + 1 }));

export const partnerLogos = [
  { slug: 'luxuryous', src: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/brand-2.png', alt: 'Luxuryous' },
  { slug: 'royella', src: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/brand-1.png', alt: 'Royella' },
  { slug: 'hotellax', src: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/brand-3.png', alt: 'Hotellax' }
];

export const newsPosts = [
  {
    title: '10 Reasons Why Royella is Voted #1 Hotel in California',
    date: 'August 05, 2026',
    author: 'Hotel Staff',
    snippet: 'Discover how our commitment to homely luxury, personalized guest service, and sustainable practices redefined high-end hospitality.',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/offers-2.jpg'
  },
  {
    title: 'Unveiling Our New Organic Spa & Hydrotherapy Center',
    date: 'July 28, 2026',
    author: 'Wellness Team',
    snippet: 'Step into tranquility with our expanded wellness facility featuring certified natural therapies and custom aromatherapy sessions.',
    image: 'https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/facilities-thumb-4.jpg'
  }
];
