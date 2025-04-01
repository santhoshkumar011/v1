import React from 'react';
import { useState } from 'react';
import PrivacyPolicy from "./PrivacyPolicy";
import "../css/Popup.css"; 

const EnquiryForm = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    
  const openPopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);
  
    const validateForm = () => {
      let newErrors = {};
      
      if (!uname.trim()) {
        newErrors.uname = "Name is required";
      }
      
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Valid email is required";
      }
      
      if (!mobile.trim()) {
        newErrors.mobile = "Mobile number is required";
      } else if (!/^\d{10}$/.test(mobile)) {
        newErrors.mobile = "Valid 10-digit mobile number is required";
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        setIsSubmitting(true);
        setSubmitSuccess(false);
        
        try {
          const response = await fetch("https://v1-be.onrender.com/api/enquire", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uname, email, mobile }),
          });
    
          if (response.ok) {
            // Reset form on success
            setUname("");
            setEmail("");
            setMobile("");
            setErrors({});
            setSubmitSuccess(true);
            setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5 seconds
          } else {
            const errorData = await response.json();
            alert(`Submission failed: ${errorData.error || "Please try again."}`);
          }
        } catch (error) {
          console.error("Form submission error:", error);
          alert("Network error. Please check your connection and try again.");
        } finally {
          setIsSubmitting(false);
        }
      };


  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup-form" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closePopup}>×</span>
        <form onSubmit={handleSubmit}>
        <h2>ENQUIRE NOW</h2>
          {submitSuccess && (
            <div className="success-message">
              Thank you for your enquiry! We will contact you soon.
            </div>
          )}
          <form className="input" onSubmit={handleSubmit}>            
            <div className="form-field">
              <input 
                type="text" 
                placeholder="Name" 
                value={uname} 
                onChange={(e) => setUname(e.target.value)}
                style={errors.uname ? { borderColor: "red" } : {}}
                disabled={isSubmitting}
              />
              {errors.uname && <small className="error-text">{errors.uname}</small>}
            </div>

            <div className="form-field">
              <input 
                type="text" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={errors.email ? { borderColor: "red" } : {}}
                disabled={isSubmitting}
              />
              {errors.email && <small className="error-text">{errors.email}</small>}
            </div>

            <div className="form-field">
              <input 
                type="text" 
                placeholder="Mobile" 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)}
                style={errors.mobile ? { borderColor: "red" } : {}}
                disabled={isSubmitting}
              />
              {errors.mobile && <small className="error-text">{errors.mobile}</small>}
            </div>
            <div className="checkbox">
            <div className="checkbox">
              <label htmlFor="termsCheckbox">
              <input type="checkbox" id="termsCheckbox" required />
                I have read and understood the  
                <a href="#" onClick={openPopup}> Privacy Policy</a>.  
                By registering here, I agree to SRV Developer’s 
                <a href="#" onClick={openPopup}>  Terms & Conditions</a>.
              </label>
            </div>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className={isSubmitting ? "disabled-btn" : ""}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </form>
      </div>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-popup" onClick={closePopup}>×</button>
            <PrivacyPolicy />
          </div>
        </div>
      )}
    </div>
  );
}

export default EnquiryForm;
