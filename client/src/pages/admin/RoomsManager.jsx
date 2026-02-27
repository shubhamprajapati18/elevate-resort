import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import axios from "axios";
import API_URL from "../../config";
import "./RoomsManager.css";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import ImageUpload from "../../components/admin/ImageUpload";

const RoomsManager = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    amenities: "",
    type: "Other",
  });

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/rooms`);
      setRooms(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (room = null) => {
    if (room) {
      setCurrentRoom(room);
      setFormData({
        title: room.title,
        description: room.description,
        price: room.price,
        image: room.image,
        amenities: room.amenities.join(", "),
        type: room.type,
      });
    } else {
      setCurrentRoom(null);
      setFormData({
        title: "",
        description: "",
        price: "",
        image: "",
        amenities: "",
        type: "Other",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentRoom(null);
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

    // --- Form Validations ---
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.image
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      alert("Please enter a valid positive number for the price.");
      return;
    }

    const roomData = {
      ...formData,
      amenities: formData.amenities.split(",").map((item) => item.trim()),
    };

    try {
      if (currentRoom) {
        // Update
        await axios.put(
          `${API_URL}/api/rooms/${currentRoom.id}`,
          roomData,
          config,
        );
      } else {
        // Create
        await axios.post(`${API_URL}/api/rooms`, roomData, config);
      }
      fetchRooms();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error saving room");
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        await axios.delete(`${API_URL}/api/rooms/${id}`, config);
        fetchRooms();
      } catch (err) {
        console.error(err);
        alert("Error deleting room");
      }
    }
  };

  if (loading) return <div className="loading">Loading Rooms...</div>;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Manage Rooms</h1>
          <button className="btn-primary" onClick={() => openModal()}>
            <FaPlus /> Add Room
          </button>
        </header>

        <div className="rooms-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>
                    <img
                      src={room.image}
                      alt={room.title}
                      className="table-img"
                    />
                  </td>
                  <td>{room.title}</td>
                  <td>{room.price}</td>
                  <td>{room.type}</td>
                  <td>
                    <button
                      className="action-btn edit"
                      onClick={() => openModal(room)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(room.id)}
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
                <h2>{currentRoom ? "Edit Room" : "Add New Room"}</h2>
                <button className="close-btn" onClick={closeModal}>
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                  />
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="Executive">Executive</option>
                      <option value="Bridal">Bridal</option>
                      <option value="Cottage">Cottage</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amenities (comma separated)</label>
                  <input
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn-primary block">
                  Save Room
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsManager;
