import React, { useState } from "react";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";
import "./WelcomeSection.css";

const WelcomeSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section welcome-section" id="welcome">
      <div className="container welcome-container">
        <div className="welcome-image" data-aos="fade-right">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Elevate Resort Welcome"
          />
          <div className="image-overlay-box">
            <h4>Luxury Redefined</h4>
          </div>
        </div>
        <div className="welcome-text" data-aos="fade-left">
          <SectionTitle
            title="Welcome to Elevate Resort"
            subtitle="The Jewel of Gorakhpur"
            centered={false}
          />
          <p>
            Nestled in the serene landscapes of Gorakhpur, Elevate Resort stands
            as a testament to luxury, elegance, and tranquility. As the largest
            and most premium resort in the region, we offer an escape from the
            hustle and bustle of city life, inviting you to immerse yourself in
            a world of refined hospitality and sophisticated living.
          </p>
          <p>
            Our resort is designed to provide a seamless blend of modern
            amenities and natural beauty. Whether you are here for a relaxing
            staycation, a grand wedding celebration, or a corporate retreat,
            Elevate Resort promises an experience that transcends the ordinary.
          </p>

          <div className={`expanded-content ${expanded ? "show" : ""}`}>
            <p>
              At Elevate Resort, we believe in the ancient Indian philosophy of
              "Atithi Devo Bhava" – Guest is God. Our dedicated team is
              committed to ensuring that every moment of your stay is crafted to
              perfection. From our sprawling 2500+ capacity wedding lawns to our
              state-of-the-art swimming pool and luxury accommodation, every
              corner of our resort reflects our passion for excellence.
            </p>
            <p>
              Indulge in culinary delights at our poolside dining, rejuvenate
              your senses in our pristine environment, or simply unwind in the
              comfort of our executive rooms and suites. Elevate Resort is not
              just a destination; it is a lifestyle. Come, elevate your senses
              and celebrate your dreams with us.
            </p>
          </div>

          <button
            className="read-more-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
