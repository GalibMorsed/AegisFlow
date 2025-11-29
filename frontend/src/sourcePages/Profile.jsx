import React, { useEffect, useState } from "react";
import Left from "../homeComponents/Left";
import Right from "../homeComponents/RigthSide";
import Nav from "../homeComponents/Nav";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    // FETCH USER
    axios
      .post("http://localhost:8000/user/get", { email })
      .then((res) => setUser(res.data.user));

    // FETCH TASKS
    axios
      .post("http://localhost:8000/tasks/get", { email })
      .then((res) => setTasks(res.data.tasks));
  }, []);

  return (
    <div>
      <Nav />

      <div className="flex gap-4 justify-center">
        <Left user={user} tasks={tasks} />
        <Right />
      </div>
    </div>
  );
};

export default Profile;
