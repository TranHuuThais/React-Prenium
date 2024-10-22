import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./fromLogin.css";

import FormLogin from "./components/FormLogin";
import Header from "./components/inc/header";
import Dashboard from "./components/admin/dashboard";
import CreateUser from "./components/admin/user/createUser";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="Header">
          <Header />
        </header>

        <Routes>
          <Route path="/" element={<FormLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createUser" element={<CreateUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
