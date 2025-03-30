import React, { useState } from "react";
import "../css/Gallery.css";
import img1 from "../assets/pic1.jpg";
import img2 from "../assets/pic2.jpg";
import img3 from "../assets/pic3.jpg";
import img4 from "../assets/pic4.jpg";
import img5 from "../assets/pic5.jpg";

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const images = [
    { 
      id: 1, 
      src: img1, 
      title: "International Airport", 
      description: "Chennai Greenfield Airport is proposed to be constructed near Parandur in the Kanchipuram district, and will act as the secondary airport in addition to the existing Chennai International Airport."
    },
    { 
      id: 2, 
      src: img2, 
      title: "Investments", 
      description: "The housing and commercial space demand in Parandur will skyrocket, resulting in more real estate development. This offers profitable prospects for developers and investors."
    },
    { 
      id: 3, 
      src: img3, 
      title: "Metro", 
      description: "With the influx of people and businesses, Parandur will witness rapid urbanization. A new metro line is to be developed connecting the current Chennai International Airport (Meenambakkam) to the future Parandur Airport."
    },
    { 
      id: 4, 
      src: img4, 
      title: "Commercial Hubs", 
      description: "The airport is also anticipated to bring a broad spectrum of industries and businesses into the region, which will contribute to economic growth and job generation. These industries will include logistics, aviation, hospitality, and IT."
    },
    { 
      id: 5, 
      src: img5, 
      title: "Transportation", 
      description: "The airport, coupled with the Chennai-Bangalore Expressway, will vastly enhance connectivity to Parandur, making it easily accessible from the rest of the state and nation. This will drive trade and tourism in the region."
    },
  ];
  
  const handleItemClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="Gallery">
      <h2>GALLERY</h2>
      
      <div className="accordion-container">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleItemClick(index)}
          >
            <img 
              src={image.src} 
              alt={image.title} 
              className="accordion-image" 
            />
            <div className="vertical-title">
              <span>{image.title}</span>
            </div>
            <div className="expanded-content">
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;