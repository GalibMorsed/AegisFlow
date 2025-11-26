import React, { useRef, useEffect, useState } from "react";

const CameraCard = ({ cam, index, onDisconnect, onEdit, isEditing }) => {
  const videoRef = useRef(null);

  // 🔥 FIX: always attach or restart stream if Device Camera
  useEffect(() => {
    // If a stream already exists, attach it
    if (cam.stream && videoRef.current) {
      videoRef.current.srcObject = cam.stream;
      return;
    }

    // If device camera but stream is missing, ask again
    if (cam.type === "Device Camera" && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          cam.stream = stream;
          videoRef.current.srcObject = stream;
        })
        .catch(console.log);
    }
  }, [cam]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 relative overflow-hidden">
      <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-900">
        {/* Remove Button */}
        {isEditing && (
          <button
            onClick={() => onDisconnect(index)}
            aria-label={`Remove ${cam.name}`}
            className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 hover:bg-red-600 hover:text-white transition-colors shadow-md focus:outline-none"
          >
            ✖
          </button>
        )}

        {/* LIVE VIDEO */}
        {cam.stream ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/90 text-sm">
            No Camera Preview
          </div>
        )}

        <div className="absolute left-3 bottom-3 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {cam.location || "Unknown location"}
        </div>
      </div>

      {/* TEXT INFO */}
      <div className="mt-3 text-slate-800">
        <div className="font-semibold text-lg">{cam.name}</div>
        <div className="text-sm text-slate-500 mt-1">{cam.location}</div>
      </div>

      {isEditing && (
        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            onClick={() => onEdit(index)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white hover:shadow-md transition"
            title="Edit camera"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const HomeSection2 = ({ cameras, onDisconnect, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="px-[10%] py-12 bg-slate-50">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Camera Footages</h2>

        {cameras.length > 0 && (
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-shadow ${
              isEditing
                ? "bg-white border border-slate-200 text-slate-700 shadow-sm"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
            }`}
          >
            {isEditing ? "Done Editing" : "Edit Cameras"}
          </button>
        )}
      </div>

      {cameras.length === 0 && (
        <p className="text-center text-slate-500 text-lg py-10">
          No cameras added yet. Click on the map to add one.
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((cam, index) => (
          <CameraCard
            key={index}
            cam={cam}
            index={index}
            onDisconnect={onDisconnect}
            onEdit={onEdit}
            isEditing={isEditing}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeSection2;
