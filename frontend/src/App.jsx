import React from 'react';
import Logins from './authComponents/Login';
import SignIn from './authComponents/Sign';
import Nav from './components/Nav';
import ResetPassword from './authComponents/ResetPassword';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Logins />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
