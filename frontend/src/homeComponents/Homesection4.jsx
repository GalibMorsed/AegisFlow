import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

const defaultCenter = [20.5937, 78.9629];

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        onMapClick({
          lat,
          lng,
          locationName: data.display_name,
        });
      } catch (err) {
        onMapClick({
          lat,
          lng,
          locationName: "Unknown Location",
        });
      }
    },
  });

  return null;
};

const HomeSection4 = ({ onMapClick }) => {
  return (
    <section className="px-[16%] py-8 bg-blue-100 relative z-0 mb-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Click Anywhere on the Map to Add Camera
      </h2>

      <div className="rounded-xl overflow-hidden shadow-lg relative z-0">
        <MapContainer
          center={defaultCenter}
          zoom={5}
          className="w-full h-[450px] rounded-xl relative z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler onMapClick={onMapClick} />
        </MapContainer>
      </div>
    </section>
  );
};

export default HomeSection4;
