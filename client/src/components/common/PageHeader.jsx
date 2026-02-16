import React from "react";
import "./PageHeader.css";

const PageHeader = ({ title, subtitle, bgImage }) => {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="header-overlay"></div>
      <div className="header-content container" data-aos="fade-up">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
