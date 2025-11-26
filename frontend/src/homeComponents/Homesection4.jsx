import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

const defaultCenter = [20.5937, 78.9629];

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();

      onMapClick({
        lat,
        lng,
        locationName: data.display_name,
      });
    },
  });

  return null;
};

const HomeSection4 = ({ onMapClick, cameras }) => {
  return (
    <section className="px-[16%] py-8 bg-blue-100 relative">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">
        Click the map to add a camera
      </h2>

      <div className="rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={defaultCenter}
          zoom={5}
          className="w-full h-[450px] rounded-xl"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler onMapClick={onMapClick} />
        </MapContainer>
      </div>
    </section>
  );
};

export default HomeSection4;
