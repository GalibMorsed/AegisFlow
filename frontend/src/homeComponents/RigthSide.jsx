import React, { useState } from "react";
import axios from "axios";

const RightSide = ({ events = [], staffs = [], cameras = [], refresh }) => {
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
  });

  const [staffForm, setStaffForm] = useState({
    location: "",
    cameraName: "",
    staffId: "",
    staffName: "",
  });

  const userEmail = localStorage.getItem("userEmail");

  const addEvent = async () => {
    await axios.post("http://localhost:8000/profile/addevents", {
      email: userEmail,
      title: eventForm.title,
      description: eventForm.description,
    });

    setEventForm({ title: "", description: "" });
    refresh();
  };

  const addStaff = async () => {
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
  };

  return (
    <div className="space-y-8">
      {/* EVENTS */}
      <div className="border rounded-lg p-5 bg-white">
        <h2 className="font-bold mb-3 text-lg">Events</h2>

        <input
          className="border p-2 w-full mb-2"
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
          className="bg-purple-500 px-4 py-2 text-white rounded"
        >
          Save Event
        </button>

        <div className="mt-4 space-y-2">
          {events?.length === 0 && <p>No events yet...</p>}
          {events?.map((ev) => (
            <div key={ev._id} className="border p-2 rounded">
              <p className="font-bold">{ev.title}</p>
              <p className="text-gray-600 text-sm">{ev.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* STAFF */}
      <div className="border rounded-lg p-5 bg-white">
        <h2 className="font-bold mb-3 text-lg">Staffs</h2>

        <input
          placeholder="Location"
          className="border p-2 w-full mb-2"
          value={staffForm.location}
          onChange={(e) =>
            setStaffForm({ ...staffForm, location: e.target.value })
          }
        />

        <select
          className="border p-2 w-full mb-2"
          value={staffForm.cameraName}
          onChange={(e) =>
            setStaffForm({ ...staffForm, cameraName: e.target.value })
          }
        >
          <option>Select Camera</option>
          {cameras?.map((cam) => (
            <option key={cam._id}>{cam.name}</option>
          ))}
        </select>

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
          onClick={addStaff}
          className="bg-blue-500 px-4 py-2 text-white rounded"
        >
          Save Staff
        </button>

        <div className="mt-4 space-y-2">
          {staffs?.length === 0 && <p>No staff added yet…</p>}
          {staffs?.map((s) => (
            <div key={s._id} className="border p-2 rounded">
              <p>
                {s.staffName} ({s.staffId})
              </p>
              <p className="text-gray-600 text-sm">{s.cameraName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
