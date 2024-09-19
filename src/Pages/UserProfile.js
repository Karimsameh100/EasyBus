// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Form,
//   Alert,
//   Pagination,
//   Nav,
// } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const UserProfile = () => {
//   const [profilePic, setProfilePic] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [bookedTrips, setBookedTrips] = useState([]);
//   const [filteredTrips, setFilteredTrips] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentSection, setCurrentSection] = useState("profile");
//   const tripsPerPage = 1;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedName = localStorage.getItem("userName");
//     const storedEmail = localStorage.getItem("userEmail");
//     const storedProfilePic = localStorage.getItem(`profilePic_${storedName}`);
//     const storedTrips = JSON.parse(localStorage.getItem("bookedTrips")) || [];

//     if (storedName) setName(storedName);
//     if (storedEmail) setEmail(storedEmail);
//     if (storedProfilePic) setProfilePic(storedProfilePic);

//     const userTrips = storedTrips.filter(
//       (trip) => trip.userName === storedName
//     );
//     setBookedTrips(userTrips);
//   }, []);

//   useEffect(() => {
//     if (currentSection === "pending-trips") {
//       setFilteredTrips(
//         bookedTrips.filter((trip) => trip.status === "Pending" || !trip.status)
//       );
//     } else if (currentSection === "rejected-trips") {
//       setFilteredTrips(
//         bookedTrips.filter((trip) => trip.status === "Rejected")
//       );
//     } else if (currentSection === "accepted-trips") {
//       setFilteredTrips(
//         bookedTrips.filter((trip) => trip.status === "Accepted")
//       );
//     } else {
//       setFilteredTrips(bookedTrips);
//     }
//   }, [currentSection, bookedTrips]);

//   const indexOfLastTrip = currentPage * tripsPerPage;
//   const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
//   const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const imageUrl = reader.result;
//         setProfilePic(imageUrl);
//         const storedName = localStorage.getItem("userName");
//         if (storedName) {
//           localStorage.setItem(`profilePic_${storedName}`, imageUrl);
//         }
//         window.dispatchEvent(new Event("profilePicUpdated")); // تحديث شريط التنقل
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEditAccount = () => {
//     navigate("/client", {
//       state: { name, email, profilePic, isEditMode: true },
//     });
//   };

//   const handleNavClick = (section) => {
//     setCurrentSection(section);
//   };

//   return (
//     <Container
//       className="my-5"
//       style={{ backgroundColor: "#f8f9fa", minHeight: "80vh" }}
//     >
//       <Row>
//         <Col md={4}>
//           <Card>
//             <Card.Body>
//               <Nav className="flex-column">
//                 <Nav.Link onClick={() => handleNavClick("profile")}>
//                   My Profile
//                 </Nav.Link>
//                 <Nav.Link onClick={() => handleNavClick("pending-trips")}>
//                   Pending Trips
//                 </Nav.Link>
//                 <Nav.Link onClick={() => handleNavClick("rejected-trips")}>
//                   Rejected Trips
//                 </Nav.Link>
//                 <Nav.Link onClick={() => handleNavClick("accepted-trips")}>
//                   Accepted Trips
//                 </Nav.Link>
//               </Nav>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={8}>
//           <Card>
//             <Card.Body>
//               {currentSection === "profile" ? (
//                 <div>
//                   <Row className="align-items-center">
//                     <Col md={4} className="d-flex justify-content-center">
//                       <Card.Img
//                         variant="top"
//                         src={profilePic || "https://via.placeholder.com/150"}
//                         style={{
//                           width: "150px",
//                           height: "150px",
//                           borderRadius: "50%",
//                           marginRight: "20px",
//                         }}
//                       />
//                     </Col>
//                     <Col md={6}>
//                       <Card.Title>Welcome : {name}</Card.Title>
//                       <Card.Subtitle className="mb-2 text-muted">
//                         Your Mail : {email}
//                       </Card.Subtitle>
//                       <Form>
//                         <Form.Group controlId="formFile">
//                           <Form.Control
//                             type="file"
//                             style={{ marginTop: "5vh" }}
//                             onChange={handleImageUpload}
//                           />
//                         </Form.Group>
//                         <Button
//                           variant="primary"
//                           onClick={handleEditAccount}
//                           style={{ marginTop: "5vh" }}
//                         >
//                           Edit Account
//                         </Button>
//                       </Form>
//                     </Col>
//                   </Row>
//                 </div>
//               ) : (
//                 <div style={{ marginTop: "5vh" }}>
//                   <h5>
//                     {currentSection === "pending-trips"
//                       ? "Pending Trips"
//                       : currentSection === "rejected-trips"
//                       ? "Rejected Trips"
//                       : "Accepted Trips"}
//                     :
//                   </h5>
//                   {currentTrips.length > 0 ? (
//                     currentTrips.map((trip, index) => (
//                       <Card key={index} className="mt-4">
//                         <Card.Header className="d-flex justify-content-between">
//                           <div>
//                             <h4 className="text-end">{trip.company}</h4>
//                             <strong>Trip Date:</strong> {trip.tripDate}
//                           </div>
//                         </Card.Header>
//                         <Card.Body>
//                           <ul className="list-unstyled">
//                             <li className="d-flex justify-content-between">
//                               <strong>Departure Station:</strong>
//                               <span>{trip.departureStation}</span>
//                             </li>
//                             <li className="d-flex justify-content-between">
//                               <strong>Stop Stations:</strong>
//                               <span>{trip.stopStations}</span>
//                             </li>
//                             <li className="d-flex justify-content-between">
//                               <strong>Departure Time:</strong>
//                               <span>{trip.departureTime}</span>
//                             </li>
//                             <li className="d-flex justify-content-between">
//                               <strong>Arrival Time:</strong>
//                               <span>{trip.arrivedTime}</span>
//                             </li>
//                             <li className="d-flex justify-content-between">
//                               <strong>Number of Places:</strong>
//                               <span>{trip.numPlaces}</span>
//                             </li>
//                             <li className="d-flex justify-content-between">
//                               <strong>Total Cost:</strong>
//                               <span>{trip.totalCost}</span>
//                             </li>
//                           </ul>
//                         </Card.Body>
//                       </Card>
//                     ))
//                   ) : (
//                     <Alert variant="info">
//                       You have no trips in this section.
//                     </Alert>
//                   )}
//                   {filteredTrips.length > tripsPerPage && (
//                     <Pagination className="justify-content-center mt-4">
//                       {Array.from({
//                         length: Math.ceil(filteredTrips.length / tripsPerPage),
//                       }).map((_, idx) => (
//                         <Pagination.Item
//                           key={idx + 1}
//                           active={idx + 1 === currentPage}
//                           onClick={() => handlePageChange(idx + 1)}
//                         >
//                           {idx + 1}
//                         </Pagination.Item>
//                       ))}
//                     </Pagination>
//                   )}
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default UserProfile;
// ==================================================back ======================before local================================================================

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Form,
//   Alert,
//   Pagination,
//   Nav,
// } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const UserProfile = () => {
//   const [profilePic, setProfilePic] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [bookedTrips, setBookedTrips] = useState([]);
//   const [filteredTrips, setFilteredTrips] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentSection, setCurrentSection] = useState("profile");
//   const tripsPerPage = 1;
//   const navigate = useNavigate();

//   // Fetch user data and booked trips from Django API
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/register/user/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access")}`, // JWT Token
//         },
//       })
//       .then((response) => {
//         const { name, email, profilePic, bookedTrips } = response.data;
//         setName(name);
//         setEmail(email);
//         setProfilePic(profilePic);
//         setBookedTrips(bookedTrips);
//       })
//       .catch((error) => {
//         console.error("Error fetching user profile:", error);
//       });
//   }, []);

//   // Filter trips based on the selected section (Pending, Rejected, Accepted)
//   useEffect(() => {
//     if (currentSection === "pending-trips") {
//       setFilteredTrips(
//         bookedTrips.filter((trip) => trip.status === "Pending" || !trip.status)
//       );
//     } else if (currentSection === "rejected-trips") {
//       setFilteredTrips(
//         bookedTrips.filter((trip) => trip.status === "Rejected")
//       );
//     } else if (currentSection === "accepted-trips") {
//       setFilteredTrips(
//         bookedTrips.filter((trip) => trip.status === "Accepted")
//       );
//     } else {
//       setFilteredTrips(bookedTrips);
//     }
//   }, [currentSection, bookedTrips]);

//   // Handle pagination for trips
//   const indexOfLastTrip = currentPage * tripsPerPage;
//   const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
//   // const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

//   const currentTrips =
//     filteredTrips && filteredTrips.length > 0
//       ? filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip)
//       : []; // إذا لم تكن هناك بيانات، تعيين مصفوفة فارغة

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Handle profile picture upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const imageUrl = reader.result;
//         setProfilePic(imageUrl);

//         // Update profile picture in the Django backend
//         axios
//           .put(
//             "http://localhost:8000/register/user/",
//             { profilePic: imageUrl },
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("access")}`,
//               },
//             }
//           )
//           .then(() => {
//             alert("Profile picture updated successfully!");
//           })
//           .catch((error) => {
//             console.error("Error updating profile picture:", error);
//           });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle account edit navigation
//   const handleEditAccount = () => {
//     navigate("/client", {
//       state: { name, email, profilePic, isEditMode: true },
//     });
//   };

//   // Handle navigation between profile and trip sections
//   const handleNavClick = (section) => {
//     setCurrentSection(section);
//   };

//   return (
//     <Container
//       className="my-5"
//       style={{ backgroundColor: "#f8f9fa", minHeight: "80vh" }}
//     >
//       <Row>
//         <Col md={4}>
//           {/* <Card>
//             <Card.Body>
//               <Nav className="flex-column">
//                 <Nav.Link onClick={() => handleNavClick("profile")}>
//                   My Profile
//                 </Nav.Link>
//                 <Nav.Link onClick={() => handleNavClick("pending-trips")}>
//                   Pending Trips
//                 </Nav.Link>
//                 <Nav.Link onClick={() => handleNavClick("rejected-trips")}>
//                   Rejected Trips
//                 </Nav.Link>
//                 <Nav.Link onClick={() => handleNavClick("accepted-trips")}>
//                   Accepted Trips
//                 </Nav.Link>
//               </Nav>
//             </Card.Body>
//           </Card> */}
//           <Card>
//             <Card.Body>
//               <Nav className="flex-column">
//                 <Nav.Link
//                   onClick={() => handleNavClick("profile")}
//                   style={{
//                     color: currentSection === "profile" ? "#007bff" : "#333",
//                   }} // لون الرابط
//                 >
//                   My Profile
//                 </Nav.Link>
//                 <Nav.Link
//                   onClick={() => handleNavClick("pending-trips")}
//                   style={{
//                     color:
//                       currentSection === "pending-trips" ? "#007bff" : "#333",
//                   }}
//                 >
//                   Pending Trips
//                 </Nav.Link>
//                 <Nav.Link
//                   onClick={() => handleNavClick("rejected-trips")}
//                   style={{
//                     color:
//                       currentSection === "rejected-trips" ? "#007bff" : "#333",
//                   }}
//                 >
//                   Rejected Trips
//                 </Nav.Link>
//                 <Nav.Link
//                   onClick={() => handleNavClick("accepted-trips")}
//                   style={{
//                     color:
//                       currentSection === "accepted-trips" ? "#007bff" : "#333",
//                   }}
//                 >
//                   Accepted Trips
//                 </Nav.Link>
//               </Nav>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={8}>
//           <Card>
//             <Card.Body>
//               {currentSection === "profile" ? (
//                 <div>
//                   <Row className="align-items-center">
//                     <Col md={4} className="d-flex justify-content-center">
//                       <Card.Img
//                         variant="top"
//                         src={profilePic || "https://via.placeholder.com/150"}
//                         style={{
//                           width: "150px",
//                           height: "150px",
//                           borderRadius: "50%",
//                           marginRight: "20px",
//                         }}
//                       />
//                     </Col>
//                     <Col md={6}>
//                       <Card.Title>Welcome: {name}</Card.Title>
//                       <Card.Subtitle className="mb-2 text-muted">
//                         Your Email:
//                         {email}
//                       </Card.Subtitle>
//                       <Form>
//                         <Form.Group controlId="formFile">
//                           <Form.Control
//                             type="file"
//                             style={{ marginTop: "5vh" }}
//                             onChange={handleImageUpload}
//                           />
//                         </Form.Group>
//                         <Button
//                           variant="primary"
//                           onClick={handleEditAccount}
//                           style={{ marginTop: "5vh" }}
//                         >
//                           Edit Account
//                         </Button>
//                       </Form>
//                     </Col>
//                   </Row>
//                 </div>
//               ) : (
//                 <div style={{ marginTop: "5vh" }}>
//                   <h5>
//                     {currentSection === "pending-trips"
//                       ? "Pending Trips"
//                       : currentSection === "rejected-trips"
//                       ? "Rejected Trips"
//                       : "Accepted Trips"}
//                     :
//                   </h5>
//                   {currentTrips.length > 0 ? (
//                     currentTrips.map((trip, index) => (
//                       <Card key={index} className="mt-4">
//                         <Card.Header className="d-flex justify-content-between">
//                           <div>
//                             <h4 className="text-end">{trip.company}</h4>
//                             <strong>Trip Date:</strong> {trip.tripDate}
//                           </div>
//                         </Card.Header>
//                         <Card.Body>
//                           <ul className="list-unstyled">
//                             <li className="d-flex justify-content-between">
//                               <strong>Departure Station:</strong>
//                               <span>{trip.departureStation}</span>
//                             </li>
//                             <li className="d-flex justify-content-between">
//                               <strong>Stop Stations:</strong>
//                               <span>{trip.stopStations}</span>
//                             </li>
//                             <li className="d-flex justify-content-between">
//                               <strong>Departure Time:</strong>
//                               <span>{trip.departureTime}</span>
//                             </li>
//                             <li className="d-flex justify-content-between">
//                               <strong>Arrival Time:</strong>
//                               <span>{trip.arrivedTime}</span>
//                             </li>
//                             <li className="d-flex justify-content-between">
//                               <strong>Number of Places:</strong>
//                               <span>{trip.numPlaces}</span>
//                             </li>
//                             <li className="d-flex justify-content-between">
//                               <strong>Total Cost:</strong>
//                               <span>{trip.totalCost}</span>
//                             </li>
//                           </ul>
//                         </Card.Body>
//                       </Card>
//                     ))
//                   ) : (
//                     <Alert variant="info">
//                       You have no trips in this section.
//                     </Alert>
//                   )}
//                   {filteredTrips.length > tripsPerPage && (
//                     <Pagination className="justify-content-center mt-4">
//                       {Array.from({
//                         length: Math.ceil(filteredTrips.length / tripsPerPage),
//                       }).map((_, idx) => (
//                         <Pagination.Item
//                           key={idx + 1}
//                           active={idx + 1 === currentPage}
//                           onClick={() => handlePageChange(idx + 1)}
//                         >
//                           {idx + 1}
//                         </Pagination.Item>
//                       ))}
//                     </Pagination>
//                   )}
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default UserProfile;
// =========================================================================================================after
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Pagination,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookedTrips, setBookedTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSection, setCurrentSection] = useState("profile");
  const tripsPerPage = 1;
  const navigate = useNavigate();

  // Fetch user data and booked trips from Django API
  useEffect(() => {
    const access_token = sessionStorage.getItem("access");

    if (!access_token) {
      navigate("/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن هناك توكن
      return;
    }

    axios
      .get("http://127.0.0.1:8000/register/user/", {
        headers: {
          Authorization: `Bearer ${access_token}`, // JWT Token
        },
      })
      .then((response) => {
        const { name, email, profilePic, bookedTrips } = response.data;
        setName(name);
        setEmail(email);
        setProfilePic(profilePic);
        setBookedTrips(bookedTrips);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, [navigate]);
  // باقي الكود الخاص بـ UserProfile كما هو...
  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/register/user/", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access")}`, // JWT Token
  //       },
  //     })
  //     .then((response) => {
  //       const { name, email, profilePic, bookedTrips } = response.data;
  //       setName(name);
  //       setEmail(email);
  //       setProfilePic(profilePic);
  //       setBookedTrips(bookedTrips);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user profile:", error);
  //     });
  // }, []);

  // Filter trips based on the selected section (Pending, Rejected, Accepted)
  useEffect(() => {
    if (currentSection === "pending-trips") {
      setFilteredTrips(
        bookedTrips.filter((trip) => trip.status === "Pending" || !trip.status)
      );
    } else if (currentSection === "rejected-trips") {
      setFilteredTrips(
        bookedTrips.filter((trip) => trip.status === "Rejected")
      );
    } else if (currentSection === "accepted-trips") {
      setFilteredTrips(
        bookedTrips.filter((trip) => trip.status === "Accepted")
      );
    } else {
      setFilteredTrips(bookedTrips);
    }
  }, [currentSection, bookedTrips]);

  // Handle pagination for trips
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips =
    filteredTrips && filteredTrips.length > 0
      ? filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip)
      : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setProfilePic(imageUrl);

        axios
          .put(
            "http://localhost:8000/register/user/",
            { profilePic: imageUrl },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then(() => {
            alert("Profile picture updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating profile picture:", error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle account edit navigation
  const handleEditAccount = () => {
    navigate("/client", {
      state: { name, email, profilePic, isEditMode: true },
    });
  };

  // Handle navigation between profile and trip sections
  const handleNavClick = (section) => {
    setCurrentSection(section);
  };

  return (
    <Container
      className="my-5"
      style={{ backgroundColor: "#f8f9fa", minHeight: "80vh" }}
    >
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Nav className="flex-column">
                <Nav.Link
                  onClick={() => setCurrentSection("profile")}
                  style={{
                    color: currentSection === "profile" ? "#007bff" : "#333",
                  }}
                >
                  My Profile
                </Nav.Link>
                <Nav.Link
                  onClick={() => setCurrentSection("pending-trips")}
                  style={{
                    color:
                      currentSection === "pending-trips" ? "#007bff" : "#333",
                  }}
                >
                  Pending Trips
                </Nav.Link>
                <Nav.Link
                  onClick={() => setCurrentSection("rejected-trips")}
                  style={{
                    color:
                      currentSection === "rejected-trips" ? "#007bff" : "#333",
                  }}
                >
                  Rejected Trips
                </Nav.Link>
                <Nav.Link
                  onClick={() => setCurrentSection("accepted-trips")}
                  style={{
                    color:
                      currentSection === "accepted-trips" ? "#007bff" : "#333",
                  }}
                >
                  Accepted Trips
                </Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              {currentSection === "profile" ? (
                <div>
                  <Row className="align-items-center">
                    <Col md={4} className="d-flex justify-content-center">
                      <Card.Img
                        variant="top"
                        src={profilePic || "https://via.placeholder.com/150"}
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          marginRight: "20px",
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <Card.Title>Welcome: {name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Your Email: {email}
                      </Card.Subtitle>
                      <Form>
                        <Form.Group controlId="formFile">
                          <Form.Control
                            type="file"
                            style={{ marginTop: "5vh" }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const imageUrl = reader.result;
                                  setProfilePic(imageUrl);
                                  axios
                                    .put(
                                      "http://localhost:8000/register/user/",
                                      { profilePic: imageUrl },
                                      {
                                        headers: {
                                          Authorization: `Bearer ${localStorage.getItem(
                                            "access"
                                          )}`,
                                        },
                                      }
                                    )
                                    .then(() => {
                                      alert(
                                        "Profile picture updated successfully!"
                                      );
                                    })
                                    .catch((error) => {
                                      console.error(
                                        "Error updating profile picture:",
                                        error
                                      );
                                    });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate("/client", {
                              state: { name, email },
                            })
                          }
                          style={{ marginTop: "3vh" }}
                        >
                          Edit My Profile
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </div>
              ) : (
                // Here you can add different sections (pending-trips, rejected-trips, accepted-trips)
                // based on the value of currentSection
                <div>
                  {/* Add the corresponding JSX for pending-trips, rejected-trips, accepted-trips */}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
