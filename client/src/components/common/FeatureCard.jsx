import React from "react";
import "./FeatureCard.css";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card" data-aos="fade-up">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
