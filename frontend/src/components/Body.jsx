import React from "react";

export default function Body() {
  return (
    <>
      <div>
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
      </div>
      <section className="homecoming">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to AegisFlow</h1>
          <p className="text-lg mb-8">
            Your gateway to seamless workflow management, Created by Galib 🛐 &
            Saurabh Thakulla 🏳️‍🌈
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </div>
      </section>
    </>
  );
}
