import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const LocationMap = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize the map
    mapInstanceRef.current = L.map(mapContainerRef.current).setView(
      [12.7568, 79.6570],
      13
    );

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // Custom marker icon
    const customIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Add marker
    L.marker([12.946895, 79.673360], { icon: customIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup("Rajalakshmi Engineering College")
      .openPopup();

    return () => {
      mapInstanceRef.current.remove(); // Cleanup map on unmount
    };
  }, []);

  return (
    <div>
      <h2>College Location</h2>
      <div
        ref={mapContainerRef}
        style={{ height: "400px", width: "100%", borderRadius: "8px" }}
      />
    </div>
  );
};

export default LocationMap;

