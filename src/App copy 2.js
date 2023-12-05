// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import TodayWaste from "./TodayWaste";
import Inventory from "./Inventory";
import PriceConversion from "./PriceConversion";
import Settings from "./Settings";
import Expiration from "./Expiration";
import TypesOfWaste from "./TypesOfWastes";
import Login from "./Login";
import Signup from "./Signup";
// import AuthService from "./AuthService";

import "./css/app.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFontSize, setFontSize] = useState("Medium");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);

  const handleChangeTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleFontSize = (e) => {
    setFontSize(() => e.target.value);
  };

  useEffect(() => {
    // Fetch dashboard data when the component mounts
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      // Make a request to the server to fetch dashboard data
      const response = await fetch("/data/dashboard-data");
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      await AuthService.login(username, password);
      setAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleSignup = async (username, password) => {
    try {
      await AuthService.signup(username, password);
      // Optionally, you can automatically login the user after signup
      await handleLogin(username, password);
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          {isAuthenticated ? (
            <>
              <Sidebar />
              <Route path="/todaywaste" element={<TodayWaste />} />
              <Route path="/dashboard" element={<Dashboard data={dashboardData} />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/priceconversion" element={<PriceConversion />} />
              <Route
                path="/settings"
                element={
                  <Settings
                    handleMode={handleChangeTheme}
                    isDarkMode={isDarkMode}
                    handleFontSize={handleFontSize}
                    currentFontSize={currentFontSize}
                  />
                }
              />
              <Route path="/inventory/expiration-table" element={<Expiration />} />
              <Route path="/inventory/types-of-wastes" element={<TypesOfWaste />} />
            </>
          ) : null}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
