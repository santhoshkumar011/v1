import Navbar from "./components/Navbar"
import AboutArea from "./components/Aboutarea"
import Main from "./components/Main"
import AboutPlot from "./components/Aboutplot"
import Pricing from "./components/Pricing"
import Gallery from "./components/Gallery"
import Location from "./components/LocationForm"
import Footer from "./components/Footer"


function App() {

  return (
   <>
   <Navbar />
   <Main />
   <AboutArea />
   <AboutPlot/>
   <Gallery />
   <Pricing />
   <Location/>
   <Footer/>
   </>
  )
}

export default App
