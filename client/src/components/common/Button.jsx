import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const Button = ({ to, text, type = "primary", onClick, className = "" }) => {
  const btnClass = `btn btn-${type} ${className}`;

  if (to) {
    return (
      <Link to={to} className={btnClass}>
        {text}
      </Link>
    );
  }

  return (
    <button className={btnClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
