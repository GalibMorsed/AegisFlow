import React from "react";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();

  return (
    <section className="home-welcome bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center min-h-screen text-white">
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
          onClick={() => navigate("/home")}
          className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
        >
          Get Started 🚀
        </button>
      </div>
    </section>
  );
};

export default Body;
