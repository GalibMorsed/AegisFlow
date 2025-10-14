import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RefrshHandler from "./refreshHandeler";
import Login from "./authComponents/login";
import SignIn from "./authComponents/Sign";
import ResetPassword from "./authComponents/resetPassword";
import Home from "./sourcePages/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
