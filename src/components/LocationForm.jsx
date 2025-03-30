import { useEffect, useRef, useState } from "react"; 
import L from "leaflet"; 
import "leaflet/dist/leaflet.css"; 
import "../css/LocationForm.css";  

const LocationForm = () => {   
  const mapContainerRef = useRef(null);   
  const mapInstanceRef = useRef(null);    
  
  const [uname, setUname] = useState("");   
  const [email, setEmail] = useState("");   
  const [mobile, setMobile] = useState("");   
  const [isValid, setIsValid] = useState(false);    
  
  useEffect(() => {     
    if (mapContainerRef.current && !mapInstanceRef.current) {       
      mapInstanceRef.current = L.map(mapContainerRef.current).setView([12.7568, 79.6570], 13);       
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {         
        attribution: "© OpenStreetMap contributors",         
        maxZoom: 19,       
      }).addTo(mapInstanceRef.current);        
      
      L.marker([12.946895, 79.673360])         
        .addTo(mapInstanceRef.current)         
        .bindPopup("Rajalakshmi Engineering College")         
        .openPopup();     
    }
    
    // Cleanup function to handle component unmount
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
    setUname("");     
    setEmail("");     
    setMobile("");   
  };    
  
  return (
    <div className="location-form-container">
      <div className="map-container">
        <h2 className="section-title">Location</h2>
        <div className="map" ref={mapContainerRef}></div>
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