import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function PasswordReset() {
  const [showPassword, setShowPassword] = useState(false);

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
          <h2 className="text-4xl font-semibold mb-7">Reset your password</h2>
          <p className="text-gray-600 mb-7 text-[1.05rem]">
            Enter your email and new password below
          </p>

          <form className="flex flex-col gap-6 items-center">
            <div className="w-[99%]">
              <label htmlFor="email" className="block text-gray-700 mb-2 text-left text-[1rem]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full border-b border-gray-300 focus:border-purple-600 outline-none py-3 text-[1rem] bg-transparent"
              />
            </div>

            <div className="relative w-[99%]">
              <label htmlFor="password" className="block text-gray-700 mb-2 text-left text-[1rem]">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="Enter new password"
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
              className="bg-purple-600 text-white rounded py-3 mt-3 hover:bg-purple-700 transition-colors w-[99%] text-[1rem]"
            >
              Reset Password
            </button>
          </form>

          <p className="mt-8 text-sm text-gray-600 text-[1rem]">
            <Link to="/login" className="text-purple-600 hover:underline">
              Go back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
