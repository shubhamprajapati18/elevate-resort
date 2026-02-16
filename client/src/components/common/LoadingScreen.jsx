import React from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h1 className="loading-logo">ELEVATE</h1>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
