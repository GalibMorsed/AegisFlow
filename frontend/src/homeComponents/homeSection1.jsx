import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSection1 = () => {
  const navigate = useNavigate();

  return (
    <section className="home-section1 flex flex-col items-center justify-center py-10 bg-blue-50">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">
        Manage Your Cameras
      </h2>
      <button
        onClick={() => navigate("/dashboard/add-camera")}
        className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
      >
        + Add Camera
      </button>
    </section>
  );
};

export default HomeSection1;
