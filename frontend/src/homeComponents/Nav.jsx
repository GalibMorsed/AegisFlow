import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiGrid,
  FiInfo,
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiShield,
} from "react-icons/fi";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasSuggestion, setHasSuggestion] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));

    const checkUpdates = async () => {
      const res = await fetch(
        "https://aegisflow-production.up.railway.app/suggestions/unread"
      );
      const data = await res.json();

      if (data.unread === true) {
        setHasSuggestion(true);
      }
    };

    checkUpdates();

    const interval = setInterval(checkUpdates, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => navigate("/login"), 1000);
  };

  const navLinks = [
    { name: "Dashboard", link: "/dashboard", icon: FiHome },
    { name: "Suggestions", link: "/suggest", icon: FiGrid },
    { name: "Analysis", link: "/analysis", icon: FiShield },
    { name: "About Us", link: "/about", icon: FiInfo },
  ];

  return (
    <header className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white shadow-lg z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Hamburger (Mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
              >
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>

            {/* Improved Logo */}
            <Link to="/home" className="flex items-center gap-2 group relative">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 blur-md opacity-40 group-hover:opacity-70 transition-all duration-300" />
                <FiShield className="h-9 w-9 text-yellow-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl tracking-wide font-extrabold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                  AegisFlow
                </span>
                <span className="text-[0.7rem] font-light text-blue-200 italic tracking-widest">
                  Empower • Secure • Simplify
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={() => {
                  if (item.name === "Suggestions") setHasSuggestion(false);
                }}
                className="relative text-blue-100 hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}

                {item.name === "Suggestions" && hasSuggestion && (
                  <span className="absolute top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right: User Menu */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-white"
            >
              <img
                src="/imgs/userImg.avif"
                alt="User Avatar"
                className="w-9 h-9 rounded-full border-2 border-white/80"
              />
              <span className="font-medium text-blue-100 hidden lg:block">
                {loggedInUser}
              </span>
              <FiChevronDown
                className={`hidden lg:block text-blue-200 transition-transform duration-200 ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                userMenuOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="px-4 py-2 text-sm text-gray-500 border-b">
                Signed in as <br />
                <strong className="text-gray-800">{loggedInUser}</strong>
              </div>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiUser className="text-gray-500" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiLogOut className="text-red-500" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-800">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={() => setMenuOpen(false)}
              className="relative flex items-center gap-3 text-blue-100 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              <item.icon />
              {item.name}

              {item.name === "Suggestions" && hasSuggestion && (
                <span className="absolute right-2 top-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-blue-900 bg-blue-800">
          <div className="flex items-center px-5">
            <img
              src="/imgs/userImg.avif"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <div className="text-base font-medium text-white">
                {loggedInUser}
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <Link
              to="/profile"
              className="flex items-center gap-3 text-blue-100 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              <FiUser />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left text-blue-100 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              <FiLogOut className="text-red-400" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
