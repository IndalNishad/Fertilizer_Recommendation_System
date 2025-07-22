import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn,FaEnvelope, FaBriefcase } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footerr">
      <div className="footer-grid">
        <div>
          <h4>AgriCare</h4>
          <p>Empowering Farmers with ML-driven Agricultural Solutions.</p>
          <p>“Technology will never replace great farmers, but technology in the hands of great farmers is transformational.”</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          {/* <ul>
            <li><Link to ="/"></Link></li>
            <li><Link to ="/"></Link></li>
            <li><Link to ="/"></Link></li>
            <li><Link to ="/"></Link></li>
          </ul> */}
           <p><Link to = "/fertlizer">Fertilizer Prediction</Link></p>
          <p><Link to = "/disease">Disease Detection</Link></p>
          <p><Link to = "/about">About Us</Link></p>
          {/* <p><Link to = "/footer">Contact</Link></p> */}
        </div>
        <div>
          
          <ul class= "ulli">

            <li><h4>Developer</h4></li>

            <li>
              <FaGithub style={{ fontSize: "24px", color: "#0b0c0bff", marginRight: "8px" }}/>
              <a  href="https://github.com/IndalNishad" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li> 
            
            <li>
              <FaLinkedinIn style={{ fontSize: "24px", color: "#0b0c0bff", marginRight: "8px" }}/>
              <a href="https://www.linkedin.com/in/indal-nishad-707503353" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
          
            <li>
              <FaEnvelope style={{ fontSize: "24px", color: "#0b0c0bff", marginRight: "8px" }}/>
              <a href="mailto:indalnishad064@gmail.com" target="_blank" rel="noopener noreferrer">Email</a>
            </li>
            <li>
              <FaBriefcase style={{ fontSize: "24px", color: "#0b0c0bff", marginRight: "8px" }}/>
              <a href="/" target="_blank" rel="noopener noreferrer">Portfolio</a>
              </li>
          </ul>
          {/* <h4>Developer</h4>
          <p><a  href= "https://github.com/IndalNishad"></a>GitHub</p>
          <p><a href="">LinkedIn</a></p>
          <p><a href="">Email</a></p>
          <p><a href="">Portfolio</a></p> */}
        </div>
      </div>
      <hr />
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        © 2025 AgriCare. All rights reserved. Developed by Indal Nishad.
      </p>
    </footer>
  );
}

export default Footer;
