import React from 'react';
import "../css/Popup.css"; // Add CSS for styling

const EnquiryForm = ({ closePopup }) => {
  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup-form" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closePopup}>×</span>
        <h2>Enquiry Form</h2>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <input type="text" placeholder="Your Mobile" required />
        <textarea placeholder="Your Message" rows="4" required></textarea>
        
        <div className="checkbox">
          <input type="checkbox" id="termsCheckbox" required />
          <label htmlFor="termsCheckbox">
            I have read and understood the  
            <a href="privacy-policy.html" target="_blank"> Privacy Policy</a>.  
            By registering here, I agree to  
            <a href="terms-conditions.html" target="_blank"> SRV Developer’s Terms & Conditions</a>.
          </label>
        </div>
        
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

export default EnquiryForm;
