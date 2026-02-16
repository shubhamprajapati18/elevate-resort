import React from "react";
import "./SectionTitle.css";

const SectionTitle = ({ title, subtitle, centered = true, light = false }) => {
  return (
    <div
      className={`section-title ${centered ? "centered" : ""} ${light ? "light" : ""}`}
      data-aos="fade-up"
    >
      {subtitle && <span className="subtitle">{subtitle}</span>}
      <h2>{title}</h2>
      <div className="divider"></div>
    </div>
  );
};

export default SectionTitle;
