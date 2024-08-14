import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo/logo.jpg";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" style={{ width: "110px" }} />
          </a>

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
