import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import axios from "axios";
import API_URL from "../../config";
import "./RoomsManager.css"; // Reusing table styles
import { FaCheck, FaEye, FaEnvelope, FaTrash } from "react-icons/fa";

const InquiriesManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      const res = await axios.get(`${API_URL}/api/inquiries`, config);
      setInquiries(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      };
      await axios.put(
        `${API_URL}/api/inquiries/${id}`,
        { status: newStatus },
        config,
      );
      fetchInquiries();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  const openModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    if (inquiry.status === "New") {
      updateStatus(inquiry.id, "Read");
    }
  };

  const closeModal = () => {
    setSelectedInquiry(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        await axios.delete(`${API_URL}/api/inquiries/${id}`, config);
        fetchInquiries();
      } catch (err) {
        console.error(err);
        alert("Error deleting inquiry");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    // If it's already in DD/MM/YYYY format, passing it to new Date() causes Invalid Date.
    if (dateString.includes("/")) return dateString;

    // Otherwise parse it (e.g., if it's an ISO timestamp from MongoDB legacy data)
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Fallback to raw string
    return date.toLocaleDateString("en-GB"); // DD/MM/YYYY
  };

  if (loading) return <div className="loading">Loading Inquiries...</div>;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Inquiries</h1>
        </header>

        <div className="rooms-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className={inquiry.status === "New" ? "new-inquiry" : ""}
                >
                  <td>{formatDate(inquiry.date)}</td>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.eventType}</td>
                  <td>
                    <span
                      className={`status-badge ${inquiry.status.toLowerCase()}`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-btn view"
                      onClick={() => openModal(inquiry)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    {inquiry.status !== "Contacted" && (
                      <button
                        className="action-btn edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(inquiry.id, "Contacted");
                        }}
                        title="Mark as Contacted"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      className="action-btn delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(inquiry.id);
                      }}
                      title="Delete Inquiry"
                    >
                      <FaTrash xmlns="http://www.w3.org/2000/svg" />{" "}
                      {/* FaTrash import needed or just Icon */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedInquiry && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Inquiry Details</h2>
                <button className="close-btn" onClick={closeModal}>
                  ×
                </button>
              </div>
              <div className="inquiry-details">
                <p>
                  <strong>Name:</strong> {selectedInquiry.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedInquiry.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedInquiry.phone}
                </p>
                <p>
                  <strong>Event Type:</strong> {selectedInquiry.eventType}
                </p>
                <p>
                  <strong>Guests:</strong> {selectedInquiry.guests}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(selectedInquiry.date)}
                </p>
                <div className="message-box">
                  <strong>Message:</strong>
                  <p>{selectedInquiry.message}</p>
                </div>

                <div className="modal-actions" style={{ marginTop: "20px" }}>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="btn-primary"
                  >
                    <FaEnvelope /> Reply via Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiriesManager;
