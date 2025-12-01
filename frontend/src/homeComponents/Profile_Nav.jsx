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
            {/* Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-white"
              >
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>

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
          <div className="hidden md:flex items-center gap-4 relative">
            {/* DARK MODE SWITCH */}
            <button
              onClick={toggleDark}
              className="w-14 h-7 bg-gray-300 dark:bg-gray-700 rounded-full p-1 flex items-center transition"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                  dark ? "translate-x-7" : ""
                }`}
              ></div>
            </button>

            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 text-sm"
            >
              <img
                src="/imgs/userImg.avif"
                alt="User Avatar"
                className="w-9 h-9 rounded-full border-2 border-white/80"
              />
              <span className="font-medium hidden lg:block">
                {loggedInUser}
              </span>
              <FiChevronDown
                className={`${userMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* DROPDOWN */}
            <div
              className={`absolute right-0 mt-12 w-48 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 transition ${
                userMenuOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-200 border-b">
                Signed in as <br />
                <strong className="text-gray-800 dark:text-white">
                  {loggedInUser}
                </strong>
              </div>

              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiUser /> Profile
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiLogOut className="text-red-500" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
