import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSave, FaPlus, FaTrash } from "react-icons/fa";
import API_URL from "../../config";

const SectionEditor = ({ sectionId, title }) => {
  const [content, setContent] = useState({
    sectionId: sectionId,
    title: "",
    subtitle: "",
    body: "",
    images: [],
    isVisible: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/content/${sectionId}`);
        if (res.data) {
          setContent(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchContent();
  }, [sectionId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContent({
      ...content,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setContent({
        ...content,
        images: [...content.images, newImage],
      });
      setNewImage("");
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = content.images.filter((_, i) => i !== index);
    setContent({ ...content, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(`${API_URL}/api/content`, content, config);
      alert("Content saved successfully!");
      setSaving(false);
    } catch (err) {
      console.error(err);
      alert("Error saving content");
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="section-editor">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Visibility</label>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="isVisible"
              checked={content.isVisible}
              onChange={handleChange}
            />
            <span>Show this section on website</span>
          </div>
        </div>

        <div className="form-group">
          <label>Section Title</label>
          <input
            type="text"
            name="title"
            value={content.title}
            onChange={handleChange}
            placeholder="e.g. Weddings & Events"
          />
        </div>

        <div className="form-group">
          <label>Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={content.subtitle}
            onChange={handleChange}
            placeholder="e.g. Celebrate in Style"
          />
        </div>

        <div className="form-group">
          <label>Main Content</label>
          <textarea
            name="body"
            value={content.body}
            onChange={handleChange}
            rows="10"
            placeholder="Enter section description..."
          />
        </div>

        <div className="form-group">
          <label>Images</label>
          <div className="image-input-group">
            <ImageUpload
              onUpload={(url) => {
                setContent({
                  ...content,
                  images: [...content.images, url],
                });
              }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Or paste Image URL"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="btn-secondary"
              >
                <FaPlus /> Add URL
              </button>
            </div>
          </div>
          <div className="images-preview">
            {content.images &&
              content.images.map((img, index) => (
                <div key={index} className="image-preview-item">
                  <img src={img} alt={`Preview ${index}`} />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="remove-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={saving}>
          <FaSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default SectionEditor;
