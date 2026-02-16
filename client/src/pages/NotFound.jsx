import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page not-found-page">
      <div className="container section" style={{ textAlign: "center" }}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="btn-primary"
          style={{ marginTop: "20px", display: "inline-block" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
