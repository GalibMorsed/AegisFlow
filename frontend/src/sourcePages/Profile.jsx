import React, { useEffect, useState } from "react";
import axios from "axios";
import Left from "../homeComponents/Left";
import Right from "../homeComponents/RigthSide";
import Nav from "../homeComponents/Nav";

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
      const camsRes = await axios.post("http://localhost:8000/camera/get", {
        email,
      });
      setCameras(camsRes.data.cameras);
    } catch {}

    try {
      const taskRes = await axios.post(
        "http://localhost:8000/profile/gettasks",
        { email }
      );
      setTasks(taskRes.data.tasks);
    } catch {}

    try {
      const eventRes = await axios.post(
        "http://localhost:8000/profile/getevents",
        { email }
      );
      setEvents(eventRes.data.events);
    } catch {}

    try {
      const staffRes = await axios.post(
        "http://localhost:8000/profile/getstaffs",
        { email }
      );
      setStaffs(staffRes.data.staffs);
    } catch {}
  };

  return (
    <div>
      <Nav />
      <div className="flex gap-4 justify-center mt-6">
        <Left user={user} tasks={tasks} cameras={cameras} refresh={fetchAll} />
        <Right events={events} staffs={staffs} />
      </div>
    </div>
  );
};

export default Profile;
