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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);
  const [fieldsTouched, setFieldsTouched] = useState({
    uname: false,
    email: false,
    mobile: false
  });

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
    validateForm();
  }, [uname, email, mobile]);

  const validateForm = () => {
    const errors = {};
    
    if (!uname.trim()) {
      errors.uname = "Name is required";
    }
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    
    if (!mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }
    
    setFormErrors(errors);
    setIsValid(Object.keys(errors).length === 0);
    
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (field, value) => {
    // Update the field value
    switch (field) {
      case 'uname':
        setUname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'mobile':
        setMobile(value);
        break;
      default:
        break;
    }
    
    // Mark the field as touched
    setFieldsTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    // Mark the form as touched if not already
    if (!formTouched) {
      setFormTouched(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched when submitting
    setFieldsTouched({
      uname: true,
      email: true,
      mobile: true
    });
    setFormTouched(true);
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://v1-be.onrender.com/api/enquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uname, email, mobile }),
      });

      if (response.ok) {
        // Reset form fields on success
        setUname("");
        setEmail("");
        setMobile("");
        setFieldsTouched({
          uname: false,
          email: false,
          mobile: false
        });
        setFormTouched(false);
        alert("Thank you for your enquiry. We will contact you soon!");
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.error || "Please try again later."}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only show error for a field if it's been touched or form submitted
  const shouldShowError = (field) => {
    return (fieldsTouched[field] || formTouched) && formErrors[field];
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
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              value={uname} 
              onChange={(e) => handleFieldChange('uname', e.target.value)} 
              className={shouldShowError('uname') ? "error" : ""}
              disabled={isSubmitting}
            />
            {shouldShowError('uname') && <small className="error-message">{formErrors.uname}</small>}
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Your Email" 
              value={email} 
              onChange={(e) => handleFieldChange('email', e.target.value)} 
              className={shouldShowError('email') ? "error" : ""}
              disabled={isSubmitting}
            />
            {shouldShowError('email') && <small className="error-message">{formErrors.email}</small>}
          </div>
          
          <div className="form-group">
            <input 
              type="tel" 
              placeholder="Your Mobile Number" 
              value={mobile} 
              onChange={(e) => handleFieldChange('mobile', e.target.value)} 
              className={shouldShowError('mobile') ? "error" : ""}
              disabled={isSubmitting}
            />
            {shouldShowError('mobile') && <small className="error-message">{formErrors.mobile}</small>}
          </div>
          
          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
