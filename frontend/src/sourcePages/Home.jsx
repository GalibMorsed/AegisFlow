import React, { useState } from "react";
import HomeSection1 from "../homeComponents/HomeSection1";
import HomeSection2 from "../homeComponents/HomeSection2";
import HomeSection3 from "../homeComponents/HomeSection3";
import HomeFooter from "../homeComponents/HomeFooter";
import Nav from "../homeComponents/Nav";

const Home = () => {
  const [cameras, setCameras] = useState([]);

  const handleCameraDisconnect = (indexToRemove) => {
    const streamToStop = cameras[indexToRemove];
    streamToStop.getTracks().forEach((track) => track.stop());
    setCameras((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="dashboard-page">
      <Nav />
      <HomeSection1 />
      <HomeSection2 cameras={cameras} onDisconnect={handleCameraDisconnect} />
      <HomeSection3 />
      <HomeFooter />
    </div>
  );
};

export default Home;
