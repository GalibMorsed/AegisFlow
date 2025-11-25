import React, { useRef, useEffect } from "react";

const CameraCard = ({ cam, onDisconnect }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (cam.type === "Device Camera" && cam.stream instanceof MediaStream) {
      if (videoRef.current) videoRef.current.srcObject = cam.stream;
    }
  }, [cam]);

  return (
    <div className="relative bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
      {/* VIDEO AREA */}
      <div className="w-full h-56 bg-black flex items-center justify-center">
        {cam.type === "Device Camera" ? (
          cam.stream ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            ></video>
          ) : (
            <p className="text-white">Loading camera...</p>
          )
        ) : (
          <p className="text-white">CCTV / IP Camera (No live feed)</p>
        )}
      </div>

      {/* INFO SECTION */}
      <div className="p-4 flex justify-between items-center text-sm">
        <div>
          <p className="font-semibold text-gray-800">{cam.name}</p>
          <p className="text-gray-500">{cam.location}</p>
        </div>

        <button
          onClick={onDisconnect}
          className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const HomeSection2 = ({ cameras, onDisconnect }) => {
  return (
    <section className="px-[12%] py-12 bg-blue-300">
      <h2 className="text-3xl font-extrabold text-white text-center mb-10">
        Camera Footages
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cameras.length > 0 ? (
          cameras.map((cam, idx) => (
            <CameraCard
              key={idx}
              cam={cam}
              onDisconnect={() => onDisconnect(idx)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-white border border-dashed border-blue-500 rounded-xl">
            <p className="text-gray-700 text-lg">No cameras available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeSection2;
