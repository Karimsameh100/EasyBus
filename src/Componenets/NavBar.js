// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../logo/logo.jpg";
// const NavBar = () => {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-white">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">
//             <img src={logo} style={{ width: "110px", marginLeft: "80px" }} />
//           </a>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNavAltMarkup"
//             aria-controls="navbarNavAltMarkup"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* قائمة التنقل */}
//           <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//             <div className="navbar-nav ms-auto">
//               <a className="nav-link active me-3 " aria-current="page" href="#">
//                 Home
//               </a>
//               <a className="nav-link me-3 " href="#">
//                 Buses
//               </a>
//               <a className="nav-link me-3 " href="#">
//                 About
//               </a>
//               <button type="button" className="btn btn-outline-info me-3">
//                 Login
//               </button>
//               <button type="button" className="btn btn-outline-info ">
//                 Signup
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default NavBar;

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../logo/logo.jpg";
// const NavBar = () => {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-white">
//         <div className="container-fluid">
//           {/* الشعار */}
//           <a className="navbar-brand" href="#">
//             <img src={logo} alt="Logo" style={{ width: "110px" }} />
//           </a>

//           {/* زر التبديل للقائمة في العرض الصغير */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* قائمة التنقل */}
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav mx-auto d-flex justify-content-center">
//               <li className="nav-item">
//                 <a
//                   className="nav-link active me-3"
//                   aria-current="page"
//                   href="#"
//                 >
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link me-3" href="#">
//                   Buses
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link me-3" href="#">
//                   About
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <button type="button" className="btn btn-outline-info me-3">
//                   Login
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button type="button" className="btn btn-outline-info">
//                   Signup
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default NavBar;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo/logo.jpg";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          {/* الشعار */}
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" style={{ width: "110px" }} />
          </a>

          {/* زر التبديل للقائمة في العرض الصغير */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* قائمة التنقل */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto d-flex justify-content-center">
              <li className="nav-item">
                <a
                  className="nav-link active me-3"
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-3" href="#">
                  Buses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-3" href="#">
                  About
                </a>
              </li>
            </ul>
            {/* أزرار تسجيل الدخول والتسجيل */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button type="button" className="btn btn-outline-dark me-3">
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn btn-outline-dark">
                  Signup
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
