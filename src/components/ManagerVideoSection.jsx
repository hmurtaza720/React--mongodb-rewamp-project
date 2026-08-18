import React from 'react';
import { Play } from 'lucide-react';

export default function ManagerVideoSection({ onOpenVideo }) {
  return (
    <section className="manager-section">
      <div className="container">
        {/* The card is pulled up so it overlaps the dark facilities band above it. */}
        <div className="manager-card">
          <div className="manager-content">
            <h5 className="manager-subtitle">Manager</h5>
            <h2 className="manager-title">
              Luxury Best Hotel In
              <br />
              Californta, USA
            </h2>
            <p className="manager-description">
              Rapidiously myocardinate cross-platform intellectual capital after model.
              Appropriately create interactive infrastructures after main Holisticly facilitate
              stand-alone inframe.
            </p>

            <p className="manager-quote">
              &ldquo; Model. Appropriately create interactive infrastructures after main Holisticly
              facilitate stand-alone inframe of the world &rdquo;
            </p>

            <div className="manager-author">
              <img
                src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/call-do-action-img.png"
                alt="John D. Alexon"
              />
              <div className="manager-author-bio">
                <h4>John D. Alexon</h4>
                <span>Manager</span>
              </div>
            </div>
          </div>

          <div className="manager-video">
            <img
              src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2024/01/videoimg.jpg"
              alt="Hotel video tour"
            />
            <button className="play-video-btn" onClick={onOpenVideo} title="Watch Virtual Hotel Tour">
              <Play size={24} fill="#ffffff" strokeWidth={0} style={{ marginLeft: '3px' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
