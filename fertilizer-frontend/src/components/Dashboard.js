import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

// Recharts is optional. If not installed, wrap in try/catch or conditionally render.
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState("");

  const navigate = useNavigate();

  // Load user profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoadingUser(true);
    axios
      .get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setError("");
      })
      .catch((err) => {
        console.error("Profile load error:", err);
        setError("Unable to load profile. Please log in again.");
        localStorage.removeItem("token");
      })
      .finally(() => setLoadingUser(false));
  }, [navigate]);

  // Load stats AFTER user loads (only if user exists & logged in)
  useEffect(() => {
    if (!user) {
      setStats([]);
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoadingStats(true);
    axios
      .get("http://localhost:5000/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Expect: [{_id: "Urea", count: 5}, ...]
        setStats(res.data || []);
        setStatsError("");
      })
      .catch((err) => {
        console.error("Stats load error:", err);
        setStatsError("Could not load stats.");
        setStats([]);
      })
      .finally(() => setLoadingStats(false));
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Transform stats for chart (rename keys)
  const chartData = stats.map((s) => ({
    fertilizer: s._id,
    count: s.count,
  }));

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        {user && (
          <p className="dashboard-subtitle">
            Welcome, {user.name || user.email}!
          </p>
        )}
      </header>

      {/* USER LOADING / ERROR */}
      {loadingUser && <p>Loading your data...</p>}

      {!loadingUser && error && (
        <div className="dashboard-error">
          <p>{error}</p>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      )}

      {/* MAIN DASHBOARD CONTENT */}
      {!loadingUser && !error && user && (
        <>
          {/* USER INFO */}
          <section className="dashboard-userinfo">
            <h2>Your Account</h2>
            <ul>
              <li>
                <strong>Name:</strong> {user.name || "—"}
              </li>
              <li>
                <strong>Email:</strong> {user.email}
              </li>
            </ul>
          </section>

          {/* QUICK ACTIONS */}
          <section className="dashboard-actions">
            <h2>Quick Actions</h2>
            <div className="dashboard-card-grid">
              <DashboardCard
                title="Get Fertilizer Recommendation"
                description="Fill the form and get instant fertilizer advice."
                to="/fertilizerform"
              />
              <DashboardCard
                title="View Stats"
                description="See your past predictions and usage summary."
                to="/stats"
              />
              <DashboardCard
                title="Disease Detection"
                description="Upload crop images to detect plant diseases."
                to="/disease"
              />
              <DashboardCard
                title="About App"
                description="Learn what this project does and how it helps farmers."
                to="/about"
              />
            </div>
          </section>

          {/* STATS PREVIEW */}
          <section className="dashboard-stats-preview">
            <h2>Your Fertilizer Usage Summary</h2>

            {loadingStats && <p>Loading stats...</p>}
            {!loadingStats && statsError && (
              <p className="dashboard-error-text">{statsError}</p>
            )}
            {!loadingStats && !statsError && stats.length === 0 && (
              <p>No predictions yet. Try the Fertilizer Form!</p>
            )}

            {!loadingStats && !statsError && stats.length > 0 && (
              <>
                {/* Table Summary */}
                <div className="dashboard-stats-table-wrapper">
                  <table className="dashboard-stats-table">
                    <thead>
                      <tr>
                        <th>Fertilizer</th>
                        <th>Times Recommended</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.map((row) => (
                        <tr key={row._id}>
                          <td>{row._id}</td>
                          <td>{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Chart (optional) */}
                <div className="dashboard-stats-chart-wrapper">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="fertilizer" angle={-30} textAnchor="end" interval={0} />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}

            <div style={{ marginTop: "1rem" }}>
              <Link to="/stats" className="dashboard-view-all-link">
                View full stats →
              </Link>
            </div>
          </section>

          {/* LOGOUT */}
          <section className="dashboard-logout">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </section>
        </>
      )}
    </div>
  );
};

/** Small presentational card component */
const DashboardCard = ({ title, description, to }) => (
  <Link to={to} className="dashboard-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </Link>
);

export default Dashboard;
