import React, { useState } from "react";
import API_URL from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ username, password });

      const res = await axios.post(`${API_URL}/api/auth/login`, body, config);

      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || err.message || "Login Failed");
    }
  };

  return (
    <div className="page admin-login-page">
      <div className="login-container">
        <h1>Owner Login</h1>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
