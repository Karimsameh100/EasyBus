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
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookedTrips, setBookedTrips] = useState([]); // state for trips
  const [filteredTrips, setFilteredTrips] = useState([]); // state for filtered trips based on status
  const [currentPage, setCurrentPage] = useState(1); // current page for pagination
  const [currentSection, setCurrentSection] = useState("profile"); // state to control current section
  const tripsPerPage = 1; // Number of trips per page
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedProfilePic = localStorage.getItem("userProfilePic");
    const storedTrips = JSON.parse(localStorage.getItem("bookedTrips")) || [];

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedProfilePic) setProfilePic(storedProfilePic);

    // Filter trips based on the logged-in user
    const userTrips = storedTrips.filter(
      (trip) => trip.userName === storedName
    );
    setBookedTrips(userTrips);
  }, []);

  useEffect(() => {
    // Filter trips based on the current section (pending, rejected, accepted)
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
      setFilteredTrips(bookedTrips); // For profile, show all trips
    }
  }, [currentSection, bookedTrips]);

  // Calculate the index range for the current page
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const imageUrl = reader.result;
  //       setProfilePic(imageUrl);
  //       localStorage.setItem("userProfilePic", imageUrl);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setProfilePic(imageUrl);
        localStorage.setItem("userProfilePic", imageUrl);

        // Dispatch a custom event to notify other components
        window.dispatchEvent(new Event("profilePicUpdated"));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditAccount = () => {
    navigate("/client", {
      state: { name, email, profilePic, isEditMode: true },
    });
  };

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
                <Nav.Link onClick={() => handleNavClick("profile")}>
                  My Profile
                </Nav.Link>
                <Nav.Link onClick={() => handleNavClick("pending-trips")}>
                  Pending Trips
                </Nav.Link>
                <Nav.Link onClick={() => handleNavClick("rejected-trips")}>
                  Rejected Trips
                </Nav.Link>
                <Nav.Link onClick={() => handleNavClick("accepted-trips")}>
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
                          marginRight: "20px", // Ensure space between the image and text
                        }}
                      />
                    </Col>
                    <Col md={6}>
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
                        <Button
                          variant="primary"
                          onClick={handleEditAccount}
                          style={{ marginTop: "5vh" }}
                        >
                          Edit Account
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div style={{ marginTop: "5vh" }}>
                  <h5>
                    {currentSection === "pending-trips"
                      ? "Pending Trips"
                      : currentSection === "rejected-trips"
                      ? "Rejected Trips"
                      : "Accepted Trips"}
                    :
                  </h5>
                  {currentTrips.length > 0 ? (
                    currentTrips.map((trip, index) => (
                      <Card key={index} className="mt-4">
                        <Card.Header className="d-flex justify-content-between">
                          <div>
                            <h4 className="text-end">{trip.company}</h4>
                            <strong>Trip Date:</strong> {trip.tripDate}
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <ul className="list-unstyled">
                            <li className="d-flex justify-content-between">
                              <strong>Departure Station:</strong>
                              <span>{trip.departureStation}</span>
                            </li>
                            <li className="d-flex justify-content-between">
                              <strong>Stop Stations:</strong>
                              <span>{trip.stopStations}</span>
                            </li>
                            <li className="d-flex justify-content-between">
                              <strong>Departure Time:</strong>
                              <span>{trip.departureTime}</span>
                            </li>
                            <li className="d-flex justify-content-between">
                              <strong>Arrival Time:</strong>
                              <span>{trip.arrivedTime}</span>
                            </li>
                            <li className="d-flex justify-content-between">
                              <strong>Number of Places:</strong>
                              <span>{trip.numPlaces}</span>
                            </li>
                            <li className="d-flex justify-content-between">
                              <strong>Total Cost:</strong>
                              <span>{trip.totalCost}</span>
                            </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <Alert variant="info">
                      You have no trips in this section.
                    </Alert>
                  )}
                  {/* Pagination */}
                  {filteredTrips.length > tripsPerPage && (
                    <Pagination className="justify-content-center mt-4">
                      {Array.from({
                        length: Math.ceil(filteredTrips.length / tripsPerPage),
                      }).map((_, idx) => (
                        <Pagination.Item
                          key={idx + 1}
                          active={idx + 1 === currentPage}
                          onClick={() => handlePageChange(idx + 1)}
                        >
                          {idx + 1}
                        </Pagination.Item>
                      ))}
                    </Pagination>
                  )}
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
