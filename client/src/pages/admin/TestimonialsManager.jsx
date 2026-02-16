import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import axios from "axios";
import API_URL from "../../config";
import "./RoomsManager.css";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import ImageUpload from "../../components/admin/ImageUpload";

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
    image: "",
  });

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/testimonials`);
      setTestimonials(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setFormData({
      name: "",
      role: "",
      text: "",
      rating: 5,
      image: "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(`${API_URL}/api/testimonials`, formData, config);
      fetchTestimonials();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error saving testimonial");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        await axios.delete(`${API_URL}/api/testimonials/${id}`, config);
        fetchTestimonials();
      } catch (err) {
        console.error(err);
        alert("Error deleting testimonial");
      }
    }
  };

  if (loading) return <div className="loading">Loading Testimonials...</div>;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Manage Testimonials</h1>
          <button className="btn-primary" onClick={openModal}>
            <FaPlus /> Add Testimonial
          </button>
        </header>

        <div className="rooms-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t._id}>
                  <td>
                    {t.image && (
                      <img src={t.image} alt={t.name} className="table-img" />
                    )}
                  </td>
                  <td>{t.name}</td>
                  <td>{t.role}</td>
                  <td>{t.rating} / 5</td>
                  <td>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(t._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Testimonial</h2>
                <button className="close-btn" onClick={closeModal}>
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Rating (1-5)</label>
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Review Text</label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    required
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <ImageUpload
                    existingImage={formData.image}
                    onUpload={(url) => setFormData({ ...formData, image: url })}
                  />
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Or paste URL"
                    style={{ marginTop: "10px" }}
                  />
                </div>
                <button type="submit" className="btn-primary block">
                  Add Testimonial
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsManager;
