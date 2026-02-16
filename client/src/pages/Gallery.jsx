import React, { useState, useEffect } from "react";
import API_URL from "../config";
import SectionTitle from "../components/common/SectionTitle";
import PageHeader from "../components/common/PageHeader";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Gallery.css";

// Images fetched from API

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filters = ["All", "Weddings", "Accommodation", "Pool", "Events"];

  useEffect(() => {
    import("axios").then((axios) => {
      axios.default
        .get(`${API_URL}/api/gallery`)
        .then((res) => {
          // Map API data to component format if needed, or just use as is
          // API returns { _id, url, category, caption }
          // Component expects { id, src, category, alt }
          const formattedImages = res.data.map((img) => ({
            id: img._id,
            src: img.url,
            category: img.category,
            alt: img.caption || img.category,
          }));
          setImages(formattedImages);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    });
  }, []);

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction) => {
    if (selectedImageIndex === null) return;
    const newIndex =
      (selectedImageIndex + direction + filteredImages.length) %
      filteredImages.length;
    setSelectedImageIndex(newIndex);
  };

  return (
    <div className="page gallery-page">
      <PageHeader
        title="Photo Gallery"
        subtitle="Capturing Moments"
        bgImage="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section">
        <div className="container">
          <SectionTitle title="Our Collection" centered={true} />

          <div className="filter-tabs">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(index)}
                data-aos="fade-up"
              >
                <img src={image.src} alt={image.alt} />
                <div className="gallery-overlay">
                  <span>View Image</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="lightbox-overlay">
          <button className="close-btn" onClick={closeLightbox}>
            <FaTimes />
          </button>
          <button
            className="nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
          >
            <FaChevronLeft />
          </button>
          <img
            src={filteredImages[selectedImageIndex].src}
            alt={filteredImages[selectedImageIndex].alt}
            className="lightbox-image"
          />
          <button
            className="nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
