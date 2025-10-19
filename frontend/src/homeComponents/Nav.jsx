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
  };

  return (
    <div className="relative">
      {/* Top Nav Bar */}
      <nav className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-lg">
        {/* Left: Website Name */}
        <h1 className="text-2xl font-bold tracking-wide drop-shadow-sm">
          AegisFlow
        </h1>

        {/* Right: Hi User + Photo */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium text-blue-100">
            Hi,&nbsp;
            <span className="font-semibold text-white">{loggedInUser}</span>
          </h1>
          <img
            src="/imgs/userImg.avif"
            alt="UserHome"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
        </div>
      </nav>

      {/* Hamburger below Navbar (Left Corner) */}
      <div className="absolute left-4 top-full mt-2 z-20">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none text-indigo-600 hover:text-indigo-800 transition-colors bg-white p-2 rounded-lg shadow-md hover:shadow-lg"
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

      {/* Centered Dropdown Menu */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-blue-50 to-white rounded-b-2xl shadow-2xl transition-all duration-500 ease-in-out overflow-hidden z-10
          ${
            menuOpen
              ? "opacity-100 translate-y-0 sm:w-2/3 max-h-[32rem]"
              : "opacity-0 -translate-y-5 sm:w-2/3 max-h-[32rem] pointer-events-none"
          }`}
      >
        {/* small arrow on top-right of dropdown */}
        <div className="absolute right-5 -top-3 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-blue-50" />

        <ul className="flex flex-col items-start py-5 text-gray-700 font-medium space-y-2 transition-all duration-500">
          {[
            { name: "Home", link: "/" },
            { name: "Solution", link: "/" },
            { name: "About Us", link: "/" },
            { name: "Resources", link: "/" },
            { name: "Career", link: "/" },
          ].map((item) => (
            <li key={item.name} className="w-full">
              <Link
                to={item.link}
                onClick={() => setMenuOpen(false)}
                className="flex justify-between items-center w-full py-3 px-6 text-lg hover:bg-indigo-100 hover:text-indigo-700 transition-all rounded-lg"
              >
                <span>{item.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
            </li>
          ))}

          {/* Logout Button */}
          <li className="flex justify-center w-full pt-3 border-t border-indigo-100">
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-28 bg-gradient-to-r from-red-500 to-pink-500 text-center text-white py-3 px-6 text-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all rounded-lg shadow-md"
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
