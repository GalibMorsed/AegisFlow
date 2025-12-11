import React, { useEffect, useState } from "react";
import axios from "axios";
import Left from "../homeComponents/Left";
import Right from "../homeComponents/RigthSide";
import Nav from "../homeComponents/Profile_Nav";

const Profile = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [cameras, setCameras] = useState([]);

  const [user, setUser] = useState({
    name: localStorage.getItem("loggedInUser"),
    email: localStorage.getItem("userEmail"),
  });

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAll = async () => {
    const email = localStorage.getItem("userEmail");

    // USER
    try {
      const resUser = await axios.get(
        "https://aegisflowbackend.vercel.app/auth/me"
      );
      setUser(resUser.data);
    } catch (err) {
      console.log("USER FETCH ERROR:", err.response?.data || err.message);
    }

    // CAMERAS
    try {
      const camRes = await axios.post(
        "https://aegisflowbackend.vercel.app/camera/get",
        {
          email,
        }
      );
      setCameras(camRes.data.cameras || []);
    } catch (err) {
      console.log("CAMERA FETCH ERROR:", err.response?.data || err.message);
    }

    // TASKS
    try {
      const res = await axios.post(
        "https://aegisflowbackend.vercel.app/profile/gettasks",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("TASK RESPONSE:", res.data);
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.log("TASK ERROR:", err.response?.data || err.message);
    }

    // EVENTS
    try {
      const eventRes = await axios.post(
        "https://aegisflowbackend.vercel.app/profile/getevents",
        { email }
      );

      console.log("📢 EVENTS RESPONSE:", eventRes.data);
      setEvents(eventRes.data.events || []);
    } catch (err) {
      console.log("❌ EVENTS ERROR:", err.response?.data || err.message);
    }

    // STAFF
    try {
      const staffRes = await axios.post(
        "https://aegisflowbackend.vercel.app/profile/getstaffs",
        { email }
      );
      setStaffs(staffRes.data.staffs || []);
    } catch (err) {
      console.log("STAFF FETCH ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top navigation (your existing component) */}
      <Nav />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Page header */}
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-slate-900">
            Profile & dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your profile, tasks, events and staff in one view.
          </p>
        </div>

        {/* Layout: Left (profile + tasks) | Right (events + staff) */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] items-start max-md:flex max-md:flex-col">
          {/* Left side */}
          <div className="w-full">
            <Left
              user={user}
              tasks={tasks}
              cameras={cameras}
              refresh={fetchAll}
            />
          </div>

          {/* Right side */}
          <div className="w-full">
            <Right
              events={events}
              staffs={staffs}
              cameras={cameras}
              refresh={fetchAll}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
