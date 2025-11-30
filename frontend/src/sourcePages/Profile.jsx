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
  }, []);

  const fetchAll = async () => {
    const email = localStorage.getItem("userEmail");

    try {
      const resUser = await axios.get("http://localhost:8000/auth/me");
      setUser(resUser.data);
    } catch (err) {}

    // CAMERAS
    try {
      const camRes = await axios.post("http://localhost:8000/camera/get", {
        email,
      });
      setCameras(camRes.data.cameras);
    } catch (err) {}

    // TASKS
    try {
      const res = await axios.post(
        "http://localhost:8000/profile/gettasks",
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("TASK RESPONSE:", res.data);
      setTasks(res.data.tasks);
    } catch (err) {
      console.log("TASK ERROR:", err);
    }

    // EVENTS
    try {
      const eventRes = await axios.post(
        "http://localhost:8000/profile/getevents",
        { email }
      );

      console.log("📢 EVENTS RESPONSE:", eventRes.data);
      setEvents(eventRes.data.events);
    } catch (err) {
      console.log("❌ EVENTS ERROR:", err.response?.data || err);
    }

    // STAFF
    try {
      const staffRes = await axios.post(
        "http://localhost:8000/profile/getstaffs",
        {
          email,
        }
      );
      setStaffs(staffRes.data.staffs);
    } catch (err) {}
  };

  return (
    <div>
      <Nav />
      <div className="flex gap-5 justify-center mt-6">
        <Left user={user} tasks={tasks} cameras={cameras} refresh={fetchAll} />
        <div className="w-3/4">
          <Right
            events={events}
            staffs={staffs}
            cameras={cameras}
            refresh={fetchAll}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
