import React from "react";
import "./App.css";
import FormLogin from "./components/FormLogin";
import { FaUserCircle } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <header className="Sider-bar">
        <div className="App-logo">
          <div className="Content">PREMIUM</div>

          <div className="Icons">
            <i className="fas fa-globe text-2xl"></i>
            <FaUserCircle style={{ color: "gold" }} />
          </div>
        </div>
      </header>
      <div className="FormLogin">
        <FormLogin /> {/* Corrected component call */}
      </div>
    </div>
  );
}

export default App;
