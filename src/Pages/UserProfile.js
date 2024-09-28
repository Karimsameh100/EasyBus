import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Nav } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { Button } from 'react-bootstrap';  // Assuming you're using react-bootstrap
import { FaUserEdit } from "react-icons/fa";
import emailjs from '@emailjs/browser';

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [acceptedTrips, setAcceptedTrips] = useState([]);
  const [rejectedTrips, setRejectedTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSection, setCurrentSection] = useState("profile");
  const [selectedFile, setSelectedFile] = useState(null);
  const tripsPerPage = 1;
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [paypalAmount, setPaypalAmount] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState(false);
  const [agreeToPayDeposit, setAgreeToPayDeposit] = useState(false);
  const [paymentExists , setPaymentExist] = useState();



  useEffect(() => {
    const access_token = localStorage.getItem("authToken");
    if (!access_token) {
      navigate("/Login1");
      return;
    }

    try {
      const decodedToken = jwtDecode(access_token);
      const userId = decodedToken.user_id;
      console.log(decodedToken);

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
          const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
          setProfilePic(image ? `${backendUrl}${image}` : "https://via.placeholder.com/150");
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/login");
    }
  }, [navigate]);

  // useEffect(() => {
  //   const access_token = localStorage.getItem("authToken");
  //   if (!access_token) {
  //     navigate("/Login1");
  //     return;
  //   }

  //   try {
  //     const decodedToken = jwtDecode(access_token);
  //     const userId = decodedToken.user_id;
  //     setUserId(userId);

  //     axios
  //       .get(`http://127.0.0.1:8000/booking/data/`, {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       })
  //       .then((response) => {
  //         const userBookings = response.data.filter(
  //           (booking) => booking.user === userId
  //         );
  //         setFilteredTrips(
  //           userBookings.filter((booking) => booking.status === "Pending")
  //         );
  //         setAcceptedTrips(
  //           userBookings.filter((booking) => booking.status === "Accepted")
  //         );
  //         setRejectedTrips(
  //           userBookings.filter((booking) => booking.status === "Rejected")
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching bookings:", error);
  //       });
  //   } catch (error) {
  //     console.error("Invalid token:", error);
  //     navigate("/login");
  //   }
  // }, [navigate]);

  useEffect(() => {
    const access_token = localStorage.getItem("authToken");
    if (!access_token) {
      navigate("/Login1");
      return;
    }
  
    async function fetchBookings() {
      try {
        const decodedToken = jwtDecode(access_token);
        const userId = decodedToken.user_id;
        setUserId(userId);
  
        const response = await axios.get(`http://127.0.0.1:8000/booking/data/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
  
        if (response.data && Array.isArray(response.data)) {
          // const userBookings = response.data.filter((booking) => booking.user === userId);

          let userBookings;
if (Array.isArray(response.data)) {
  userBookings = response.data.filter((booking) => booking.user === userId);
} else {
  userBookings = [];
  // or some other default value
}
  
          if (userBookings.length > 0) {
            setFilteredTrips(
              userBookings.filter((booking) => booking.status === "Pending")
            );
            setAcceptedTrips(
              userBookings.filter((booking) => booking.status === "Accepted")
            );
            setRejectedTrips(
              userBookings.filter((booking) => booking.status === "Rejected")
            );
          } else {
            setFilteredTrips([]);
            setAcceptedTrips([]);
            setRejectedTrips([]);
          }
        } else {
          setFilteredTrips([]);
          setAcceptedTrips([]);
          setRejectedTrips([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        navigate("/login");
      }
    }
  
    fetchBookings();
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      setSelectedFile(file);
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
        .patch(`http://localhost:8000/user/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

          const updatedImageUrl = `${backendUrl}${response.data.image}?${new Date().getTime()}`;
          console.log("Updated Image URL:", updatedImageUrl); 
          setProfilePic(updatedImageUrl);
          alert("Profile picture updated successfully!");
          setSelectedFile(null);
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

  const currentTripIndex = (currentPage - 1) * tripsPerPage;
  const currentTrip = filteredTrips[currentTripIndex];

  // Pagination for accepted and rejected trips
  const [acceptedPage, setAcceptedPage] = useState(1);
  const [rejectedPage, setRejectedPage] = useState(1);

  const handleNextAcceptedPage = () => {
    if (acceptedPage < Math.ceil(acceptedTrips.length / tripsPerPage)) {
      setAcceptedPage(acceptedPage + 1);
    }
  };

  const handlePrevAcceptedPage = () => {
    if (acceptedPage > 1) {
      setAcceptedPage(acceptedPage - 1);
    }
  };

  const handleNextRejectedPage = () => {
    if (rejectedPage < Math.ceil(rejectedTrips.length / tripsPerPage)) {
      setRejectedPage(rejectedPage + 1);
    }
  };

  const handlePrevRejectedPage = () => {
    if (rejectedPage > 1) {
      setRejectedPage(rejectedPage - 1);
    }
  };

  // const currentAcceptedTrip = acceptedTrips[(acceptedPage - 1) * tripsPerPage];
  const currentRejectedTrip = rejectedTrips[(rejectedPage - 1) * tripsPerPage];
  const currentAcceptedTripIndex = currentPage-1;
  const currentAcceptedTrip = acceptedTrips[currentAcceptedTripIndex];


  const handleEditAccount = () => {
    navigate("/client", {
      state: { name, email, profilePic, isEditMode: true },
    });
  };
  //Payment part----------------------------------------------------------------------

  const handleOnlinePaymentMethodChange = (e) => {
    setOnlinePaymentMethod(e.target.checked);
};

const handleAgreeToPayDepositChange = (e) => {
    setAgreeToPayDeposit(e.target.checked);
};

const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
};

const handlePaypalAmountChange = () => {
    if (paymentMethod === 'payOnline') {
        setPaypalAmount(acceptedTrips[currentPage-1].totalFare.toFixed(2));
    } else if (paymentMethod === 'payCash') {
        setPaypalAmount((acceptedTrips[currentPage-1].totalFare * 0.20).toFixed(2)); // 20% deposit
    }
};

useEffect(() => {
  handlePaypalAmountChange();
}, [paymentMethod]);

 const handelPayment = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No authentication token found');
    return;
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  axios.get('http://127.0.0.1:8000/currant-user/', { headers })
    .then((response) => {
      const userId = response.data.user_id;
      setUserId(userId)
      const paymentData = {
          date: new Date(),
          amount: paypalAmount,
          payment_method: paymentMethod,
          booking_id: acceptedTrips[currentPage-1].id,
          trip_id: acceptedTrips[currentPage-1].trip,
          user: acceptedTrips[currentPage-1].user,
          trip: acceptedTrips[currentPage-1].trip,
          booking: acceptedTrips[currentPage-1].id,
        }
    
      // setPaymentData(paymentData)
      // console.log(paymentData);

      axios.post('http://127.0.0.1:8000/payments/', paymentData, { headers })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
}

useEffect(() => {
  const access_token = localStorage.getItem("authToken");
  if (!access_token) {
    navigate("/Login1");
    return;
  }

  axios
    .get(`http://127.0.0.1:8000/payments/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => {
      const paymentData = response.data;
      const bookingId = acceptedTrips[currentPage-1].id;
      console.log("payment check,",bookingId)
      const paymentExists = paymentData.some((payment) => payment.booking === bookingId);
      if (paymentExists) {
        // Hide the payment section
        setPaymentMethod('');
        setOnlinePaymentMethod(false);
        setAgreeToPayDeposit(false);
        setPaymentExist(paymentExists)
      }else{
        setPaymentExist('')
      }
    })
    .catch((error) => {
      console.error("Error fetching payments:", error);
    });
}, [acceptedTrips, currentPage]);


const sendConfirmationEmailToUser = () => {
  const userEmail = {email}; // Replace with the user's email address
  const subject = 'Booking Confirmation';
  const body = `
    <h2>Booking Confirmation</h2>
    <p>Dear [${name}],</p>
    <p>Your booking has been successfully confirmed.</p>
    <p>Thank you for choosing our service.</p>
  `;

  // Use EmailJS to send the email
  const serviceId = 'service_3x8z6pg';
  const templateId = 'template_ffjhh0u';
  const userId = 'ASgw3vW2KFAus4erR';
  const templateParams = {
    to_name: name,
    to_email: email,
    subject,
    body,
  };

  emailjs.send(
    serviceId,
    templateId,
    templateParams,
    userId
  ).then(
    (response) => {
      console.log('Email sent: ' + response.status);
    },
    (err) => {
      console.error('Error sending email: ' + err);
    }
  );
};

const [paypalLoaded, setPaypalLoaded] = useState(false);

    useEffect(() => {
        const loadPayPalScript = async () => {
            try {
                const paypalScript = await import('@paypal/react-paypal-js');
                setPaypalLoaded(true);
            } catch (error) {
                console.error('Error loading PayPal script:', error);
            }
        };
        loadPayPalScript();
    }, []);

    if (!paypalLoaded) {
        return <div className='text-center fs-4 text-bg-primary'>Loading PayPal...</div>;
    }

    console.log(acceptedTrips)
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

                        <Button
                          variant="primary"
                          onClick={handleEditAccount}
                          style={{ marginTop: "3vh" }}
                        >
                          <FaUserEdit style={{ marginRight: "8px" }} />
                          Edit My Profile
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </div>
              ) : currentSection === "pending-trips" ? (
                <div>
                  <h3 style={{ color: "#003366" }}>Pending Trips</h3>
                  {currentTrip ? (
                    <Card
                      key={currentTrip.id}
                      className="mb-3"
                      style={{
                        border: "1px solid #003366",
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
                            <span>{currentTrip.trip}</span>
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
                      }}
                    >
                      <FaChevronLeft />
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
                      }}
                    >
                      <FaChevronRight /> {}
                    </Button>
                  </div>
                </div>
              ) : currentSection === "rejected-trips" ? (
                <div>
                  <h3 style={{ color: "red" }}>Rejected Trips</h3>
                  {currentRejectedTrip ? (
                    <Card
                      key={currentRejectedTrip.id}
                      className="mb-3"
                      style={{
                        border: "1px solid #dc3545",
                        borderRadius: "10px",
                        padding: "20px",
                      }}
                    >
                      <Card.Body>
                        <Card.Title
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            color: "#dc3545",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>Trip Number:</span>
                            <span>{currentRejectedTrip.trip}</span>
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
                      }}
                    >
                      <FaChevronLeft />
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
                      }}
                    >
                      <FaChevronRight /> {}
                    </Button>
                  </div>
                </div>
              ) : currentSection === "accepted-trips" ? (
                <div>
                  <h3 style={{ color: "green" }}>Accepted Trips</h3>
                  {currentAcceptedTrip ? (
                    <Card
                      key={currentAcceptedTrip.id}
                      className="mb-3"
                      style={{
                        border: "1px solid #28a745",
                        borderRadius: "10px",
                        padding: "20px",
                      }}
                    >
                      <Card.Body>
                        <Card.Title
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            color: "#28a745",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>Trip Number:</span>
                            <span>{currentAcceptedTrip.filteredTrips}</span>
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
                            <span>{currentAcceptedTrip.pickupLocation}</span>
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
                            <span>{currentAcceptedTrip.dropLocation}</span>
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
                            <span>{currentAcceptedTrip.date}</span>
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
                            <span>{currentAcceptedTrip.time}</span>
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
                            <span>{currentAcceptedTrip.numberOfPlaces}</span>
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
                            <span>{currentAcceptedTrip.totalFare} EGP</span>
                          </div>
                          <hr className="fw-bold"/>
                        </Card.Text>
                        {paymentExists && (
                          <div className="alert alert-success" role="alert">
                            <h4 className="alert-heading">Booking Confrmation</h4>
                            <p className="fs-5">your booking confirmed successfully getrady for your trip, nice trip</p>
                          </div>
                        )}
                        {!paymentExists && (
                          <div>
                            <div className="alert alert-warning" role="alert">
                          <h4 className="alert-heading">Booking Confrmation</h4>
                          <p className="fs-5">you need to confirm your booking by containue payment process to be on trip board !!</p>
                          </div>
                        <Form> 
                        <Form.Group controlId="paymentMethod" className="text-center">
                                    <Form.Label className='fs-5 fw-semibold'>Payment Method:</Form.Label>
                                    <div className="d-flex justify-content-between">
                                        <div className='d-flex flex-column justify-content-center w-50'>
                                            <div className="px-auto py-2 ">
                                                <Form.Check type="radio" className='border-primary' name="paymentMethod" id="payOnline" value="payOnline" onChange={(e) => {
                                                    handlePaymentMethodChange(e);
                                                    handlePaypalAmountChange(e);
                                                }} />
                                            </div>
                                            <div className='px-auto py-3'>
                                                <b className='fs-5'>Pay Online</b>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-column justify-content-center w-50 border-2'>
                                            <div className='px-auto py-2'>
                                                <Form.Check type="radio" name="paymentMethod" id="payCash" value="payCash" onChange={(e) => {
                                                    handlePaymentMethodChange(e);
                                                    handlePaypalAmountChange(e);
                                                }} />
                                            </div>
                                            <div className='px-auto py-3'>
                                                <b className='fs-5'>Pay Cash</b>
                                            </div>
                                        </div>
                                    </div>
                                </Form.Group>
                                {paymentMethod === 'payOnline' && (
                                    <div className=" p-3">
                                        <h5 className="">Online Payment Methods:</h5>
                                        <Form.Group controlId='paypal'>
                                            <Form.Check type="checkbox" label="PayPal" id="paypal" onChange={handleOnlinePaymentMethodChange} />
                                        </Form.Group>
                                        <p className="fs-5 text-primary">Total that you pay on Paypal is amount: {paypalAmount}</p>


                                    </div>
                                )}

                                {paymentMethod === 'payCash' && (
                                    <div className=" p-3">
                                        <h5 className=" fs-5">Pay Cash:</h5>
                                        <p className="">You need to pay a deposit of 20% of the total cost.</p>
                                        <Form.Group controlId="deposit">
                                            <Form.Check type="checkbox" label="I agree to pay the deposit" id="deposit" onChange={handleAgreeToPayDepositChange} />
                                        </Form.Group>
                                        <p className="fs-5 text-danger">Deposit amount: {paypalAmount}</p>
                                    </div>
                                )}

                                {(paymentMethod && ((paymentMethod === 'payCash' && agreeToPayDeposit !== false) || (paymentMethod === 'payOnline' && onlinePaymentMethod !== false))) && (
                                   <PayPalScriptProvider
                                        src="https://www.paypal.com/sdk/js"
                                        options={{
                                            'client-id': 'ASqEJBR1uVuEmIcx5WxO26SQMcW9DKTNy090VaVbCczbnEvsV2Lz5xSV2oc1dIErzoIy8ldjBUZqY4M5',
                                            currency: "USD",
                                            intent: 'capture',
                                            
                                        }}
                                        deferLoading={false}
                                    >
                                        <PayPalButtons
                                            amount={Math.round(paypalAmount * 100) / 100}
                                            currency="USD"
                                            style={{ layout: 'horizontal' }}
                                            createOrder={(data, actions) => {
                                                try {
                                                    const paymentIntent = actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: Math.round(paypalAmount * 100) / 100,
                                                                },
                                                            },
                                                        ],
                                                    });
                                                    console.log('Payment intent:', paymentIntent);
                                                    return paymentIntent;
                                                } catch (error) {
                                                    console.error('Error creating payment intent:', error);
                                                    // Handle the error
                                                }
                                            }}
                                            onApprove={(data, actions) => {
                                                try {
                                                    const authorization = actions.order.capture({
                                                        paymentIntentId: data.paymentIntentId,
                                                    });
                                                    console.log('Authorization:', authorization);
                                                    return authorization.then((details) => {
                                                         handelPayment();
                                                         sendConfirmationEmailToUser();
                                                    });
                                                } catch (error) {
                                                    console.error('Error capturing payment:', error);
                                                    // Handle the error
                                                }
                                            }}
                                            onError={(error) => {
                                                console.error('Error with PayPal payment:', error);
                                                // Handle the error
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                    
                                )}                       

                        </Form>
                        </div>
                       )}
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
                      }}
                    >
                      <FaChevronLeft />
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
                      }}
                    >
                      <FaChevronRight /> {}
                    </Button>
                  </div>
                </div>
              ) : (
                <div>{}</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
