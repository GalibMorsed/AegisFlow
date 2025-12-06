import React, { useRef, useEffect, useState } from "react";
import { FaVideo, FaMapMarkerAlt } from "react-icons/fa";

/* ---------- Single Camera Card ---------- */
const CameraCard = ({
  cam,
  index,
  onDisconnect,
  onEdit,
  isEditing,
  onPreview,
}) => {
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
          cam.stream = s; // if you rely on this elsewhere
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(console.log);
    }

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [cam.deviceId, cam.type]); // narrower deps so it doesn't re-run too often

  return (
    <div className="bg-white/90 border border-slate-200 rounded-2xl shadow-sm p-4 relative overflow-hidden flex flex-col">
      {/* Video / preview area */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-900/90">
        {isEditing && (
          <button
            onClick={() => onDisconnect(index)}
            className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-slate-700 hover:bg-rose-500 hover:text-white shadow-md transition-colors"
          >
            ✕
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
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-200 text-xs gap-1">
            <FaVideo className="text-base opacity-80" />
            <span>No live preview for this camera</span>
          </div>
        )}

        <div className="absolute left-3 bottom-3 flex items-center gap-2 bg-black/45 text-white text-[11px] px-3 py-1.5 rounded-full backdrop-blur-sm">
          <FaMapMarkerAlt className="text-[10px]" />
          <span className="truncate max-w-[140px]">{cam.location}</span>
        </div>
      </div>

      {/* Camera info */}
      <div className="mt-3 text-slate-800">
        <div className="font-semibold text-base md:text-lg flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 text-xs">
            <FaVideo />
          </span>
          <span className="truncate">{cam.name}</span>
        </div>
        {cam.label && (
          <div className="text-xs md:text-sm text-slate-500 mt-1">
            {cam.label}
          </div>
        )}
      </div>

      {/* Tasks */}
      {cam.tasks && cam.tasks.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white shadow-sm border border-indigo-100">
          <h4 className="font-semibold text-slate-800 text-sm md:text-base mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Tasks Assigned
          </h4>

          <ul className="space-y-3">
            {cam.tasks.map((task, i) => (
              <li
                key={i}
                className="p-3 rounded-lg bg-white shadow-sm border border-slate-200 hover:shadow-md hover:scale-[1.01] transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-800 text-sm">
                    {task.taskType}
                  </span>

                  {/* Status Badge */}
                  <span
                    className={`px-2 py-1 text-[11px] rounded-md font-semibold
                      ${
                        task.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : task.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-sky-50 text-sky-700 border border-sky-100"
                      }`}
                  >
                    {task.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 mt-1">
                  ⏱ {task.startTime || "N/A"} — {task.endTime || "N/A"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Staff */}
      {cam.staff && cam.staff.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white shadow-sm border border-emerald-100">
          <h4 className="font-semibold text-slate-800 text-sm md:text-base mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Assigned Staff
          </h4>

          <ul className="space-y-3">
            {cam.staff.map((person) => (
              <li
                key={person._id}
                className="p-3 rounded-lg bg-white shadow-sm border border-slate-200 hover:shadow-md hover:scale-[1.01] transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {person.staffName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      ID: {person.staffId}
                    </p>
                  </div>

                  <div className="px-2 py-1 text-[11px] rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold">
                    Staff
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex justify-end gap-2">
        {isEditing && (
          <button
            onClick={() => onEdit(index)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-xs md:text-sm text-slate-700 hover:bg-slate-100"
          >
            Edit details
          </button>
        )}

        {/* Preview button – hidden/disabled when editing */}
        {!isEditing && (
          <button
            onClick={() => onPreview(index)}
            disabled={cam.type !== "Device Camera"}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm transition-colors
              ${
                cam.type === "Device Camera"
                  ? "bg-emerald-500 text-white hover:bg-emerald-400"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
          >
            Preview
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------- Full-screen Preview Modal ---------- */
const CameraPreviewModal = ({ cam, onClose }) => {
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
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(console.log);
    }

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [cam.deviceId, cam.type]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-[70vh] bg-black rounded-2xl overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 hover:bg-rose-500 hover:text-white shadow-lg transition-colors"
        >
          ✕
        </button>

        {/* Camera info */}
        <div className="absolute bottom-4 left-4 z-10 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm max-w-[70%]">
          <p className="font-semibold truncate">{cam.name}</p>
          <p className="text-sm text-slate-300 truncate">{cam.location}</p>
        </div>

        {/* Video feed */}
        {cam.type === "Device Camera" ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-lg">
            No Camera Preview Available
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------- Section Wrapper ---------- */
const HomeSection2 = ({ cameras, onDisconnect, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewingCamIndex, setPreviewingCamIndex] = useState(null);

  return (
    <section className="px-4 md:px-[10%] py-10 md:py-12 bg-gradient-to-b from-slate-50 via-slate-50 to-emerald-50/30 relative z-[1] border-b-2 border-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 pb-3 border-b-2 border-indigo-500 inline-block">
            Camera Footages
          </h2>
          <p className="mt-2 text-xs md:text-[13px] text-slate-600 max-w-xl mx-auto">
            Monitor live feeds from your connected cameras. Edit camera details
            or open a focused preview when needed.
          </p>

          {cameras.length > 0 && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 px-4 py-2 rounded-md text-xs md:text-sm bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-sm"
            >
              {isEditing ? "Done Editing" : "Edit Cameras"}
            </button>
          )}
        </div>

        {/* Empty state */}
        {cameras.length === 0 && (
          <p className="text-center text-slate-500 text-sm">
            No cameras added yet. Connect a camera to see it here.
          </p>
        )}

        {/* Camera grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameras.map((cam, index) => (
            <CameraCard
              key={cam._id || index}
              cam={cam}
              index={index}
              onDisconnect={onDisconnect}
              onEdit={onEdit}
              isEditing={isEditing}
              onPreview={(i) => setPreviewingCamIndex(i)}
            />
          ))}
        </div>

        {/* Preview modal */}
        {previewingCamIndex !== null && cameras[previewingCamIndex] && (
          <CameraPreviewModal
            cam={cameras[previewingCamIndex]}
            onClose={() => setPreviewingCamIndex(null)}
          />
        )}
      </div>
    </section>
  );
};

export default HomeSection2;
