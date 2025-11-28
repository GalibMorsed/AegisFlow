import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios";

const HomeSection3 = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const email = localStorage.getItem("userEmail");

      if (!email) return;

      try {
        const res = await axios.post("http://localhost:8000/camera/get", {
          email,
        });

        const cams = res.data.cameras;

        // generate alerts for each camera
        const generatedAlerts = cams.map((cam) => ({
          text: `Motion detected at ${cam.name}`,
          sub: cam.location,
          time: new Date(cam.createdAt).toLocaleString(),
        }));

        setAlerts(generatedAlerts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <section className="px-[16%] py-14 bg-gray-50 border-t border-gray-200">
      <div className="bg-red-600 text-white text-center font-bold text-2xl py-4 rounded-xl shadow-md w-[70%] mx-auto mb-8">
        REAL-TIME MOTION ALERTS 🚨
      </div>

      <div className="flex flex-col gap-5 items-center">
        {alerts.length === 0 && (
          <div className="text-gray-500 text-lg">No motion detected yet.</div>
        )}

        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white border border-red-300 rounded-xl p-4 shadow-sm w-[70%]"
          >
            <div className="text-red-600 text-2xl">
              <FaBell />
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800">
                {alert.text}
              </p>
              <p className="text-sm text-gray-600">{alert.sub}</p>
              <span className="text-sm text-gray-500">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeSection3;
