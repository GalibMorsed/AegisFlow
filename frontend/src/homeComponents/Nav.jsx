import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Top Nav Bar */}
      <nav className="flex justify-between items-center bg-blue-600 p-4 text-white shadow-md">
        {/* Left: Website Name */}
        <h1 className="text-2xl font-bold tracking-wide">AegisFlow</h1>

        {/* Right: Hi User + Photo */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium">Hi, User</h1>
          <img
            src="/imgs/userImg.avif"
            alt="UserHome"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
        </div>
      </nav>

      {/* Hamburger below Navbar (Left Corner) */}
      <div className="absolute left-4 top-full mt-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none text-blue-600 hover:text-blue-800 transition-colors bg-white p-2 rounded-md shadow-md"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0 top-[calc(100%+3rem)] bg-blue-100 w-full sm:w-64 overflow-hidden transition-all duration-500 ease-in-out shadow-lg rounded-b-lg ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center py-4 text-blue-800 font-medium space-y-3">
          <li>
            <Link
              to="/home"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/solution"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center hover:text-blue-600 transition-colors"
            >
              Solution
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center hover:text-blue-600 transition-colors"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/resources"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center hover:text-blue-600 transition-colors"
            >
              Resources
            </Link>
          </li>
          <li>
            <Link
              to="/career"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center hover:text-blue-600 transition-colors"
            >
              Career
            </Link>
          </li>
          <li>
            <Link
              to="/veterans"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center hover:text-blue-600 transition-colors"
            >
              Veterans
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
