import React from "react";
import ph1 from "../logo/photo1.jpg";
import ph2 from "../logo/photo2.jpg";
import ph3 from "../logo/photo3.jpg";
import ph4 from "../logo/photo4.jpg";

const HeroSection = () => {
  return (
    <>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="6000"
        style={{ position: "relative" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={ph1}
              className="d-block w-100"
              alt="Photo 1"
              style={{ height: "90vh", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={ph2}
              className="d-block w-100"
              alt="Photo 2"
              style={{ height: "90vh", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={ph3}
              className="d-block w-100"
              alt="Photo 3"
              style={{ height: "90vh", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={ph4}
              className="d-block w-100"
              alt="Photo 4"
              style={{ height: "90vh", objectFit: "cover" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div
          className="carousel-caption d-none d-md-block"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            backgroundColor: "rgba(0, 51, 102, 0.5)",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <h1>Book Your Trip Now!</h1>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

// export default HeroSection;
