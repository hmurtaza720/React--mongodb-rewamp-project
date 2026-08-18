import React from 'react';
import { X, MapPin, Phone, Mail, Clock } from 'lucide-react';
import useApiData from '../hooks/useApiData';

export default function SidebarInfo({ isOpen, onClose }) {
  const { data: hotelInfo } = useApiData('/hotel-info', {});

  if (!isOpen) return null;

  return (
    <>
      <div className="offcanvas-overlay open" onClick={onClose} />
      <aside className="offcanvas-sidebar open">
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Close Sidebar">
          <X size={24} />
        </button>

        <div className="sidebar-brand">
          <img src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/logo-1-2.png" alt="Royella Logo" />
        </div>

        <div className="sidebar-widget">
          <h3 className="sidebar-widget-title">About Royella</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
            Royella is a luxury resort & hotel in California offering world-class accommodations, fine dining, infinity pools, and holistic spa treatments in an authentic warm brown and homely aesthetic.
          </p>
        </div>

        <div className="sidebar-widget">
          <h3 className="sidebar-widget-title">Contact Info</h3>
          <ul className="sidebar-contact-list">
            <li className="sidebar-contact-item">
              <MapPin size={18} />
              <span>{hotelInfo.address}</span>
            </li>
            <li className="sidebar-contact-item">
              <Phone size={18} />
              <span>{hotelInfo.phone}</span>
            </li>
            <li className="sidebar-contact-item">
              <Mail size={18} />
              <span>{hotelInfo.email}</span>
            </li>
            <li className="sidebar-contact-item">
              <Clock size={18} />
              <span>{hotelInfo.hours}</span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
