import React from "react";
import p1 from "../logo/enas.jpeg";
import p2 from "../logo/onna.jpeg";
import p3 from "../logo/mina.jpeg";
import p4 from "../logo/icon.png";
import p5 from "../logo/maged.jpeg";
import "./navbar.css";

const Payment = () => {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <div
          style={{
            height: "90vh",
            backgroundColor: "white",
            marginTop: "30px",
            marginLeft: "5%",
            marginRight: "5%",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <h1
            className="text-center "
            style={{
              color: "#003366",
              paddingTop: "80px",
              marginBottom: "50px",
            }}
          >
            You Can Keep in Touch With Our Development Team
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              paddingTop: "20px",
            }}
          >
            {/* Row 1 with 3 images */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <img
                  src={p2}
                  style={{
                    width: "30vh",
                    height: "30vh",
                    marginBottom: "15px",
                  }}
                  alt="Payment method 1"
                />
                <br />
                <a
                  style={{
                    textDecoration: "none",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#003366",
                    fontFamily: "'Arial', sans-serif",
                  }}
                  href="https://github.com/Afnan7120"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Afnan Mohamed
                </a>
              </div>

              <div style={{ textAlign: "center" }}>
                <img
                  src={p1}
                  style={{
                    width: "35vh",
                    height: "auto",
                    direction: "none",
                    marginBottom: "15px",
                  }}
                  alt="Payment method 2"
                />
                <br />
                <a
                  href="https://github.com/3EnasMelad"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#003366",
                    fontFamily: "'Arial', sans-serif",
                  }}
                >
                  Enas Melad
                </a>
              </div>
              <div style={{ textAlign: "center" }}>
                <img
                  src={p3}
                  style={{
                    width: "30vh",
                    height: "30vh",
                    marginBottom: "15px",
                  }}
                  alt="Payment method 3"
                />
                <br />
                <a
                  href="  https://github.com/minanaser1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#003366",
                    fontFamily: "'Arial', sans-serif",
                  }}
                >
                  Mina Naser
                </a>
              </div>
            </div>

            {/* Row 2 with 2 larger images */}
            <div
              style={{
                display: "flex",
                gap: "20px", // space between images
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <img
                  src={p4}
                  style={{
                    width: "30vh",
                    height: "30vh",
                    marginBottom: "15px",
                  }}
                  alt="Payment method 4"
                />
                <br />
                <a
                  href="https://github.com/Karimsameh100"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#003366",
                    fontFamily: "'Arial', sans-serif",
                  }}
                >
                  Karim Sameh
                </a>
              </div>
              <div style={{ textAlign: "center" }}>
                <img
                  src={p5}
                  style={{
                    width: "30vh",
                    height: "30vh",
                    marginBottom: "15px",
                  }}
                  alt="Payment method 5"
                />
                <br />
                <a
                  style={{
                    textDecoration: "none",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#003366",
                    fontFamily: "'Arial', sans-serif",
                  }}
                  href="https://github.com/mmetyas"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Maged metyas
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
