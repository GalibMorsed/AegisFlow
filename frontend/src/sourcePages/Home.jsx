import React, { useState, useEffect } from "react";
import axios from "axios";

import HomeSection1 from "../homeComponents/homeSection1";
import HomeSection2 from "../homeComponents/homeSection2";
import HomeSection4 from "../homeComponents/Homesection4";
import HomeFooter from "../homeComponents/homeFooter";
import HomeSection3 from "../homeComponents/homeSection3";
import Nav from "../homeComponents/Nav";
import ConfirmBox from "../homeComponents/ConfirmBox";
import ChatBox from "../homeComponents/Chat_bot";
import SuggestionsSection from "../homeComponents/solution";

const Home = () => {
  const [confirmBox, setConfirmBox] = useState(null);

  const confirmAction = (msg, action) => {
    setConfirmBox({
      msg,
      action,
    });
  };

  <SuggestionsSection />;
  const [cameras, setCameras] = useState([]);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  // LOAD CAMERAS
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    axios
      .post("https://aegisflow-production.up.railway.app/camera/get", {
        email: userEmail,
      })
      .then((res) => {
        console.log("CAMERAS:", res.data);
        setCameras(res.data.cameras);
      })
      .catch((err) => console.log(err));
  }, []);

  const addCamera = async (cam) => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) return;

      // UPDATE CAMERA
      if (editingIndex !== null) {
        const id = cameras[editingIndex]._id;

        const res = await axios.put(
          `https://aegisflow-production.up.railway.app/camera/${id}`,
          {
            ...cam,
            email: userEmail,
          }
        );

        const updatedList = [...cameras];
        updatedList[editingIndex] = res.data.camera;

        setCameras(updatedList);
        setEditingIndex(null);
        return;
      }

      // ADD CAMERA
      const res = await axios.post(
        "https://aegisflow-production.up.railway.app/camera/add",
        {
          ...cam,
          email: userEmail,
        }
      );

      setCameras((prev) => [...prev, res.data.camera]);
    } catch (err) {
      console.log("Add/Edit failed:", err);
    }
  };

  // DELETE CAMERA
  const removeCamera = async (index) => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) return;

      const id = cameras[index]._id;

      await axios.delete(
        `https://aegisflow-production.up.railway.app/camera/${id}`,
        {
          data: { email: userEmail },
        }
      );

      if (cameras[index]?.stream) {
        cameras[index].stream.getTracks().forEach((t) => t.stop());
      }

      setCameras((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Nav />

      <HomeSection1
        onAddCamera={(cam) =>
          confirmAction(
            editingIndex !== null
              ? "Are you sure you want to update this camera?"
              : "Are you sure you want to save this camera?",
            () => addCamera(cam)
          )
        }
        selectedCoords={selectedCoords}
        resetCoords={() => setSelectedCoords(null)}
        editingCamera={
          editingIndex !== null && cameras[editingIndex]
            ? cameras[editingIndex]
            : null
        }
        closeEdit={() => setEditingIndex(null)}
      />

      <HomeSection4
        onMapClick={(coords) => setSelectedCoords(coords)}
        cameras={cameras}
      />

      <HomeSection2
        cameras={cameras}
        onDisconnect={(i) =>
          confirmAction("Delete this camera?", () => removeCamera(i))
        }
        onEdit={(i) => setEditingIndex(i)}
      />

      <HomeSection3 />
      <HomeFooter />

      {confirmBox && (
        <ConfirmBox
          text={confirmBox.msg}
          onCancel={() => setConfirmBox(null)}
          onConfirm={() => {
            confirmBox.action();
            setConfirmBox(null);
          }}
        />
      )}

      <ChatBox />
    </div>
  );
};

export default Home;
