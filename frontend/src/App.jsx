import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RefrshHandler from "./refreshHandler";
import Login from "./authComponents/login";
import SignIn from "./authComponents/Sign";
import ResetPassword from "./authComponents/resetPassword";
import Body from "./homeComponents/Body";
import Home from "./sourcePages/Home";
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
        <Route path="/body" element={<Body />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
