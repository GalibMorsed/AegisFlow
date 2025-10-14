import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function PasswordReset() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
  
      <div className="hidden md:block w-1/2">
        <img
          src="/imgs/bg.jpg"
          alt="Password Reset visual"
          className="object-cover w-full h-full"
        />
      </div>

  
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-gray-50 px-8 sm:px-12 md:px-24">
        <h2 className="text-3xl font-semibold mb-10 text-left">Password Reset</h2>

        <form className="flex flex-col gap-6 text-left">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full border-b-2 border-gray-300 focus:border-violet-600 outline-none py-2 bg-transparent"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Enter new password"
              className="w-full border-b-2 border-gray-300 focus:border-violet-600 outline-none py-2 bg-transparent pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 px-2"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-violet-600 text-white px-4 py-2 rounded mt-6 hover:bg-violet-700 w-full"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600 text-left">
          <p>
            <Link to="/" className="text-violet-600 hover:underline">
              Go back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
