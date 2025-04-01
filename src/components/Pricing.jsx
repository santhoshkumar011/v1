// import React from 'react'
// import { LiaRupeeSignSolid } from "react-icons/lia";
// import "../css/Pricing.css"


// const Pricing = () => {
//   return (
//     <section id="Pricing">
//       <div className="overall-pricing">
//         <h2 className="abt-price">Pricing Table</h2>
//         <div className="pricing-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Unit Type</th>
//                 <th>Area</th>
//                 <th>Price</th>
//                 <th>Enquire Now</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Plots</td>
//                 <td>787 Sq-Ft - 932 Sq-Ft</td>
//                 <td ><p className="rupees"><LiaRupeeSignSolid />1400/SqFt</p></td>
//                 <td>
//                   <button>  
//                     <a href="https://wa.me/919994459458" className="enquire-btn">
//                       Enquire Now
//                     </a>
//                   </button></td>
//               </tr>
//               <tr>
//                 <td>Plots</td>
//                 <td>1000 Sq-Ft - 1800 Sq-Ft</td>
//                 <td><p className="rupees"><LiaRupeeSignSolid />1400/SqFt</p></td>
//                 <td>
//                   <button>  
//                     <a href="https://wa.me/919994459458" className="enquire-btn">
//                       Enquire Now
//                     </a>
//                   </button></td>
//               </tr>
//               <tr>
//                 <td>Plots</td>
//                 <td>1800 Sq-Ft - 3500 Sq-Ft</td>
//                 <td><p className="rupees"><LiaRupeeSignSolid />1400/SqFt</p></td>
//                 <td>
//                   <button>  
//                     <a href="https://wa.me/919994459458" className="enquire-btn">
//                       Enquire Now
//                     </a>
//                   </button></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   )
// }

import React, { useState } from 'react';
import { LiaRupeeSignSolid } from "react-icons/lia";
import "../css/Pricing.css";
import EnquiryForm from './EnquiryForm'; // Import Popup Form Component

const Pricing = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <section id="Pricing">
      <div className="overall-pricing">
        <h2 className="abt-price">Pricing Table</h2>
        <div className="pricing-table">
          <table>
            <thead>
              <tr>
                <th>Unit Type</th>
                <th>Area</th>
                <th>Price</th>
                <th>Enquire Now</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plots</td>
                <td>787 Sq-Ft - 932 Sq-Ft</td>
                <td><p className="rupees"><LiaRupeeSignSolid />1400/SqFt</p></td>
                <td>
                  <button onClick={openPopup} className="enquire-btn">Enquire Now</button>
                </td>
              </tr>
              <tr>
                <td>Plots</td>
                <td>1000 Sq-Ft - 1800 Sq-Ft</td>
                <td><p className="rupees"><LiaRupeeSignSolid />1400/SqFt</p></td>
                <td>
                  <button onClick={openPopup} className="enquire-btn">Enquire Now</button>
                </td>
              </tr>
              <tr>
                <td>Plots</td>
                <td>1800 Sq-Ft - 3500 Sq-Ft</td>
                <td><p className="rupees"><LiaRupeeSignSolid />1400/SqFt</p></td>
                <td>
                  <button onClick={openPopup} className="enquire-btn">Enquire Now</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Form Component */}
      {isPopupOpen && <EnquiryForm closePopup={closePopup} />}
    </section>
  );
}

export default Pricing;


