import React from "react";
import Logins from "./authComponents/login";
import SignIn from "./authComponents/Sign";
import Nav from "./components/Nav";
import ResetPassword from "./authComponents/resetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/nav" element={<Nav />} />
        <Route path="/" element={<Logins />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
