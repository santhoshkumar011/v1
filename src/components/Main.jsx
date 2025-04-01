import { useState } from "react";
import "../css/Main.css";
import { FaHouse } from "react-icons/fa6";
import { MdConnectingAirports } from "react-icons/md";

const Main = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    <section id="Main">
      <div className="main">
        <div className="plot-details">
          <h3>CODE NAME</h3>
          <h2>AIRPORT MEGACITY</h2>
          <p>
            <MdConnectingAirports className="flight" />
            Near International Airport <span> </span>
            <FaHouse /> Villa Plots
          </p>
          <hr></hr>
          <p>1800 Sq Ft Plots Starting from ₹1400/Sq Ft Onwards</p>
          <hr></hr>
          <button onClick={() => window.location.href = "tel:9344843492"}>
            Call Now
          </button>
        </div>

        <div className="user-details">
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
                <a href="privacy-policy.html" target="_blank"> Privacy Policy</a>.  
                By registering here, I agree to  
                <a href="terms-conditions.html" target="_blank"> SRV Developer’s Terms & Conditions</a>.
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
        </div>
      </div>
    </section>
  );
};

export default Main;
