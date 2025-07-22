import React from "react";
import Fertilizer from "./Fertilizer";
import About from "./About";
import Footer from "./Footer";
import DiseaseDetection from "./DiseaseDetection";
import "./Home.css";



const Home = () => {
  return (
    <div className="section">
       <Fertilizer/>
       <DiseaseDetection/>
       <About/>
       <Footer/>
    </div>
  );
};

export default Home;
