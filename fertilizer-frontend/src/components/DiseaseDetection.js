import React from "react";
import "./DiseaseDetection.css";


function DiseaseDetection() {
  return (
    <>
    
    <section id="disease" className="section disease">
      <h1>Futurestic Model</h1>
      <h2>Plant Disease Detection</h2>
      <p>Upload an image of your plant to instantly detect diseases</p>
      <div className="disease-grid">
        <div className="upload-box">
          <img src="https://img.icons8.com/ios/100/camera--v1.png" alt="Camera" />
          <p>Upload Plant Image</p>
          <button className="upload-btn">Choose Image</button>
        </div>
        <div className="features">
          <div className="feature-box">🌟 Instant Analysis</div>
          <div className="feature-box">🎯 High Accuracy</div>
          <div className="feature-box">💊 Treatment Plans</div>
        </div>
      </div>
    </section>
    </>
  );
}

export default DiseaseDetection;
