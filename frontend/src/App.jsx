import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RefrshHandler from "./refreshHandler";
import Login from "./authComponents/login";
import SignIn from "./authComponents/Sign";
import ResetPassword from "./authComponents/resetPassword";
import WelcomePage from "./sourcePages/Home"; // Welcome page
import Dashboard from "./homeComponents/Body"; // Dashboard page

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") ? true : false;
  });

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<Dashboard />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
