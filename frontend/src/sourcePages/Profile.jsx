import React, { useEffect, useState } from "react";
import axios from "axios";

import Left from "../homeComponents/Left";
import Right from "../homeComponents/RigthSide";
import Nav from "../homeComponents/Nav";

const Profile = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const taskRes = await axios.get("http://localhost:8000/api/tasks");
      const eventRes = await axios.get("http://localhost:8000/api/events");
      const staffRes = await axios.get("http://localhost:8000/api/staffs");

      setTasks(taskRes.data);
      setEvents(eventRes.data);
      setStaffs(staffRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Nav />

      <div className="flex gap-4 justify-center">
        {/* LEFT ONLY TASKS */}
        <LeftSide tasks={tasks} user={user} />

        {/* RIGHT EVENTS + STAFF */}
        <Right events={events} staffs={staffs} />
      </div>
    </div>
  );
};

export default Profile;
