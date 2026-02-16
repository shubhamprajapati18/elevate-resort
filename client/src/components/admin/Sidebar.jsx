import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaBed,
  FaSwimmer,
  FaImages,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/dashboard" end>
            <FaHome /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/rooms">
            <FaBed /> Rooms
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/gallery">
            <FaImages /> Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/testimonials">
            <FaEnvelope /> Testimonials
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inquiries">
            <FaEnvelope /> Inquiries
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
