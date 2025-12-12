// src/components/SuggestionsSection.jsx (or wherever you keep it)
import React, { useState, useEffect } from "react";
import { FaLightbulb, FaVideo, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import axios from "axios";

const SuggestionsSection = () => {
  // Temporary dummy suggestions so the UI shows example data while backend is being wired.
  const [suggestions, setSuggestions] = useState([
    {
      _id: "dummy-1",
      message:
        "Unusual motion detected near the main gate. Consider zooming and reviewing the live feed.",
      alertType: "Motion",
      severity: "High",
      cameraName: "Entrance - Cam 3",
      location: "Main Gate",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "dummy-2",
      message:
        "Loitering detected near loading dock. Suggest notifying assigned staff, Jane Doe, to investigate.",
      alertType: "Loitering",
      severity: "Medium",
      cameraName: "Loading Dock - Cam 1",
      location: "South Yard",
      staffName: "Jane Doe",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "dummy-3",
      message: "Camera 7 signal intermittent — schedule a quick health check.",
      alertType: "Camera Health",
      severity: "Low",
      cameraName: "Parking Lot - Cam 7",
      location: "Parking Area",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          setLoading(false);
           return;
         }

        // ⬇⬇⬇ UPDATE THIS URL / PAYLOAD TO MATCH YOUR BACKEND ⬇⬇⬇
         const res = await axios.post("/", { email });
         // expecting: res.data.suggestions = [ { message, alertType, severity, cameraName, location, createdAt } ]
         setSuggestions(res.data.suggestions || []);
       } catch (err) {
         console.error(
           "Error fetching AI suggestions:",
           err.response?.data || err.message || err
         );
         setError("Unable to load suggestions right now.");
       } finally {
         setLoading(false);
       }
     };

     fetchSuggestions();
  }, []);
  */

  const getSeverityStyles = (severity) => {
    switch ((severity || "").toLowerCase()) {
      case "high":
        return {
          badge: "bg-rose-50 text-rose-600 border-rose-100",
          dot: "bg-rose-500",
          label: "High priority",
        };
      case "medium":
        return {
          badge: "bg-amber-50 text-amber-700 border-amber-100",
          dot: "bg-amber-400",
          label: "Medium priority",
        };
      default:
        return {
          badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
          dot: "bg-emerald-400",
          label: "Low priority",
        };
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 via-slate-50 to-emerald-50/30 border-t border-slate-200/70 py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="inline-flex items-center gap-2 text-base md:text-lg font-semibold text-slate-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <FaLightbulb />
            </span>
            AI Suggestions for Active Alerts
          </h2>
          <p className="mt-2 text-xs md:text-[13px] text-slate-600 max-w-xl mx-auto">
            When AegisFlow detects an alert, the AI model analyzes the situation
            and recommends the next best actions. You&apos;ll see those
            suggestions here in real time.
          </p>
        </div>

        {/* States */}
        {loading && (
          <div className="text-center text-xs md:text-sm text-slate-500">
            Loading suggestions…
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-xs md:text-sm text-rose-500">
            {error}
          </div>
        )}

        {!loading && !error && suggestions.length === 0 && (
          <div className="text-center text-xs md:text-sm text-slate-500 bg-white/80 border border-slate-200 rounded-2xl py-6 px-4 shadow-sm">
            No active alerts right now. Everything looks calm. ✨
          </div>
        )}

        {/* Suggestions list */}
        {!loading && !error && suggestions.length > 0 && (
          <div className="grid gap-4 md:gap-5 md:grid-cols-2">
            {suggestions.map((sug) => {
              const sev = getSeverityStyles(sug.severity);
              const created =
                sug.createdAt &&
                new Date(sug.createdAt).toLocaleString(undefined, {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                });

              return (
                <article
                  key={sug._id || sug.message}
                  className="bg-white/90 border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col gap-3"
                >
                  {/* Top row: icon + alert type + severity */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                        <FaLightbulb className="text-emerald-500 text-lg" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          {sug.alertType || "Alert suggestion"}
                        </p>
                        {created && (
                          <p className="text-[11px] text-slate-500">
                            {created}
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${sev.badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${sev.dot}`}
                      ></span>
                      {sev.label}
                    </div>
                  </div>

                  {/* Main suggestion text */}
                  <p className="text-xs md:text-[13px] text-slate-700 leading-relaxed">
                    {sug.message}
                  </p>

                  {/* Meta row: camera + location */}
                  {(sug.cameraName || sug.location) && (
                    <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-slate-500">
                      {sug.cameraName && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5">
                          <FaVideo className="text-[10px] text-slate-400" />
                          <span className="truncate max-w-[9rem]">
                            {sug.cameraName}
                          </span>
                        </span>
                      )}
                      {sug.location && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5">
                          <FaMapMarkerAlt className="text-[10px] text-emerald-500" />
                          <span className="truncate max-w-[9rem]">
                            {sug.location}
                          </span>
                        </span>
                      )}
                      {sug.staffName && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5">
                          <FaUser className="text-[10px] text-slate-400" />
                          <span className="truncate max-w-[9rem]">
                            {sug.staffName}
                          </span>
                        </span>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuggestionsSection;
