import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/LocationForm.css";  

// Import marker icon images
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const LocationForm = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize the map only once
    mapInstanceRef.current = L.map(mapContainerRef.current).setView(
      [12.7568, 79.6570],
      13
    );

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // Define custom marker icon
    const customIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Add marker with custom icon
    L.marker([12.946895, 79.673360], { icon: customIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup("Airport Megacity")
      .openPopup();

    // Cleanup function to remove map instance on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setIsValid(uname.trim() !== "" && email.trim() !== "" && mobile.trim() !== "");
  }, [uname, email, mobile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    
    console.log({ uname, email, mobile });

    // Reset form fields
    setUname("");
    setEmail("");
    setMobile("");
  };

  return (
    <div className="location-form-container">
      <div className="map-container">
        <h2 className="section-title">Location</h2>
        <div className="map" ref={mapContainerRef} style={{ height: "400px", width: "100%" }}></div>
      </div>

      <div className="form-container">
        <h2 className="section-title">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={uname} 
            onChange={(e) => setUname(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="tel" 
            placeholder="Your Mobile Number" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
            required 
          />
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
