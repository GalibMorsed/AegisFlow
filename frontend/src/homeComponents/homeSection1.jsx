import React, { useState } from "react";

const HomeSection1 = ({ onAddCamera }) => {
  const [showForm, setShowForm] = useState(false);
  const [camera, setCamera] = useState({
    name: "",
    location: "",
    ip: "",
    lat: "",
    lng: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCamera({ ...camera, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCamera({
      ...camera,
      lat: Number(camera.lat),
      lng: Number(camera.lng),
    });
    setShowForm(false);
    setCamera({
      name: "",
      location: "",
      ip: "",
      lat: "",
      lng: "",
    });
  };

  return (
    <section className="flex flex-col items-center bg-blue-50 py-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-3">
        Manage Your Cameras
      </h2>

      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        + Add Camera
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-[380px] relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              ×
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
              <input
                name="name"
                placeholder="Camera Name"
                value={camera.name}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2"
              />

              <input
                name="location"
                placeholder="Location Name"
                value={camera.location}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2"
              />

              <input
                name="ip"
                placeholder="IP Address"
                value={camera.ip}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                name="lat"
                placeholder="Latitude"
                value={camera.lat}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                name="lng"
                placeholder="Longitude"
                value={camera.lng}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
