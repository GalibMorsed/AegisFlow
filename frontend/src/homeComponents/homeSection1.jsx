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
    type: "",
    lat: "",
    lng: "",
    stream: null,
  });

  // OPEN when clicking map OR editing
  useEffect(() => {
    if (editingCamera) {
      setCamera(editingCamera);
      setShowForm(true);
      return;
    }
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
  }, [selectedCoords, editingCamera]);

  // WebCam Preview
  useEffect(() => {
    if (camera.type === "Device Camera" && camera.stream && videoRef.current) {
      videoRef.current.srcObject = camera.stream;
    }
  }, [camera, showForm]);

  const startDeviceCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    setCamera((prev) => ({ ...prev, stream }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCamera(camera);
    setShowForm(false);
    closeEdit?.();

    setCamera({
      name: "",
      location: "",
      ip: "",
      type: "",
      lat: "",
      lng: "",
      stream: null,
    });
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[380px] relative">
        <button
          onClick={() => {
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
            placeholder="Name"
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
            name="type"
            className="border p-2 rounded"
            value={camera.type}
            onChange={(e) => {
              setCamera({ ...camera, type: e.target.value });
              if (e.target.value === "Device Camera") startDeviceCamera();
            }}
          >
            <option value="">Select Type</option>
            <option value="Device Camera">Device Camera</option>
            <option value="CCTV">CCTV</option>
            <option value="IP Camera">IP Camera</option>
          </select>

          <input
            value={camera.lat}
            readOnly
            className="border p-2 rounded bg-gray-100"
          />
          <input
            value={camera.lng}
            readOnly
            className="border p-2 rounded bg-gray-100"
          />

          {camera.type === "Device Camera" && camera.stream && (
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-40 bg-black rounded"
            ></video>
          )}

          <button className="bg-blue-600 text-white rounded p-2">
            {editingCamera ? "Save Changes" : "Save Camera"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeSection1;
