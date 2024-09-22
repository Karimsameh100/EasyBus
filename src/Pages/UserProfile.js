import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Nav } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSection, setCurrentSection] = useState("profile");
  const [selectedFile, setSelectedFile] = useState(null);
  const tripsPerPage = 1;
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const access_token = localStorage.getItem("authToken");
    if (!access_token) {
      navigate("/Login1");
      return;
    }

    try {
      const decodedToken = jwtDecode(access_token);
      const userId = decodedToken.user_id;

      axios
        .get(`http://127.0.0.1:8000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          const { name, email, phone_number, image } = response.data;
          setName(name);
          setEmail(email);
          setPhoneNumber(phone_number);
          setProfilePic(image);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const access_token = localStorage.getItem("authToken");
    if (!access_token) {
      navigate("/Login1");
      return;
    }

    try {
      const decodedToken = jwtDecode(access_token);
      const userId = decodedToken.user_id;
      setUserId(userId);

      axios
        .get(`http://127.0.0.1:8000/booking/data/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          const userBookings = response.data.filter(
            (booking) => booking.user === userId && booking.status === "Pending"
          );
          setFilteredTrips(userBookings);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleProfilePictureChange = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const access_token = localStorage.getItem("authToken");
      const decodedToken = jwtDecode(access_token);
      const userId = decodedToken.user_id;

      axios
        .put(`http://localhost:8000/register/user/${userId}/`, formData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setProfilePic(response.data.image);
          setSelectedFile(null);
          alert("Profile picture updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating profile picture:", error);
        });
    } else {
      alert("No file selected!");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredTrips.length / tripsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // تحديد الرحلة الحالية بناءً على الصفحة الحالية
  const currentTripIndex = (currentPage - 1) * tripsPerPage;
  const currentTrip = filteredTrips[currentTripIndex];

  return (
    <Container
      className="my-5"
      style={{ backgroundColor: "#f8f9fa", minHeight: "75vh" }}
    >
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Nav
                className="flex-column"
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <Nav.Link
                  onClick={() => setCurrentSection("profile")}
                  style={{
                    color: currentSection === "profile" ? "#007bff" : "#333",
                    backgroundColor:
                      currentSection === "profile" ? "#d9d9d9" : "transparent",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d9d9d9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  My Profile
                </Nav.Link>
                <Nav.Link
                  onClick={() => setCurrentSection("pending-trips")}
                  style={{
                    color:
                      currentSection === "pending-trips" ? "#007bff" : "#333",
                    backgroundColor:
                      currentSection === "pending-trips"
                        ? "#d9d9d9"
                        : "transparent",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d9d9d9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Pending Trips
                </Nav.Link>
                <Nav.Link
                  onClick={() => setCurrentSection("rejected-trips")}
                  style={{
                    color:
                      currentSection === "rejected-trips" ? "#007bff" : "#333",
                    backgroundColor:
                      currentSection === "rejected-trips"
                        ? "#d9d9d9"
                        : "transparent",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d9d9d9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Rejected Trips
                </Nav.Link>
                <Nav.Link
                  onClick={() => setCurrentSection("accepted-trips")}
                  style={{
                    color:
                      currentSection === "accepted-trips" ? "#007bff" : "#333",
                    backgroundColor:
                      currentSection === "accepted-trips"
                        ? "#d9d9d9"
                        : "transparent",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d9d9d9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
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
                      <Card.Title>
                        <h3>Welcome: {name}</h3>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Your Email: {email}
                      </Card.Subtitle>
                      <Form>
                        <Form.Group controlId="formFile">
                          <Form.Control
                            type="file"
                            style={{ marginTop: "5vh" }}
                            onChange={handleImageUpload}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          onClick={handleProfilePictureChange}
                          style={{ marginTop: "3vh" }}
                          disabled={!selectedFile}
                        >
                          Change Profile Picture
                        </Button>
                        <Button variant="primary" style={{ marginTop: "3vh" }}>
                          Edit My Profile
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </div>
              ) : currentSection === "pending-trips" ? (
                <div>
                  <h3 style={{ color: "red" }}>Pending Trips</h3>
                  {currentTrip ? (
                    <Card
                      key={currentTrip.id}
                      className="mb-3"
                      style={{
                        border: "1px solid #003366", // لون الإطار كحلي
                        borderRadius: "10px",
                        padding: "20px",
                      }}
                    >
                      <Card.Body>
                        <Card.Title
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            color: "#007bff",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>Trip Number:</span>
                            <span>{currentTrip.id}</span>
                          </div>
                        </Card.Title>
                        <Card.Text style={{ fontSize: "1.1rem" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <strong>Pickup Location:</strong>
                            <span>{currentTrip.pickupLocation}</span>
                          </div>
                        </Card.Text>
                        <Card.Text style={{ fontSize: "1.1rem" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <strong>Drop Location:</strong>
                            <span>{currentTrip.dropLocation}</span>
                          </div>
                        </Card.Text>
                        <Card.Text style={{ fontSize: "1.1rem" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <strong>Date:</strong>
                            <span>{currentTrip.date}</span>
                          </div>
                        </Card.Text>
                        <Card.Text style={{ fontSize: "1.1rem" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <strong>Time:</strong>
                            <span>{currentTrip.time}</span>
                          </div>
                        </Card.Text>
                        <Card.Text style={{ fontSize: "1.1rem" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <strong>Number of Places:</strong>
                            <span>{currentTrip.numberOfPlaces}</span>
                          </div>
                        </Card.Text>
                        <Card.Text
                          style={{ fontSize: "1.1rem", color: "#28a745" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <strong>Total Fare:</strong>
                            <span>{currentTrip.totalFare} EGP</span>
                          </div>
                        </Card.Text>
                        <Card.Text
                          style={{
                            fontSize: "1.1rem",
                            color:
                              currentTrip.status === "Confirmed"
                                ? "#28a745"
                                : "#dc3545",
                          }}
                        >
                          {/* <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <strong>Status:</strong>
                            <span>{currentTrip.status}</span>
                          </div> */}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ) : (
                    <p>No pending trips found.</p>
                  )}
                  <div className="d-flex justify-content-between">
                    <Button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      style={{
                        backgroundColor: "#003366",
                        borderColor: "#003366",
                      }} // لون الزر كحلي
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNextPage}
                      disabled={
                        currentPage >=
                        Math.ceil(filteredTrips.length / tripsPerPage)
                      }
                      style={{
                        backgroundColor: "#003366",
                        borderColor: "#003366",
                        color: "white",
                      }} // لون الزر كحلي
                    >
                      Next
                    </Button>
                  </div>
                </div>
              ) : (
                <div>{/* يمكنك إضافة أقسام أخرى هنا */}</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
