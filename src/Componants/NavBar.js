
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo/neew llogo.png";
import "./navbar.css";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";



// const NavBar = ({ favoritesCount }) => {
export function NavBar() {

  const location = useLocation();
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritesCount(storedFavorites.length);
  }, []);
  // تحقق مما إذا كان المستخدم في صفحة الملف الشخصي
  const isUserProfile = location.pathname === "/UserProfile";

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
                <Link
                  className="nav-link active me-3"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-3" to="#">
                  Buses
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">
                  Favorites <span className="badge badge-pill badge-primary">{favoritesCount}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/About"} className="nav-link me-3">
                  About
                </Link>
              </li>

              <Link to="/listtrips" className="nav-link me-3">
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

          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;



