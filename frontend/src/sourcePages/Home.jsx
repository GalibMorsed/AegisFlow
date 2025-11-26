import React, { useState } from "react";
import HomeSection1 from "../homeComponents/HomeSection1";
import HomeSection2 from "../homeComponents/homeSection2";
import HomeSection4 from "../homeComponents/Homesection4";
import HomeFooter from "../homeComponents/homeFooter";
import HomeSection3 from "../homeComponents/homeSection3";
import Nav from "../homeComponents/Nav";

const Home = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const addCamera = (cam) => {
    if (editingIndex !== null) {
      const updated = [...cameras];
      updated[editingIndex] = cam;
      setCameras(updated);
      setEditingIndex(null);
      return;
    }
    setCameras((prev) => [...prev, cam]);
  };

  const removeCamera = (index) => {
    const cam = cameras[index];
    if (cam?.stream) cam.stream.getTracks().forEach((t) => t.stop());
    setCameras((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden gap-10">
      {/* NAV */}
      <div className="relative z-[5]">
        <Nav />
      </div>

      {/* FORM POPUP */}
      <div className="relative z-[50]">
        <HomeSection1
          onAddCamera={addCamera}
          selectedCoords={selectedCoords}
          resetCoords={() => setSelectedCoords(null)}
          editingCamera={editingIndex !== null ? cameras[editingIndex] : null}
          closeEdit={() => setEditingIndex(null)}
        />
      </div>

      {/* MAP */}
      <div className="relative z-[1]">
        <HomeSection4 onMapClick={(coords) => setSelectedCoords(coords)} />
      </div>

      {/* CAMERA FOOTAGES */}
      <div className="relative z-[10]">
        <HomeSection2
          cameras={cameras}
          onDisconnect={removeCamera}
          onEdit={(i) => setEditingIndex(i)}
        />
      </div>

      {/* ALERTS */}
      <div className="relative z-[5]">
        <HomeSection3 />
      </div>

      {/* FOOTER */}
      <div className="relative z-[5]">
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;
