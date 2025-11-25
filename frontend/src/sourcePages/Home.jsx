import React, { useState } from "react";
import "leaflet/dist/leaflet.css";

import HomeSection1 from "../homeComponents/homeSection1";
import HomeSection2 from "../homeComponents/homeSection2";
import HomeSection3 from "../homeComponents/homeSection3";
import HomeSection4 from "../homeComponents/Homesection4";
import HomeFooter from "../homeComponents/homeFooter";
import Nav from "../homeComponents/Nav";

const Home = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCoords, setSelectedCoords] = useState(null);

  const handleAddCamera = (cam) => {
    setCameras((prev) => [...prev, cam]);
    setSelectedCoords(null);
  };

  return (
    <div className="dashboard-page">
      <Nav />

      <HomeSection1
        onAddCamera={handleAddCamera}
        selectedCoords={selectedCoords}
      />

      <HomeSection2 cameras={cameras} />

      <HomeSection4
        cameras={cameras}
        onMapClick={(coords) => setSelectedCoords(coords)}
      />

      <HomeFooter />
    </div>
  );
};

export default Home;
