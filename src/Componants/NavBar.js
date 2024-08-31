// ------------------------------------------------------------------

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../logo/neew llogo.png";
// import "./navbar.css";
// import { Link } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg custom-navbar">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="#">
//             <img
//               src={logo}
//               alt="Logo"
//               style={{ width: "110px", marginLeft: "50px" }}
//             />
//           </Link>

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

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav mx-auto d-flex justify-content-center">
//               <li className="nav-item">
//                 <Link
//                   className="nav-link active me-3"
//                   aria-current="page"
//                   to="/"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link me-3" to="#">
//                   Buses
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/About"} className="nav-link me-3">
//                   About
//                 </Link>
//               </li>

//               <Link to={"/listtrips"} className="nav-link me-3">
//                 Trips
//               </Link>
//             </ul>

//             <ul className="navbar-nav ms-auto me-3">
//               <li className="nav-item">
//                 <Link to={"/Login"}>
//                   <button id="navBTN" className="btn btn-outline-light me-3">
//                     Login
//                   </button>
//                 </Link>
//               </li>
//               <li className="nav-item me-3">
//                 <Link to={"TripTrackSignup"}>
//                   <button id="navBTN" className="btn btn-outline-dark">
//                     SignUp
//                   </button>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default NavBar;
// ------------------------------------------------------------------
// ------------------------------------------------------------lasssttttttttttttttttttttt update
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../logo/neew llogo.png";
// import "./navbar.css";
// import { Link } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg custom-navbar">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="#">
//             <img
//               src={logo}
//               alt="Logo"
//               style={{ width: "110px", marginLeft: "50px" }}
//             />
//           </Link>

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

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav mx-auto d-flex justify-content-center">
//               <li className="nav-item">
//                 <Link
//                   className="nav-link active me-3"
//                   aria-current="page"
//                   to="/"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link me-3" to="#">
//                   Buses
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/About"} className="nav-link me-3">
//                   About
//                 </Link>
//               </li>
         
//               <Link to={"/listtrips"} className="nav-link me-3">
//                 Trips
//               </Link>
//             </ul>

//             <ul className="navbar-nav ms-auto me-3">
//               <li className="nav-item">
//                 <Link to={"/Login"}>
//                   <button id="navBTN" className="btn btn-outline-light me-3">
//                     Login
//                   </button>
//                 </Link>
//               </li>
//               <li className="nav-item me-3">
//                 <Link to={"TripTrackSignup"}>
//                   <button id="navBTN" className="btn btn-outline-dark">
//                     SignUp
//                   </button>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default NavBar;


import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo/neew llogo.png";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ loggedIn }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking the localStorage
    const storedCompany = localStorage.getItem('loggedInCompany');
    setIsLoggedIn(!!storedCompany);
  }, [loggedIn]); // This ensures it updates when the prop changes

  const handleLogout = () => {
    // Clear the logged-in data and navigate to the login page
    localStorage.removeItem('loggedInCompany');
    setIsLoggedIn(false);
    navigate('/Login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "110px", marginLeft: "50px" }}
            />
          </Link>

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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto d-flex justify-content-center">
              <li className="nav-item">
                <Link className="nav-link active me-3" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-3" to="#">
                  Buses
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/About" className="nav-link me-3">
                  About
                </Link>
              </li>

              <Link to={"/listtrips"} className="nav-link me-3">
                Trips
              </Link>
            </ul>

            {!isUserProfile && (
              <ul className="navbar-nav ms-auto me-3">
                <li className="nav-item">
                  <Link to={"/Login"}>
                    <button id="navBTN" className="btn btn-outline-light me-3">
                      Login
                    </button>
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link to={"TripTrackSignup"}>
                    <button id="navBTN" className="btn btn-outline-dark">
                      SignUp
                    </button>
                  </Link>
                </li>
              </ul>
            )}
            <ul className="navbar-nav ms-auto me-3">
              {isLoggedIn ? (
                <li className="nav-item">
                  <button
                    id="navBTN"
                    className="btn btn-outline-danger me-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/Login">
                      <button id="navBTN" className="btn btn-outline-light me-3">
                        Login
                      </button>
                    </Link>
                  </li>
                  <li className="nav-item me-3">
                    <Link to="/TripTrackSignup">
                      <button id="navBTN" className="btn btn-outline-dark">
                        SignUp
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
