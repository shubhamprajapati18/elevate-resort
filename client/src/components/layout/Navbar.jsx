import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css"; // Will create CSS later

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <h1>ELEVATE RESORT</h1>
        </Link>
        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/weddings-events"
              onClick={() => setMobileMenuOpen(false)}
            >
              Weddings & Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accommodation"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accommodation
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/swimming-pool-leisure"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pool & Leisure
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" onClick={() => setMobileMenuOpen(false)}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className="btn-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </NavLink>
          </li>
        </ul>
        <div
          className="mobile-menu-icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
