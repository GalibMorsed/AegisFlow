import React, { useEffect, useState } from "react";
import axios from "axios";

import HomeSection1 from "../homeComponents/HomeSection1";
import HomeSection2 from "../homeComponents/homeSection2";
import HomeSection4 from "../homeComponents/Homesection4";
import HomeFooter from "../homeComponents/homeFooter";
import HomeSection3 from "../homeComponents/homeSection3";
import Nav from "../homeComponents/Nav";

const Home = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCoords, setSelectedCoords] = useState(null);

  // LOAD CAMERAS FROM BACKEND
  useEffect(() => {
    axios
      .get("http://localhost:8000/camera")
      .then((res) => setCameras(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ADD CAMERA AND KEEP STREAM
  const addCamera = async (cam) => {
    try {
      await axios.post("http://localhost:8000/camera/add", cam);

      // IMPORTANT FIX: KEEP ORIGINAL STREAM
      setCameras((prev) => [...prev, cam]);
    } catch (err) {
      console.log("Failed to add:", err);
    }
  };

  // REMOVE CAMERA
  const deleteCamera = async (index) => {
    try {
      const id = cameras[index]._id;
      await axios.delete(`http://localhost:8000/camera/${id}`);

      // stop stream if present
      if (cameras[index].stream) {
        cameras[index].stream.getTracks().forEach((t) => t.stop());
      }

      setCameras((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  return (
    <div className="dashboard-page bg-blue-300 min-h-screen pb-10">
      <Nav />

      {/* FORM (OPENS WHEN CLICK MAP) */}
      <HomeSection1
        onAddCamera={addCamera}
        selectedCoords={selectedCoords}
        resetCoords={() => setSelectedCoords(null)}
      />

      {/* CAMERA FOOTAGES */}
      <HomeSection2 cameras={cameras} onDisconnect={deleteCamera} />

      {/* MAP SECTION */}
      <HomeSection4 cameras={cameras} onMapClick={setSelectedCoords} />

      <HomeSection3 />
      <HomeFooter />
    </div>
  );
};

export default Home;
