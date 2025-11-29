import React, { useState } from "react";
import axios from "axios";

const Left = ({ user, tasks, refresh }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    camera: "",
    status: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = async () => {
    if (!form.camera || !form.status || !form.startTime || !form.endTime) {
      alert("All fields are required");
      return;
    }

    try {
      const data = {
        camera: Number(form.camera),
        status: form.status,
        startTime: form.startTime,
        endTime: form.endTime,
        user: localStorage.getItem("loggedInUser"),
      };

      await axios.post("http://localhost:8000/api/add-task", data, {
        withCredentials: true,
      });

      setShowAdd(false);
      refresh();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data.error || "Failed to add task");
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-6 w-[360px]">
      {/* Profile */}
      <div className="border p-6 rounded-lg bg-gray-50 space-y-3 shadow-sm">
        <div className="w-24 h-24 border rounded-full mx-auto bg-gray-200"></div>

        <p className="text-base text-center text-gray-800 font-semibold">
          {user?.name}
        </p>

        <p className="text-center text-gray-500 text-sm">
          Email: {user?.email}
        </p>

        <button className="border px-4 py-2 rounded w-full bg-green-300 hover:bg-green-400 transition">
          Edit Profile
        </button>
      </div>

      {/* Tasks */}
      <div className="border p-5 rounded-lg bg-gray-50 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Tasks</h2>
          <button
            onClick={() => setShowAdd(true)}
            className="border px-3 rounded bg-green-200 hover:bg-green-300 transition text-xl"
          >
            +
          </button>
        </div>

        <div className="space-y-3">
          {tasks.length === 0 && (
            <div className="text-gray-500 text-sm">
              No tasks available yet...
            </div>
          )}

          {tasks.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center border px-4 py-3 rounded-lg bg-white shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-800">{t.status}</p>
                <p className="text-xs text-gray-500">Cam {t.camera}</p>
              </div>

              <span className="text-sm font-medium text-gray-600">
                {t.startTime} – {t.endTime}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-72 space-y-3 shadow-xl animate-fade">
            <h3 className="font-bold text-lg">Add Task</h3>

            <input
              name="camera"
              type="number"
              onChange={handleChange}
              placeholder="Camera Number"
              className="border w-full px-2 py-1 rounded"
            />

            <select
              name="status"
              onChange={handleChange}
              className="border w-full px-2 py-1 rounded"
            >
              <option value="">Select Type</option>
              <option>High Alert</option>
              <option>Maintenance</option>
              <option>Normal</option>
            </select>

            <input
              name="startTime"
              onChange={handleChange}
              placeholder="Start Time"
              className="border w-full px-2 py-1 rounded"
            />

            <input
              name="endTime"
              onChange={handleChange}
              placeholder="End Time"
              className="border w-full px-2 py-1 rounded"
            />

            <button
              onClick={addTask}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Save
            </button>

            <button
              onClick={() => setShowAdd(false)}
              className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Left;
