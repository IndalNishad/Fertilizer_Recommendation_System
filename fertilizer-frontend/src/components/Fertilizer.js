// import { useState } from "react";
// import FertilizerFormModel from "./FertilizerFormModal";
// import "./Fertilizer.css";



// function Fertilizer() {

//     const [showModal, setShowModal] = useState(false);


//   return (
//     <>
//     <section id="fertilizer" className="section fertilizer">
//       <div className="fertilizer-container">
//         <div className="fertilizer-text">
//           <h1>Smart Fertilizer Recommendations</h1>
//           <p>
//             Get personalized fertilizer recommendations based on your soil
//             conditions, crop type, and environmental factors...
//           </p>
//           <ul>
//             <li>✓ Soil nutrient analysis</li>
//             <li>✓ Crop-specific recommendations</li>
//             <li>✓ Weather-based adjustments</li>
//           </ul>
//         </div>

//         <div className="fertilizer-action">
//           <button className="predict-btn" onClick={() => setShowModal(true)} >
            
//             🌱 Predict Fertilizer Now
//           </button>
//           <p className="predict-note">
//             Enter your soil and crop details to get instant recommendations
//           </p>
//         </div>

//       </div>
//       <FertilizerFormModel isOpen={showModal} onClose={() => setShowModal(false)} />

//     </section>
//     </>
//   );
// }

// export default Fertilizer;


// new components

import React, { useState } from "react";
import axios from "axios";
import FertilizerFormModal from "./FertilizerFormModal"; // <-- adjust name if file differs
// import FertilizerFormModel from "./FertilizerFormModal"; // if you prefer to keep old var
import LoginModal from "./LoginModel";
import "./Fertilizer.css";

function Fertilizer() {
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);

  // When button clicked: check login status
  const handlePredictClick = async () => {
    const token = localStorage.getItem("token");

    // No token? Show login
    if (!token) {
      setShowLogin(true);
      return;
    }

    // Optional: verify token w/ backend before showing form
    setCheckingAuth(true);
    try {
      await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Token valid
      setShowForm(true);
    } catch (err) {
      console.warn("Auth check failed, forcing login:", err);
      localStorage.removeItem("token");
      setShowLogin(true);
    } finally {
      setCheckingAuth(false);
    }
  };

  // Called when LoginModal closes
  // If user successfully logged in, token will now exist → open form
  const handleLoginClose = () => {
    setShowLogin(false);
    if (localStorage.getItem("token")) {
      // setShowForm(true);
    }
  };

  return (
    <section id="fertilizer" className="section fertilizer">
      <div className="fertilizer-container">
        <div className="fertilizer-text">
          <h1>Smart Fertilizer Recommendations</h1>
          <p>
            Get personalized fertilizer recommendations based on your soil
            conditions, crop type, and environmental factors...
          </p>
          <ul>
            {/* <li>✓ Soil nutrient analysis</li> */}
            <li>✓ Crop-specific recommendations</li>
            <li>✓ Weather-based adjustments</li>
          </ul>
        </div>

        <div className="fertilizer-action">
          <button
            className="predict-btn"
            onClick={handlePredictClick}
            disabled={checkingAuth}
          >
            {checkingAuth ? "Checking..." : "🌱 Predict Fertilizer Now"}
          </button>
          <p className="predict-note">
            Enter your soil and crop details to get instant recommendations
          </p>
        </div>
      </div>

      {/* Fertilizer Form (only when authenticated) */}
      <FertilizerFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
      />

      {/* Login Modal (only when user not logged in) */}
      <LoginModal
        isOpen={showLogin}
        onClose={handleLoginClose}
      />
    </section>
  );
}

export default Fertilizer;
