import React, { useRef, useEffect } from "react";

const CameraCard = ({ cam, index, onDisconnect, onEdit }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // attach stream for device cameras
    if (cam.stream && videoRef.current) {
      videoRef.current.srcObject = cam.stream;
    }
  }, [cam.stream]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      {/* Preview */}
      {cam.stream ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-48 object-cover rounded-lg"
        ></video>
      ) : (
        <div className="w-full h-48 bg-black text-white flex items-center justify-center rounded-lg">
          No Camera Preview
        </div>
      )}

      {/* Info */}
      <div className="mt-3 text-gray-900">
        <div className="font-semibold">{cam.name}</div>
        <div className="text-sm opacity-70">{cam.location}</div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onEdit(index)}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
        >
          ✏ Edit
        </button>

        <button
          onClick={() => onDisconnect(index)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          ❌ Remove
        </button>
      </div>
    </div>
  );
};

const HomeSection2 = ({ cameras, onDisconnect, onEdit }) => {
  return (
    <section className="px-[16%] py-12 bg-blue-300">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Camera Footages
      </h2>

      {cameras.length === 0 && (
        <p className="text-center text-white opacity-75 text-lg py-10">
          No cameras added yet. Click on the map to add one.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((cam, index) => (
          <CameraCard
            key={index}
            cam={cam}
            index={index}
            onDisconnect={onDisconnect}
            onEdit={onEdit}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeSection2;
