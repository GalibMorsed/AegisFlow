import React, { useState, useRef, useEffect } from "react";

const HomeSection1 = () => {
  const [showForm, setShowForm] = useState(false);
  const [camera, setCamera] = useState({
    name: "",
    location: "",
    ip: "",
    type: "",
  });
  const videoRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Unable to access camera. Please allow permission.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      let tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCamera({ ...camera, [name]: value });
    if (name === "type") {
      if (value !== "IP Camera") startCamera();
      else stopCamera();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Camera Details:", camera);
    alert("Camera added successfully!");
    stopCamera();
    setShowForm(false);
    setCamera({ name: "", location: "", ip: "", type: "" });
  };

  useEffect(() => {
    if (!showForm) stopCamera();
  }, [showForm]);

  return (
    <section className="relative flex flex-col items-center justify-center bg-blue-50 py-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-3">
        Manage Your Cameras
      </h2>

      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 text-sm font-medium"
      >
        + Add Camera
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-[380px] animate-fadeIn">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              ×
            </button>

            <h3 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
              Add New Camera
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Camera Name"
                value={camera.name}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="text"
                name="location"
                placeholder="Camera Location"
                value={camera.location}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <select
                name="type"
                value={camera.type}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Type</option>
                <option value="CCTV">CCTV</option>
                <option value="IP Camera">IP Camera</option>
                <option value="Webcam">Webcam</option>
                <option value="Device Camera">Device Camera</option>
              </select>

              <input
                type="text"
                name="ip"
                placeholder="Camera IP Address"
                value={camera.ip}
                onChange={handleChange}
                disabled={camera.type !== "IP Camera"}
                className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none ${
                  camera.type !== "IP Camera"
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
              />

              {cameraOn && (
                <div className="mt-2 flex flex-col items-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    className="w-full rounded-lg border shadow-md"
                  ></video>
                </div>
              )}

              <div className="flex justify-between mt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeSection1;
