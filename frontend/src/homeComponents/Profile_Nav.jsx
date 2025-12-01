import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { MdSpaceDashboard } from "react-icons/md";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));

    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => navigate("/login"), 1000);
  };

  const toggleDark = () => {
    const isDark = !dark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark");
    localStorage.theme = isDark ? "dark" : "light";
  };

  return (
    <header className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white shadow-lg z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* Home + Icon */}
            <Link
              to="/home"
              className="flex items-center gap-2 text-blue-100 hover:bg-blue-800 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              <MdSpaceDashboard size={20} />
              Home
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 relative">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">Dark Mode</span>

              {/* DARK MODE SWITCH */}
              <button
                onClick={toggleDark}
                className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded-full px-1 flex items-center relative transition-colors duration-300"
              >
                {/* Text on empty side */}
                {!dark && (
                  <span className="absolute right-2 text-[10px] font-semibold text-white select-none">
                    OFF
                  </span>
                )}

                {dark && (
                  <span className="absolute left-2 text-[10px] font-semibold text-white select-none">
                    ON
                  </span>
                )}

                {/* Sliding circle */}
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    dark ? "translate-x-12" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
