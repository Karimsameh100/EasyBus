// import React from "react";
// import ph1 from "../logo/photo1.jpg";
// import ph2 from "../logo/photo2.jpg";
// import ph3 from "../logo/photo3.jpg";
// import ph4 from "../logo/photo4.jpg";
// import SearchComponent from "./Searh";

// const HeroSection = () => {
//   return (
//     <>
//       <div
//         id="carouselExampleAutoplaying"
//         className="carousel slide"
//         data-bs-ride="carousel"
//         data-bs-interval="6000"
//         style={{ position: "relative" }}
//       >
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img
//               src={ph1}
//               className="d-block w-100"
//               alt="Photo 1"
//               style={{ height: "90vh", objectFit: "cover" }}
//             />
//           </div>
//           <div className="carousel-item">
//             <img
//               src={ph2}
//               className="d-block w-100"
//               alt="Photo 2"
//               style={{ height: "90vh", objectFit: "cover" }}
//             />
//           </div>
//           <div className="carousel-item">
//             <img
//               src={ph3}
//               className="d-block w-100"
//               alt="Photo 3"
//               style={{ height: "90vh", objectFit: "cover" }}
//             />
//           </div>
//           <div className="carousel-item">
//             <img
//               src={ph4}
//               className="d-block w-100"
//               alt="Photo 4"
//               style={{ height: "90vh", objectFit: "cover" }}
//             />
//           </div>
//         </div>
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#carouselExampleAutoplaying"
//           data-bs-slide="prev"
//         >
//           <span
//             className="carousel-control-prev-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#carouselExampleAutoplaying"
//           data-bs-slide="next"
//         >
//           <span
//             className="carousel-control-next-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//         <div
//           style={{
//             position: "absolute",
//             top: "30%",
//             left: "20%",
//             right: "20%",
//             padding: "0px auto",
//             backgroundColor: "rgba(255, 255, 255, 0.1)",
//             display: "block",
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: "10px",
//           }}
//         >
//           <h1 className="text-light text-center">Book Your Trip Now!</h1>
//           <SearchComponent />
//         </div>
//       </div>
//     </>
//   );
// };

// export default HeroSection;

// // export default HeroSection;

import React from "react";
import SearchComponent from "./Searh";
import video from "../logo/video22.mp4";

const HeroSection = () => {
  // const HeroSection = () => {
  // console.log("HeroSection rendered");
  return (
    <div style={{ position: "relative", height: "90vh", overflow: "hidden" }}>
      <video
        autoPlay
        loop
        muted
        className="d-block w-100"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ 
                    position: "absolute", 
                    top: "0%", 
                    left: "0%",
                    right : "4%",
                    padding :"10px",
                    paddingBottom : "30px",
                    width : "100%",
                    height : "100%",
                    maxHeight: "100%", // add this to prevent height overflow
                    maxWidth: "100%",
                    backgroundColor: "rgba(250, 250, 250, 0.0)", 
                    display: "block", 
                    textAlign: "center",
                    justifyContent: "center", 
                    alignItems: "center",
                    borderRadius : "10px" ,
                    boxSizing: "border-box" 
                }}>
        <h1 className="text-light text-center">Book Your Trip Now!</h1>
        <SearchComponent />
      </div>
    </div>
  );
};

export default HeroSection;
