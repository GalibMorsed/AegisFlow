import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="hidden md:block w-1/2">
        <img
          src="/imgs/bg.jpg"
          alt="Login visual"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col justify-center w-full md:w-1/2 bg-gray-50 relative px-8 sm:px-12 md:px-24">
        <div className="absolute top-6 right-8 text-2xl font-semibold">
          Aegios
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold mb-10 text-left">Sign In</h2>

          <form className="flex flex-col gap-6 text-left">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Username
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="w-full border-b-2 border-gray-300 focus:border-violet-600 outline-none py-2 bg-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full border-b-2 border-gray-300 focus:border-violet-600 outline-none py-2 bg-transparent"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full border-b-2 border-gray-300 focus:border-violet-600 outline-none py-2 bg-transparent pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 px-2"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="bg-violet-600 text-white px-4 py-2 rounded mt-6 hover:bg-violet-700 transition-colors w-full"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600 text-left">
            <p>
             Already have an account?{" "}
              <Link to="/login" className="text-violet-600 hover:underline">
                Login
              </Link>
            </p>
            <p className="mt-2">
              Forgot your password?{" "}
              <Link to="/reset-password" className="text-violet-600 hover:underline">
                Reset
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
