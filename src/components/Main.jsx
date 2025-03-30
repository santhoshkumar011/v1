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

  const validateForm = () => {
    let newErrors = {};
    if (!uname.trim()) newErrors.uname = "Name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required";
    if (!mobile.trim() || !/^\d{10}$/.test(mobile)) newErrors.mobile = "Valid 10-digit mobile number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("https://example.com/api/enquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uname, email, mobile }),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setUname("");
        setEmail("");
        setMobile("");
        setErrors({});
      } else {
        alert("Submission failed, please try again.");
      }
    } catch (error) {
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="Main">
      <div className="main">
        <div className="plot-details">
          <h2>CODE NAME PARANDUR</h2>
          <p>
            <MdConnectingAirports className="flight" />
            Near International Airport <span> </span>
            <FaHouse /> Villa Plots
          </p>
          <p>1800 Sq Ft Plots Starting from ₹2000/ Sq Ft Onwards</p>
          <button onClick={() => window.location.href = "tel:1234567890"}>
  Phone Number
</button>
        </div>

        <div className="user-details">
          <h2>ENQUIRE NOW</h2>
          <form className="input" onSubmit={handleSubmit}>            
            <input 
              type="text" 
              placeholder="Name" 
              value={uname} 
              onChange={(e) => setUname(e.target.value)}
              style={errors.uname ? { borderColor: "red" } : {}}
            />
            {errors.uname && <small style={{ color: "red" }}>{errors.uname}</small>}

            <input 
              type="text" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              style={errors.email ? { borderColor: "red" } : {}}
            />
            {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}

            <input 
              type="text" 
              placeholder="Mobile" 
              value={mobile} 
              onChange={(e) => setMobile(e.target.value)}
              style={errors.mobile ? { borderColor: "red" } : {}}
            />
            {errors.mobile && <small style={{ color: "red" }}>{errors.mobile}</small>}

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
