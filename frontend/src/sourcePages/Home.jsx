import React, { useState, useEffect } from "react";
import axios from "axios";

import HomeSection1 from "../homeComponents/homeSection1";
import HomeSection2 from "../homeComponents/homeSection2";
import HomeSection4 from "../homeComponents/Homesection4";
import HomeFooter from "../homeComponents/homeFooter";
import HomeSection3 from "../homeComponents/homeSection3";
import Nav from "../homeComponents/Nav";

const Home = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  // LOAD CAMERAS
  useEffect(() => {
    axios
      .get("http://localhost:8000/camera")
      .then((res) => setCameras(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addCamera = async (cam) => {
    try {
      // UPDATE CAMERA
      if (editingIndex !== null) {
        const id = cameras[editingIndex]._id;

        const res = await axios.put(`http://localhost:8000/camera/${id}`, cam);

        const updatedList = [...cameras];
        updatedList[editingIndex] = res.data.camera;

        setCameras(updatedList);
        setEditingIndex(null); // <-- Reset AFTER setting list
        return;
      }

      // ADD CAMERA
      const res = await axios.post("http://localhost:8000/camera/add", cam);

      setCameras((prev) => [...prev, res.data.camera]);
    } catch (err) {
      console.log("Add/Edit failed:", err);
    }
  };

  // DELETE CAMERA
  const removeCamera = async (index) => {
    try {
      const id = cameras[index]._id;

      await axios.delete(`http://localhost:8000/camera/${id}`);

      if (cameras[index]?.stream) {
        cameras[index].stream.getTracks().forEach((t) => t.stop());
      }

      setCameras((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden gap-10">
      <Nav />

      <HomeSection1
        onAddCamera={addCamera}
        selectedCoords={selectedCoords}
        resetCoords={() => setSelectedCoords(null)}
        // FINAL FIX (prevents blank page crash)
        editingCamera={
          editingIndex !== null && cameras[editingIndex]
            ? cameras[editingIndex]
            : null
        }
        closeEdit={() => setEditingIndex(null)}
      />

      <HomeSection4 onMapClick={(coords) => setSelectedCoords(coords)} />

      <HomeSection2
        cameras={cameras}
        onDisconnect={removeCamera}
        onEdit={(i) => setEditingIndex(i)}
      />

      <HomeSection3 />
      <HomeFooter />
    </div>
  );
};

export default Home;
