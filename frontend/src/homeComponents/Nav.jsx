import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    // Redirect to login page
  };

  return (
    <div className="relative">
      {/* Top Nav Bar */}
      <nav className="flex justify-between bg-blue-500 p-4 items-center text-white">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none hover:text-blue-200 transition-colors"
          >
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
          <li>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-center hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
