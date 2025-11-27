import React, { useEffect, useState } from "react";
import { FaVideoSlash, FaBell, FaCheckCircle } from "react-icons/fa";

const HomeSection3 = () => {
  const [alerts, setAlerts] = useState([]);

  // Example data (later connect backend)
  useEffect(() => {
    const sampleAlerts = [
      {
        type: "motion",
        text: "Motion detected on Entrance Camera",
        time: "2 minutes ago",
        icon: <FaBell className="text-red-600" />,
        color:
          "border-red-400 bg-red-50 hover:bg-red-100 shadow-red-200 shadow-md",
      },
      {
        type: "offline",
        text: "Camera #2 went offline",
        time: "5 minutes ago",
        icon: <FaVideoSlash className="text-yellow-600" />,
        color:
          "border-yellow-400 bg-yellow-50 hover:bg-yellow-100 shadow-yellow-200 shadow-md",
      },
      {
        type: "normal",
        text: "All cameras are active",
        time: "Just now",
        icon: <FaCheckCircle className="text-green-600" />,
        color:
          "border-green-400 bg-green-50 hover:bg-green-100 shadow-green-200 shadow-md",
      },
    ];

    setAlerts(sampleAlerts);
  }, []);

  return (
    <section className="px-[16%] py-14 bg-gray-50 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🔔 Live Security Alerts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex border rounded-xl p-5 gap-4 items-start cursor-pointer transition-all duration-300 ${alert.color}`}
          >
            <div className="text-3xl">{alert.icon}</div>

            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-800">
                {alert.text}
              </p>
              <span className="text-sm text-gray-500 mt-1">{alert.time}</span>

              {/* Badge */}
              <span
                className={`mt-2 inline-block px-2 py-1 text-xs font-medium rounded-md ${
                  alert.type === "motion"
                    ? "bg-red-200 text-red-700"
                    : alert.type === "offline"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-green-200 text-green-700"
                }`}
              >
                {alert.type.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeSection3;
