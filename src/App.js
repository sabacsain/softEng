import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import TodayWaste from "./TodayWaste";
import Inventory from "./Inventory";
import PriceConversion from "./PriceConversion";
import Settings from "./Settings";

import "./css/app.css";

function App() {
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
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
