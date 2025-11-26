import React, { useState, useEffect, useRef } from "react";

const HomeSection1 = ({
  onAddCamera,
  selectedCoords,
  resetCoords,
  editingCamera,
  closeEdit,
}) => {
  const [showForm, setShowForm] = useState(false);
  const videoRef = useRef(null);

  const [camera, setCamera] = useState({
    name: "",
    location: "",
    ip: "",
    type: "IP Camera",
    lat: "",
    lng: "",
    stream: null,
  });

  // ------ EDIT MODE LOAD ------
  useEffect(() => {
    if (editingCamera) {
      const { stream, ...rest } = editingCamera;
      setCamera(rest);
      setShowForm(true);
    }
  }, [editingCamera]);

  // ------ OPEN WHEN CLICKED FROM MAP ------
  useEffect(() => {
    if (selectedCoords) {
      setCamera((prev) => ({
        ...prev,
        lat: selectedCoords.lat,
        lng: selectedCoords.lng,
        location: selectedCoords.locationName,
      }));
      setShowForm(true);
      resetCoords();
    }
  }, [selectedCoords]);

  // ------ CAMERA STREAM AUTO START ------
  useEffect(() => {
    if (showForm && camera.type === "Device Camera") {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setCamera((prev) => ({ ...prev, stream }));

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.log(err));
    }

    return () => {
      if (camera.stream) {
        camera.stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [showForm, camera.type]);

  const handleSubmit = (e) => {
    e.preventDefault(); // <<< VERY IMPORTANT

    if (camera.stream) {
      camera.stream.getTracks().forEach((t) => t.stop());
    }

    onAddCamera(camera);
    setShowForm(false);
    closeEdit?.();
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-xl w-[380px] relative">
        {/* CLOSE BUTTON - MUST NOT SUBMIT */}
        <button
          type="button"
          onClick={() => {
            if (camera.stream) {
              camera.stream.getTracks().forEach((t) => t.stop());
            }
            setShowForm(false);
            closeEdit?.();
          }}
          className="absolute top-2 right-3"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-3">
          {editingCamera ? "Edit Camera" : "Add Camera"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Camera Name"
            className="border p-2 rounded"
            value={camera.name}
            onChange={(e) => setCamera({ ...camera, name: e.target.value })}
            required
          />

          <input
            name="location"
            placeholder="Location"
            className="border p-2 rounded"
            value={camera.location}
            onChange={(e) => setCamera({ ...camera, location: e.target.value })}
            required
          />

          <select
            className="border p-2 rounded"
            value={camera.type}
            onChange={(e) =>
              setCamera({ ...camera, type: e.target.value, stream: null })
            }
          >
            <option value="IP Camera">IP Camera</option>
            <option value="Device Camera">Device Camera</option>
            <option value="CCTV">CCTV</option>
          </select>

          {camera.type === "IP Camera" && (
            <input
              name="ip"
              placeholder="Camera IP"
              className="border p-2 rounded"
              value={camera.ip}
              onChange={(e) => setCamera({ ...camera, ip: e.target.value })}
              required
            />
          )}

          <input
            className="border p-2 bg-gray-100"
            value={camera.lat}
            readOnly
          />
          <input
            className="border p-2 bg-gray-100"
            value={camera.lng}
            readOnly
          />

          {camera.type === "Device Camera" && camera.stream && (
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-40 bg-black rounded"
            />
          )}

          {/* THIS MUST BE TYPE SUBMIT */}
          <button type="submit" className="bg-blue-600 text-white rounded p-2">
            {editingCamera ? "Update Camera" : "Save Camera"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeSection1;
