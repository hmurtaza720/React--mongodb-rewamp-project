import React, { useState } from 'react';
import useScrollReveal from './hooks/useScrollReveal';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Header from './components/Header';
import SidebarInfo from './components/SidebarInfo';
import MobileDrawer from './components/MobileDrawer';
import HeroSlider from './components/HeroSlider';
import BookingBar from './components/BookingBar';
import AboutSection from './components/AboutSection';
import RoomsSection from './components/RoomsSection';
import FacilitiesGrid from './components/FacilitiesGrid';
import FeaturedServices from './components/FeaturedServices';
import ManagerVideoSection from './components/ManagerVideoSection';
import VideoModal from './components/VideoModal';
import OffersCarousel from './components/OffersCarousel';
import Testimonials from './components/Testimonials';
import GalleryGrid from './components/GalleryGrid';
import NewsSection from './components/NewsSection';
import Newsletter from './components/Newsletter';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [bookingNotice, setBookingNotice] = useState(null);

  // Staggered scroll-reveal animations across every section
  useScrollReveal();

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchRooms = (filters) => {
    setBookingNotice(
      `🔍 Searching rooms from ${filters.checkIn} to ${filters.checkOut} for ${filters.guests}...`
    );
    setTimeout(() => {
      setBookingNotice(null);
      handleNavigate('rooms');
    }, 2000);
  };

  return (
    <div className="royella-app">
      {/* Signature Custom Following Cursor */}
      <CustomCursor />

      {/* Signature Royella Preloader */}
      <Preloader />

      {/* Main Sticky Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
        onOpenBookingModal={() => handleNavigate('rooms')}
      />

      {/* Slide-out Drawers */}
      <SidebarInfo isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Booking Toast Banner */}
      {bookingNotice && (
        <div
          style={{
            position: 'fixed',
            top: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--primary-brown-dark)',
            color: 'var(--primary-gold)',
            padding: '14px 28px',
            borderRadius: '50px',
            zIndex: 9999,
            boxShadow: 'var(--shadow-lg)',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.1rem',
            border: '1px solid var(--border-gold)'
          }}
        >
          {bookingNotice}
        </div>
      )}

      {/* Hero Banner Slider */}
      <HeroSlider onExplore={() => handleNavigate('rooms')} />

      {/* Interactive Booking Bar */}
      <BookingBar onSearchRooms={handleSearchRooms} />

      {/* Main Page Sections */}
      <AboutSection onNavigate={handleNavigate} />
      <RoomsSection />
      <FacilitiesGrid />
      {/* Sits directly after the dark facilities band — its card overlaps upward into it. */}
      <ManagerVideoSection onOpenVideo={() => setIsVideoOpen(true)} />
      <FeaturedServices onNavigate={handleNavigate} />
      <OffersCarousel onBookOffer={(offer) => handleNavigate('rooms')} />
      <Testimonials />
      <GalleryGrid />
      <NewsSection />
      <ContactSection />
      <Newsletter />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Video Popup Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
}
