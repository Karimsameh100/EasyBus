import React from "react";
import aboutImage from "../logo/bus.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Body = () => {
  return (
    <div
      className="container-fluid p-0"
      style={{ height: "600px", position: "relative", marginTop: "10vh" }}
    >
      <div className="row h-100 m-0">
        <div className="col-12 p-0 position-relative">
          <img
            src={aboutImage}
            alt="About"
            className="img-fluid w-100 h-100 position-absolute"
            style={{ objectFit: "cover", filter: "brightness(75%)" }}
          />
          <div
            className="position-relative text-center text-white d-flex justify-content-center align-items-center"
            style={{
              height: "100%",
              zIndex: 1,
              padding: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
          >
            <div>
              <h2>Our New Journey</h2>
              <p>
                Discover our new services with the latest fleet of advanced
                buses that guarantee you a comfortable and safe journey. We
                offer a distinguished travel experience with attention to the
                finest details to meet your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
