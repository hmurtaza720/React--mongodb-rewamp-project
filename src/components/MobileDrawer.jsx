import React from 'react';
import { X } from 'lucide-react';

export default function MobileDrawer({ isOpen, onClose, activeSection, onNavigate }) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'facilities', label: 'Hotel Facilities' },
    { id: 'gallery', label: 'Photo Gallery' },
    { id: 'news', label: 'Blog & News' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <>
      <div className="offcanvas-overlay open" onClick={onClose} />
      <aside className="offcanvas-sidebar open" style={{ left: 0, right: 'auto' }}>
        <button className="sidebar-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="sidebar-brand" style={{ textAlign: 'center' }}>
          <img src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/logo-1-2.png" alt="Royella Logo" />
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                  onClose();
                }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  color: activeSection === item.id ? 'var(--primary-gold)' : '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
