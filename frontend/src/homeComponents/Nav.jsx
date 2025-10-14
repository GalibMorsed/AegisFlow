import React from "react";
import Body from "./Body";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-blue-500 p-4 items-center">
      <div className="flex items-center justify-center gap-4">
        <button>
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
        </button>
        <img
          src="../public/imgs/userImg.avif"
          alt="UserHome"
          className="w-10 h-10 rounded-2xl"
        />
        <h1 className="text-2xl ml-2">Hi,user</h1>
      </div>

      <div>
        <h1 className="text-2xl">AegisFlow</h1>
      </div>
    </nav>
  );
};

export default Nav;
