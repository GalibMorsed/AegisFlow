import React, { useEffect, useState } from "react";
import { FaBell, FaVideo, FaMapMarkerAlt, FaTasks } from "react-icons/fa";
import axios from "axios";
import { API_BASE } from "../config";

const HomeSection3 = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const buildSeverity = (index) => {
    // simple pattern just to generate some variety
    if (index % 3 === 0) return "high";
    if (index % 3 === 1) return "medium";
    return "low";
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case "high":
        return {
          badge: "bg-red-100 text-red-700 border-red-300",
          dot: "bg-red-600",
          ring: "ring-2 ring-red-200",
          label: "High priority",
        };
      case "medium":
        return {
          badge: "bg-amber-50 text-amber-700 border-amber-100",
          dot: "bg-amber-400",
          ring: "ring-2 ring-amber-100",
          label: "Medium priority",
        };
      default:
        return {
          badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
          dot: "bg-emerald-400",
          ring: "ring-2 ring-emerald-100",
          label: "Low priority",
        };
    }
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        // Fetch cameras and tasks concurrently
        const [camRes, taskRes] = await Promise.all([
          axios.post(`${API_BASE}/camera/get`, { email }),
          axios.post(`${API_BASE}/profile/gettasks`, { email }), // Assuming this endpoint exists
        ]);

        const cams = camRes.data.cameras || [];
        const tasks = taskRes.data.tasks || [];

        // 1. Generate alerts from cameras (existing logic)
        let generatedAlerts = cams.map((cam, idx) => {
          const severity = buildSeverity(idx);
          return {
            cameraName: cam.name,
            isTask: false,
            location: cam.location,
            severity,
            type:
              severity === "high"
                ? "High crowd density"
                : severity === "medium"
                ? "Unusual motion"
                : "Normal motion",
            message:
              severity === "high"
                ? `High crowd density detected near ${cam.name}. Consider redirecting people or opening an alternate route.`
                : severity === "medium"
                ? `Unusual motion detected at ${cam.name}. Ask nearby staff to verify the situation.`
                : `Motion detected at ${cam.name}. No immediate risk, but keep monitoring.`,
            time: cam.createdAt
              ? new Date(cam.createdAt).toLocaleString()
              : new Date().toLocaleString(),
          };
        });

        // 2. Generate alerts from pending tasks
        const taskAlerts = tasks
          .filter((task) => task.status === "Pending")
          .map((task) => {
            const cam = cams.find((c) => c.name === task.cameraName);
            let severity = "low";
            if (task.taskType === "High Alert") severity = "high";
            if (task.taskType === "Maintenance") severity = "medium";

            return {
              cameraName: task.cameraName,
              isTask: true,
              location: cam?.location || "N/A",
              severity,
              type: `Task: ${task.taskType}`,
              message: `A task is scheduled for this camera from ${task.startTime} to ${task.endTime}.`,
              time: `Scheduled for ${task.startTime}`,
            };
          });

        let allAlerts = [...generatedAlerts, ...taskAlerts];

        // Sort all alerts by severity (high > medium > low)
        const severityOrder = { high: 0, medium: 1, low: 2 };
        allAlerts.sort(
          (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
        );

        // If no cameras / alerts yet, show some dummy examples
        if (allAlerts.length === 0) {
          allAlerts = [
            {
              cameraName: "Gate A – Main Entrance",
              isTask: false,
              location: "North Gate",
              severity: "high",
              type: "High crowd density",
              message:
                "Entry congestion detected at Gate A. Consider opening an additional entry lane or slowing new entries.",
              time: new Date().toLocaleString(),
            },
            {
              cameraName: "Food Court – Block C",
              isTask: true,
              location: "Central Atrium",
              severity: "medium",
              type: "Unusual motion",
              message:
                "Unusual motion pattern detected in Food Court. Ask staff to quickly scan the area.",
              time: new Date().toLocaleString(),
            },
            {
              cameraName: "Parking – Level 2",
              isTask: false,
              location: "East Parking",
              severity: "low",
              type: "Normal motion",
              message:
                "Vehicle movement detected in Parking Level 2. No immediate action needed.",
              time: new Date().toLocaleString(),
            },
          ];
        }

        setAlerts(allAlerts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <section className="px-4 sm:px-[10%] py-10 md:py-12 bg-gradient-to-b from-slate-50 via-slate-50 to-emerald-50/30 border-t border-slate-200/70">
      <div className="max-w-5xl mx-auto">
        {/* Header banner */}
        <div className="w-full max-w-3xl mx-auto mb-8">
          <div className="rounded-2xl bg-white/90 border border-red-100 shadow-sm px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center text-xl">
                <FaBell />
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-slate-900">
                  Real-time safety alerts
                </p>
                <p className="text-[11px] md:text-xs text-slate-600">
                  Live insights from your cameras so you can act before issues
                  escalate.
                </p>
              </div>
            </div>
            <div className="text-[11px] md:text-xs text-red-700 bg-red-50 border border-red-100 rounded-full px-3 py-1">
              AI-assisted recommendations enabled
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center text-xs md:text-sm text-slate-500">
            Fetching latest alerts…
          </div>
        )}

        {/* No alerts state */}
        {!loading && alerts.length === 0 && (
          <div className="text-center text-sm md:text-base text-slate-500 bg-white/90 border border-slate-200 rounded-2xl py-6 px-4 shadow-sm">
            No alerts at the moment. Your spaces look calm. ✨
          </div>
        )}

        {/* Alerts list */}
        {!loading && alerts.length > 0 && (
          <div className="flex flex-col gap-4 items-center">
            {alerts.map((alert, index) => {
              const sev = getSeverityStyles(alert.severity || "low");
              return (
                <article
                  key={index}
                  className={`w-full max-w-[700px] bg-white/95 border border-slate-200 rounded-2xl shadow-sm ${sev.ring} p-4 flex gap-4`}
                >
                  {/* Icon side */}
                  <div className="mt-1">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-xl border ${
                        alert.isTask
                          ? "bg-blue-100 text-blue-600 border-blue-200"
                          : alert.severity === "high"
                          ? "bg-red-100 text-red-600 border-red-300"
                          : alert.severity === "medium"
                          ? "bg-amber-100 text-amber-600 border-amber-200"
                          : "bg-emerald-100 text-emerald-600 border-emerald-200"
                      }`}
                    >
                      {alert.isTask ? <FaTasks /> : <FaBell />}
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex-1 space-y-1.5">
                    {/* Top row: type + severity badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm md:text-base font-semibold text-slate-900">
                        {alert.type || "Alert"}
                      </p>
                      <div
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${sev.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${sev.dot}`}
                        ></span>
                        {sev.label}
                      </div>
                    </div>

                    {/* Main message */}
                    <p className="text-xs md:text-[13px] text-slate-700 leading-relaxed">
                      {alert.message || alert.text}
                    </p>

                    {/* Meta info: camera + location + time */}
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500">
                      {alert.cameraName && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5">
                          <FaVideo className="text-[10px] text-slate-400" />
                          <span className="truncate max-w-[9rem]">
                            {alert.cameraName}
                          </span>
                        </span>
                      )}

                      {alert.location && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5">
                          <FaMapMarkerAlt className="text-[10px] text-emerald-500" />
                          <span className="truncate max-w-[9rem]">
                            {alert.location}
                          </span>
                        </span>
                      )}

                      {alert.time && (
                        <span className="text-[11px] text-slate-400">
                          {alert.time}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeSection3;
