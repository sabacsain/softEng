// App.js
import React, { useState } from "react";
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
import {useAuth } from './AuthContext';

import "./css/app.css";
import { useEffect } from "react";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentFontSize, setFontSize] = useState("medium");
    const { authenticated } = useAuth();
    
    const handleChangeTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const handleFontSize = (e) => {
        setFontSize(() => e.target.value);
    };

    useEffect(() => {
        if (isDarkMode) document.querySelector("body").setAttribute("data-theme","dark")
        else document.querySelector("body").setAttribute("data-theme","light")
    }, [isDarkMode])
    
    useEffect(() => {
        switch (currentFontSize) {
            case "small":
                document.querySelector("body").setAttribute("data-font-size","small")
                break;
            case "medium":
                document.querySelector("body").setAttribute("data-font-size","medium")

                break;

            case "large":
                document.querySelector("body").setAttribute("data-font-size","large")
                break;
            
            default: break;
        }

    }, [currentFontSize])
    
    return (
        <div className="App">
            <BrowserRouter>
                {authenticated && <Sidebar />} {/* Render Sidebar only if authenticated */}
                <Routes>
                    {/* If authenticated */}
                    {authenticated && (
                        <>
                            <Route path="/" element={<Navigate to="/dashboard" />} />
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
                        </>
                    )}
                    {/* If not authenticated */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
