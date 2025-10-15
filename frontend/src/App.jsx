import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/resources" element={<Resource />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/veterans" element={<Veterans />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
