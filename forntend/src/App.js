import React from "react";
import "./App.css";
import FormLogin from "./components/FormLogin";
import { FaUserCircle } from "react-icons/fa";
import Images from "../public/images";

function App() {
  return (
    <div className="App">
      <header className="Sider-bar">
        <div className="App-logo">
          <div className="Content">
            <img
              src="./public/images/premium-logo-black@3x.png"
              alt="logo Prenium"
            />
          </div>

          <div className="Icons">
            <i className="fas fa-globe text-2xl"></i>
            <FaUserCircle style={{ color: "gold" }} />
          </div>
        </div>
      </header>
      <div className="FormLogin">
        <FormLogin />
      </div