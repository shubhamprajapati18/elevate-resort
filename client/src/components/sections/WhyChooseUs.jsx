import React from "react";
import SectionTitle from "../common/SectionTitle";
import FeatureCard from "../common/FeatureCard";
import {
  FaSwimmingPool,
  FaLeaf,
  FaMapMarkerAlt,
  FaGlassCheers,
  FaBed,
} from "react-icons/fa";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaGlassCheers />,
      title: "Largest Wedding Lawn",
      description:
        "Grand venue with 2500+ guest capacity for your dream celebrations.",
    },
    {
      icon: <FaBed />,
      title: "Luxury Accommodation",
      description:
        "Exquisite rooms and suites designed for ultimate comfort and relaxation.",
    },
    {
      icon: <FaSwimmingPool />,
      title: "Pristine Swimming Pool",
      description:
        "Best-in-class pool with dedicated kids zone and poolside dining.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Friendly",
      description:
        "Sustainable practices including solar heating and rainwater harvesting.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Prime Location",
      description:
        "Peaceful yet accessible location, perfect for city escapes.",
    },
  ];

  return (
    <section className="section bg-light" id="why-choose-us">
      <div className="container">
        <SectionTitle
          title="Why Choose Us"
          subtitle="Experience Excellence"
          centered={true}
        />
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
