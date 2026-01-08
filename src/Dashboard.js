import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const storedUsername = localStorage.getItem("username");

    if (!isAuthenticated || !storedUsername) {
      // Redirect to login if not authenticated
      navigate("/");
      return;
    }

    setUsername(storedUsername);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>
          <b>Dashboard</b>
        </h1>
        <h3>Welcome {username}</h3>
        <p>You have successfully logged in!</p>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
