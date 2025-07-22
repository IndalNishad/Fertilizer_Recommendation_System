



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import LoginModal from "./LoginModel";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="logo">
          <Link to="/">AgriCare</Link>
        </h1>

        {/* Hamburger Menu */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/fertilizer" onClick={() => setMenuOpen(false)}>Fertilizer</Link></li>
          <li><Link to="/disease" onClick={() => setMenuOpen(false)}>Disease Detection</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/footer" onClick={() => setMenuOpen(false)}>Contact</Link></li>

          {user ? (
            <li className="user-menu">
              <div
                className="user-icon"
                onClick={() => setDropdown(!dropdown)}
              >
                👤 {user.name || user.email} ▾
              </div>
              {dropdown && (
                <ul className="dropdown">
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </li>
          ) : (
            <li className="login-btn">
              <Link
                to="/login"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogin(true);
                  setMenuOpen(false);
                }}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Navbar;

