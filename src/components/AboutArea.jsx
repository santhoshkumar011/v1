import { useEffect, useRef } from "react";
import "../css/AboutArea.css";
import L from "leaflet"; 
import "leaflet/dist/leaflet.css";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { MdTrain } from "react-icons/md";
import { RiUserCommunityFill, RiCommunityLine } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import AbtP from '../assets/AbtP.png';

const AboutArea = () => {
  const mapContainerRef = useRef(null); 
  const mapInstanceRef = useRef(null); 

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current).setView([12.7568, 79.6570], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);

      L.marker([12.946895, 79.673360])
        .addTo(mapInstanceRef.current)
        .bindPopup("Rajalakshmi Engineering College")
        .openPopup();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); 

  return (
    <section id="AboutArea">
      <div className="overall">
        <h2 className="abt-area">About Parandur Airport</h2>
        <div className="plot-content">
          {/* Left Side - Image */}
          <div className="map-view">
            <img src={AbtP} alt="Map View" />
          </div>

          {/* Right Side - Text */}
          <div className="content">
            <p>
              The Parandur Airport is a proposed greenfield airport near the town of Parandur in Tamil Nadu, India,
              intended to serve as a secondary airport to the existing Chennai International Airport.
              It is aimed at alleviating passenger congestion and boosting economic development
              by providing additional capacity for air travel. It is currently under development with plans for
              multiple runways and a dedicated cargo terminal, strategically located near major transportation routes.
            </p>
          </div>
        </div>

        {/* Below Both - List */}
        <ul className="info-list">
          <li className="single-info">
            <FaMapLocationDot className="icone" />
            <p>Strategic Location</p>
          </li>
          <li className="single-info">
            <GiPlantsAndAnimals className="icone" />
            <p>Lush Green Surroundings</p>
          </li>
          <li className="single-info">
            <AiOutlineStock className="icone" />
            <p>Economic Growth</p>
          </li>
          <li className="single-info">
            <MdTrain className="icone" />
            <p>Upcoming Metro Station</p>
          </li>
          <li className="single-info">
            <RiUserCommunityFill className="icone" />
            <p>Excellent Connectivity</p>
          </li>
          <li className="single-info">
            <RiCommunityLine className="icone" />
            <p>World-Class Amenities</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AboutArea;
