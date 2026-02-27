import React from "react";
import PageHeader from "../components/common/PageHeader";
import SectionTitle from "../components/common/SectionTitle";
import FeatureCard from "../components/common/FeatureCard";
import headerImage from "../assets/C1.png";
import {
  FaSolarPanel,
  FaCloudRain,
  FaRecycle,
  FaHistory,
  FaEye,
  FaBullseye,
} from "react-icons/fa";
import "./About.css";

const About = () => {
  return (
    <div className="page about-page">
      <PageHeader
        title="About Us"
        subtitle="Our Journey & Vision"
        bgImage={headerImage}
      />

      <section className="section">
        <div className="container">
          <SectionTitle title="Our Story" centered={false} />
          <div className="story-content" data-aos="fade-up">
            <p>
              Elevate Resort Gorakhpur began as a dream to bring world-class
              hospitality to the heart of Uttar Pradesh. Founded in 2015 by
              visionary entrepreneurs who saw the potential of Gorakhpur as a
              growing metropolitan hub, the resort was conceptualized not just
              as a hotel, but as a destination in itself.
            </p>
            <p>
              The journey started with a simple idea: to create a sanctuary
              where luxury meets nature. Over the years, we have expanded from a
              modest 10-room property to the largest resort in the region,
              boasting over 50 luxury rooms, a 2500+ capacity wedding lawn, and
              a state-of-the-art swimming pool.
            </p>
            <p>
              Our architecture is inspired by the rich cultural heritage of
              Gorakhpur, blended seamlessly with modern contemporary design.
              every stone, every tree, and every corner of the resort tells a
              story of passion, dedication, and an unyielding commitment to
              excellence. We have hosted thousands of weddings, corporate
              events, and families, creating memories that last a lifetime.
            </p>
            <p>
              Today, Elevate Resort stands as a beacon of luxury, offering an
              experience that is both grand and intimate. Our founders' vision
              was to elevate the living standards of our guests, providing them
              with an escape that rejuvenates the soul. We continue to evolve,
              adding new amenities and adopting sustainable practices to ensure
              that we give back to the community and the environment.
            </p>
            <p>
              Whether you are here for a destination wedding, a weekend getaway,
              or a business conference, Elevate Resort promises to deliver an
              experience that exceeds your expectations. Welcome to a world
              where every detail is crafted for your comfort. Welcome to Elevate
              Resort.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <SectionTitle title="Mission & Vision" center={true} />
          <div className="mission-grid">
            <FeatureCard
              icon={<FaEye />}
              title="Our Vision"
              description="To be the premier luxury destination in Uttar Pradesh, setting global standards in hospitality and guest experience."
            />
            <FeatureCard
              icon={<FaBullseye />}
              title="Our Mission"
              description="To create unforgettable memories for our guests through personalized service, world-class amenities, and sustainable practices."
            />
            <FeatureCard
              icon={<FaHistory />}
              title="Our Heritage"
              description="Rooted in the tradition of 'Atithi Devo Bhava', we blend Indian hospitality with modern luxury to make every guest feel like royalty."
            />
          </div>
        </div>
      </section>

      <section className="section sustainability-section">
        <div className="container">
          <SectionTitle
            title="Sustainability Initiatives"
            centered={true}
            light={true}
          />
          <div className="sustainability-grid">
            <div className="sus-card" data-aos="flip-left">
              <FaSolarPanel className="sus-icon" />
              <h3>Solar Energy</h3>
              <p>
                We harness the power of the sun to heat water and power our
                outdoor lighting, reducing our carbon footprint.
              </p>
            </div>
            <div className="sus-card" data-aos="flip-left" data-aos-delay="200">
              <FaCloudRain className="sus-icon" />
              <h3>Rainwater Harvesting</h3>
              <p>
                Our advanced rainwater harvesting system ensures that we
                conserve water and replenish the groundwater table.
              </p>
            </div>
            <div className="sus-card" data-aos="flip-left" data-aos-delay="400">
              <FaRecycle className="sus-icon" />
              <h3>Organic Waste Management</h3>
              <p>
                All organic waste from our kitchens and gardens is composted and
                used to nourish our lush green landscapes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
