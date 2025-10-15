import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RefrshHandler from "./refreshHandler";
import Login from "./authComponents/login";
import SignIn from "./authComponents/Sign";
import ResetPassword from "./authComponents/resetPassword";
import Home from "./sourcePages/Home";
import About from "./sourcePages/About";
import Career from "./sourcePages/Career";
import Resource from "./sourcePages/Resource";
import Solution from "./sourcePages/Solution";
import Veterans from "./sourcePages/Veteran";

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
          <Route
            path="/about-us"
            element={<PrivateRoute element={<About />} />}
          />
          <Route
            path="/career"
            element={<PrivateRoute element={<Career />} />}
          />
          <Route
            path="/resources"
            element={<PrivateRoute element={<Resource />} />}
          />
          <Route
            path="/solution"
            element={<PrivateRoute element={<Solution />} />}
          />
          <Route
            path="/veterans"
            element={<PrivateRoute element={<Veterans />} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
