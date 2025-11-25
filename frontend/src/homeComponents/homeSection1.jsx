import React, { useState, useEffect, useRef } from "react";

const HomeSection1 = ({ onAddCamera, selectedCoords }) => {
  const [showForm, setShowForm] = useState(false);
  const [camera, setCamera] = useState({
    name: "",
    location: "",
    ip: "",
    type: "",
    lat: "",
    lng: "",
    stream: null,
  });

  const videoRef = useRef(null);

  useEffect(() => {
    if (selectedCoords) {
      setCamera((prev) => ({
        ...prev,
        lat: selectedCoords.lat,
        lng: selectedCoords.lng,
      }));
      setShowForm(true);
    }
  }, [selectedCoords]);

  // Start device camera
  const startDeviceCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      setCamera((prev) => ({ ...prev, stream }));
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access device camera: " + err.message);
    }
  };

  const stopDeviceCamera = () => {
    if (camera.stream) {
      camera.stream.getTracks().forEach((t) => t.stop());
    }
    setCamera((prev) => ({ ...prev, stream: null }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      if (value === "Device Camera") {
        setCamera((prev) => ({ ...prev, ip: "", type: value }));
        startDeviceCamera();
      } else {
        stopDeviceCamera();
        setCamera((prev) => ({ ...prev, type: value }));
      }
      return;
    }

    setCamera({ ...camera, [name]: value });
  };

  // FINAL handleSubmit (fixed)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!camera.lat || !camera.lng) {
      alert("Click on the map to set camera location.");
      return;
    }

    // Save camera WITHOUT stopping stream
    onAddCamera({
      name: camera.name,
      location: camera.location,
      ip: camera.type === "Device Camera" ? "" : camera.ip,
      lat: Number(camera.lat),
      lng: Number(camera.lng),
      type: camera.type,
      stream: camera.stream, // KEEP stream alive
    });

    setShowForm(false);

    // Reset form only (not real camera stream)
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

  return (
    <section className="flex flex-col items-center bg-blue-50 py-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-3">
        Manage Your Cameras
      </h2>

      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        + Add Camera
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[380px] relative">
            <button
              onClick={() => {
                stopDeviceCamera();
                setShowForm(false);
              }}
              className="absolute top-2 right-3 text-xl"
            >
              ×
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
              <input
                name="name"
                placeholder="Camera Name"
                value={camera.name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="location"
                placeholder="Location"
                value={camera.location}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                name="ip"
                placeholder="Camera IP (optional)"
                value={camera.type === "Device Camera" ? "" : camera.ip}
                disabled={camera.type === "Device Camera"}
                className={`border p-2 rounded ${
                  camera.type === "Device Camera"
                    ? "bg-gray-200 cursor-not-allowed"
                    : ""
                }`}
              />

              <select
                name="type"
                value={camera.type}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Type</option>
                <option value="CCTV">CCTV</option>
                <option value="IP Camera">IP Camera</option>
                <option value="Device Camera">Device Camera</option>
              </select>

              <input
                name="lat"
                value={camera.lat}
                placeholder="Latitude (auto)"
                readOnly
                className="border p-2 rounded bg-gray-100"
              />

              <input
                name="lng"
                value={camera.lng}
                placeholder="Longitude (auto)"
                readOnly
                className="border p-2 rounded bg-gray-100"
              />
              <div className="w-full h-48 rounded-lg border bg-gray-100 flex items-center justify-center overflow-hidden">
                {camera.type === "Device Camera" ? (
                  camera.stream ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    ></video>
                  ) : (
                    <p className="text-gray-500">Starting camera...</p>
                  )
                ) : (
                  <p className="text-gray-400 text-sm">
                    Camera preview will appear here
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded"
              >
                Save Camera
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeSection1;
