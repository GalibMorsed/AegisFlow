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

  // LOAD cameras from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/camera")
      .then((res) => setCameras(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ADD camera
  const addCamera = async (cam) => {
    const res = await axios.post("http://localhost:8000/camera/add", cam);
    setCameras((prev) => [...prev, res.data.camera]);
  };

  // DELETE camera
  const deleteCamera = async (index) => {
    const id = cameras[index]._id;
    await axios.delete(`http://localhost:8000/camera/${id}`);
    setCameras((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard-page bg-blue-300 min-h-screen pb-10">
      <Nav />

      {/* THE FORM THAT POPS WHEN CLICK MAP */}
      <HomeSection1
        onAddCamera={addCamera}
        selectedCoords={selectedCoords}
        resetCoords={() => setSelectedCoords(null)}
      />

      {/* CAMERA GRID */}
      <HomeSection2 cameras={cameras} onDisconnect={deleteCamera} />

      {/* MAP */}
      <HomeSection4 onMapClick={setSelectedCoords} cameras={cameras} />

      <HomeSection3 />
      <HomeFooter />
    </div>
  );
};

export default Home;
