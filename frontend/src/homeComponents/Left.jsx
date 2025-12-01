import React, { useState } from "react";
import axios from "axios";

const Left = ({ user, tasks, cameras, refresh }) => {
  const [editing, setEditing] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user?.name,
    email: user?.email,
    password: "",
    photo: null,
  });

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: files ? files[0] : value,
    });
  };

  const submitProfile = async () => {
    try {
      console.log("Sending profile update:", profileForm);

      const res = await axios.put("http://localhost:8000/auth/update", {
        name: profileForm.name,
        password: profileForm.password,
        email: user.email,
      });

      console.log("Profile update response:", res.data);

      // update localStorage
      localStorage.setItem("loggedInUser", profileForm.name);

      alert("Profile updated successfully ✔");
      setEditing(false);
      refresh();
    } catch (err) {
      console.log("Update error:", err.response?.data || err.message);
    }
  };

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

  const finishTask = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/profile/updatetask/${id}`,
        {
          email: user.email,
          status: "Finished",
        }
      );

      console.log("API RESPONSE:", res.data); // <-- add this
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
    <div className="border rounded-lg p-4 space-y-6 w-[400px]">
      {/* PROFILE */}
      <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-white shadow-lg flex flex-col gap-3">
        {/* Profile image + icon */}
        <div className="relative">
          <img
            src="/imgs/userImg.avif"
            alt="User"
            className="w-24 h-24 rounded-full shadow"
          />
          <button
            onClick={() => setEditing(true)}
            className="absolute top-16 left-16 bg-blue-600 w-7 h-7 rounded-full shadow flex items-center justify-center text-white text-xs border-2 border-white"
          >
            ✏️
          </button>
        </div>
        {/* User Info */}
        <p className="text-sm font-semibold">
          <span className="font-bold">Name:</span> {user?.name}
        </p>
        <p className="text-sm font-semibold">
          <span className="font-bold">Email Id:</span> {user?.email}
        </p>
        {/* button */}
        <div className="flex gap-6">
          <button
            onClick={() => setEditing(true)}
            className="mt-2 bg-teal-500 hover:bg-teal-600 text-white w-[140px] px-6 py-2 rounded-lg text-sm font-medium shadow-md"
          >
            EDIT PROFILE
          </button>
          <button
            onClick={() => setEditing(true)}
            className="mt-2 bg-red-500 hover:bg-red-800 text-white w-[140px] px-6 py-2 rounded-lg text-sm font-medium shadow-md"
          >
            Advance
          </button>
        </div>
      </div>

      {/* MODAL */}
      {editing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-xl space-y-4">
            <h2 className="text-xl font-semibold">Edit Profile</h2>

            <input
              name="name"
              value={profileForm.name}
              onChange={handleProfileChange}
              placeholder="Edit Username"
              className="w-full p-2 border rounded-md"
            />
            <input
              name="email"
              value={profileForm.email}
              disabled
              className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed"
            />

            <input
              type="password"
              name="password"
              value={profileForm.password}
              onChange={handleProfileChange}
              placeholder="New Password"
              className="w-full p-2 border rounded-md"
            />

            <input
              type="file"
              name="photo"
              onChange={handleProfileChange}
              className="w-full text-sm"
            />

            <div className="flex gap-3 mt-2">
              <button
                onClick={submitProfile}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Submit
              </button>

              <button
                onClick={() => setEditing(false)}
                className="w-full bg-red-500 text-white py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

            {t.status === "Pending" ? (
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
                onChange={() => finishTask(t._id)}
              />
            ) : (
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteTask(t._id)}
              >
                Delete
              </button>
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
