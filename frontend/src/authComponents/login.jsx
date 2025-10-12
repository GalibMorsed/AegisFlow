import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-container">
      <div
        className="login-image"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80')",
        }}
      ></div>

      <div className="login-form-section">
        <div className="login-box">
          <h2 className="login-title">Login</h2>

          <form className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" required placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" required placeholder="Enter your password" />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="login-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="link">
              Signup
            </Link>
          </p>

          <p className="login-text">
            Forgot your password?{" "}
            <Link to="/reset-password" className="link">
              Reset
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
