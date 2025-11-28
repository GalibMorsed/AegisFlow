import React, { useState, useEffect } from "react";
import { FaLightbulb, FaVideo, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const suggestion = () => {
  const [cams, setCams] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getCams = async () => {
      const email = localStorage.getItem("userEmail");

      if (!email) return;

      const res = await axios.post("http://localhost:8000/camera/get", {
        email,
      });

      setCams(res.data.cameras);

      generateSuggestions(res.data.cameras);
    };

    const generateSuggestions = (cameras) => {
      const sugs = [];

      // suggestion based on number of cameras
      if (cameras.length === 1) {
        sugs.push("Consider adding at least 1 more camera for full coverage.");
      } else if (cameras.length >= 3) {
        sugs.push("Your premises are well covered with multiple cameras.");
      }

      // location-based
      cameras.forEach((cam) => {
        if (cam.location.toLowerCase().includes("parking")) {
          sugs.push(
            `Parking Area camera detected. Consider adding motion alerts.`
          );
        }
        if (cam.type === "IP Camera") {
          sugs.push(`${cam.name}: check IP regularly for connection issues.`);
        }
      });

      // general suggestion
      sugs.push("Ensure cameras have night vision for better security.");

      setSuggestions(sugs);
    };

    getCams();
  }, []);

  return (
    <section className="px-[16%] py-14 bg-gray-50 border-t border-gray-200 mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        💡 Security Recommendations
      </h2>

      <div className="flex flex-col gap-5 items-center">
        {suggestions.map((sug, i) => (
          <div
            key={i}
            className="w-[70%] bg-white border border-blue-300 rounded-xl shadow-md flex gap-4 items-start p-4"
          >
            <div className="text-yellow-400 text-3xl">
              <FaLightbulb />
            </div>

            <div>
              <p className="font-semibold text-gray-700 text-lg">{sug}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default suggestion;
