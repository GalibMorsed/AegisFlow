import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RefrshHandler from "./refreshHandler";
import Login from "./authComponents/login";
import SignIn from "./authComponents/Sign";
import ResetPassword from "./authComponents/resetPassword";
import Body from "./homeComponents/bodyComponents/Body";
import Home from "./sourcePages/Home";
import Suggest from "./sourcePages/Suggestion";
import Profile from "./sourcePages/Profile";
import PrivacyPage from "./sourcePages/Privacy";
import ContactPage from "./sourcePages/contact";
import HelpPage from "./sourcePages/help";
import AboutUs from "./sourcePages/aboutUs";
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
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Body />} />}
        />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/suggest"
          element={<PrivateRoute element={<Suggest />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="/privacy"
          element={<PrivateRoute element={<PrivacyPage />} />}
        />
        <Route
          path="/contact"
          element={<PrivateRoute element={<ContactPage />} />}
        />
        <Route path="/about" element={<PrivateRoute element={<AboutUs />} />} />
        <Route path="/help" element={<PrivateRoute element={<HelpPage />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
