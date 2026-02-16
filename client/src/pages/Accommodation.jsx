import React, { useState, useEffect } from "react";
import API_URL from "../config";
import RoomCard from "../components/common/RoomCard";
import PageHeader from "../components/common/PageHeader";
import "./Accommodation.css";

const Accommodation = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("axios").then((axios) => {
      axios.default
        .get(`${API_URL}/api/rooms`)
        .then((res) => {
          setRooms(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    });
  }, []);

  if (loading) return <div className="loading">Loading Accommodation...</div>;

  return (
    <div className="page accommodation-page">
      <PageHeader
        title="Luxury Accommodation"
        subtitle="Stay in Comfort & Style"
        bgImage="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section">
        <div
          className="container"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <p
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              fontSize: "1.1rem",
              color: "#555",
            }}
          >
            Experience the finest hospitality at Elevate Resort. Each room is
            thoughtfully designed to provide you with the utmost comfort and
            luxury.
          </p>
        </div>
        <div className="container rooms-grid">
          {rooms.map((room, index) => (
            <RoomCard key={index} {...room} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Accommodation;
