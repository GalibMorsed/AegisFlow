import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGoogle,
} from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      setLoading(true);
      const url = "https://aegisflow-production.up.railway.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // <--- ADD THIS
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("userEmail", email);
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message);
      }
    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Left Illustration Section */}
      <div className="hidden md:flex w-1/2 bg-purple-100 justify-center items-center">
        <img
          src="/imgs/bg.jpg"
          alt="Illustration"
          className="object-contain h-4/5"
        />
      </div>

      {/* Right Login Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-10 md:px-20 relative">
        <div className="absolute top-6 right-8 text-3xl font-bold text-purple-700">
          Aegios
        </div>

        <div className="w-full max-w-md text-center md:text-left text-[1.1rem]">
          <h2 className="text-4xl font-semibold mb-7">Welcome back</h2>
          <p className="text-gray-600 mb-7 text-[1.05rem]">
            Please enter your details
          </p>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-6 items-center"
          >
            <div className="w-[99%]">
              <label
                htmlFor="email"
                className="block text-gray-700 mb-2 text-left text-[1rem]"
              >
                Email address
              </label>
              <input
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                value={loginInfo.email}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-600 py-3 text-[1rem]"
              />
            </div>

            <div className="relative w-[99%]">
              <label
                htmlFor="password"
                className="block text-gray-700 mb-2 text-left text-[1rem]"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                value={loginInfo.password}
                className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-600 py-3 pr-10 text-[1rem]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 w-[99%] text-[0.95rem]">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox scale-110" />{" "}
                Remember for 30 days
              </label>
              <Link
                to="/reset-password"
                className="text-purple-600 hover:underline"
              >
                Forgot password
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white rounded py-3 mt-3 hover:bg-purple-700 transition-colors w-[99%] text-[1rem]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              className="border border-gray-300 rounded py-3 flex items-center justify-center mt-3 hover:bg-gray-100 transition-colors w-[99%] text-[1rem]"
            >
              <AiOutlineGoogle className="w-6 h-6 mr-3" />
              Login with Google
            </button>
          </form>

          <p className="mt-8 text-sm text-gray-600 text-[1rem]">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}
