import React, { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const RightSide = ({ events = [], staffs = [], cameras = [], refresh }) => {
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
  });

  const [showStaff, setShowStaff] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [staffForm, setStaffForm] = useState({
    location: "",
    cameraName: "",
    staffId: "",
    staffName: "",
  });

  const userEmail = localStorage.getItem("userEmail");

  // ========== EVENTS ==========

  const addEvent = async () => {
    try {
      await axios.post("http://localhost:8000/profile/addevents", {
        email: userEmail,
        title: eventForm.title,
        description: eventForm.description,
      });

      setEventForm({ title: "", description: "" });
      refresh();
    } catch (err) {
      console.log("EVENT ADD ERROR:", err.response?.data || err.message);
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
    }
  };

  // ========== STAFF ==========

  const addStaff = async () => {
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

      refresh();
    } catch (err) {
      console.log("STAFF ADD ERROR:", err.response?.data || err.message);
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
    }
  };

  return (
    <div className="space-y-8">
      {/* EVENTS */}
      <div className="border rounded-md p-3 bg-white max-md:w-full max-h-[40vh] overflow-y-auto overflow-x-hidden">
        <div className="flex justify-center">
          <h2 className="font-bold mb-3 mr-auto text-lg">Events</h2>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gray-500 text-white px-3 py-2 rounded-md flex items-center gap-2"
          >
            Add
            <FiChevronDown
              className={`hidden lg:block text-blue-200 transition-transform duration-200 ${
                showForm ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {showForm && (
          <>
            <input
              className="border p-2 w-full mb-2 mt-3"
              placeholder="Title"
              value={eventForm.title}
              onChange={(e) =>
                setEventForm({ ...eventForm, title: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full mb-2"
              placeholder="Description"
              value={eventForm.description}
              onChange={(e) =>
                setEventForm({ ...eventForm, description: e.target.value })
              }
            />

            <button
              onClick={addEvent}
              className="bg-purple-500 px-4 py-2 text-white rounded w-full"
            >
              Save Event
            </button>
          </>
        )}

        <div className="mt-4 flex flex-wrap gap-3 break-words overflow-hidden max-md:ml-[1rem]">
          {events?.length === 0 && <p>No events yet...</p>}

          {events?.map((ev) => (
            <div
              key={ev._id}
              className="relative h-[200px] w-[280px] rounded-2xl p-5 shadow-md border bg-gradient-to-br from-gray-100 to-gray-200 hover:shadow-lg transition duration-200 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <p className="font-bold text-xl mb-5">{ev.title}</p>
                <p className="text-gray-700 text-sm break-words leading-tight">
                  {ev.description}
                </p>
              </div>

              <button
                onClick={() => deleteEvent(ev._id)}
                className="text-red-600 h-5 w-5 absolute top-2 right-2  hover:text-red-800 font-bold text-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* STAFF */}
      <div className="border rounded-xl p-5 max-md:mt-0 bg-gray-100 overflow-y-auto overflow-x-hidden max-h-[50vh]">
        <div className="flex justify-between items-center">
          <h2 className="font-bold mb-2 text-lg">Staffs</h2>
          <button
            className="bg- rounded-xl text-center text-4xl w-12 h-12 mb-5 flex items-center justify-center"
            onClick={() => setShowStaff(!showStaff)}
          >
            +
          </button>
        </div>

        {/* STAFF ADD POPUP (CENTER MODAL) */}
        {showStaff && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-80 sm:w-96 p-6 rounded-xl shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Add Staff</h2>
                <button
                  onClick={() => setShowStaff(false)}
                  className="text-2xl font-bold text-gray-700 hover:text-black"
                >
                  ×
                </button>
              </div>

              <select
                className="border p-2 w-full"
                value={staffForm.cameraName}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  const cam = cameras.find((c) => c.name === selectedName);

                  setStaffForm({
                    ...staffForm,
                    cameraName: selectedName,
                    location: cam ? cam.location : "",
                  });
                }}
              >
                <option>Select Camera</option>
                {cameras?.map((cam) => (
                  <option key={cam._id}>{cam.name}</option>
                ))}
              </select>

              <input
                placeholder="Location (auto-filled)"
                className="border p-2 w-full mb-2 bg-gray-100"
                value={staffForm.location}
                readOnly
              />

              <input
                placeholder="Staff ID"
                className="border p-2 w-full mb-2"
                value={staffForm.staffId}
                onChange={(e) =>
                  setStaffForm({ ...staffForm, staffId: e.target.value })
                }
              />

              <input
                placeholder="Staff Name"
                className="border p-2 w-full mb-2"
                value={staffForm.staffName}
                onChange={(e) =>
                  setStaffForm({ ...staffForm, staffName: e.target.value })
                }
              />

              <button
                onClick={() => {
                  addStaff();
                  setShowStaff(!showStaff);
                }}
                className="bg-blue-500 px-4 py-2 text-white rounded w-full"
              >
                Save Staff
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {staffs?.length === 0 && <p>No staff added yet…</p>}
          <div className="bg-white rounded-2xl shadow-m p-4">
            <div className="grid grid-cols-4 w-auto text-bold text-xl max-md:grid-cols-3">
              <h1>Name</h1>
              <h1 className="text-gray-600 text-bold text-xl">Camera Name</h1>
              <h1 className="text-gray-500 text-bold text-xl hidden md:block">
                Camera_Location
              </h1>
              <button
                onClick={() => deleteStaff(s._id)}
                className="text-gray-500 text-bold ml-auto text-xl max-md:ml-0"
              >
                Manage
              </button>
            </div>
          </div>
          {staffs?.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-2xl shadow-md p-4 border hover:shadow-lg transition duration-200"
            >
              <div className="grid grid-cols-4 max-md:grid-cols-3 items-center gap-2">
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-gray-800">
                    {s.staffName}
                  </span>
                  <span className="text-gray-500 text-xs hidden md:block">
                    ({s.staffId})
                  </span>
                </div>
                <h1 className="text-gray-600 text-sm ">{s.cameraName}</h1>
                <h1 className="text-gray-500 text-xs  hidden md:block">
                  {s.location}
                </h1>
                <button
                  onClick={() => deleteStaff(s._id)}
                  className="text-red-500 hover:text-red-700 ml-auto font-bold text-lg"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
