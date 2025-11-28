import React, { useRef, useEffect, useState } from "react";

const CameraCard = ({ cam, index, onDisconnect, onEdit, isEditing }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;

    if (cam.type === "Device Camera" && cam.deviceId) {
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: cam.deviceId } },
        })
        .then((s) => {
          stream = s;
          cam.stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(console.log);
    }

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [cam]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 relative overflow-hidden">
      <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-900">
        {isEditing && (
          <button
            onClick={() => onDisconnect(index)}
            className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 hover:bg-red-600 hover:text-white shadow-md"
          >
            ✖
          </button>
        )}

        {cam.type === "Device Camera" ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-sm">
            No Camera Preview
          </div>
        )}

        <div className="absolute left-3 bottom-3 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
          {cam.location}
        </div>
      </div>

      <div className="mt-3 text-slate-800">
        <div className="font-semibold text-lg">{cam.name}</div>
        <div className="text-sm text-slate-500 mt-1">{cam.label}</div>
      </div>

      {isEditing && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onEdit(index)}
            className="px-3 py-2 rounded-lg border text-sm"
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
    <section className="px-[10%] py-12 bg-slate-50 relative z-[1]">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Camera Footages</h2>

        {cameras.length > 0 && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 px-4 py-2 rounded-md bg-indigo-600 text-white"
          >
            {isEditing ? "Done Editing" : "Edit Cameras"}
          </button>
        )}
      </div>

      {cameras.length === 0 && (
        <p className="text-center text-slate-500">No cameras added yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((cam, index) => (
          <CameraCard
            key={cam._id}
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
