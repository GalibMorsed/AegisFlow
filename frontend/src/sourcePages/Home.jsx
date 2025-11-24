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

  const handleCameraDisconnect = (indexToRemove) => {
    const streamToStop = cameras[indexToRemove]?.stream;
    if (streamToStop) {
      streamToStop.getTracks().forEach((track) => track.stop());
    }

    setCameras((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="dashboard-page">
      <Nav />
      <HomeSection1 onAddCamera={(cam) => setCameras([...cameras, cam])} />
      <HomeSection2 cameras={cameras} onDisconnect={handleCameraDisconnect} />
      <HomeSection3 />
      <HomeSection4 cameras={cameras} />
      <HomeFooter />
    </div>
  );
};

export default Home;
