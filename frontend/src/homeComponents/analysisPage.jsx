// src/pages/AnalysisPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import {
  FaVideo,
  FaBell,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

// Custom icon for map markers
const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut", staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const timeFilters = ["Today", "Week", "Month", "Range"];

const LogModal = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-lg border-t border-slate-200 sm:border"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">{content.title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100"
          >
            <FaTimes className="text-slate-500" />
          </button>
        </header>
        <div className="p-5 text-sm text-slate-600 space-y-3 max-h-[70vh] overflow-y-auto">
          {content.body}
        </div>
        <footer className="px-5 py-3 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 border border-slate-200"
          >
            Close
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
};

const mockLogs = {
  timeline: {
    title: "Timeline for July 18th, 2024",
    body: (
      <p>
        This is where a detailed event timeline for the selected day would
        appear, showing alerts, crowd spikes, and other logged activities in
        chronological order.
      </p>
    ),
  },
  alerts: {
    title: "Weekly Alert Log",
    body: (
      <p>
        A comprehensive list of all <strong>4,365 alerts</strong> from this week
        would be displayed here. Users could filter by type (Safety,
        Crowd-risk), severity (Critical, Warning), and camera location.
      </p>
    ),
  },
  manage: {
    title: "Manage Cameras",
    body: (
      <p>
        This action would typically navigate to a dedicated camera management
        page where users can add, edit, or remove cameras, view their live
        feeds, and configure alert settings for each device.
      </p>
    ),
  },
  export: {
    title: "Export Region Data",
    body: (
      <p>
        Clicking 'Export' would generate and download a CSV or PDF file
        containing the 'People counted by region' data. The file would include
        camera names, locations, and their corresponding activity counts for the
        selected time range.
      </p>
    ),
  },
};

const Analysis = () => {
  const [activeTime, setActiveTime] = useState("Month");

  const busyCameras = [
    {
      id: 1,
      name: "Gate A – Main Entrance",
      zone: "Entry",
      avgCrowd: "82 ppl / min",
      alerts: 19,
    },
    {
      id: 2,
      name: "Food Court – North",
      zone: "Indoor",
      avgCrowd: "64 ppl / min",
      alerts: 12,
    },
    {
      id: 3,
      name: "Parking – Block C",
      zone: "Outdoor",
      avgCrowd: "51 ppl / min",
      alerts: 9,
    },
  ];

  // cameras loaded from DB (via backend /camera/get)
  const [cameras, setCameras] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) return;
        const res = await axios.post("http://localhost:8000/camera/get", {
          email,
        });
        setCameras(res.data.cameras || []);
      } catch (err) {
        console.error(
          "Error fetching cameras:",
          err.response?.data || err.message || err
        );
      }
    };

    fetchCameras();
  }, []);

  const dayAlerts = [
    { day: "Mon", total: 38, critical: 9 },
    { day: "Tue", total: 41, critical: 11 },
    { day: "Wed", total: 29, critical: 6 },
    { day: "Thu", total: 46, critical: 12 },
    { day: "Fri", total: 57, critical: 18 },
    { day: "Sat", total: 33, critical: 7 },
    { day: "Sun", total: 24, critical: 4 },
  ];

  const occupancyBreakdown = [
    { label: "Normal", value: 54 },
    { label: "Busy", value: 28 },
    { label: "Critical", value: 18 },
  ];

  const calendarDays = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ];
  const highDays = [3, 7, 12, 18, 22, 27]; // dummy high-crowd days

  return (
    <>
      <LogModal content={modalContent} onClose={() => setModalContent(null)} />
      {/* light gradient background to match About page */}
      <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-slate-50 to-emerald-50/40 text-slate-900 px-5 py-4 md:px-8 md:py-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              Crowd Analysis
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Live overview of crowd flow, alerts, and camera performance.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="bg-white/90 border border-slate-200/80 rounded-full px-2 py-1 flex flex-wrap items-center text-xs md:text-sm shadow-sm">
              {timeFilters.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTime(item)}
                  className={`px-3 py-1 rounded-full transition ${
                    activeTime === item
                      ? "bg-emerald-500 text-white font-medium shadow"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="hidden sm:flex items-center gap-1 text-xs md:text-sm bg-white/90 border border-slate-200/80 rounded-full px-3 py-1.5 hover:bg-slate-100 transition shadow-sm">
              <FaMapMarkerAlt className="text-[10px] text-emerald-500" />
              <span>All locations</span>
              <FaChevronDown className="text-[10px]" />
            </button>
          </div>
        </div>

        {/* Main grid */}
        <motion.div
          className="grid grid-cols-12 gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* --- Left: Events & Flow chart --- */}
          <motion.section
            className="col-span-12 lg:col-span-5 bg-white/90 border border-slate-200/80 rounded-3xl p-4 md:p-5 flex flex-col gap-4 shadow-sm"
            variants={cardVariants}
          >
            <header className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm md:text-base font-semibold">
                  Crowd flow overview
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Average entry/exit rate from all active cameras.
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  People counted
                </p>
                <p className="text-xl md:text-2xl font-semibold">79,675</p>
                <p className="text-[11px] text-emerald-500 mt-1">
                  +2.4% vs last {activeTime.toLowerCase()}
                </p>
              </div>
            </header>

            {/* chart legend */}
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-400/80" />
                <span>Entries</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-violet-400/80" />
                <span>Exits</span>
              </div>
            </div>

            {/* Simple SVG chart (dummy data) */}
            <div className="mt-1 rounded-2xl bg-white border border-slate-200/80 px-3 py-3">
              <svg
                viewBox="0 0 260 92"
                className="w-full h-24 md:h-28"
                preserveAspectRatio="none"
              >
                {/* grid lines (lighter) */}
                <g stroke="#e2e8f0" strokeWidth="1">
                  <line x1="0" y1="20" x2="260" y2="20" />
                  <line x1="0" y1="45" x2="260" y2="45" />
                  <line x1="0" y1="70" x2="260" y2="70" />
                </g>

                {/* exits (yellow) */}
                <path
                  d="M0,65 C30,60 50,52 70,50 C90,48 110,55 130,47 C150,40 170,35 190,42 C210,48 230,45 260,40"
                  fill="none"
                  stroke="rgba(250, 204, 21, 0.9)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* entries (violet) */}
                <path
                  d="M0,75 C25,55 50,42 80,50 C110,58 130,30 150,26 C170,22 190,35 210,30 C230,26 245,32 260,28"
                  fill="none"
                  stroke="rgba(167, 139, 250, 0.95)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>

              <div className="flex justify-between items-end text-[11px] text-slate-400 mt-1">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>

            {/* summary row */}
            <div className="grid grid-cols-3 gap-3 mt-1 text-xs">
              <div className="bg-slate-50/80 rounded-2xl border border-slate-200 px-3 py-2">
                <p className="text-slate-500">Avg dwell time</p>
                <p className="text-sm font-semibold mt-1">07m 24s</p>
                <p className="text-[11px] text-emerald-500 mt-0.5">
                  -0.8m vs last week
                </p>
              </div>
              <div className="bg-slate-50/80 rounded-2xl border border-slate-200 px-3 py-2">
                <p className="text-slate-500">Peak load</p>
                <p className="text-sm font-semibold mt-1">3.2k people</p>
                <p className="text-[11px] text-violet-400 mt-0.5">
                  Fri • 7:10 PM
                </p>
              </div>
              <div className="bg-slate-50/80 rounded-2xl border border-slate-200 px-3 py-2">
                <p className="text-slate-500 flex items-center gap-1">
                  Active cameras{" "}
                  <FaVideo className="text-[10px] text-emerald-500" />
                </p>
                <p className="text-sm font-semibold mt-1">47 / 52</p>
                <p className="text-[11px] text-amber-500 mt-0.5">5 offline</p>
              </div>
            </div>
          </motion.section>

          {/* --- Middle: Calendar & occupancy --- */}
          <motion.section
            className="col-span-12 lg:col-span-3 bg-white/90 border border-slate-200/80 rounded-3xl p-4 md:p-5 flex flex-col gap-4 shadow-sm"
            variants={cardVariants}
          >
            <header className="flex items-start justify-between">
              <div>
                <h2 className="text-sm md:text-base font-semibold">
                  Busiest days
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Heat based on max detected crowd.
                </p>
              </div>
              <button className="flex items-center gap-1 text-[11px] text-slate-500 bg-white/90 border border-slate-200/80 rounded-full px-2 py-1 hover:bg-slate-50 hover:text-slate-700">
                July 2024
                <FaChevronDown className="text-[9px]" />
              </button>
            </header>

            {/* calendar */}
            <div className="grid grid-cols-7 gap-1.5 text-[10px] mt-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                <span
                  key={d}
                  className="text-center text-slate-500 mb-1 tracking-wide"
                >
                  {d}
                </span>
              ))}
              {calendarDays.map((day) => {
                const isHigh = highDays.includes(day);
                const isToday = day === 18;
                return (
                  <button
                    key={day}
                    className={`aspect-square rounded-full flex items-center justify-center transition text-[10px] ${
                      isToday
                        ? "bg-emerald-500 text-white font-semibold shadow"
                        : isHigh
                        ? "bg-violet-100 text-violet-700 border border-violet-200"
                        : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 bg-slate-50/90 rounded-2xl border border-slate-200 px-3 py-3">
              <p className="text-[11px] text-slate-500 mb-1">Selected day</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-semibold">18 July · Thursday</p>
                  <p className="text-[11px] text-violet-500 mt-1">
                    18.4k people • 21 alerts
                  </p>
                </div>
                <button
                  onClick={() => setModalContent(mockLogs.timeline)}
                  className="flex items-center gap-1 text-[11px] text-slate-800 bg-white rounded-full px-3 py-1 border border-slate-200 hover:bg-slate-100"
                >
                  Open timeline
                  <FaChevronRight className="text-[9px]" />
                </button>
              </div>
            </div>
          </motion.section>

          {/* --- Right: Alerts bar chart --- */}
          <motion.section
            className="col-span-12 lg:col-span-4 bg-white/90 border border-slate-200/80 rounded-3xl p-4 md:p-5 flex flex-col gap-4 shadow-sm"
            variants={cardVariants}
          >
            <header className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm md:text-base font-semibold flex items-center gap-1.5">
                  Alerts
                  <FaBell className="text-[11px] text-amber-400" />
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Safety & crowd-risk alerts grouped by day.
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  This week
                </p>
                <p className="text-xl md:text-2xl font-semibold">4,365</p>
                <p className="text-[11px] text-rose-500 mt-1">
                  +6.7% critical vs last week
                </p>
              </div>
            </header>

            {/* bar chart */}
            <div className="mt-1 flex-1 flex items-end justify-between gap-2">
              {dayAlerts.map((d) => {
                const totalHeight = (d.total / 60) * 100;
                const criticalHeight = (d.critical / d.total) * totalHeight;
                return (
                  <div
                    key={d.day}
                    className="flex flex-col items-center justify-end gap-1 flex-1"
                  >
                    <div className="relative w-full rounded-xl bg-slate-50 border border-slate-200 flex items-end justify-center overflow-hidden h-32">
                      <div
                        style={{ height: `${totalHeight}%` }}
                        className="w-3 md:w-4 rounded-t-full bg-slate-200"
                      />
                      <div
                        style={{ height: `${criticalHeight}%` }}
                        className="w-3 md:w-4 rounded-t-full absolute bottom-0 bg-gradient-to-t from-rose-500 to-amber-300"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500">{d.day}</span>
                  </div>
                );
              })}
            </div>

            {/* legend */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Total alerts
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  Critical alerts
                </span>
              </div>
              <button
                onClick={() => setModalContent(mockLogs.alerts)}
                className="underline underline-offset-2 hover:text-slate-700"
              >
                View alert log
              </button>
            </div>
          </motion.section>

          {/* --- Bottom left: Busy cameras list --- */}
          <motion.section
            className="col-span-12 md:col-span-5 bg-white/90 border border-slate-200/80 rounded-3xl p-4 md:p-5 flex flex-col gap-3 shadow-sm"
            variants={cardVariants}
          >
            <header className="flex items-center justify-between">
              <h2 className="text-sm md:text-base font-semibold">
                Busiest cameras
              </h2>
              <button
                onClick={() => setModalContent(mockLogs.manage)}
                className="text-[11px] text-slate-500 hover:text-slate-700 flex items-center gap-1"
              >
                Manage cameras
                <FaChevronRight className="text-[9px]" />
              </button>
            </header>

            <div className="space-y-3 mt-1">
              {busyCameras.map((cam) => (
                <div
                  key={cam.id}
                  className="flex items-center justify-between bg-slate-50/90 rounded-2xl border border-slate-200 px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-400/60 via-sky-400/60 to-violet-400/60 flex items-center justify-center">
                      <FaVideo className="text-xs text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{cam.name}</p>
                      <p className="text-[11px] text-slate-500">
                        Zone • {cam.zone}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-[11px]">
                    <p className="font-medium text-slate-900">{cam.avgCrowd}</p>
                    <p className="text-amber-500 mt-0.5">
                      {cam.alerts} alerts today
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* --- Bottom right: Region coverage --- */}
          <motion.section
            className="col-span-12 md:col-span-7 bg-white/90 border border-slate-200/80 rounded-3xl p-4 md:p-5 flex flex-col gap-4 shadow-sm"
            variants={cardVariants}
          >
            <header className="flex items-center justify-between">
              <h2 className="text-sm md:text-base font-semibold">
                People counted by region
              </h2>
              <button
                onClick={() => setModalContent(mockLogs.export)}
                className="text-[11px] text-slate-500 hover:text-slate-700"
              >
                Export
              </button>
            </header>

            {/* map showing DB cameras */}
            <div
              className={`rounded-2xl overflow-hidden border border-slate-200 h-60 bg-slate-50 transition-all duration-300 ${
                modalContent ? "pointer-events-none blur-[2px]" : ""
              }`}
            >
              <MapContainer
                center={[25, 30]}
                zoom={2}
                className="w-full h-full"
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {Array.isArray(cameras) &&
                  cameras.map((c) => {
                    const count = (c.tasks && c.tasks.length) || 0;
                    return (
                      <Marker
                        key={c._id || c.name}
                        position={[c.lat, c.lng]}
                        icon={pinIcon}
                      >
                        <Popup>{`${
                          c.name
                        }: ${count.toLocaleString()} (activity)`}</Popup>
                      </Marker>
                    );
                  })}
              </MapContainer>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-baseline justify-between text-xs">
                <p className="text-slate-500">Total people counted</p>
                <p className="text-sm font-semibold">
                  {cameras
                    .reduce(
                      (sum, c) => sum + ((c.tasks && c.tasks.length) || 0),
                      0
                    )
                    .toLocaleString()}
                </p>
              </div>

              <div className="space-y-1.5 mt-1 text-[11px]">
                {Array.isArray(cameras) && cameras.length > 0 ? (
                  cameras.map((c) => {
                    const count = (c.tasks && c.tasks.length) || 0;
                    return (
                      <div
                        key={c._id || c.name}
                        className="flex items-center justify-between bg-slate-50/90 rounded-2xl border border-slate-200 px-2.5 py-1.5"
                      >
                        <span className="flex-1 truncate">{c.name}</span>
                        <span className="text-slate-600">
                          {count.toLocaleString()}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-[11px] text-slate-500">
                    No cameras found.
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </>
  );
};

export default Analysis;
