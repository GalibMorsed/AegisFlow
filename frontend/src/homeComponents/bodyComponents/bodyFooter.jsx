import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const BodyFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="container mx-auto">
        {/* Newsletter Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
            Stay Updated with <span className="text-blue-400">AegisFlow</span>
          </h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Get the latest updates on new features, security tips, and exclusive
            alerts.
          </p>

          <div className="flex justify-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-center gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-72 sm:w-96 px-4 py-3 rounded-full bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-8">
          {/* Left Side */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">AegisFlow</h3>
            <div className="flex justify-center sm:justify-start gap-6 mt-2">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Middle: Social Links */}
          <div className="flex justify-center gap-5 text-2xl">
            <a href="#" className="hover:text-white transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaGithub />
            </a>
          </div>

          {/* Right Side */}
          <div className="text-gray-500 text-center sm:text-right">
            <p>© {new Date().getFullYear()} AegisFlow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BodyFooter;
