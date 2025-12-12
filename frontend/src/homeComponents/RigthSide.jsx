import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";
import { FaTrash } from "react-icons/fa";
import { MdOutlineEventNote, MdPeopleOutline } from "react-icons/md"; // For empty states
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
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);

  const [showEventForm, setShowEventForm] = useState(false);

  const [staffForm, setStaffForm] = useState({
    location: "",
    cameraName: "",
    staffId: "",
    staffName: "",
  });
  const [isAddingStaff, setIsAddingStaff] = useState(false);

  const userEmail = localStorage.getItem("userEmail");

  // ========== EVENTS ==========

  const addEvent = async () => {
    if (!eventForm.title.trim() || !eventForm.description.trim()) {
      toast.error("Please fill both title and description.");
      return;
    }

    setIsAddingEvent(true);
    try {
      await axios.post(`${API_BASE}/profile/addevents`, {
        email: userEmail,
        title: eventForm.title,
        description: eventForm.description,
      });

      setEventForm({ title: "", description: "" });
      setShowEventForm(false);
      refresh();
      toast.success("Event added successfully!");
    } catch (err) {
      console.log("EVENT ADD ERROR:", err.response?.data || err.message);
      toast.error("Failed to add event. Please try again.");
    } finally {
      setIsAddingEvent(false);
    }
  };
  const deleteEvent = async (id) => {
    const ok = window.confirm("Delete this event?");
    if (!ok) return;

    try {
      await axios.delete(`${API_BASE}/profile/deleteevent/${id}`, {
        data: { email: userEmail },
      });
      toast.success("Event deleted successfully!");
      refresh();
    } catch (err) {
      console.log("EVENT DELETE ERROR:", err.response?.data || err.message);
      toast.error("Failed to delete event. Please try again.");
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
      toast.error("Please fill all staff fields.");
      return;
    }
    setIsAddingStaff(true);

    try {
      await axios.post(`${API_BASE}/profile/addstaffs`, {
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
      toast.success("Staff added successfully!");
      refresh();
    } catch (err) {
      console.log("STAFF ADD ERROR:", err.response?.data || err.message);
      toast.error("Failed to add staff. Please try again.");
    } finally {
      setIsAddingStaff(false);
    }
  };
  const deleteStaff = async (id) => {
    const ok = window.confirm("Delete this staff?");
    if (!ok) return;

    try {
      await axios.delete(`${API_BASE}/profile/deletestaff/${id}`, {
        data: { email: userEmail },
      });

      toast.success("Staff deleted successfully!");
      refresh();
    } catch (err) {
      console.log("STAFF DELETE ERROR:", err.response?.data || err.message);
      toast.error("Failed to delete staff. Please try again.");
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
        className="rounded-xl bg-white border border-slate-200 shadow-sm p-4 sm:p-5 max-h-[45vh] overflow-y-auto overflow-x-hidden"
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
            className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition whitespace-nowrap"
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
              className="border border-slate-300 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Event title"
              value={eventForm.title}
              onChange={(e) =>
                setEventForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <textarea
              className="border border-slate-300 rounded-md p-2 w-full text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
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
              disabled={isAddingEvent}
              className="w-full rounded-md bg-slate-800 text-white text-sm font-medium py-2 hover:bg-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingEvent ? "Saving Event..." : "Save event"}
            </button>
          </motion.div>
        )}

        {/* Events list */}
        <div className="mt-2 flex flex-wrap gap-3">
          {events?.length === 0 && (
            <p className="text-xs sm:text-sm text-slate-400 w-full flex flex-col items-center justify-center py-8">
              <MdOutlineEventNote className="text-4xl mb-2 text-slate-300" />
              <span>
                No events created yet. Use &quot;Add event&quot; to log one.
              </span>
            </p>
          )}

          {events?.map((ev) => (
            <motion.div
              key={ev._id}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className="relative rounded-lg p-3 sm:p-4 border border-slate-200 bg-slate-50/70 hover:shadow-md transition flex flex-col justify-between overflow-hidden flex-1 min-w-[200px] sm:min-w-[240px] max-w-full sm:max-w-[280px] h-[160px] sm:h-[180px]"
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
                aria-label="Delete event"
                className="absolute top-1.5 right-1.5 text-slate-400 hover:text-red-600 text-sm p-1 rounded-full hover:bg-red-100/50 transition"
              >
                <FaTrash />
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
        className="rounded-xl bg-white border border-slate-200 shadow-sm p-4 sm:p-5 max-h-[50vh] overflow-y-auto overflow-x-hidden"
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
            className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition whitespace-nowrap"
            onClick={() => setShowStaffModal(true)}
          >
            <span>Add staff</span>
            <FiChevronDown
              className={`text-slate-400 transition-transform duration-200 ${
                showStaffModal ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* STAFF HEADER ROW */}
        <div className="hidden sm:block bg-slate-50 border-y border-slate-200 px-4 py-2 mb-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-[10px] sm:text-[11px] font-semibold text-slate-500">
            <span>Name / ID</span>
            <span>Camera</span>
            <span className="hidden md:block">Location</span>
            <span className="text-right pr-2">Actions</span>
          </div>
        </div>

        {/* STAFF LIST */}
        <div className="space-y-2">
          {staffs?.length === 0 && (
            <p className="text-xs sm:text-sm text-slate-400 p-2 sm:p-4 flex flex-col items-center justify-center py-8">
              <MdPeopleOutline className="text-4xl mb-2 text-slate-300" />
              <span>
                No staff assigned yet. Click the + button to add staff.
              </span>
            </p>
          )}

          {staffs?.map((s) => (
            <motion.div
              key={s._id}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 230, damping: 18 }}
              className="bg-white rounded-lg p-3 sm:p-0 sm:py-3 sm:px-4 border sm:border-0 sm:border-b border-slate-200 hover:bg-slate-50 transition"
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
                  <button // This delete button is for mobile view
                    onClick={() => deleteStaff(s._id)}
                    aria-label="Delete staff"
                    className="text-slate-400 hover:text-red-600 p-1"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-center text-xs sm:text-sm">
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
                <div className="text-slate-700">
                  <span className="sm:hidden text-slate-500 text-xs block mb-0.5">
                    Camera:
                  </span>
                  {s.cameraName || "-"}
                </div>

                {/* Location */}
                <div className="text-slate-600 hidden md:block">
                  {s.location || "Not specified"}
                </div>

                {/* Actions - Hidden on mobile, shown on tablet+ (desktop delete button) */}
                <div className="hidden sm:flex justify-end">
                  <button
                    aria-label="Delete staff"
                    onClick={() => deleteStaff(s._id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded-full hover:bg-red-100/50"
                  >
                    <FaTrash />
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
            // Removed showStaffModal from dependencies array, as it's not needed for exit animation
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white w-full sm:max-w-md p-4 sm:p-6 rounded-t-2xl sm:rounded-xl shadow-xl space-y-4 border border-slate-200 max-h-[90vh] sm:max-h-auto overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                Add staff
              </h2>
              <button
                onClick={() => setShowStaffModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none p-1"
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
                  className="border border-slate-300 rounded-md p-2 w-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
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
                  className="border border-slate-200 rounded-md p-2 w-full text-sm bg-slate-100 text-slate-600 cursor-not-allowed"
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
                  className="border border-slate-300 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
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
                  className="border border-slate-300 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
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
                className="flex-1 bg-slate-100 text-slate-800 py-2.5 rounded-md text-sm font-medium hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={addStaff}
                disabled={isAddingStaff}
                className="flex-1 bg-slate-800 text-white py-2.5 rounded-md text-sm font-medium hover:bg-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingStaff ? "Saving Staff..." : "Save staff"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default RightSide;
