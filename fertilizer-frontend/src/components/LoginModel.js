




// new
import React, { useState } from "react";
import axios from "axios";
import "./LoginModal.css";
import RegisterModal from "./RegisterModal";

const LoginModal = ({ isOpen, onClose }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      localStorage.setItem("token", res.data.access_token);
      onClose(); // Close login modal
      window.location.href = "/"; // ✅ or use navigate()
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };

  if (!isOpen && !showRegister) return null;

  return (
    <div className="modal-overlay_login">
      {/* ✅ LOGIN MODAL */}
      {!showRegister && isOpen && (
        <div className="login-modal">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>Welcome To Fertilizer Recommendation</h2>
          <p className="subtitle">Login to your account to continue</p>

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />

            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>

            <button type="submit">Login</button>
          </form>

          <p className="footer">
            Don’t have an account?{" "}
            <span
              style={{
                color: "#2e7d32",
                cursor: "pointer",
                fontWeight: "bold"
              }}
              onClick={() => setShowRegister(true)} // ✅ SWITCH TO REGISTER
            >
              Register
            </span>
          </p>
        </div>
      )}

      {/* ✅ REGISTER MODAL */}
      {showRegister && (
        <RegisterModal
          isOpen={showRegister}
          onClose={() => {
            setShowRegister(false);
            onClose(); // Close everything if needed
          }}
          onSwitchToLogin={() => {
            setShowRegister(false);
          }}
        />
      )}
    </div>
  );
};

export default LoginModal;




