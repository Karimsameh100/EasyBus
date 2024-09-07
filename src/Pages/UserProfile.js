// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { FaSignOutAlt, FaEdit } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS for the confirm alert

// const UserProfile = () => {
//   const [profilePic, setProfilePic] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedName = localStorage.getItem("userName");
//     const storedEmail = localStorage.getItem("userEmail");
//     const storedProfilePic = localStorage.getItem("userProfilePic");

//     if (storedName) setName(storedName);
//     if (storedEmail) setEmail(storedEmail);
//     if (storedProfilePic) setProfilePic(storedProfilePic);
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const imageUrl = reader.result;
//         setProfilePic(imageUrl);
//         localStorage.setItem("userProfilePic", imageUrl);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleLogout = () => {
//     confirmAlert({
//       title: "Confirm Logout",
//       message: "Are you sure you want to logout?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//             localStorage.removeItem("isLoggedIn");
//             localStorage.removeItem("userName");
//             localStorage.removeItem("userEmail");
//             localStorage.removeItem("userProfilePic");
//             navigate("/");
//           },
//         },
//         {
//           label: "No",
//         },
//       ],
//       closeOnClickOutside: true,
//     });
//   };

//   const handleEditAccount = () => {
//     navigate("/client", {
//       state: { name, email, profilePic, isEditMode: true },
//     });
//   };

//   return (
//     <Container
//       className="my-5"
//       style={{ backgroundColor: "#f8f9fa", minHeight: "150vh" }}
//     >
//       <Row className="justify-content-center">
//         <Col md={12}>
//           <Card>
//             <Row noGutters>
//               <Col
//                 md={4}
//                 className="d-flex justify-content-center align-items-center"
//               >
//                 <Card.Img
//                   variant="top"
//                   src={profilePic || "https://via.placeholder.com/150"}
//                   style={{
//                     width: "150px",
//                     height: "150px",
//                     borderRadius: "50%",
//                   }}
//                 />
//               </Col>
//               <Col md={8}>
//                 <Card.Body>
//                   <Card.Title>Welcome : {name}</Card.Title>
//                   <Card.Subtitle className="mb-2 text-muted">
//                     Your Mail : {email}
//                   </Card.Subtitle>
//                   <Form>
//                     <Form.Group controlId="formFile">
//                       <Form.Control
//                         type="file"
//                         style={{ marginTop: "5vh" }}
//                         onChange={handleImageUpload}
//                       />
//                     </Form.Group>
//                     <Button type="submit" style={{ marginTop: "5vh" }}>
//                       Save Changes
//                     </Button>
//                   </Form>
//                   <div
//                     className="d-flex justify-content-end"
//                     style={{ marginTop: "2vh" }}
//                   >
//                     <Button
//                       variant="outline-danger"
//                       onClick={handleLogout}
//                       style={{ marginRight: "1vh" }}
//                     >
//                       <FaSignOutAlt style={{ marginRight: "5px" }} />
//                       Logout
//                     </Button>
//                     <Button
//                       variant="outline-success"
//                       onClick={handleEditAccount}
//                     >
//                       <FaEdit style={{ marginRight: "5px" }} />
//                       Edit Account
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default UserProfile;
// ========================================================================111
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookedTrips, setBookedTrips] = useState([]); // new state for trips
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedProfilePic = localStorage.getItem("userProfilePic");
    const storedTrips = JSON.parse(localStorage.getItem("bookedTrips")) || []; //ّ-----------------

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedProfilePic) setProfilePic(storedProfilePic);
    setBookedTrips(storedTrips); // set trips
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setProfilePic(imageUrl);
        localStorage.setItem("userProfilePic", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    confirmAlert({
      title: "Confirm Logout",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userProfilePic");
            localStorage.removeItem("bookedTrips");
            navigate("/");
          },
        },
        {
          label: "No",
        },
      ],
      closeOnClickOutside: true,
    });
  };

  const handleEditAccount = () => {
    navigate("/client", {
      state: { name, email, profilePic, isEditMode: true },
    });
  };

  return (
    <Container
      className="my-5"
      style={{ backgroundColor: "#f8f9fa", minHeight: "150vh" }}
    >
      <Row className="justify-content-center">
        <Col md={12}>
          <Card>
            <Row noGutters>
              <Col
                md={4}
                className="d-flex justify-content-center align-items-center"
              >
                <Card.Img
                  variant="top"
                  src={profilePic || "https://via.placeholder.com/150"}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title>Welcome : {name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Your Mail : {email}
                  </Card.Subtitle>
                  <Form>
                    <Form.Group controlId="formFile">
                      <Form.Control
                        type="file"
                        style={{ marginTop: "5vh" }}
                        onChange={handleImageUpload}
                      />
                    </Form.Group>
                    <Button type="submit" style={{ marginTop: "5vh" }}>
                      Save Changes
                    </Button>
                  </Form>

                  {/* Display booked trips or a message if none */}
                  <div style={{ marginTop: "2vh" }}>
                    <h5>Your Booked Trips:</h5>
                    {bookedTrips.length > 0 ? (
                      <ul>
                        {bookedTrips.map((trip, index) => (
                          <li key={index}>{trip}</li>
                        ))}
                      </ul>
                    ) : (
                      <Alert variant="info">
                        You have not booked any trips yet.
                      </Alert>
                    )}
                  </div>

                  <div
                    className="d-flex justify-content-end"
                    style={{ marginTop: "2vh" }}
                  >
                    <Button
                      variant="outline-danger"
                      onClick={handleLogout}
                      style={{ marginRight: "1vh" }}
                    >
                      <FaSignOutAlt style={{ marginRight: "5px" }} />
                      Logout
                    </Button>
                    <Button
                      variant="outline-success"
                      onClick={handleEditAccount}
                    >
                      <FaEdit style={{ marginRight: "5px" }} />
                      Edit Account
                    </Button>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
// ================================================================pagination
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Form,
//   Alert,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { FaSignOutAlt, FaEdit } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import ReactPaginate from "react-paginate"; // استيراد مكتبة الباجنيشن

// const UserProfile = () => {
//   const [profilePic, setProfilePic] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [bookedTrips, setBookedTrips] = useState([]); // رحلات المحجوزة
//   const [currentPage, setCurrentPage] = useState(0); // الحالة لحفظ الصفحة الحالية
//   const tripsPerPage = 5; // عدد الرحلات في كل صفحة
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedName = localStorage.getItem("userName");
//     const storedEmail = localStorage.getItem("userEmail");
//     const storedProfilePic = localStorage.getItem("userProfilePic");
//     const storedTrips = JSON.parse(localStorage.getItem("bookedTrips")) || [];

//     if (storedName) setName(storedName);
//     if (storedEmail) setEmail(storedEmail);
//     if (storedProfilePic) setProfilePic(storedProfilePic);
//     setBookedTrips(storedTrips); // تعيين الرحلات
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const imageUrl = reader.result;
//         setProfilePic(imageUrl);
//         localStorage.setItem("userProfilePic", imageUrl);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleLogout = () => {
//     confirmAlert({
//       title: "Confirm Logout",
//       message: "Are you sure you want to logout?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//             localStorage.removeItem("isLoggedIn");
//             localStorage.removeItem("userName");
//             localStorage.removeItem("userEmail");
//             localStorage.removeItem("userProfilePic");
//             localStorage.removeItem("bookedTrips");
//             navigate("/");
//           },
//         },
//         {
//           label: "No",
//         },
//       ],
//       closeOnClickOutside: true,
//     });
//   };

//   const handleEditAccount = () => {
//     navigate("/client", {
//       state: { name, email, profilePic, isEditMode: true },
//     });
//   };

//   // حساب عدد الصفحات المطلوبة
//   const pageCount = Math.ceil(bookedTrips.length / tripsPerPage);

//   // تحديد الرحلات التي سيتم عرضها في الصفحة الحالية
//   const displayedTrips = bookedTrips.slice(
//     currentPage * tripsPerPage,
//     (currentPage + 1) * tripsPerPage
//   );

//   // التعامل مع تغيير الصفحة
//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected);
//   };

//   return (
//     <Container
//       className="my-5"
//       style={{ backgroundColor: "#f8f9fa", minHeight: "150vh" }}
//     >
//       <Row className="justify-content-center">
//         <Col md={12}>
//           <Card>
//             <Row noGutters>
//               <Col
//                 md={4}
//                 className="d-flex justify-content-center align-items-center"
//               >
//                 <Card.Img
//                   variant="top"
//                   src={profilePic || "https://via.placeholder.com/150"}
//                   style={{
//                     width: "150px",
//                     height: "150px",
//                     borderRadius: "50%",
//                   }}
//                 />
//               </Col>
//               <Col md={8}>
//                 <Card.Body>
//                   <Card.Title>Welcome : {name}</Card.Title>
//                   <Card.Subtitle className="mb-2 text-muted">
//                     Your Mail : {email}
//                   </Card.Subtitle>
//                   <Form>
//                     <Form.Group controlId="formFile">
//                       <Form.Control
//                         type="file"
//                         style={{ marginTop: "5vh" }}
//                         onChange={handleImageUpload}
//                       />
//                     </Form.Group>
//                     <Button type="submit" style={{ marginTop: "5vh" }}>
//                       Save Changes
//                     </Button>
//                   </Form>

//                   {/* عرض الرحلات المحجوزة أو رسالة إذا لم يكن هناك أي رحلة */}
//                   <div style={{ marginTop: "2vh" }}>
//                     <h5>Your Booked Trips:</h5>
//                     {bookedTrips.length > 0 ? (
//                       <>
//                         <ul>
//                           {displayedTrips.map((trip, index) => (
//                             <li key={index}>{trip}</li>
//                           ))}
//                         </ul>
//                         {/* باجنيشن */}
//                         <ReactPaginate
//                           previousLabel={"Previous"}
//                           nextLabel={"Next"}
//                           pageCount={pageCount}
//                           onPageChange={handlePageClick}
//                           containerClassName={"pagination"}
//                           activeClassName={"active"}
//                         />
//                       </>
//                     ) : (
//                       <Alert variant="info">
//                         You have not booked any trips yet.
//                       </Alert>
//                     )}
//                   </div>

//                   <div
//                     className="d-flex justify-content-end"
//                     style={{ marginTop: "2vh" }}
//                   >
//                     <Button
//                       variant="outline-danger"
//                       onClick={handleLogout}
//                       style={{ marginRight: "1vh" }}
//                     >
//                       <FaSignOutAlt style={{ marginRight: "5px" }} />
//                       Logout
//                     </Button>
//                     <Button
//                       variant="outline-success"
//                       onClick={handleEditAccount}
//                     >
//                       <FaEdit style={{ marginRight: "5px" }} />
//                       Edit Account
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default UserProfile;
