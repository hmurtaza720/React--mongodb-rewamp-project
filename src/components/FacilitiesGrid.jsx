import React from 'react';
import useApiData from '../hooks/useApiData';

export default function FacilitiesGrid() {
  const { data: facilities } = useApiData('/facilities', []);

  return (
    <section className="facilities-section" id="facilities">
      <div className="container">
        <div className="section-title">
          <div className="section-image">
            <img
              src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/10/section-shape1.png"
              alt=""
            />
          </div>
          <h2 className="title">Hotel&rsquo;s Facilities</h2>
          <p className="description">
            Proactively morph optimal infomediaries rather than accurate expertise. Intrinsicly
            progressive resources rather than resource-leveling
          </p>
        </div>

        <div className="facilities-grid">
          {facilities.map((item) => (
            <div key={item._id} className={`facility-card ${item.active ? 'active' : ''}`}>
              <div className="facility-icon">
                <img src={item.icon} alt="" />
              </div>
              <h4 className="facility-name">{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
