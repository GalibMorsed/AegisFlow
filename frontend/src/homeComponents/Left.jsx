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
  const deleteTask = async (id) => {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:8000/profile/deletetask/${id}`, {
        data: { email: user.email },
      });

      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = async () => {
    try {
      await axios.post("http://localhost:8000/profile/addtasks", {
        email: user.email,
        cameraName: form.cameraName,
        taskType: form.taskType,
        startTime: form.startTime,
        endTime: form.endTime,
        status: "Pending",
      });

      setShowAdd(false);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-6 w-[360px]">
      {/* PROFILE */}
      <div className="border p-6 rounded-lg bg-gray-50 flex flex-col items-center">
        <img
          src="/imgs/userImg.avif"
          alt="User"
          className="w-20 h-20 rounded-full border-2 border-blue-600 mb-3"
        />

        <h2 className="text-xl font-bold">{user?.name}</h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      {/* TASKS */}
      <div className="border p-5 rounded-lg bg-gray-50">
        <div className="flex justify-between">
          <h2 className="font-bold">Tasks</h2>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-green-200 px-4 py-2 rounded-xl"
          >
            +
          </button>
        </div>

        {/* SHOW TASKS */}
        {tasks.length === 0 && (
          <p className="text-gray-400 mt-2">No tasks yet...</p>
        )}

        {tasks.map((t) => (
          <div
            key={t._id}
            className="border p-2 rounded mt-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{t.taskType}</p>
              <small className="text-gray-500">{t.cameraName}</small>
              <br />
              <small>
                {t.startTime} - {t.endTime}
              </small>
              <p>Status : {t.status || "Pending"}</p>
            </div>

            {t.status !== "Pending" && (
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
                onChange={() => deleteTask(t._id)}
              />
            )}
          </div>
        ))}
      </div>

      {/* POPUP */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded space-y-3">
            <h3 className="font-bold text-lg">Add Task</h3>

            <select
              name="cameraName"
              onChange={handleChange}
              className="border w-full p-2"
            >
              <option>Select Camera</option>
              {cameras?.map((cam) => (
                <option key={cam._id}>{cam.name}</option>
              ))}
            </select>

            <select
              name="taskType"
              onChange={handleChange}
              className="border w-full p-2"
            >
              <option>High Alert</option>
              <option>Maintenance</option>
              <option>Normal Check</option>
            </select>

            <input
              name="startTime"
              onChange={handleChange}
              placeholder="Start Time"
              className="border w-full p-2"
            />

            <input
              name="endTime"
              onChange={handleChange}
              placeholder="End Time"
              className="border w-full p-2"
            />

            <button
              onClick={addTask}
              className="bg-green-500 text-white w-full p-2"
            >
              Save
            </button>

            <button
              onClick={() => setShowAdd(false)}
              className="bg-gray-300 w-full p-2"
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
