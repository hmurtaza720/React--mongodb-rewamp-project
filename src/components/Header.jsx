import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Grid, Menu, ChevronDown, ChevronRight } from 'lucide-react';
import useApiData from '../hooks/useApiData';

export default function Header({ activeSection, onNavigate, onOpenSidebar, onOpenMobileDrawer, onOpenBookingModal }) {
  const { data: hotelInfo } = useApiData('/hotel-info', {
    address: '', phone: '', email: '', socials: {}
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`royella-header ${scrolled ? 'scrolled' : ''}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-info">
              <div className="top-info-item">
                <MapPin size={14} />
                <span>{hotelInfo.address}</span>
              </div>
              <div className="top-info-item">
                <Phone size={14} />
                <span>{hotelInfo.phone}</span>
              </div>
              <div className="top-info-item">
                <Mail size={14} />
                <span>{hotelInfo.email}</span>
              </div>
            </div>
            <div className="top-social">
              <a href={hotelInfo.socials?.facebook || '#'} target="_blank" rel="noreferrer">Facebook</a>
              <a href={hotelInfo.socials?.twitter || '#'} target="_blank" rel="noreferrer">Twitter</a>
              <a href={hotelInfo.socials?.instagram || '#'} target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="main-nav-wrap">
        <div className="container">
          <div className="nav-container">
            {/* Logo */}
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="brand-logo">
              <img src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/logo-1-2.png" alt="Royella Hotel Logo" />
            </a>

            {/* Desktop Navigation with Multi-level Dropdowns */}
            <ul className="nav-menu">
              {/* HOME Menu with Nested Submenus */}
              <li className="nav-item has-dropdown">
                <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
                  HOME <ChevronDown size={14} />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item has-submenu">
                    <a href="#light" onClick={(e) => e.preventDefault()}>
                      DEMO LIGHT VERSION <ChevronRight size={14} className="submenu-arrow" />
                    </a>
                    <ul className="submenu">
                      <li><a href="#h1" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>LUXURY HOTEL – 01</a></li>
                      <li><a href="#h2" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>LUXURY HOTEL – 02</a></li>
                      <li><a href="#h3" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>LUXURY HOTEL – 03</a></li>
                      <li><a href="#h4" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>LUXURY HOTEL – 04</a></li>
                      <li><a href="#r1" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>HOTEL RESORT – 01</a></li>
                      <li><a href="#c1" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>CITY HOTEL – 01</a></li>
                      <li><a href="#c2" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>CITY HOTEL -02</a></li>
                      <li><a href="#mh" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>MODERN HOTEL</a></li>
                      <li><a href="#tr" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>TRAVEL & RESORT</a></li>
                      <li><a href="#dt" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>DEMO TOURISM</a></li>
                    </ul>
                  </li>

                  <li className="dropdown-item has-submenu">
                    <a href="#dark" onClick={(e) => e.preventDefault()}>
                      DEMO DARK VERSION <ChevronRight size={14} className="submenu-arrow" />
                    </a>
                    <ul className="submenu">
                      <li><a href="#hd1" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>LUXURY HOTEL DARK – 01</a></li>
                      <li><a href="#hd2" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>LUXURY HOTEL DARK – 02</a></li>
                      <li><a href="#rd1" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>RESORT DARK – 01</a></li>
                      <li><a href="#rd2" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>RESORT DARK – 02</a></li>
                      <li><a href="#cd1" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>CITY HOTEL DARK</a></li>
                    </ul>
                  </li>

                  <li className="dropdown-item has-submenu">
                    <a href="#landing" onClick={(e) => e.preventDefault()}>
                      LANDING PAGES <ChevronRight size={14} className="submenu-arrow" />
                    </a>
                    <ul className="submenu">
                      <li><a href="#lp1" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>LANDING PAGE – 01</a></li>
                      <li><a href="#lp2" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>LANDING PAGE – 02</a></li>
                    </ul>
                  </li>

                  <li className="dropdown-item">
                    <a href="#video" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>DEMO VIDEO VERSION</a>
                  </li>
                </ul>
              </li>

              {/* ABOUT Menu */}
              <li className="nav-item">
                <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>
                  ABOUT
                </a>
              </li>

              {/* ROOMS Menu */}
              <li className="nav-item has-dropdown">
                <a href="#rooms" className={`nav-link ${activeSection === 'rooms' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onNavigate('rooms'); }}>
                  ROOMS <ChevronDown size={14} />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item"><a href="#find" onClick={(e) => { e.preventDefault(); onNavigate('rooms'); }}>Find Rooms</a></li>
                  <li className="dropdown-item"><a href="#suites" onClick={(e) => { e.preventDefault(); onNavigate('rooms'); }}>Rooms & Suites</a></li>
                  <li className="dropdown-item"><a href="#details" onClick={(e) => { e.preventDefault(); onNavigate('rooms'); }}>Room Details</a></li>
                </ul>
              </li>

              {/* DINE Menu */}
              <li className="nav-item has-dropdown">
                <a href="#dine" className={`nav-link ${activeSection === 'dine' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>
                  DINE <ChevronDown size={14} />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item"><a href="#overview" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Overview</a></li>
                  <li className="dropdown-item"><a href="#menu" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Our Menu</a></li>
                  <li className="dropdown-item"><a href="#restaurant" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>The Restaurant</a></li>
                  <li className="dropdown-item"><a href="#cafe" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Lobby Cafe</a></li>
                  <li className="dropdown-item"><a href="#bar" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Rooftop Bar</a></li>
                  <li className="dropdown-item"><a href="#steak" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Steakhouse</a></li>
                  <li className="dropdown-item"><a href="#lounge" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Cigar Lounge</a></li>
                </ul>
              </li>

              {/* PLAY Menu */}
              <li className="nav-item has-dropdown">
                <a href="#play" className={`nav-link ${activeSection === 'play' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>
                  PLAY <ChevronDown size={14} />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item"><a href="#p-overview" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Play Overview</a></li>
                  <li className="dropdown-item"><a href="#hiking" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Winter Hiking</a></li>
                  <li className="dropdown-item"><a href="#summer" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Summer Activities</a></li>
                  <li className="dropdown-item"><a href="#winter" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Winter Activities</a></li>
                </ul>
              </li>

              {/* PAGES Menu */}
              <li className="nav-item has-dropdown">
                <a href="#pages" className="nav-link" onClick={(e) => e.preventDefault()}>
                  PAGES <ChevronDown size={14} />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item"><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Us</a></li>
                  <li className="dropdown-item"><a href="#service" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Service</a></li>
                  <li className="dropdown-item"><a href="#pricing" onClick={(e) => { e.preventDefault(); onNavigate('rooms'); }}>Pricing</a></li>
                  <li className="dropdown-item"><a href="#spa" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Spa & Wellness</a></li>
                  <li className="dropdown-item"><a href="#gallery" onClick={(e) => { e.preventDefault(); onNavigate('gallery'); }}>Gallery</a></li>
                </ul>
              </li>

              {/* ELEMENTS Menu */}
              <li className="nav-item has-dropdown">
                <a href="#elements" className="nav-link" onClick={(e) => e.preventDefault()}>
                  ELEMENTS <ChevronDown size={14} />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item"><a href="#el-services" onClick={(e) => { e.preventDefault(); onNavigate('facilities'); }}>Elements Services</a></li>
                  <li className="dropdown-item"><a href="#el-rooms" onClick={(e) => { e.preventDefault(); onNavigate('rooms'); }}>Elements Rooms</a></li>
                  <li className="dropdown-item"><a href="#el-offers" onClick={(e) => { e.preventDefault(); onNavigate('rooms'); }}>Elements Offers</a></li>
                  <li className="dropdown-item"><a href="#el-testimonials" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Elements Testimonials</a></li>
                </ul>
              </li>

              {/* BLOG Menu */}
              <li className="nav-item has-dropdown">
                <a href="#news" className={`nav-link ${activeSection === 'news' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onNavigate('news'); }}>
                  BLOG <ChevronDown size={14} />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item"><a href="#grid" onClick={(e) => { e.preventDefault(); onNavigate('news'); }}>Blog Grid</a></li>
                  <li className="dropdown-item"><a href="#lists" onClick={(e) => { e.preventDefault(); onNavigate('news'); }}>Blog Lists</a></li>
                </ul>
              </li>

              {/* CONTACT Menu */}
              <li className="nav-item">
                <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>
                  CONTACT
                </a>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="header-actions">
              <button className="btn-royella-outline" onClick={onOpenBookingModal} style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff' }}>
                BOOKING ONLINE
              </button>

              <button className="sidebar-toggle-btn" onClick={onOpenSidebar} title="Open Info Drawer">
                <Grid size={22} />
              </button>

              <button className="mobile-toggle-btn" onClick={onOpenMobileDrawer} title="Toggle Mobile Menu">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
