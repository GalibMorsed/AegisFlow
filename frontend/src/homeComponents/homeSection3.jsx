import React, { useRef, useEffect } from "react";

const CameraView = ({ cam }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (cam.type === "Device Camera" && cam.stream) {
      if (videoRef.current) {
        videoRef.current.srcObject = cam.stream;
      }
    }
  }, [cam]);

  return (
    <div className="relative bg-black h-56 rounded-xl shadow overflow-hidden">
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
          <div className="flex items-center justify-center w-full h-full text-white">
            Camera Not Available
          </div>
        )
      ) : (
        <div className="flex items-center justify-center w-full h-full text-white">
          No Live Feed (CCTV/IP)
        </div>
      )}

      <div className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 rounded text-xs">
        {cam.name}
      </div>
    </div>
  );
};

const HomeSection2 = ({ cameras }) => {
  return (
    <section className="px-[16%] py-10 bg-blue-100">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Camera Footages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cameras.map((cam, index) => (
          <CameraView key={index} cam={cam} />
        ))}
      </div>
    </section>
  );
};

export default HomeSection2;
