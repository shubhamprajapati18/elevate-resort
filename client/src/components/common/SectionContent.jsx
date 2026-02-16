import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../config";
import SectionTitle from "./SectionTitle";

const SectionContent = ({
  sectionId,
  defaultTitle,
  defaultSubtitle,
  defaultBody,
  defaultImages = [],
}) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("axios").then((axios) => {
      axios.default
        .get(`${API_URL}/api/content/${sectionId}`)
        .then((res) => {
          if (res.data) {
            setContent(res.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    });
  }, [sectionId]);

  if (loading) return null; // Or a skeleton loader

  // Use fetched content if available and visible, otherwise fallback to defaults (if provided)
  // If no content in DB and no defaults, show nothing.

  const displayContent =
    content && content.isVisible
      ? content
      : {
          title: defaultTitle,
          subtitle: defaultSubtitle,
          body: defaultBody,
          images: defaultImages,
        };

  if (!displayContent.title && !displayContent.body) return null;

  return (
    <section className="section dynamic-content">
      <div className="container">
        {displayContent.title && (
          <SectionTitle
            title={displayContent.title}
            subtitle={displayContent.subtitle}
            centered={true}
          />
        )}

        {displayContent.body && (
          <div
            className="section-body"
            dangerouslySetInnerHTML={{
              __html: displayContent.body.replace(/\n/g, "<br />"),
            }}
          >
            {/* Simple newline to break conversion. For rich text, need a parser */}
          </div>
        )}

        {displayContent.images && displayContent.images.length > 0 && (
          <div className="section-gallery-grid">
            {displayContent.images.map((img, index) => (
              <div key={index} className="gallery-item" data-aos="fade-up">
                <img src={img} alt={`Gallery ${index}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionContent;
