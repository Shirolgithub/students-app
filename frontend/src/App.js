import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/register" style={{ margin: "10px" }}>Register</Link>
        <Link to="/login" style={{ margin: "10px" }}>Login</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
