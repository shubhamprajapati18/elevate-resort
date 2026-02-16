import React from "react";
import { FaWifi, FaCoffee, FaBath, FaTv } from "react-icons/fa";
import Button from "./Button";
import "./RoomCard.css";

const RoomCard = ({ image, title, description, price, amenities }) => {
  return (
    <div className="room-card" data-aos="fade-up">
      <div className="room-image">
        <img src={image} alt={title} />
        <div className="room-price">{price}</div>
      </div>
      <div className="room-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="room-amenities">
          {amenities.map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {amenity}
            </span>
          ))}
        </div>
        <div className="room-footer">
          <div className="icon-row">
            <FaWifi title="Free Wifi" />
            <FaCoffee title="Breakfast" />
            <FaBath title="Luxury Bath" />
            <FaTv title="Smart TV" />
          </div>
          <Button to="/contact-us" text="Book Now" type="primary" />
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
