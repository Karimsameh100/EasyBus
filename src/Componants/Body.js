// import React from "react";
// import aboutImage from "../logo/bus.jpg";

// const Body = () => {
//   return (
//     <div
//       style={{
//         height: "480px",
//         width: "100%",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       <img
//         src={aboutImage}
//         alt="About"
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//         }}
//       />
//     </div>
//   );
// };

// export default Body;
// ====================================

import React from "react";
import aboutImage from "../logo/bus.jpg";

const Body = () => {
  return (
    <div
      style={{
        height: "480px",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <img
        src={aboutImage}
        alt="About"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(40%)", // جعل الصورة باهتة
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1, // يظهر النص فوق الصورة
          // backgroundColor: "rgba(0, 0, 0, 0.5)", // خلفية مظللة لتحسين وضوح النص
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Our New Journey</h2>
        <p>
          Discover our new services with the latest fleet of advanced buses that
          guarantee you a comfortable and safe journey. We offer a distinguished
          travel experience with attention to the finest details to meet your
          needs.
        </p>
      </div>
    </div>
  );
};

export default Body;
