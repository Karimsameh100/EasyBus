// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../logo/neew llogo.png";
// import "./navbar.css";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";

// export function NavBar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [favorites, setFavorites] = useState(0);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profilePic, setProfilePic] = useState(null);

//   useEffect(() => {
//     const handleLoginStatusChange = () => {
//       const storedName = localStorage.getItem("userName");
//       setIsLoggedIn(!!storedName);
//       const storedProfilePic = localStorage.getItem(`profilePic_${storedName}`);
//       setProfilePic(storedProfilePic || "https://via.placeholder.com/150");

//       const storedFavorites =
//         JSON.parse(localStorage.getItem("favorites")) || [];
//       setFavorites(storedFavorites.length);
//     };

//     const handleFavoritesUpdate = () => {
//       const storedFavorites =
//         JSON.parse(localStorage.getItem("favorites")) || [];
//       setFavorites(storedFavorites.length);
//     };

//     handleLoginStatusChange();
//     window.addEventListener("profilePicUpdated", handleLoginStatusChange);
//     window.addEventListener("loginStatusChanged", handleLoginStatusChange);
//     window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

//     return () => {
//       window.removeEventListener("profilePicUpdated", handleLoginStatusChange);
//       window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
//       window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
//     };
//   }, []);

//   const handleLogout = () => {
//     confirmAlert({
//       title: "Confirm Logout",
//       message: "Are you sure you want to logout?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//             localStorage.removeItem("userName");
//             localStorage.removeItem("userEmail");
//             localStorage.removeItem("profilePic");
//             localStorage.removeItem("favorites");
//             setIsLoggedIn(false);
//             navigate("/");

//             window.dispatchEvent(new Event("loginStatusChanged"));
//           },
//         },
//         {
//           label: "No",
//         },
//       ],
//     });
//   };

//   const isUserProfile = location.pathname === "/UserProfile";

//   return (
//     <nav
//       className="navbar navbar-expand-lg custom-navbar"
//       style={{ backgroundColor: "#4b0082" }}
//     >
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           <img
//             src={logo}
//             alt="Logo"
//             style={{ width: "110px", marginLeft: "50px" }}
//           />
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav mx-auto d-flex justify-content-center">
//             <li className="nav-item">
//               <Link className="nav-link active me-3" aria-current="page" to="/">
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link me-3" to="#">
//                 Buses
//               </Link>
//             </li>
//             {isLoggedIn && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/favorites">
//                   Favorites{" "}
//                   <span className="badge badge-pill badge-danger">
//                     {favorites}
//                   </span>
//                 </Link>
//               </li>
//             )}
//             <li className="nav-item">
//               <Link to="/About" className="nav-link me-3">
//                 About
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/listtrips" className="nav-link me-3">
//                 Trips
//               </Link>
//             </li>
//           </ul>

//           {isLoggedIn ? (
//             <ul className="navbar-nav ms-auto d-flex align-items-center">
//               <li className="nav-item me-3">
//                 <img
//                   src={profilePic || "https://via.placeholder.com/50"}
//                   alt="Profile"
//                   className="rounded-circle"
//                   style={{ width: "50px", height: "50px", cursor: "pointer" }}
//                   onClick={() => navigate("/UserProfile")}
//                 />
//               </li>
//               <li className="nav-item">
//                 <button
//                   id="navBTN"
//                   className="btn btn-outline-light"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           ) : (
//             !isUserProfile && (
//               <ul className="navbar-nav ms-auto">
//                 <li className="nav-item">
//                   <Link to="/Login1">
//                     <button id="navBTN" className="btn btn-outline-light me-3">
//                       Login
//                     </button>
//                   </Link>
//                 </li>
//                 <li className="nav-item me-3">
//                   <Link to="/TripTrackSignup">
//                     <button id="navBTN" className="btn btn-outline-dark">
//                       SignUp
//                     </button>
//                   </Link>
//                 </li>
//               </ul>
//             )
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;
// ---------------------------------------===================================================================================صوره
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo/neew llogo.png";
import "./navbar.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const handleLoginStatusChange = () => {
      const storedName = localStorage.getItem("userName");
      setIsLoggedIn(!!storedName);
      const storedProfilePic = localStorage.getItem(`profilePic_${storedName}`);
      setProfilePic(storedProfilePic || "https://via.placeholder.com/150");

      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites.length);
    };

    handleLoginStatusChange();
    window.addEventListener("loginStatusChanged", handleLoginStatusChange);

    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
    };
  }, []);

  const handleLogout = () => {
    confirmAlert({
      title: "Confirm Logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("profilePic");
            localStorage.removeItem("favorites");
            setIsLoggedIn(false);
            navigate("/");

            window.dispatchEvent(new Event("loginStatusChanged"));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const isUserProfile = location.pathname === "/UserProfile";

  return (
    <nav
      className="navbar navbar-expand-lg custom-navbar"
      style={{ backgroundColor: "#4b0082" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
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
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">
                  Favorites{" "}
                  <span className="badge badge-pill badge-danger">
                    {favorites}
                  </span>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/About" className="nav-link me-3">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/listtrips" className="nav-link me-3">
                Trips
              </Link>
            </li>
          </ul>

          {isLoggedIn ? (
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item me-3">
                <img
                  src={profilePic || "https://via.placeholder.com/50"}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  onClick={() => navigate("/UserProfile")}
                />
              </li>
              <li className="nav-item">
                <button
                  id="navBTN"
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            !isUserProfile && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/Login1">
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
              </ul>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
