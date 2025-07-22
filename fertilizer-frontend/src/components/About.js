import React from "react";
import "./About.css";


function About() {
  return (
    <>

    <section id="about" className="section about">
      <h2>About AgriCare</h2>
      <p>
        AgriCare is a comprehensive agricultural platform helping farmers
        make informed decisions using ML.
      </p>
      <div className="stats">
        <div className="stat-box"><h3>10,000+</h3><p>Farmers Helped</p></div>
        <div className="stat-box"><h3>95%</h3><p>Accuracy Rate</p></div>
        <div className="stat-box"><h3>25+</h3><p>Crop Types Supported</p></div>
      </div>
    </section>
    </>
  );
}

export default About;
