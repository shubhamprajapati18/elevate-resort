import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../config";
import { FaCloudUploadAlt, FaCheck } from "react-icons/fa";

const ImageUpload = ({ onUpload, existingImage }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(existingImage || "");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(`${API_URL}/api/upload`, formData, config);
      const fullUrl = `${API_URL}${res.data.filePath}`;

      setUploadedUrl(fullUrl);
      onUpload(fullUrl); // Pass back the full URL to parent
      setUploading(false);
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
      setUploading(false);
    }
  };

  return (
    <div className="image-upload-wrapper">
      <div className="current-image-preview">
        {uploadedUrl ? (
          <img
            src={uploadedUrl}
            alt="Preview"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              objectFit: "cover",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          />
        ) : (
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              marginBottom: "10px",
              color: "#ccc",
            }}
          >
            No Image
          </div>
        )}
      </div>

      <label
        className={`btn-secondary ${uploading ? "disabled" : ""}`}
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {uploading ? (
          "Uploading..."
        ) : (
          <>
            <FaCloudUploadAlt /> Upload New Image
          </>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
          disabled={uploading}
        />
      </label>
      {uploadedUrl && !uploading && (
        <span style={{ marginLeft: "10px", color: "green" }}>
          <FaCheck />
        </span>
      )}
    </div>
  );
};

export default ImageUpload;
