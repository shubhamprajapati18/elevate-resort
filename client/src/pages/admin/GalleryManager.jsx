import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import axios from "axios";
import "./RoomsManager.css"; // Reusing Rooms CSS for consistency
import API_URL from "../../config";
import ImageUpload from "../../components/admin/ImageUpload";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    category: "Other",
    caption: "",
  });

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/gallery`);
      setImages(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setFormData({
      url: "",
      category: "Other",
      caption: "",
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
      await axios.post(`${API_URL}/api/gallery`, formData, config);
      fetchImages();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error saving image");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        await axios.delete(`${API_URL}/api/gallery/${id}`, config);
        fetchImages();
      } catch (err) {
        console.error(err);
        alert("Error deleting image");
      }
    }
  };

  if (loading) return <div className="loading">Loading Gallery...</div>;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Manage Gallery</h1>
          <button className="btn-primary" onClick={openModal}>
            <FaPlus /> Add Image
          </button>
        </header>

        <div className="rooms-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Category</th>
                <th>Caption</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map((img) => (
                <tr key={img.id}>
                  <td>
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="table-img"
                    />
                  </td>
                  <td>{img.category}</td>
                  <td>{img.caption}</td>
                  <td>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(img.id)}
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
                <h2>Add New Image</h2>
                <button className="close-btn" onClick={closeModal}>
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Image</label>
                  <ImageUpload
                    existingImage={formData.url}
                    onUpload={(url) => setFormData({ ...formData, url: url })}
                  />
                  <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="Or paste URL"
                    style={{ marginTop: "10px" }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Pool">Pool</option>
                    <option value="Events">Events</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Caption</label>
                  <input
                    type="text"
                    name="caption"
                    value={formData.caption}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn-primary block">
                  Add Image
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
