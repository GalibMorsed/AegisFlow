import React, { useState } from "react";
import axios from "axios";

const Left = ({ user, tasks, cameras, refresh }) => {
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    cameraName: "",
    taskType: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = async () => {
    try {
      await axios.post("http://localhost:8000/profile/addtasks", {
        email: localStorage.getItem("userEmail"),
        cameraName: form.cameraName,
        taskType: form.taskType,
        startTime: form.startTime,
        endTime: form.endTime,
        status: "Pending",
      });

      setShowAdd(false);
      refresh();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-6 w-[360px]">
      <div className="border p-6 rounded-lg bg-gray-50 space-y-3 shadow-sm">
        <p className="text-center font-semibold">{user?.name}</p>
        <p className="text-center text-gray-500">{user?.email}</p>
      </div>

      <div className="border p-5 rounded-lg bg-gray-50 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Tasks</h2>

          <button
            onClick={() => setShowAdd(true)}
            className="border px-3 rounded bg-green-200 text-xl"
          >
            +
          </button>
        </div>

        {/* SHOW tasks */}
        {tasks.length === 0 && (
          <p className="text-gray-500 text-sm">No tasks yet...</p>
        )}

        {tasks.map((t) => (
          <div key={t._id} className="bg-white p-2 border rounded shadow-sm">
            <p className="font-semibold">{t.taskType}</p>
            <p className="text-sm text-gray-600">{t.cameraName}</p>
            <p className="text-xs text-gray-400">
              {t.startTime} — {t.endTime}
            </p>
          </div>
        ))}
      </div>

      {/* Popup */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-72 space-y-3">
            <h3 className="font-bold text-lg">Add Task</h3>

            {/* Camera dropdown */}
            <select
              name="cameraName"
              onChange={handleChange}
              className="border w-full px-2 py-1 rounded"
            >
              <option value="">Select Camera</option>
              {cameras?.map((cam) => (
                <option key={cam._id} value={cam.name}>
                  {cam.name}
                </option>
              ))}
            </select>

            <select
              name="taskType"
              onChange={handleChange}
              className="border w-full px-2 py-1 rounded"
            >
              <option value="">Task Type</option>
              <option>High Alert</option>
              <option>Maintenance</option>
            </select>

            <input
              name="startTime"
              placeholder="Start Time"
              onChange={handleChange}
              className="border w-full px-2 py-1 rounded"
            />

            <input
              name="endTime"
              placeholder="End Time"
              onChange={handleChange}
              className="border w-full px-2 py-1 rounded"
            />

            <button
              onClick={addTask}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setShowAdd(false)}
              className="w-full bg-gray-300 py-2 rounded"
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
