import "../css/Navbar.css";
import logo from "../assets/3.png";
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
      <img className="navbar-logo" src={logo} alt="Logo" />
      
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
            to="AboutParandur" 
            smooth={true} 
            offset={-90} 
            duration={500}
            onClick={closeMenu}
          >
            AboutArea
          </Link>
        </li>
        <li>
          <Link 
            to="AboutMegacity" 
            smooth={true} 
            offset={-90} 
            duration={600}
            onClick={closeMenu}
          >
            AboutPlot
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
            Gallery
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
      </ul>
    </nav>
  );
};

export default Navbar;
