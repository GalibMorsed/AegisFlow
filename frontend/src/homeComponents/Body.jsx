import React, { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";

/**
 * A component to display a single camera's video stream.
 * It uses a video element and a useEffect hook to attach the stream.
 */
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
        <MdClose size={18} />
      </button>
    </div>
  );
};

/**
 * A modal component for adding new cameras.
 * Currently, it supports adding a device camera.
 */
const AddCameraModal = ({ onClose, onCameraAdd }) => {
  const handleAddDeviceCamera = async () => {
    try {
      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      onCameraAdd(stream);
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Could not access the camera. Please ensure you have a camera connected and have granted permission."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add a New Camera
        </h2>
        <div className="space-y-4">
          <button
            onClick={handleAddDeviceCamera}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Connect Device Camera
          </button>
          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter IP Camera URL (e.g., http://...)"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              disabled // IP Camera functionality is not yet implemented
            />
            <button
              className="w-full bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed"
              disabled
            >
              Connect IP Camera (Coming Soon)
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full text-center text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const Body = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [showAddCameraModal, setShowAddCameraModal] = useState(false);

  const handleCameraDisconnect = (indexToRemove) => {
    // Stop the media stream tracks before removing
    const streamToStop = cameras[indexToRemove];
    streamToStop.getTracks().forEach((track) => track.stop());

    setCameras((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // 👉 Dashboard layout (after "Get Started")
  if (showDashboard) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen px-[16%] py-10">
        {showAddCameraModal && (
          <AddCameraModal
            onClose={() => setShowAddCameraModal(false)}
            onCameraAdd={(stream) => setCameras((prev) => [...prev, stream])}
          />
        )}
        {/* Add Camera */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setShowAddCameraModal(true)}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            + Add Camera
          </button>
        </div>

        {/* Camera Visuals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          {cameras.length > 0 ? (
            cameras.map((stream, i) => (
              <CameraView
                key={i}
                stream={stream}
                index={i}
                onDisconnect={() => handleCameraDisconnect(i)}
              />
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 text-center py-16 bg-blue-100/50 rounded-2xl border-2 border-dashed border-blue-300">
              <p className="text-gray-500">No cameras added yet.</p>
              <p className="text-gray-400 text-sm mt-2">
                Click on "+ Add Camera" to get started.
              </p>
            </div>
          )}
        </div>

        {/* Alert Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-red-500">
          <h2 className="text-red-600 text-2xl font-semibold mb-4 flex items-center gap-2">
            ⚠️ Alert Section
          </h2>
          <div className="flex justify-around items-center text-gray-700 font-medium">
            <div className="bg-red-100 px-5 py-3 rounded-lg hover:bg-red-200 transition-all">
              Motion Detected 🚨
            </div>
            <div className="bg-yellow-100 px-5 py-3 rounded-lg hover:bg-yellow-200 transition-all">
              Camera Offline ⚠️
            </div>
            <div className="bg-green-100 px-5 py-3 rounded-lg hover:bg-green-200 transition-all">
              System Normal ✅
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex justify-center gap-10 text-blue-700 text-sm font-semibold">
          <button className="hover:text-blue-900 hover:underline transition-all">
            Help
          </button>
          <button className="hover:text-blue-900 hover:underline transition-all">
            Contact
          </button>
        </footer>
      </div>
    );
  }

  // 👉 Welcome Page
  return (
    <section className="homecoming bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center min-h-screen text-white">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
          Welcome to <span className="text-yellow-300">AegisFlow</span>
        </h1>
        <p className="text-lg text-black max-w-xl mx-auto">
          Your gateway to seamless workflow management — built by
          <span className="text-white font-semibold">
            {" "}
            Galib Aditya Chakka 🛐 & Saurabh Thakulla
          </span>
        </p>
        <button
          onClick={() => setShowDashboard(true)}
          className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
        >
          Get Started 🚀
        </button>
      </div>
    </section>
  );
};

export default Body;
