import React, { useState } from "react";
import axios from "axios";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://fertilizer-recommendation-system-rova.onrender.com/register", form);
      // console.log(form);
      alert("Registration successful! Please login.");
      onSwitchToLogin(); // ✅ Switch back to Login after registration
    } catch (err) {
      alert("Registration failed. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="register-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />

          <button type="submit">Register</button>
        </form>

        <p className="footer">
          Already have an account?{" "}
          <span
            style={{ color: "#2e7d32", cursor: "pointer", fontWeight: "bold" }}
            onClick={onSwitchToLogin}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
