import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  //Settings
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
        {/* {Render sidebar} */}
        <Sidebar />
        {/*Routes*/}
        <Routes>
          <Route path="/todaywaste" element={<TodayWaste />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
