import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import SectionTitle from "../components/common/SectionTitle";
import Button from "../components/common/Button";
import axios from "axios";
import API_URL from "../config";
import headerImage from "../assets/A3.png";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
// import { toast } from 'react-toastify'; // If installed, else use alert
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding",
    guests: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(`${API_URL}/api/inquiries`, formData, config);
      alert("Thank you for your inquiry! We will get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "Wedding",
        guests: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="page contact-page">
      <PageHeader
        title="Contact Us"
        subtitle="Get in Touch"
        bgImage={headerImage}
      />

      <section className="section">
        <div className="container contact-container">
          <div className="contact-info" data-aos="fade-right">
            <SectionTitle title="Reach Out to Us" centered={false} />
            <p className="contact-desc">
              Whether you are planning a grand wedding, a corporate event, or a
              relaxing getaway, our team is here to assist you.
            </p>

            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h4>Address</h4>
                <p>
                  Elevate Resort, Gorakhpur-Kushinagar Highway, Gorakhpur, Uttar
                  Pradesh, 273001
                </p>
              </div>
            </div>

            <div className="info-item">
              <FaPhoneAlt className="info-icon" />
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
                <p>+91 12345 67890</p>
              </div>
            </div>

            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h4>Email</h4>
                <p>info@elevateresort.com</p>
                <p>bookings@elevateresort.com</p>
              </div>
            </div>

            <div className="info-item">
              <FaClock className="info-icon" />
              <div>
                <h4>Working Hours</h4>
                <p>Mon - Sun: 24 Hours Open</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper" data-aos="fade-left">
            <h3>Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Your Phone"
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Event Type</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Staycation">Staycation</option>
                    <option value="Pool Party">Pool Party</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Guest Count</label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    placeholder="Approx. Guests"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <Button text="Send Message" type="primary" onClick={() => {}} />
              {/* Button component renders <button> if no 'to' prop, but type='primary' might confuse it with html type? 
                  My Button component uses onClick. If inside form, default button type is submit. 
                  My Button component renders <button className...> without type attr, so it defaults to submit.
                  Let's check Button.jsx. It renders <button ...>. Yes.
              */}
            </form>
          </div>
        </div>
      </section>

      <section className="map-section">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113996.38676236968!2d83.3336496465451!3d26.763844620023447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991446a0c332489%3A0x1ff8192218e7c5d2!2sGorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1645434523456!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
