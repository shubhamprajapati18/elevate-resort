import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";
import { FaWhatsapp } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content" data-aos="fade-up" data-aos-duration="1500">
        <span className="hero-welcome-text">WELCOME TO GORAKHPUR'S FINEST</span>

        <h1 className="hero-title">
          Elevate Your Lifestyle,
          <br />
          Celebrate Your Dreams
        </h1>

        <p className="hero-desc">
          The largest and most premium resort in Gorakhpur — a luxury wedding
          venue with swimming pool, executive accommodation, and world-class
          hospitality.
        </p>

        <div className="hero-buttons">
          <Link to="/contact-us" className="hero-btn btn-gold">
            BOOK NOW
          </Link>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn btn-dark-green"
          >
            WHATSAPP BOOKING
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
