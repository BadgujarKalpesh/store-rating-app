import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home";
import Profile from "./components/Profile"; // Import the new component

import UserDashboard from "./components/Dashboards/UserDashboard";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import StoreOwnerDashboard from "./components/Dashboards/StoreOwnerDashboard";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          StoreRater
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {currentUser && currentUser.role === "System Administrator" && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && currentUser.role === "Store Owner" && (
            <li className="nav-item">
              <Link to={"/owner"} className="nav-link">
                My Store
              </Link>
            </li>
          )}

          {currentUser && currentUser.role === "Normal User" && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                Dashboard
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
               <span className="nav-link">{currentUser.name} ({currentUser.role})</span>
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                My Profile
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} /> {/* --- NEW ROUTE --- */}
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/owner" element={<StoreOwnerDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
