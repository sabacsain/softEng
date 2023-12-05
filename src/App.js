import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

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
import { AuthService } from "./AuthService";

import "./css/app.css";

function App() {
  // Settings
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFontSize, setFontSize] = useState("Medium");

  const handleChangeTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleFontSize = (e) => {
    setFontSize(() => e.target.value);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {/* Routes */}
        <Routes>
          {/* Redirect to /login when the app starts */}
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
