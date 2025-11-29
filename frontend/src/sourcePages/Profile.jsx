import React, { useEffect, useState } from "react";
import axios from "axios";
import Left from "../homeComponents/Left";
import Right from "../homeComponents/RigthSide";
import Nav from "../homeComponents/Nav";

axios.defaults.withCredentials = true;

const Profile = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const [user, setUser] = useState({
    name: localStorage.getItem("loggedInUser"),
    email: localStorage.getItem("userEmail"),
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const userRes = await axios.get("http://localhost:8000/auth/me");
      if (userRes.data) {
        setUser(userRes.data); // only update on success
      }
    } catch {}

    try {
      const taskRes = await axios.get("http://localhost:8000/api/tasks");
      setTasks(taskRes.data);
    } catch {}

    try {
      const eventRes = await axios.get("http://localhost:8000/api/events");
      setEvents(eventRes.data);
    } catch {}

    try {
      const staffRes = await axios.get("http://localhost:8000/api/staffs");
      setStaffs(staffRes.data);
    } catch {}
  };

  return (
    <div>
      <Nav />
      <div className="flex gap-4 justify-center mt-6">
        <Left user={user} tasks={tasks} refresh={fetchAll} />
        <Right events={events} staffs={staffs} />
      </div>
    </div>
  );
};

export default Profile;
