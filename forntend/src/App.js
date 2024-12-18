import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./fromLogin.css";

import FormLogin from "./components/FormLogin";
import Header from "./components/admin/inc/header";
import Dashboard from "./components/admin/dashboard";
import IndexUser from "./components/admin/user/indexUser";
import CreateUser from "./components/admin/user/createUser";
import EditUser from "./components/admin/user/editUser";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchUser from "./components/admin/user/searchUser";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="Header">
            <Header />
          </header>

          <Routes>
            <Route path="/" element={<FormLogin />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/createUser"
              element={<ProtectedRoute element={<CreateUser />} />}
            />
            <Route
              path="indexUser"
              element={<ProtectedRoute element={<IndexUser />} />}
            />
            <Route
              path="/searchUser"
              element={<ProtectedRoute element={<SearchUser />} />}
            />
            <Route
              path="/editUser/:userId"
              element={<ProtectedRoute element={<EditUser />} />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
