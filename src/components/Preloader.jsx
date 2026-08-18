import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader-overlay">
      <img
        src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2024/02/preloader.png"
        alt="Royella Logo"
        className="preloader-logo"
      />
      <div className="preloader-text">
        {['R', 'O', 'Y', 'E', 'L', 'L', 'A'].map((letter, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.08}s` }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
