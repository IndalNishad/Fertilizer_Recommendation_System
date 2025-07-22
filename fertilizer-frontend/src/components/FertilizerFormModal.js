// import React, { useState, useEffect } from "react";
// import "./FertilizerFormModal.css";
// import axios from "axios";

// const FertilizerFormModal = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     crop: "",
//     soil: "",
//     nitrogen: "",
//     phosphorous: "",
//     potassium: "",
//     ph: "",
//     moisture: "",
//     temperature: "",
//     rainfall:""

//   });
// const [crops, setCrops] = useState([]);
// const [soils, setSoils] = useState([]);
//   const [result, setResult] = useState("");
//   const [remark, setRemark] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });
//       console.log(res);
//       const data = await res.json();
//       if (res.ok) {
//         setResult(data.recommended_fertilizer);
//         setRemark(data.predicted_remark);
//       } else {
//         alert(data.error || "Prediction failed.");
//       }
//     } catch (err) {
//       alert("Server error. Try again.");
//     }
//   };

//     useEffect(() => {
//       fetchAllowedValues();
//     }, []);

//   const fetchAllowedValues = async () => {
//   try {
//     const res = await axios.get("http://localhost:5000/allowed-values");
//     setCrops(res.data.crops);
//     setSoils(res.data.soils);
//   } catch (err) {
//     console.error("Failed to fetch allowed values", err);
//   }
// };

//   // const handleLogout = () => {
//   //   localStorage.removeItem("token");
//   //   window.location.href = "/";
//   // };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         <button className="close-button" onClick={onClose}>×</button>
//         <h2>Fertilizer Recommendation</h2>
//         <form onSubmit={handleSubmit} className="form-content">
//           {/* {Object.entries(formData).map(([key, value]) => (
//             <input
//               key={key}
//               name={key}
//               value={value}
//               onChange={handleChange}
//               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//               required
//             />
//           ))}
//           <button type="submit">Get Recommendation</button> */}

//           <div>
//           <label className ="leb">Crop</label>      
//           <select name="crop" onChange={handleChange} required>
//             <option value="">Select Crop</option>
//             {crops.map((crop) => (<option key={crop} value={crop}>{crop}</option>))}
//           </select>
//         </div>
//         <div> 
//           <label className ="leb">Soil</label>      
//           <select name="soil" onChange={handleChange} required>
//             <option value="">Select Soil</option>
//             {soils.map((soil) =>( <option key={soil} value={soil}>{soil}</option>))}
//           </select>
//         </div>
//         <div>  
//           <label className ="leb">Nitrogen</label>      
//           <input name="nitrogen" placeholder="N" type="number" onChange={handleChange} required />
//         </div>
//         <div> 
//           <label className ="leb">Phosphorus</label>      
//            <input name="phosphorous" placeholder="P" type="number" onChange={handleChange} required />
//         </div>
//         <div> 
//           <label className ="leb">Potassium</label>       
//           <input name="potassium" placeholder="K" type="number" onChange={handleChange} required />
//         </div>
//         <div>
//           <label className ="leb">pH of Soil</label>       
//            <input name="ph" placeholder="pH" type="number" step="0.1" onChange={handleChange} required />
//         </div>
//         <div> 
//           <label className  ="leb">Moisture</label>       
//           <input name="moisture" placeholder="Moisture" type="number" onChange={handleChange} required />
//         </div>
//         <div> 
//           <label className  ="leb">Temperature</label>       
//           <input name="temperature" placeholder="Temperature" type="number" onChange={handleChange} required />
//         </div>
        
//         <div> 
//           <label className  ="leb">Rainfall</label>       
//           <input name="rainfall" placeholder="Rainfall" type="number" onChange={handleChange} required />
//         </div>
//         <div className ="btn">
//           <button type="submit">Get Recommendation</button>
//         </div>
//         </form>

//         {result && (
//           <div className="result">
//             <h4>Recommended Fertilizer: {result}</h4>
//             <p>{remark}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FertilizerFormModal;


// new update



// import React, { useState, useEffect } from "react";
// import "./FertilizerFormModal.css";
// import axios from "axios";

// const FertilizerFormModal = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     crop: "",
//     soil: "",
//     nitrogen: "",
//     phosphorous: "",
//     potassium: "",
//     ph: "",
//     moisture: "",
//     temperature: "",
//     rainfall: ""
//   });

//   const [crops, setCrops] = useState([]);
//   const [soils, setSoils] = useState([]);
//   const [result, setResult] = useState("");
//   const [remark, setRemark] = useState("");
//   const [loadingWeather, setLoadingWeather] = useState(false);

//   // Fetch allowed values (crops, soils)
//   useEffect(() => {
//     fetchAllowedValues();
//   }, []);

//   const fetchAllowedValues = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/allowed-values");
//       setCrops(res.data.crops);
//       setSoils(res.data.soils);
//     } catch (err) {
//       console.error("Failed to fetch allowed values", err);
//     }
//   };

//   // Fetch weather data (temperature, moisture, rainfall)
//   const fetchWeatherData = async () => {
//     setLoadingWeather(true);
//     try {
//       const res = await axios.get("http://localhost:5000/weather?city=Delhi");
//       setFormData((prev) => ({
//         ...prev,
//         temperature: res.data.temperature || "",
//         moisture: res.data.moisture || "",
//         rainfall: res.data.rainfall || ""
//       }));
//     } catch (err) {
//       console.error("Failed to fetch weather data", err);
//       alert("Could not fetch weather data");
//     } finally {
//       setLoadingWeather(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setResult(data.recommended_fertilizer);
//         setRemark(data.predicted_remark);
//       } else {
//         alert(data.error || "Prediction failed.");
//       }
//     } catch (err) {
//       alert("Server error. Try again.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         <button className="close-button" onClick={onClose}>×</button>
//         <h2>Fertilizer Recommendation</h2>
//         <form onSubmit={handleSubmit} className="form-content">
//           {/* Crop */}
//           <div>
//             <label className="leb">Crop</label>
//             <select name="crop" onChange={handleChange} required>
//               <option value="">Select Crop</option>
//               {crops.map((crop) => (
//                 <option key={crop} value={crop}>{crop}</option>
//               ))}
//             </select>
//           </div>

//           {/* Soil */}
//           <div>
//             <label className="leb">Soil</label>
//             <select name="soil" onChange={handleChange} required>
//               <option value="">Select Soil</option>
//               {soils.map((soil) => (
//                 <option key={soil} value={soil}>{soil}</option>
//               ))}
//             </select>
//           </div>

//           {/* Nutrients */}
//           <div>
//             <label className="leb">Nitrogen</label>
//             <input name="nitrogen" type="number" onChange={handleChange} required />
//           </div>
//           <div>
//             <label className="leb">Phosphorus</label>
//             <input name="phosphorous" type="number" onChange={handleChange} required />
//           </div>
//           <div>
//             <label className="leb">Potassium</label>
//             <input name="potassium" type="number" onChange={handleChange} required />
//           </div>
//           <div>
//             <label className="leb">pH of Soil</label>
//             <input name="ph" type="number" step="0.1" onChange={handleChange} required />
//           </div>

//           {/* Weather Data */}
//           <div className="weather-section">
//             <button type="button" onClick={fetchWeatherData} disabled={loadingWeather}>
//               {loadingWeather ? "Fetching Weather..." : "Auto-Fill Weather Data"}
//             </button>
//           </div>

//           <div>
//             <label className="leb">Moisture</label>
//             <input name="moisture" value={formData.moisture} onChange={handleChange} required />
//           </div>
//           <div>
//             <label className="leb">Temperature</label>
//             <input name="temperature" value={formData.temperature} onChange={handleChange} required />
//           </div>
//           <div>
//             <label className="leb">Rainfall</label>
//             <input name="rainfall" value={formData.rainfall} onChange={handleChange} required />
//           </div>

//           <div className="btn">
//             <button type="submit">Get Recommendation</button>
//           </div>
//         </form>

//         {result && (
//           <div className="result">
//             <h4>Recommended Fertilizer: {result}</h4>
//             <p>{remark}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FertilizerFormModal;


import React, { useState, useEffect, useRef } from "react";
import "./FertilizerFormModal.css";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const FertilizerFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    crop: "",
    soil: "",
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    ph: "",
    moisture: "",
    temperature: "",
    rainfall: ""
  });

  const [crops, setCrops] = useState([]);
  const [soils, setSoils] = useState([]);

  const [city, setCity] = useState("");          // ✅ user-entered location
  const [weatherMsg, setWeatherMsg] = useState("");
  const [fetchingWeather, setFetchingWeather] = useState(false);

  const [result, setResult] = useState("");
  const [remark, setRemark] = useState("");

  const debounceTimer = useRef(null);

  /* ------------------------------------------
   * Load allowed crop/soil when modal opens
   * ---------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;
    setResult("");
    setRemark("");
    fetchAllowedValues();
  }, [isOpen]);

  const fetchAllowedValues = async () => {
    try {
      const res = await axios.get(`${API_BASE}/allowed-values`);
      setCrops(res.data.crops || []);
      setSoils(res.data.soils || []);
    } catch (err) {
      console.error("Failed to fetch allowed values", err);
    }
  };

  /* ------------------------------------------
   * Debounced weather fetch when city changes
   * ---------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;
    if (!city.trim()) {
      setWeatherMsg("");
      return;
    }

    // clear old debounce
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    // debounce 800ms after user stops typing
    debounceTimer.current = setTimeout(() => {
      fetchWeatherByCity(city.trim());
    }, 800);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [city, isOpen]);

  const fetchWeatherByCity = async (cityName) => {
    if (!cityName) return;
    setFetchingWeather(true);
    setWeatherMsg("Fetching weather…");
    try {
      const res = await axios.get(`${API_BASE}/weather`, {
        params: { city: cityName }
      });
      const { temperature, moisture, rainfall, source_city } = res.data;

      setFormData((prev) => ({
        ...prev,
        temperature: temperature ?? prev.temperature,
        moisture: moisture ?? prev.moisture,
        rainfall: rainfall ?? prev.rainfall
      }));

      setWeatherMsg(
        `Weather loaded${source_city ? ` for ${source_city}` : ""}.`
      );
    } catch (err) {
      console.error("Weather fetch error:", err);
      setWeatherMsg("Weather not found for that city.");
    } finally {
      setFetchingWeather(false);
    }
  };

  /* ------------------------------------------
   * Controlled form field changes
   * ---------------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ------------------------------------------
   * Submit -> Predict
   * ---------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Lowercase crop & soil to match backend encoders
    const payload = {
      crop: formData.crop.trim().toLowerCase(),
      soil: formData.soil.trim().toLowerCase(),
      nitrogen: formData.nitrogen,
      phosphorous: formData.phosphorous,
      potassium: formData.potassium,
      ph: formData.ph,
      moisture: formData.moisture,
      temperature: formData.temperature,
      rainfall: formData.rainfall
    };

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.recommended_fertilizer);
        setRemark(data.predicted_remark);
        requestAnimationFrame(() => {
          const el = document.querySelector(".result");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      } else {
        alert(data.error || "Prediction failed.");
      }
    } catch (err) {
      console.error("Prediction error:", err);
      alert("Server error. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Fertilizer Recommendation</h2>

        {/* Location input triggers weather auto-fill */}
        <div className="weather-city-input">
          <label className="leb">Location / City</label>
          <input
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {weatherMsg && (
            <p className="weather-status">
              {fetchingWeather ? "⏳ " : ""}{weatherMsg}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="form-content">

          {/* Crop */}
          <div>
            <label className="leb">Crop</label>
            <select
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              required
            >
              <option value="">Select Crop</option>
              {crops.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          {/* Soil */}
          <div>
            <label className="leb">Soil</label>
            <select
              name="soil"
              value={formData.soil}
              onChange={handleChange}
              required
            >
              <option value="">Select Soil</option>
              {soils.map((soil) => (
                <option key={soil} value={soil}>{soil}</option>
              ))}
            </select>
          </div>

          {/* Nutrients */}
          <div>
            <label className="leb">Nitrogen</label>
            <input
              name="nitrogen"
              type="number"
              value={formData.nitrogen}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="leb">Phosphorus</label>
            <input
              name="phosphorous"
              type="number"
              value={formData.phosphorous}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="leb">Potassium</label>
            <input
              name="potassium"
              type="number"
              value={formData.potassium}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="leb">pH of Soil</label>
            <input
              name="ph"
              type="number"
              step="0.1"
              value={formData.ph}
              onChange={handleChange}
              required
            />
          </div>

          {/* Auto-filled Weather Fields (editable) */}
          <div>
            <label className="leb">Moisture (%)</label>
            <input
              name="moisture"
              type="number"
              value={formData.moisture}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="leb">Temperature (°C)</label>
            <input
              name="temperature"
              type="number"
              value={formData.temperature}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="leb">Rainfall (mm)</label>
            <input
              name="rainfall"
              type="number"
              value={formData.rainfall}
              onChange={handleChange}
              required
            />
          </div>

          <div className="btn">
            <button type="submit">Get Recommendation</button>
          </div>
        </form>

        {result && (
          <div className="result">
            <h4>Recommended Fertilizer: {result}</h4>
            <p>{remark}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerFormModal;

