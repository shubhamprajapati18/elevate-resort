import React, { useEffect } from "react";
import PageHeader from "../components/common/PageHeader";
import "./Pool.css";
import {
  FaWater,
  FaChild,
  FaSwimmer,
  FaUtensils,
  FaShieldAlt,
  FaLifeRing,
  FaSmile,
} from "react-icons/fa";
import AOS from "aos";

const Pool = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const features = [
    {
      icon: <FaWater />,
      title: "POOL OVERVIEW",
      text: "The best swimming pool in Gorakhpur — a crystal-clear oasis perfect for staycations, day outings, and leisurely weekends. Featuring 24/7 advanced ozonation safety filtration technology.",
    },
    {
      icon: <FaChild />,
      title: "KIDS SAFE ZONE",
      text: "A specially designed shallow pool area ensures children can splash, play, and enjoy the water in complete safety. With gentle slopes and constant lifeguard supervision.",
    },
    {
      icon: <FaSwimmer />,
      title: "ADULT LAP POOL",
      text: "Fitness enthusiasts will love our dedicated lap pool, designed for serious swimming sessions. Whether you're training for a competition or simply maintaining your fitness routine.",
    },
    {
      icon: <FaUtensils />,
      title: "POOLSIDE DINING",
      text: "Indulge in our exquisite poolside dining experience featuring refreshing mocktails, tropical beverages, and the famous Gorakhpuri Kababs. A culinary experience that complements the atmosphere.",
    },
  ];

  const safetyFeatures = [
    {
      icon: <FaShieldAlt />,
      title: "24/7 OZONATION",
      text: "Advanced filtration ensures safe, chemical-free water.",
    },
    {
      icon: <FaLifeRing />,
      title: "LIFEGUARD ON DUTY",
      text: "Trained lifeguards present during all operating hours.",
    },
    {
      icon: <FaSmile />,
      title: "KID-SAFE ZONES",
      text: "Shallow areas with gentle slopes for children's safety.",
    },
  ];

  return (
    <div className="page pool-page-design">
      <PageHeader
        title="POOL & LEISURE"
        subtitle="Dive into relaxation at Gorakhpur's finest swimming pool and leisure destination."
        bgImage="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      {/* Section 1: A World of Leisure */}
      <section className="leisure-section">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <span className="sub-heading">AQUATIC BLISS</span>
            <h2 className="main-heading">A WORLD OF LEISURE</h2>
            <div className="separator-gold"></div>
            <p className="section-desc">
              From energizing lap swims to leisurely poolside dining, discover
              the many ways to unwind.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                className="leisure-card"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="card-icon-box">{feature.icon}</div>
                <div className="card-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Pool Safety */}
      <section className="safety-section">
        <div className="container">
          <div className="section-header text-center light" data-aos="fade-up">
            <span className="sub-heading">SAFETY FIRST</span>
            <h2 className="main-heading">POOL SAFETY</h2>
            <div className="separator-gold"></div>
          </div>

          <div className="safety-grid">
            {safetyFeatures.map((item, index) => (
              <div
                className="safety-item"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="safety-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-5" data-aos="fade-up">
            <button className="gold-btn">BOOK POOL DAY PASS</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pool;
