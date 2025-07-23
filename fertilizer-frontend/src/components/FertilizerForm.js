import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./Ui.css";

const FertilizerForm = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    ph: "",
    moisture: "",
    temperature: "",
    soil: "",
    // rainfall: "",
    crop: "",
  });

const [crops, setCrops] = useState([]);
const [soils, setSoils] = useState([]);

  const [remark, setRemark]= useState("");
  const [result, setResult] = useState("");
  const [statsData, setStatsData] = useState([]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  

    try {
      const res = await axios.post("https://fertilizer-recommendation-system-rova.onrender.com/predict", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data.recommended_fertilizer);
      setRemark(res.data.predicted_remark);
      fetchStats();
    } catch {
      alert("Prediction failed. Try logging in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

   const fetchStats = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://fertilizer-recommendation-system-rova.onrender.com/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formatted = res.data.map((item) => ({
        name: item._id,
        count: item.count,
      }));
      setStatsData(formatted);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchAllowedValues();
  }, []);

  const fetchAllowedValues = async () => {
  try {
    const res = await axios.get("https://fertilizer-recommendation-system-rova.onrender.com/allowed-values");
    setCrops(res.data.crops);
    setSoils(res.data.soils);
  } catch (err) {
    console.error("Failed to fetch allowed values", err);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "2rem" }}>
      
      <button onClick={handleLogout} style={{ float: "right" }}>Logout</button>
      <h2>Fertilizer Recommendation</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <label className ="leb">Crop</label>      
          <select name="crop" onChange={handleChange} required>
            <option value="">Select Crop</option>
            {crops.map((crop) => (<option key={crop} value={crop}>{crop}</option>))}
          </select>
        </div>
        <div> 
          <label className ="leb">Soil</label>      
          <select name="soil" onChange={handleChange} required>
            <option value="">Select Soil</option>
            {soils.map((soil) =>( <option key={soil} value={soil}>{soil}</option>))}
          </select>
        </div>
        <div>  
          <label className ="leb">Nitrogen</label>      
          <input name="nitrogen" placeholder="N" type="number" onChange={handleChange} required />
        </div>
        <div> 
          <label className ="leb">Phosphorus</label>      
           <input name="phosphorous" placeholder="P" type="number" onChange={handleChange} required />
        </div>
        <div> 
          <label className ="leb">Potassium</label>       
          <input name="potassium" placeholder="K" type="number" onChange={handleChange} required />
        </div>
        <div>
          <label className ="leb">pH of Soil</label>       
           <input name="ph" placeholder="pH" type="number" step="0.1" onChange={handleChange} required />
        </div>
        <div> 
          <label className  ="leb">Moisture</label>       
          <input name="moisture" placeholder="Moisture" type="number" onChange={handleChange} required />
        </div>
        <div> 
          <label className  ="leb">Temperature</label>       
          <input name="temperature" placeholder="Temperature" type="number" onChange={handleChange} required />
        </div>
        
        <div> 
          <label className  ="leb">Rainfall</label>       
          <input name="rainfall" placeholder="Rainfall" type="number" onChange={handleChange} required />
        </div>
        <div className ="btn">
          <button type="submit">Get Recommendation</button>
        </div>
      </form>
      {result && <h2>Recommended Fertilizer: {result}</h2>}
    
      {remark && <h3>Suggestion:- <p>{remark}</p></h3>}

      <h3 style={{ marginTop: "2rem" }}>Your Fertilizer Usage Stats</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={statsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FertilizerForm;
