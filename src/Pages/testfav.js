// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaHeart } from "react-icons/fa";

// export function NavBar() {
//   const [favoritesCount, setFavoritesCount] = useState(0);

//   // Update favorites count from localStorage whenever changes are made
//   useEffect(() => {
//     const updateFavoritesCount = () => {
//       const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//       setFavoritesCount(storedFavorites.length);
//     };

//     // Initial load
//     updateFavoritesCount();

//     // Listen for changes in the localStorage 'favorites'
//     window.addEventListener("storage", updateFavoritesCount);

//     // Cleanup the event listener
//     return () => {
//       window.removeEventListener("storage", updateFavoritesCount);
//     };
//   }, []);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           TravelSite
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
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/favorites">
//                 <FaHeart />
//                 <span className="badge bg-danger ms-1">{favoritesCount}</span> Favorites
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/login">
//                 Login
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/signup">
//                 Signup
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
