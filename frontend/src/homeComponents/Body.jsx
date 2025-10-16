import React, { useState } from "react";

const Body = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  // 👉 Dashboard layout (after "Get Started")
  if (showDashboard) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen px-[16%] py-10">
        {/* Add Camera */}
        <div className="flex justify-center mb-10">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
            + Add Camera
          </button>
        </div>

        {/* Camera Visuals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-blue-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-56 flex justify-center items-center text-blue-700 font-semibold text-xl hover:scale-[1.03]"
            >
              🎥 Camera {i + 1} Visuals
            </div>
          ))}
        </div>

        {/* Alert Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-red-500">
          <h2 className="text-red-600 text-2xl font-semibold mb-4 flex items-center gap-2">
            ⚠️ Alert Section
          </h2>
          <div className="flex justify-around items-center text-gray-700 font-medium">
            <div className="bg-red-100 px-5 py-3 rounded-lg hover:bg-red-200 transition-all">
              Motion Detected 🚨
            </div>
            <div className="bg-yellow-100 px-5 py-3 rounded-lg hover:bg-yellow-200 transition-all">
              Camera Offline ⚠️
            </div>
            <div className="bg-green-100 px-5 py-3 rounded-lg hover:bg-green-200 transition-all">
              System Normal ✅
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex justify-center gap-10 text-blue-700 text-sm font-semibold">
          <button className="hover:text-blue-900 hover:underline transition-all">
            Help
          </button>
          <button className="hover:text-blue-900 hover:underline transition-all">
            Contact
          </button>
        </footer>
      </div>
    );
  }

  // 👉 Welcome Page
  return (
    <section className="homecoming bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center min-h-screen text-white">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
          Welcome to <span className="text-yellow-300">AegisFlow</span>
        </h1>
        <p className="text-lg text-black max-w-xl mx-auto">
          Your gateway to seamless workflow management — built by
          <span className="text-white font-semibold">
            {" "}
            Galib Aditya Chakka 🛐 & Saurabh Thakulla
          </span>
        </p>
        <button
          onClick={() => setShowDashboard(true)}
          className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
        >
          Get Started 🚀
        </button>
      </div>
    </section>
  );
};

export default Body;
