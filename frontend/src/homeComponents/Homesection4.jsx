import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const defaultCenter = [20.5937, 78.9629];

// LOCATION PIN ICON
const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

/* MapClickHandler - handles user clicks to add camera location */
const MapClickHandler = ({ onSelect }) => {
  const map = useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        map.flyTo([lat, lng], 13, { animate: true, duration: 1.2 });

        onSelect({
          lat,
          lng,
          locationName: data.display_name || "Unknown location",
        });
      } catch {
        onSelect({
          lat,
          lng,
          locationName: "Unknown location",
        });
      }
    },
  });

  return null;
};

/* MapController - moves map when searchLocation changes */
const MapController = ({ searchLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (searchLocation) {
      const lat = Number(searchLocation.lat);
      const lon = Number(searchLocation.lon);
      if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
        map.flyTo([lat, lon], 12, { animate: true, duration: 1.2 });
      }
    }
  }, [searchLocation, map]);

  return null;
};

const HomeSection4 = ({ onMapClick, cameras = [] }) => {
  const [cameraLocation, setCameraLocation] = useState(null);

  // search states
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);
  const inputRef = useRef(null);

  // handle actual search (Nominatim)
  const handleSearch = async () => {
    const q = searchQuery.trim();
    if (!q) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const top = data[0];
        setSearchLocation(top);
        setSearchMarker({
          lat: Number(top.lat),
          lng: Number(top.lon),
          display_name: top.display_name || q,
        });
      } else {
        alert("Location not found.");
      }
    } catch (err) {
      console.error("Search error:", err);
      alert("Error while searching. Try again.");
    }
  };

  // keyboard handler: Enter to search, Esc to collapse/clear
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      collapseAndClear();
    }
  };

  const collapseAndClear = () => {
    setIsExpanded(false);
    setSearchQuery("");
    setSearchMarker(null);
    setSearchLocation(null);
    if (inputRef.current) inputRef.current.blur();
  };

  // When map is clicked we want parent to add camera and also show temp marker
  const handleMapSelect = (loc) => {
    setCameraLocation(loc);
    if (onMapClick) onMapClick(loc);
  };

  return (
    <section className="px-4 md:px-[10%] py-10 md:py-12 bg-gradient-to-b from-slate-50 via-slate-50 to-emerald-50/30 border-t border-slate-200/70 border-b-2 border-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-5 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 pb-3 border-b-2 border-indigo-500 inline-block">
            Map & camera placement
          </h2>
          <p className="mt-2 text-xs md:text-[13px] text-slate-600 max-w-xl">
            Search for a location or click anywhere on the map to place a new
            camera. AegisFlow will use these positions for analysis and alerts.
          </p>
        </div>

        {/* Search bar container */}
        <div className="relative mb-4 flex items-center">
          <div
            className={`relative transition-all duration-300 ease-in-out flex items-center ${
              isExpanded ? "w-full" : "w-[38%]"
            }`}
            style={{ minWidth: 220 }}
          >
            {/* Search input */}
            <input
              ref={inputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={handleKeyDown}
              aria-label="Search location"
              placeholder="Search for a location (e.g. 'Mumbai, Bangalore')"
              className={`w-full placeholder:text-slate-400 px-4 py-3 rounded-xl shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300 ${
                isExpanded ? "bg-white" : "bg-white/90"
              }`}
              onClick={() => setIsExpanded(true)}
            />

            {/* Search button (visible only when expanded) */}
            <button
              onClick={handleSearch}
              aria-label="Search"
              className={`ml-3 px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-200 transform flex items-center gap-2 text-xs md:text-sm
                ${
                  isExpanded
                    ? "opacity-100 pointer-events-auto translate-x-0 bg-indigo-500 text-white hover:bg-indigo-600"
                    : "opacity-0 pointer-events-none translate-x-3"
                }`}
              title="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        {/* Map container */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-50">
          <MapContainer
            center={defaultCenter}
            zoom={5}
            className="w-full h-[420px] md:h-[480px] rounded-2xl"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <MapController searchLocation={searchLocation} />

            <MapClickHandler onSelect={handleMapSelect} />

            {/* Render saved DB cameras */}
            {Array.isArray(cameras) &&
              cameras.map((cam, i) => (
                <Marker
                  key={cam._id ?? cam.id ?? i}
                  position={[cam.lat, cam.lng]}
                  icon={pinIcon}
                >
                  <Popup>
                    <div className="font-semibold text-slate-900">
                      {cam.name}
                    </div>
                    <div className="text-xs text-slate-600">{cam.location}</div>
                  </Popup>
                </Marker>
              ))}

            {/* Marker for cameraLocation (map click) */}
            {cameraLocation && (
              <Marker
                key={`new-${cameraLocation.lat}-${cameraLocation.lng}`}
                position={[cameraLocation.lat, cameraLocation.lng]}
                icon={pinIcon}
              >
                <Popup>
                  <div className="font-semibold text-slate-900">
                    New camera location
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {cameraLocation.locationName}
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Marker for search result */}
            {searchMarker && (
              <Marker
                key={`search-${searchMarker.lat}-${searchMarker.lng}`}
                position={[searchMarker.lat, searchMarker.lng]}
                icon={pinIcon}
              >
                <Popup>
                  <div className="max-w-xs">
                    <div className="font-semibold text-slate-900">
                      {searchMarker.display_name}
                    </div>
                    <div className="text-xs mt-1 text-slate-600">
                      Lat: {searchMarker.lat.toFixed(6)}, Lng:{" "}
                      {searchMarker.lng.toFixed(6)}
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default HomeSection4;
