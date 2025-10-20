import React, { useRef, useEffect } from "react";

const CameraView = ({ stream, index, onDisconnect }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative bg-black border border-blue-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-56 flex justify-center items-center text-white font-semibold text-xl hover:scale-[1.03] overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      ></video>
      <div className="absolute bottom-2 left-3 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
        Camera {index + 1}
      </div>
      <button
        onClick={onDisconnect}
        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Disconnect camera"
      >
        ✖
      </button>
    </div>
  );
};

// HomeSection2 component
const HomeSection2 = ({ cameras, onDisconnect }) => {
  return (
    <section className="home-section2 px-[16%] py-10 bg-blue-100">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Camera Footages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {cameras.length > 0 ? (
          cameras.map((stream, i) => (
            <CameraView
              key={i}
              stream={stream}
              index={i}
              onDisconnect={() => onDisconnect(i)}
            />
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 text-center py-16 bg-blue-100/50 rounded-2xl border-2 border-dashed border-blue-300">
            <p className="text-gray-500">No cameras added yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeSection2;
