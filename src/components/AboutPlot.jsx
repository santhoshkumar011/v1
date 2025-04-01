import "../css/AboutPlot.css"
import img from "../assets/about_plot.jpg"
import brochure from "../assets/SRV DEVELOPERS Parandur Brouchure.pdf"
import PropTypes from 'prop-types'


const Aboutplot = ({name,index}) => {
  return (
    <section id="AboutPlot">
      <h2 className="abt-plt">ABOUT MEGACITY</h2>
      <div className="main-plot">
          <div className="main-plot-content">
              <p>Codename Airport Megacity at plot is an exquisite plotted development located near international Airport of Chennai, spanning 86 acres and featuring 195 meticulously designed plots. This stunning project is situated between a Chennai-Bengaluru Expressway and peaceful Environment, offering residents an unparalleled living experience that seamlessly merges the beauty of nature with sophisticated modernity.</p>
             <button><a href={brochure} download="Parandur-Airport-Brochure.pdf" className="download-btn">
            Download Brochure
                </a>    
           </button> 
               </div>
          <div className="plot-img">
              <img src={img} alt="plot-img "/>
          </div>
      </div>
    </section>
  )
}

export default Aboutplot
