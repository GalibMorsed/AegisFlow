import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = [20.5937, 78.9629]; // Center of India

// Component that moves map when search result found
const MapSearchHandler = ({ position }) => {
  const map = useMap();

  if (position) {
    map.flyTo(position, 12, { duration: 1.5 });
  }

  return null;
};

const HomeSection4 = ({ cameras }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedLocation, setSearchedLocation] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      searchInput + ", India"
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setSearchedLocation([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Location not found in India.");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      alert("Search failed. Try again.");
    }
  };

  return (
    <section className="px-[16%] py-10 bg-blue-50">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Camera Map (India)
      </h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex gap-3 justify-center mb-6 max-w-xl mx-auto"
      >
        <input
          type="text"
          placeholder="Search location in India..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </form>

      {/* Map */}
      <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-lg border">
        <MapContainer center={defaultCenter} zoom={5} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          {/* Zoom to searched location */}
          <MapSearchHandler position={searchedLocation} />

          {/* Camera markers */}
          {cameras.map((cam, i) => (
            <Marker key={i} position={[cam.lat, cam.lng]}>
              <Popup>
                <b>{cam.name}</b> <br />
                {cam.location} <br />
                IP: {cam.ip}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default HomeSection4;
