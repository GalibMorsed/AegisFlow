import React, { useState } from "react";
import axios from "axios";
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

const modalVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.25, ease: "easeIn" } },
};

const Left = ({ user, tasks, cameras, refresh }) => {
  const [editing, setEditing] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    photo: null,
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showAdvance, setShowAdvance] = useState(false);

  const [form, setForm] = useState({
    cameraName: "",
    taskType: "",
    startTime: "",
    endTime: "",
  });

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const submitProfile = async () => {
    try {
      const res = await axios.post(
        "https://aegisflow-production.up.railway.app/auth/update",
        {
          name: profileForm.name,
          password: profileForm.password,
          email: user.email,
        }
      );

      console.log("Profile update response:", res.data);
      localStorage.setItem("loggedInUser", profileForm.name);

      alert("Profile updated successfully.");
      setEditing(false);
      refresh();
    } catch (err) {
      console.log("Update error:", err.response?.data || err.message);
      alert("Failed to update profile. Please try again.");
    }
  };

  const deleteAccount = async () => {
    try {
      await axios.delete(
        "https://aegisflow-production.up.railway.app/auth/delete",
        {
          data: { email: user.email },
        }
      );
      alert("Account deleted successfully.");
      localStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      console.error("Delete account error:", err.response?.data || err.message);
      alert("Failed to delete account. Please try again.");
    }
    setShowDeleteConfirm(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const deleteTask = async (id) => {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;

    try {
      await axios.delete(
        `https://aegisflow-production.up.railway.app/profile/deletetask/${id}`,
        {
          data: { email: user.email },
        }
      );
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const finishTask = async (id) => {
    try {
      const res = await axios.put(
        `https://aegisflow-production.up.railway.app/profile/updatetask/${id}`,
        {
          email: user.email,
          status: "Finished",
        }
      );
      console.log("API RESPONSE:", res.data);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = async () => {
    if (
      !form.cameraName ||
      !form.taskType ||
      !form.startTime ||
      !form.endTime
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post(
        "https://aegisflow-production.up.railway.app/profile/addtasks",
        {
          email: user.email,
          cameraName: form.cameraName,
          taskType: form.taskType,
          startTime: form.startTime,
          endTime: form.endTime,
          status: "Pending",
        }
      );

      setShowAdd(false);
      setForm({
        cameraName: "",
        taskType: "",
        startTime: "",
        endTime: "",
      });
      refresh();
    } catch (err) {
      console.log(err);
      alert("Failed to add task. Please try again.");
    }
  };

  const renderStatusBadge = (status) => {
    const base =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    if (status === "Finished") {
      return (
        <span className={`${base} bg-emerald-50 text-emerald-700`}>
          Finished
        </span>
      );
    }
    return (
      <span className={`${base} bg-amber-50 text-amber-700`}>Pending</span>
    );
  };

  return (
    <motion.div
      className="w-full max-w-sm space-y-4 sm:space-y-6 px-4 sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* PROFILE CARD */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="w-full rounded-lg sm:rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col gap-3 sm:gap-4"
      >
        {/* Profile image + basic info */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <img
              src="/imgs/userImg.avif"
              alt="User"
              className="w-14 sm:w-16 h-14 sm:h-16 rounded-full object-cover border border-slate-200"
            />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-sm sm:text-base font-medium text-slate-800 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 break-all line-clamp-1">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-1">
          <button
            onClick={() => setEditing(true)}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 sm:py-2.5 text-xs sm:text-xs font-medium text-slate-800 hover:bg-slate-50 transition"
          >
            <span>Edit profile</span>
          </button>
          <button
            onClick={() => setShowAdvance(true)}
            className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-slate-900 px-3 py-2 sm:py-2.5 text-xs sm:text-xs font-medium text-white hover:bg-slate-800 transition"
          >
            <span>Settings</span>
          </button>
        </div>
      </motion.div>

      {/* TASKS CARD */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="rounded-lg sm:rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col h-[55vh] sm:h-[60vh]"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
          <div className="flex-1">
            <h2 className="text-sm sm:text-base font-semibold text-slate-800">
              Tasks
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 sm:line-clamp-none">
              Manage and track your camera-related tasks.
            </p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white text-lg sm:text-xl w-9 h-9 hover:bg-emerald-700 transition flex-shrink-0"
            aria-label="Add task"
          >
            +
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {tasks.length === 0 && (
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              No tasks created yet. Click the + button to add one.
            </p>
          )}

          {tasks.map((t) => (
            <motion.div
              key={t._id}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 230, damping: 18 }}
              className="border border-slate-200 rounded-lg p-3 flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3 bg-slate-50/60 hover:bg-slate-50/90 transition"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">
                    {t.taskType}
                  </p>
                  <div className="flex-shrink-0">
                    {renderStatusBadge(t.status)}
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Camera: <span className="font-medium">{t.cameraName}</span>
                </p>
                <p className="text-xs text-slate-500">
                  {t.startTime} — {t.endTime}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                {t.status === "Pending" ? (
                  <label className="flex items-center gap-1 text-xs text-slate-600 cursor-pointer hover:text-slate-800 transition">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 cursor-pointer"
                      onChange={() => finishTask(t._id)}
                    />
                    <span>Mark done</span>
                  </label>
                ) : (
                  <button
                    className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-md border border-red-200 text-red-700 hover:bg-red-50 transition whitespace-nowrap"
                    onClick={() => deleteTask(t._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* EDIT PROFILE MODAL */}
      {editing && (
        <div className="fixed inset-0 flex justify-center items-end sm:items-center bg-black/40 backdrop-blur-sm z-50">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white w-full sm:max-w-md p-4 sm:p-6 rounded-t-2xl sm:rounded-xl shadow-xl space-y-4 border border-slate-200 max-h-[90vh] sm:max-h-auto overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                Edit profile
              </h2>
              <button
                onClick={() => setEditing(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  placeholder="Your name"
                  className="w-full p-2 sm:p-3 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  value={profileForm.email}
                  disabled
                  className="w-full p-2 sm:p-3 text-xs sm:text-sm border border-slate-200 rounded-lg bg-slate-50 cursor-not-allowed text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  New password
                </label>
                <input
                  type="password"
                  name="password"
                  value={profileForm.password}
                  onChange={handleProfileChange}
                  placeholder="Leave blank to keep current password"
                  className="w-full p-2 sm:p-3 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  Profile photo (optional)
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleProfileChange}
                  className="w-full text-xs sm:text-sm text-slate-600"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setEditing(false)}
                className="flex-1 bg-slate-100 text-slate-800 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitProfile}
                className="flex-1 bg-slate-900 text-white py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-800 transition"
              >
                Save changes
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {showAdvance && (
        <div className="fixed inset-0 flex justify-center items-end sm:items-center bg-black/40 backdrop-blur-sm z-50">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white w-full sm:max-w-md p-4 sm:p-6 rounded-t-2xl sm:rounded-xl shadow-xl border border-slate-200 max-h-[90vh] sm:max-h-auto overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 sm:pb-4 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                Account & policies
              </h2>
              <button
                onClick={() => setShowAdvance(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Privacy */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowPrivacy(true);
                    setShowAdvance(false);
                  }}
                  className="w-full inline-flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>Privacy policy</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500">
                    View details
                  </span>
                </button>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">
                  Learn how we collect, use, and protect your data while using
                  AegisFlow.
                </p>
              </div>

              {/* Terms */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowTerms(true);
                    setShowAdvance(false);
                  }}
                  className="w-full inline-flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>Terms & conditions</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500">
                    Read terms
                  </span>
                </button>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">
                  Understand the rules for using AegisFlow and our service
                  limitations.
                </p>
              </div>

              {/* Delete account */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    handleDeleteClick();
                    setShowAdvance(false);
                  }}
                  className="w-full inline-flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-red-700 hover:bg-red-100 transition"
                >
                  <span>Delete account</span>
                  <span className="text-[10px] sm:text-[11px] text-red-500">
                    Permanent
                  </span>
                </button>
                <p className="text-[11px] sm:text-xs text-red-600 leading-snug">
                  Remove your account and all associated data from AegisFlow.
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ADD TASK MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-end sm:items-center z-50">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white w-full sm:max-w-md p-4 sm:p-6 rounded-t-2xl sm:rounded-xl shadow-xl border border-slate-200 max-h-[90vh] sm:max-h-auto overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                Add task
              </h3>
              <button
                onClick={() => setShowAdd(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  Camera
                </label>
                <select
                  name="cameraName"
                  value={form.cameraName}
                  onChange={handleChange}
                  className="border border-slate-300 w-full p-2 sm:p-3 text-xs sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 bg-white"
                >
                  <option value="">Select camera</option>
                  {cameras?.map((cam) => (
                    <option key={cam._id} value={cam.name}>
                      {cam.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                  Task type
                </label>
                <select
                  name="taskType"
                  value={form.taskType}
                  onChange={handleChange}
                  className="border border-slate-300 w-full p-2 sm:p-3 text-xs sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 bg-white"
                >
                  <option value="">Select type</option>
                  <option value="High Alert">High alert</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Normal Check">Normal check</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                    Start time
                  </label>
                  <input
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    placeholder="e.g. 10:00"
                    className="border border-slate-300 w-full p-2 sm:p-3 text-xs sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">
                    End time
                  </label>
                  <input
                    name="endTime"
                    value={form.endTime}
                    onChange={handleChange}
                    placeholder="e.g. 12:30"
                    className="border border-slate-300 w-full p-2 sm:p-3 text-xs sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-4 sm:mt-5">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 bg-slate-100 text-slate-800 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="flex-1 bg-emerald-600 text-white py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-700 transition"
              >
                Save task
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* PRIVACY POLICY MODAL */}
      {showPrivacy && (
        <div className="fixed inset-0 flex justify-center items-end sm:items-center bg-black/40 backdrop-blur-sm z-50">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white w-full sm:max-w-2xl p-4 sm:p-8 rounded-t-2xl sm:rounded-xl shadow-2xl max-h-[90vh] sm:max-h-96 overflow-y-auto border border-slate-200"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 sm:pb-4 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 truncate">
                Privacy policy
              </h2>
              <button
                onClick={() => setShowPrivacy(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none flex-shrink-0"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                  1. Information we collect
                </h3>
                <p>
                  We collect personal information you provide including your
                  name, email address, and account credentials. We also collect
                  usage data to improve our services and ensure security.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                  2. How we use your information
                </h3>
                <p>
                  Your information is used to provide, maintain, and improve our
                  services. We use it to communicate with you about updates,
                  security alerts, and support issues.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                  3. Data protection
                </h3>
                <p>
                  We implement industry-standard security measures to protect
                  your personal data from unauthorized access, alteration,
                  disclosure, or destruction.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                  4. Your rights
                </h3>
                <p>
                  You have the right to access, correct, or delete your personal
                  information at any time. You can do this through your account
                  settings or by contacting our support team.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                  5. Third-party services
                </h3>
                <p>
                  We do not share your personal information with third parties
                  without your explicit consent, except as required by law.
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex justify-end">
              <button
                onClick={() => setShowPrivacy(false)}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                I understand
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* TERMS & CONDITIONS MODAL */}
      {showTerms && (
        <div className="fixed inset-0 flex justify-center items-end sm:items-center bg-black/40 backdrop-blur-sm z-50">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white w-full sm:max-w-2xl p-4 sm:p-8 rounded-t-2xl sm:rounded-xl shadow-2xl max-h-[90vh] sm:max-h-96 overflow-y-auto border border-slate-200"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 sm:pb-4 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 truncate">
                Terms & conditions
              </h2>
              <button
                onClick={() => setShowTerms(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none flex-shrink-0"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                  1. Acceptance of terms
                </h3>
                <p>
                  By accessing and using AegisFlow, you accept and agree to be
                  bound by the terms and provisions of this agreement.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                  2. Use license
                </h3>
                <p>
                  Permission is granted to temporarily download one copy of the
                  materials (information or software) from AegisFlow for
                  personal, non-commercial transitory viewing only.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                  3. Disclaimer
                </h3>
                <p>
                  The materials on AegisFlow are provided on an &apos;as
                  is&apos; basis. AegisFlow makes no warranties, expressed or
                  implied, and hereby disclaims and negates all other warranties
                  including, without limitation, implied warranties or
                  conditions of merchantability, fitness for a particular
                  purpose, or non-infringement of intellectual property.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                  4. Limitations
                </h3>
                <p>
                  In no event shall AegisFlow or its suppliers be liable for any
                  damages (including, without limitation, damages for loss of
                  data or profit, or due to business interruption).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1 text-xs sm:text-sm">
                  5. Accuracy of materials
                </h3>
                <p>
                  The materials appearing on AegisFlow could include technical,
                  typographical, or photographic errors. AegisFlow does not
                  warrant that any of the materials on its website are accurate,
                  complete, or current.
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex justify-end">
              <button
                onClick={() => setShowTerms(false)}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                I agree
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex justify-center items-end sm:items-center bg-black/40 backdrop-blur-sm z-50">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white w-full sm:max-w-md p-4 sm:p-8 rounded-t-2xl sm:rounded-xl shadow-2xl border border-red-200 max-h-[90vh] sm:max-h-auto overflow-y-auto"
          >
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="bg-red-50 p-2 sm:p-3 rounded-full border border-red-100 flex-shrink-0">
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-center text-slate-900 mb-2">
              Delete account?
            </h2>
            <p className="text-center text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
              This action is permanent. All your tasks, settings, and account
              data will be removed from AegisFlow.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-3 mb-4 sm:mb-6">
              <p className="text-[11px] sm:text-xs text-red-700 leading-relaxed">
                <span className="font-semibold">Warning:</span> Once your
                account is deleted, it cannot be restored and you will lose
                access to all associated data.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 sm:py-2.5 px-4 rounded-lg text-xs sm:text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={deleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 sm:py-2.5 px-4 rounded-lg text-xs sm:text-sm font-medium transition"
              >
                Delete permanently
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Left;
