// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import RegisterModal from "./components/RegisterModal";
// import FertilizerForm from "./components/FertilizerForm";
// import Stats from "./components/Stats";
// import Home from "./components/Home";
// import About from "./components/About";
// import { useEffect, useState } from "react";
// import Fertilizer from "./components/Fertilizer";
// import DiseaseDetection from "./components/DiseaseDetection";
// import Navbar from "./components/Navbar";
// // import AuthModal from "./components/AuthModal";
// import LoginModal from "./components/LoginModel";
// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem("token"));

// useEffect(() => {
//   const handleStorage = () => setToken(localStorage.getItem("token"));
//   window.addEventListener("storage", handleStorage);
//   return () => window.removeEventListener("storage", handleStorage);
// }, []);

//   return (
//     <Router>
//       <Navbar/>
//       <Routes>
//         {/* Public routes hai */}
//         <Route path="/" element={<Home/>}/>
//         <Route path="/about" element={<About/>}/>
//         <Route path="/fertilizer" element={<Fertilizer/>}/>
//         <Route path="/disease" element={<DiseaseDetection/>}/>

//         {/* Protected routes hai */}
//         <Route path="fertilizerform" element={token ? <FertilizerForm />: <Navigate to="/login" />} />
//         <Route path="/login" element={!token ?<LoginModal />: <Navigate to="/fertlizer"/>} />
//         <Route path="/stats" element={token ? <Stats /> : <Navigate to="/login" />} />
//         <Route path="/register" element={!token ? <RegisterModal />: <Navigate to="fertlizer"/>} />
//         {/* <Route path="*" element= {<Navigate to="/" />}/> */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterModal from "./components/RegisterModal";
import FertilizerForm from "./components/FertilizerForm";
import Stats from "./components/Stats";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Fertilizer from "./components/Fertilizer";
import DiseaseDetection from "./components/DiseaseDetection";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModel";
import Dashboard from "./components/Dashboard"; // ✅ NEW

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes className="section">
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/about" element={<About />} />
        <Route path="/fertilizer" element={<Fertilizer />} />
        <Route path="/disease" element={<DiseaseDetection />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/fertilizerform" element={token ? <FertilizerForm /> : <Navigate to="/login" />} />
        <Route path="/stats" element={token ? <Stats /> : <Navigate to="/login" />} />

        {/* Auth Routes */}
        <Route path="/login" element={!token ? <LoginModal /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!token ? <RegisterModal /> : <Navigate to="/dashboard" />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
