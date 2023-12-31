import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Correct import
import App from "./ExpenseTracker";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

const ExpenseTracker = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default ExpenseTracker;
