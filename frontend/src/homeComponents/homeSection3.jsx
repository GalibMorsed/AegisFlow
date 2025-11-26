import React from "react";

const HomeSection3 = () => {
  return (
    <section className="home-section3 px-[16%] py-10 bg-white">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Alerts
      </h2>
      <div className="flex justify-around items-center text-gray-700 font-medium flex-wrap gap-4">
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
    </section>
  );
};

export default HomeSection3;
