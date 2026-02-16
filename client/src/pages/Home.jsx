import React from "react";
import HeroSection from "../components/sections/HeroSection";
import WelcomeSection from "../components/sections/WelcomeSection";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import TestimonialSlider from "../components/sections/TestimonialSlider";
import "./Home.css";

const Home = () => {
  return (
    <div className="page home-page">
      <HeroSection />
      <WelcomeSection />
      <WhyChooseUs />
      <TestimonialSlider />
    </div>
  );
};

export default Home;
