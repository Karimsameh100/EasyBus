// import React from "react";
// import { Link } from "react-router-dom";
// import aboutImg from "../logo/about.jpg";
// import img3 from "../logo/DALL·E 2024-08-22 00.11.23 - A modern and well-maintained public transportation service, featuring a fleet of buses traveling across various Egyptian governorates. The image shoul.webp";
// import img1 from "../logo/DALL·E 2024-08-22 00.10.15 - A modern, comfortable bus interior with plush, blue leather seats and large windows, showing a clean and organized setting. The image should convey a .webp";

// import img2 from "../logo/about1.jfif";
// const About = () => {
//   // const handleClick = () => {
//   //   window.location.hash = "#Home";
//   //   window.scrollTo({ top: 0, behavior: "smooth" });
//   // };
//   return (
//     <>
//       <div style={{ textAlign: "center" }} className="container">
//         <h1
//           id="about"
//           className="text-center "
//           style={{ color: "#003366", marginTop: "10vh" }}
//         >
//           About TRIP TRACK
//         </h1>
//         <img
//           src={aboutImg}
//           style={{ width: "130vh", height: "70vh", marginTop: "5vh" }}
//           all
//         />
//         <p
//           style={{
//             marginRight: "10vh",
//             marginLeft: "10vh",
//             marginTop: "5vh",
//             marginBottom: "10vh",
//           }}
//         >
//           <h5>
//             <b>TRIP TRACK</b> is a premier public transport company, providing
//             luxurious yet affordable long distance travel in Egypt connecting
//             Greater Cairo with the most famous destinations along The Nile River
//             and both The Mediterranean & Red sea. As the Middle Eastern most
//             promising transportation company, we believe in making a difference
//             through our values. We aspire to make the traveling experience with
//             us a memorable and joyful one. <b>TRIP TRACK</b> adopts technology
//             that enriches our customer experience, from booking till reaching
//             destinations. Our highly trained staff deliver a luxurious service.
//             As well as, our professional drivers ensure safe and punctual trips,
//             with the quality our passengers deserve.
//           </h5>
//         </p>
//       </div>
//       <hr />
//       <div className="container my-5" style={{ marginTop: "12vh" }}>
//         <div className="text-center mb-4">
//           <h2 style={{ marginBottom: "8vh" }}>Our Mission</h2>
//         </div>
//         <div className="row text-center">
//           <div className="col-lg-4 col-md-6 mb-4">
//             <img src={img1} alt="Mission" className="img-fluid" />
//             <h4 className="mt-3">
//               Ensuring a satisfactory and outstanding level of service
//             </h4>
//             <p>
//               Ensuring a satisfactory and outstanding level of service, which
//               participates with elevating the quality standards of
//               transportation industry in Egypt...
//             </p>
//           </div>
//           <div className="col-lg-4 col-md-6 mb-4">
//             <img src={img3} alt="Vision" className="img-fluid" />
//             <h4 className="mt-3">Delivering a public transportation service</h4>
//             <p>
//               Delivering a public transportation service that complies with the
//               highest quality standards...
//             </p>
//           </div>
//           <div className="col-lg-4 col-md-6 mb-4">
//             <img src={img2} alt="Goals" className="img-fluid" />
//             <h4 className="mt-3">To extend over all travel networks</h4>
//             <p>
//               To extend over all travel networks among the Egyptian
//               governorates, which elevates the company’s opportunities to
//               grow...
//             </p>
//           </div>
//         </div>
//         <div className="text-center mt-4">
//           <Link to={"/ "}>
//             <button
//               // onClick={handleClick}
//               id="infoBTN"
//               className="btn  btn-outline-dark me-3"
//             >
//               Book Now
//             </button>
//           </Link>
//           {/* <a
//             href="#"
//             className="btn btn-primary   btn-lg px-5"
//             style={{ marginBottom: "10vh" }}
//           >
//             Book Now
//           </a> */}
//         </div>
//       </div>
//     </>
//   );
// };
// export default About;

// تعديلات بسيطه bootstrap
import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../logo/about.jpg";
import img3 from "../logo/Dall1.webp";
import img1 from "../logo/Dall2.webp";
import img2 from "../logo/about1.jfif";

const About = () => {
  // const handleClick = () => {
  //   window.location.hash = "#Home";
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };
  return (
    <>
      <div className="container text-center my-5">
        <h1 id="about" className="text-primary my-5">
          About TRIP TRACK
        </h1>
        <img
          src={aboutImg}
          className="img-fluid my-5"
          style={{ maxWidth: "100%", height: "auto" }}
          alt="About TRIP TRACK"
        />
        <p className="mx-auto my-5" style={{ maxWidth: "800px" }}>
          <strong>TRIP TRACK</strong> is a premier public transport company,
          providing luxurious yet affordable long distance travel in Egypt
          connecting Greater Cairo with the most famous destinations along The
          Nile River and both The Mediterranean & Red sea. As the Middle Eastern
          most promising transportation company, we believe in making a
          difference through our values. We aspire to make the traveling
          experience with us a memorable and joyful one.{" "}
          <strong>TRIP TRACK</strong> adopts technology that enriches our
          customer experience, from booking till reaching destinations. Our
          highly trained staff deliver a luxurious service. As well as, our
          professional drivers ensure safe and punctual trips, with the quality
          our passengers deserve.
        </p>
      </div>
      <hr />
      <div className="container my-5">
        <div className="text-center mb-4">
          <h2 className="mb-4">Our Mission</h2>
        </div>
        <div className="row text-center">
          <div className="col-lg-4 col-md-6 mb-4">
            <img src={img1} alt="Mission" className="img-fluid" />
            <h4 className="mt-3">
              Ensuring a satisfactory and outstanding level of service
            </h4>
            <p>
              Ensuring a satisfactory and outstanding level of service, which
              participates with elevating the quality standards of
              transportation industry in Egypt...
            </p>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <img src={img3} alt="Vision" className="img-fluid" />
            <h4 className="mt-3">Delivering a public transportation service</h4>
            <p>
              Delivering a public transportation service that complies with the
              highest quality standards...
            </p>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <img src={img2} alt="Goals" className="img-fluid" />
            <h4 className="mt-3">To extend over all travel networks</h4>
            <p>
              To extend over all travel networks among the Egyptian
              governorates, which elevates the company’s opportunities to
              grow...
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to={"/"}>
            <button
              // onClick={handleClick}
              id="infoBTN"
              className="btn btn-outline-dark me-3"
            >
              Book Now
            </button>
          </Link>
          {/* <a
            href="#"
            className="btn btn-primary btn-lg px-5"
            style={{ marginBottom: "10vh" }}
          >
            Book Now
          </a> */}
        </div>
      </div>
    </>
  );
};

export default About;
