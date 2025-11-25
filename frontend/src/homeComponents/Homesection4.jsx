import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = [20.5937, 78.9629];

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const HomeSection4 = ({ cameras, onMapClick }) => {
  return (
    <section className="px-[16%] py-10 bg-blue-50">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Camera Map (Click to place a camera)
      </h2>

      <div className="w-full h-[450px] rounded-xl overflow-hidden shadow">
        <MapContainer center={defaultCenter} zoom={5} className="w-full h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler onMapClick={onMapClick} />

          {cameras.map((cam, idx) => (
            <Marker key={idx} position={[cam.lat, cam.lng]}>
              <Popup>
                <b>{cam.name}</b>
                <br />
                {cam.location}
                <br />
                {cam.type}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default HomeSection4;
