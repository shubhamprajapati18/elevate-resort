import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css"; // Will create CSS later

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <h3>Elevate Resort</h3>
          <p>The largest and most premium resort in Gorakhpur.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/weddings-events">Weddings</Link>
            </li>
            <li>
              <Link to="/accommodation">Rooms</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>Gorakhpur, Uttar Pradesh</p>
          <p>+91 98765 43210</p>
          <p>info@elevateresort.com</p>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Elevate Resort. All rights reserved.
        </p>
        <Link to="/admin/login" className="admin-link">
          Owner Login
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
