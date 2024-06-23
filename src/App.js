// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import FormOne from "./components/FormOne";
import FormTwo from "./components/FormTwo"
import FormThree from "./components/FormThree";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Forms</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Form One</Link>
              </li>
              <li>
                <Link to="/form-two">Form Two</Link>
              </li>
              <li>
                <Link to="/form-three">Form Three</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<FormOne />} />
          <Route path="/form-two" element={<FormTwo />} />
          <Route path="/form-three" element={<FormThree />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
