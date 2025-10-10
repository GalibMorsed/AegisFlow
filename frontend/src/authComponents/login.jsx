import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
        </p>

        <p className="text-sm text-center text-gray-500 mt-2">
          Forgot your password?{" "}
          <Link to="/reset-password" className="text-blue-500 hover:underline">Reset</Link>
        </p>
      </div>
    </div>
  );
}
