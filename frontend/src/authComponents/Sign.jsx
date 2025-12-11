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

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    // Validation
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      setLoading(true);
      const url = "https://aegisflow-production.up.railway.app/auth/signup"; // your backend route
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message || "Signup successful!");
        setTimeout(() => navigate("/login"), 1000);
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
      <div className="hidden md:flex w-1/2 bg-purple-100 justify-center items-center">
        <img
          src="/imgs/bg.jpg"
          alt="Illustration"
          className="object-contain h-4/5"
        />
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-10 md:px-20 relative">
        <div className="absolute top-6 right-8 text-3xl font-bold text-purple-700">
          Aegios
        </div>

        <div className="w-full max-w-md text-center md:text-left text-[1.1rem]">
          <h2 className="text-4xl font-semibold mb-7">Create your account</h2>
          <p className="text-gray-600 mb-7 text-[1.05rem]">
            Please fill in your details to sign up
          </p>

          <form
            onSubmit={handleSignup}
            className="flex flex-col gap-6 items-center"
          >
            <div className="w-[99%]">
              <label
                htmlFor="name"
                className="block text-gray-700 mb-2 text-left text-[1rem]"
              >
                Full Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="name"
                name="name"
                value={signupInfo.name}
                required
                placeholder="Enter your full name"
                className="w-full border-b border-gray-300 focus:border-purple-600 outline-none py-3 text-[1rem] bg-transparent"
              />
            </div>

            <div className="w-[99%]">
              <label
                htmlFor="email"
                className="block text-gray-700 mb-2 text-left text-[1rem]"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                value={signupInfo.email}
                required
                placeholder="Enter your email"
                className="w-full border-b border-gray-300 focus:border-purple-600 outline-none py-3 text-[1rem] bg-transparent"
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
                value={signupInfo.password}
                required
                placeholder="Create a password"
                className="w-full border-b border-gray-300 focus:border-purple-600 outline-none py-3 pr-10 text-[1rem] bg-transparent"
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

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white rounded py-3 mt-3 hover:bg-purple-700 transition-colors w-[99%] text-[1rem]"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <button
            type="button"
            className="border border-gray-300 rounded py-3 flex items-center justify-center mt-3 hover:bg-gray-100 transition-colors w-[99%] text-[1rem]"
          >
            <AiOutlineGoogle className="w-6 h-6 mr-3" />
            Sign in with Google
          </button>

          <p className="mt-8 text-sm text-gray-600 text-[1rem]">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}
