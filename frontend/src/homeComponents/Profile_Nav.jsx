import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";

const Nav = () => {
  const [dark, setDark] = useState(() => {
    // Check localStorage for saved theme preference
    // If 'theme' is explicitly 'dark' in localStorage, set dark mode.
    // Otherwise, default to light mode (false).
    return localStorage.theme === "dark";
  });

  const toggleDark = () => {
    const isDark = !dark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark");
    localStorage.theme = isDark ? "dark" : "light";
  };

  // Apply the dark class on initial component mount
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

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
              <span className="text-lg font-semibold">
                {dark ? "Dark Mode" : "Light Mode"}
              </span>

              {/* DARK MODE SWITCH */}
              <button
                onClick={toggleDark}
                className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded-full px-1 flex items-center relative transition-colors duration-300"
              >
                {/* SUN when light mode */}
                {!dark && (
                  <span className="absolute right-2 text-lg select-none">
                    ☀️
                  </span>
                )}

                {/* MOON when dark mode */}
                {dark && (
                  <span className="absolute left-2 text-lg select-none">
                    🌙
                  </span>
                )}

                {/* Slide circle */}
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
