import "../css/Navbar.css";
import logo from "../assets/loogo.png";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 100 ? setScroll(true) : setScroll(false);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`container navbar ${scroll ? "scroll-down" : ""}`}>
     <div className="navbar-logo-container">
      <img className="navbar-logo" src={logo} alt="Logo" />
    </div>  
      <div 
        className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`} 
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <ul className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
        <li>
          <Link 
            to="AboutArea" 
            smooth={true} 
            offset={-90} 
            duration={500}
            onClick={closeMenu}
          >
            About Parandur
          </Link>
        </li>
        <li>
          <Link 
            to="AboutPlot" 
            smooth={true} 
            offset={-90} 
            duration={600}
            onClick={closeMenu}
          >
            About Megacity
          </Link>
        </li>
        <li>
          <Link 
            to="Gallery" 
            smooth={true} 
            offset={-90} 
            duration={500}
            onClick={closeMenu}
          >
            Highlights
          </Link>
        </li>
        <li>
          <Link 
            to="Pricing" 
            smooth={true} 
            offset={-90} 
            duration={700}
            onClick={closeMenu}
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link 
            to="LocationForm" 
            smooth={true} 
            offset={-90} 
            duration={700}
            onClick={closeMenu}
          >
            Location
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
