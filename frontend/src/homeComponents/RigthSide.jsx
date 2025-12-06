import React, { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const RightSide = ({ events = [], staffs = [], cameras = [], refresh }) => {
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
  });

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const [staffForm, setStaffForm] = useState({
    location: "",
    cameraName: "",
    staffId: "",
    staffName: "",
  });

  const userEmail = localStorage.getItem("userEmail");

  // ========== EVENTS ==========

  const addEvent = async () => {
    if (!eventForm.title.trim() || !eventForm.description.trim()) {
      alert("Please fill both title and description.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/profile/addevents", {
        email: userEmail,
        title: eventForm.title,
        description: eventForm.description,
      });

      setEventForm({ title: "", description: "" });
      setShowEventForm(false);
      refresh();
    } catch (err) {
      console.log("EVENT ADD ERROR:", err.response?.data || err.message);
      alert("Failed to add event. Please try again.");
    }
  };

  const deleteEvent = async (id) => {
    const ok = window.confirm("Delete this event?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:8000/profile/deleteevent/${id}`, {
        data: { email: userEmail },
      });
      refresh();
    } catch (err) {
      console.log("EVENT DELETE ERROR:", err.response?.data || err.message);
      alert("Failed to delete event. Please try again.");
    }
  };

  // ========== STAFF ==========

  const addStaff = async () => {
    if (
      !staffForm.cameraName ||
      !staffForm.location ||
      !staffForm.staffId.trim() ||
      !staffForm.staffName.trim()
    ) {
      alert("Please fill all staff fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/profile/addstaffs", {
        email: userEmail,
        ...staffForm,
      });

      setStaffForm({
        location: "",
        cameraName: "",
        staffId: "",
        staffName: "",
      });

      setShowStaffModal(false);
      refresh();
    } catch (err) {
      console.log("STAFF ADD ERROR:", err.response?.data || err.message);
      alert("Failed to add staff. Please try again.");
    }
  };

  const deleteStaff = async (id) => {
    const ok = window.confirm("Delete this staff?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:8000/profile/deletestaff/${id}`, {
        data: { email: userEmail },
      });

      refresh();
    } catch (err) {
      console.log("STAFF DELETE ERROR:", err.response?.data || err.message);
      alert("Failed to delete staff. Please try again.");
    }
  };

  return (
    <motion.div
      className="space-y-6 sm:space-y-8 w-full px-4 sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* EVENTS CARD */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="rounded-lg sm:rounded-2xl bg-white border border-slate-200 shadow-sm p-3 sm:p-5 max-h-[40vh] overflow-y-auto overflow-x-hidden"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
          <div className="flex-1">
            <h2 className="text-sm sm:text-base font-semibold text-slate-800">
              Events
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 sm:line-clamp-none">
              Highlight important incidents, alerts and notes.
            </p>
          </div>

          <button
            onClick={() => setShowEventForm((prev) => !prev)}
            className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs sm:text-xs font-medium text-slate-800 hover:bg-slate-50 transition whitespace-nowrap"
          >
            <span>{showEventForm ? "Close" : "Add event"}</span>
            <FiChevronDown
              className={`text-slate-400 transition-transform duration-200 ${
                showEventForm ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Event form */}
        {showEventForm && (
          <motion.div
            className="mb-4 space-y-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <input
              className="border border-slate-300 rounded-lg p-2 sm:p-3 w-full text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
              placeholder="Event title"
              value={eventForm.title}
              onChange={(e) =>
                setEventForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />

            <textarea
              className="border border-slate-300 rounded-lg p-2 sm:p-3 w-full text-xs sm:text-sm resize-none focus:outline-none focus:ring-1 focus:ring-slate-500"
              placeholder="Short description"
              rows={3}
              value={eventForm.description}
              onChange={(e) =>
                setEventForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            <button
              onClick={addEvent}
              className="w-full rounded-lg bg-emerald-600 text-white text-xs sm:text-sm font-medium py-2 hover:bg-emerald-700 transition"
            >
              Save event
            </button>
          </motion.div>
        )}

        {/* Events list */}
        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
          {events?.length === 0 && (
            <p className="text-xs text-slate-400 w-full">
              No events created yet. Use &quot;Add event&quot; to log one.
            </p>
          )}

          {events?.map((ev) => (
            <motion.div
              key={ev._id}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className="relative rounded-lg sm:rounded-2xl p-3 sm:p-4 border border-slate-200 bg-slate-50/70 hover:shadow-md transition flex flex-col justify-between overflow-y-auto flex-1 min-w-[200px] sm:min-w-[280px] max-w-full sm:max-w-[280px] h-[180px] sm:h-[200px]"
            >
              <div>
                <p className="font-semibold text-xs sm:text-sm text-slate-900 mb-2 line-clamp-1">
                  {ev.title}
                </p>
                <p className="text-xs text-slate-600 leading-snug break-words line-clamp-4 sm:line-clamp-5">
                  {ev.description}
                </p>
              </div>

              <button
                onClick={() => deleteEvent(ev._id)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-600 text-sm"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* STAFF CARD */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="rounded-lg sm:rounded-2xl bg-white border border-slate-200 shadow-sm p-3 sm:p-5 max-h-[50vh] overflow-y-auto overflow-x-hidden"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
          <div className="flex-1">
            <h2 className="text-sm sm:text-base font-semibold text-slate-800">
              Staff
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 sm:line-clamp-none">
              Assign and manage on-ground staff for cameras.
            </p>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white text-lg sm:text-xl w-9 h-9 hover:bg-emerald-700 transition flex-shrink-0"
            onClick={() => setShowStaffModal(true)}
            aria-label="Add staff"
          >
            +
          </button>
        </div>

        {/* STAFF HEADER ROW */}
        <div className="hidden sm:block bg-slate-50 border border-slate-200 rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 mb-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-[10px] sm:text-[11px] font-semibold text-slate-500">
            <span>Name / ID</span>
            <span>Camera</span>
            <span className="hidden md:block">Location</span>
            <span className="text-right pr-2">Actions</span>
          </div>
        </div>

        {/* STAFF LIST */}
        <div className="space-y-2 sm:space-y-2">
          {staffs?.length === 0 && (
            <p className="text-xs sm:text-sm text-slate-400 p-2 sm:p-4">
              No staff assigned yet. Click the + button to add staff.
            </p>
          )}

          {staffs?.map((s) => (
            <motion.div
              key={s._id}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 230, damping: 18 }}
              className="bg-white rounded-lg sm:rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.08)] p-3 sm:p-4 border border-slate-200 hover:shadow-md transition"
            >
              <div className="block sm:hidden mb-3 pb-3 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="font-medium text-slate-900 text-sm block">
                      {s.staffName}
                    </span>
                    <span className="text-slate-500 text-[11px] block">
                      ID: {s.staffId}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteStaff(s._id)}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-medium"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 items-center text-xs">
                {/* Name + ID - Hidden on mobile, shown on tablet+ */}
                <div className="hidden sm:flex sm:flex-col leading-tight">
                  <span className="font-medium text-slate-900">
                    {s.staffName}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    ID: {s.staffId}
                  </span>
                </div>

                {/* Camera name */}
                <div className="text-slate-600 text-[13px]">
                  <span className="sm:hidden text-slate-500 text-[11px] block mb-1">
                    Camera:
                  </span>
                  {s.cameraName || "-"}
                </div>

                {/* Location */}
                <div className="text-slate-500 text-[11px] hidden md:block">
                  {s.location || "Not specified"}
                </div>

                {/* Actions - Hidden on mobile, shown on tablet+ */}
                <div className="hidden sm:flex justify-end">
                  <button
                    onClick={() => deleteStaff(s._id)}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 text-xs font-medium"
                  >
                    <FaTrash className="text-sm" />
                    <span className="hidden md:inline">Remove</span>
                  </button>
                </div>
              </div>

              {/* Mobile additional info */}
              <div className="block sm:hidden mt-3 pt-3 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="text-slate-600 font-medium">
                    {s.location || "Not specified"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* STAFF ADD MODAL */}
      {showStaffModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white w-full sm:max-w-md p-4 sm:p-6 rounded-t-2xl sm:rounded-xl shadow-xl space-y-4 border border-slate-200 max-h-[90vh] sm:max-h-auto overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                Add staff
              </h2>
              <button
                onClick={() => setShowStaffModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {/* Camera select */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  Camera
                </label>
                <select
                  className="border border-slate-300 rounded-lg p-2 sm:p-3 w-full text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-slate-500"
                  value={staffForm.cameraName}
                  onChange={(e) => {
                    const selectedName = e.target.value;
                    const cam = cameras.find((c) => c.name === selectedName);

                    setStaffForm((prev) => ({
                      ...prev,
                      cameraName: selectedName,
                      location: cam ? cam.location : "",
                    }));
                  }}
                >
                  <option value="">Select camera</option>
                  {cameras?.map((cam) => (
                    <option key={cam._id} value={cam.name}>
                      {cam.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Auto-filled location */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  Location
                </label>
                <input
                  placeholder="Auto-filled from camera"
                  className="border border-slate-200 rounded-lg p-2 sm:p-3 w-full text-xs sm:text-sm bg-slate-50 text-slate-600"
                  value={staffForm.location}
                  readOnly
                />
              </div>

              {/* Staff ID */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  Staff ID
                </label>
                <input
                  placeholder="e.g. ST-102"
                  className="border border-slate-300 rounded-lg p-2 sm:p-3 w-full text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
                  value={staffForm.staffId}
                  onChange={(e) =>
                    setStaffForm((prev) => ({
                      ...prev,
                      staffId: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Staff Name */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  Staff name
                </label>
                <input
                  placeholder="Staff full name"
                  className="border border-slate-300 rounded-lg p-2 sm:p-3 w-full text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
                  value={staffForm.staffName}
                  onChange={(e) =>
                    setStaffForm((prev) => ({
                      ...prev,
                      staffName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setShowStaffModal(false)}
                className="flex-1 bg-slate-100 text-slate-800 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={addStaff}
                className="flex-1 bg-slate-900 text-white py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-800 transition"
              >
                Save staff
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default RightSide;
