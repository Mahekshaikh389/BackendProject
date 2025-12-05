import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [mode, setMode] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMode("login");
  };

  if (token) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return mode === "login" ? (
    <Login
      onSwitchMode={() => setMode("register")}
      onLoginSuccess={setToken}
    />
  ) : (
    <Register onSwitchMode={() => setMode("login")} />
  );
}

export default App;  
