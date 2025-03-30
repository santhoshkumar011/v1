import "../css/Footer.css";
import { FaEnvelope, FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>We are committed to providing exceptional service and innovative solutions to meet your needs.</p>
        </div>
        
        <div className="footer-section contact-info">
          <h3>Contact Information</h3>
          <div className="contact-item">
            <FaPhone className="icon" />
            <p><a href="tel:1234567890">+1 (234) 567-890</a></p>
          </div>
          <div className="contact-item">
            <FaPhone className="icon" />
            <p><a href="tel:1234567890">+1 (234) 567-890</a> (Support)</p>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <p>123 Business Avenue, Suite 200, City, State 12345</p>
          </div>
        </div>
        
        <div className="footer-section social-links">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="mailto:example@mail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;