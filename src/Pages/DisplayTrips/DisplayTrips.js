import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FaEdit } from "react-icons/fa";
import {
  Modal,
  ModalTitle,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Nav,
  Form,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import "./DisplayTrips.css";
// import "./test.css";

import AddTripForm from "../addtrip";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const DisplayTrips = () => {
  const [trips, setTrips] = useState([]);

  const [companyName, setName] = useState("");
  const [companyEmail, setCompanyEmail] = useState(""); // لإضافة البريد الإلكتروني

  const [showProfileEditModal, setShowProfileEditModal] = useState(false); // حالة لإظهار المودال

  const [password, setPassword] = useState(""); // لإضافة كلمة المرور
  // const [showEditModal, setShowEditModal] = useState(false); // حالة لإظهار المودال
  const [activeItem, setActiveItem] = useState("profile"); // حالة لتتبع العنصر النشط
  const [userBookings, setUserBookings] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [view, setView] = useState("trips");
  const [currentBookingsPage, setCurrentBookingsPage] = useState(1);
  const bookingsPerPage = 4;
  const totalBookingsPages = Math.ceil(userBookings.length / bookingsPerPage);
  const bookingsStartIndex = (currentBookingsPage - 1) * bookingsPerPage;
  const bookingsEndIndex = bookingsStartIndex + bookingsPerPage;
  const currentBookingsPageItems = userBookings.slice(
    bookingsStartIndex,
    bookingsEndIndex
  );
  const params = useParams();
  const [editTrip, setEditTrip] = useState(null);
  const [addValidationErrors, setAddValidationErrors] = useState({});
  const [editValidationErrors, setEditValidationErrors] = useState({});
  const [userNames, setUserNames] = useState({});
  const [disabledButtons, setDisabledButtons] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [actionType, setActionType] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [newTrip, setNewTrip] = useState({
    tripNumber: "",
    date: "",
    avilabalPlaces: "",
    departuerStation: "",
    destinationStation: "",
    departuerTime: "",
    destinationTime: "",
    price: "",
    bus: "",
  });
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const handleNewTripChange = (event) => {
    setNewTrip({
      ...newTrip,
      [event.target.name]: event.target.value,
    });
  };

  // Decode token to get company info
  console.log(decodedToken);
  const companyId = decodedToken.user_id;

  useEffect(() => {
    if (!token) {
      console.warn("No token found");
      return;
    }

    axios
      .get(
        `http://127.0.0.1:8000/mixinuser_pk/${companyId}?user_type=company`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { name, email, password, company_trips } = res.data;
        setName(name);
        setCompanyEmail(email);

        setPassword(password); // تعيين كلمة المرور
        setTrips(company_trips);

        // Extract the trip IDs associated with the company
        const tripIds = company_trips.map((trip) => trip.id);
        axios
          .get("http://127.0.0.1:8000/booking/data/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((bookingRes) => {
            const allBookings = bookingRes.data;

            // Filter bookings for trips that belong to the logged-in company
            const filteredBookings = allBookings.filter((booking) =>
              tripIds.includes(booking.trip)
            );
            setUserBookings(filteredBookings);

            const userNameMap = {};

            // For each booking, fetch the user name based on user ID
            const userFetchPromises = filteredBookings.map((booking) => {
              return fetchUserName(booking.user).then((userName) => {
                userNameMap[booking.user] = userName; // Store in mapping
              });
            });

            Promise.all(userFetchPromises).then(() => {
              setUserNames(userNameMap);
            });
          })
          .catch((err) => console.error("Error fetching bookings:", err));
      })
      .catch((err) => console.error("Error fetching trips:", err));
  }, [params.id, setEditTrip]);

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/mixinuser_pk/${userId}?user_type=user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.name; // Return the user name
    } catch (err) {
      console.error("Error fetching user name:", err);
      return "";
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
    setConfirmationMessage("");
  };
  // handle accept/reject status
  const handleBookingStatus = (bookingId, status, userName) => {
    axios
      .patch(
        `http://127.0.0.1:8000/booking/${bookingId}/update-status/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Update the UI with the new status
        setUserBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: response.data.status }
              : booking
          )
        );
        if (status === "Rejected") {
          // Show confirmation message when rejected
          setConfirmationMessage(
            `Rejection Email Successfully sent to: ${userName}`
          );
        } else if (status === "Accepted") {
          setConfirmationMessage(
            `Confirmation Email Successfully sent to: ${userName}`
          );
        }
        setShowConfirmationModal(true);
      })
      .catch((error) => {
        console.error("Error updating booking status:", error);
      });
  };
  const getTripNumber = (tripId) => {
    const trip = trips.find((t) => t.id === tripId);
    return trip ? trip.tripNumber : "N/A"; // Fallback in case the trip is not found
  };

  // Pagination logic
  const totalPages = Math.ceil(trips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = trips.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm(formData, true); // Validate the form data
    if (Object.keys(errors).length === 0) {
      const updatedFormData = {
        ...formData,
        company: companyId,
      };

      console.log("Form submitted with data:", updatedFormData);
      axios
        .put(
          `http://127.0.0.1:8000/selected/trip/${formData.id}`,
          updatedFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("Updated trip data:", res.data);
          setTrips((prevTrips) =>
            prevTrips.map((trip) =>
              trip.id === formData.id ? { ...trip, ...res.data } : trip
            )
          );
          setShowEditModal(false);
          setFormData({});
          setEditValidationErrors({});
        })
        .catch((err) => console.error("Error updating trip:", err));
    } else {
      setEditValidationErrors(errors);
    }
  };

  const handleBookingsPageChange = (pageNumber) => {
    setCurrentBookingsPage(pageNumber);
  };

  const handleBookingsNext = () => {
    if (currentBookingsPage < totalBookingsPages) {
      setCurrentBookingsPage((prev) => prev + 1);
    }
  };

  const handleBookingsPrevious = () => {
    if (currentBookingsPage > 1) {
      setCurrentBookingsPage((prev) => prev - 1);
    }
  };

  const handleEditClick = (trip) => {
    setFormData({
      tripNumber: trip.tripNumber,
      date: trip.date,
      avilabalPlaces: trip.avilabalPlaces,
      departuerStation: trip.departuerStation,
      destinationStation: trip.destinationStation,
      departuerTime: trip.departuerTime,
      destinationTime: trip.destinationTime,
      price: trip.price,
      status: trip.status,
      bus: trip.bus,
      id: trip.id,
    });
    setShowEditModal(true);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteClick = (trip) => {
    setSelectedTrip(trip);
    setShowDeleteModal(true);
  };

  const validateForm = (tripData, isEditing = false) => {
    const errors = {};
    const today = new Date().toISOString().split("T")[0];

    const {
      tripNumber,
      date: tripDate,
      avilabalPlaces,
      departuerStation,
      destinationStation,
      departuerTime,
      destinationTime,
      price,
      bus,
    } = tripData;

    if (!isEditing) {
      if (!tripNumber || isNaN(tripNumber) || tripNumber <= 0) {
        errors.tripNumber = "Trip number must be a positive number.";
      } else if (trips.some((trip) => trip.tripNumber === tripNumber)) {
        errors.tripNumber = "Trip number already exists.";
      }
    }
    if (!tripDate) {
      errors.date = "Trip date is required.";
    } else if (tripDate < today) {
      errors.date = "Trip date cannot be in the past.";
    }

    if (!avilabalPlaces || isNaN(avilabalPlaces) || avilabalPlaces <= 0) {
      errors.avilabalPlaces = "Available places must be a positive number.";
    }

    if (
      !departuerStation ||
      typeof departuerStation !== "string" ||
      departuerStation.trim() === "" ||
      /\d/.test(departuerStation) ||
      departuerStation.split(" ").some((word) => word.length < 3)
    ) {
      errors.departuerStation =
        "Departure station must be a non-empty string with each word having more than 3 characters and no numbers.";
    }
    if (
      !destinationStation ||
      typeof destinationStation !== "string" ||
      destinationStation.trim() === ""
    ) {
      errors.destinationStation = "Destination station is required.";
    }

    if (!departuerTime) {
      errors.departuerTime = "Departure time is required.";
    }

    if (!destinationTime) {
      errors.destinationTime = "Arrival time is required.";
    } else if (
      destinationTime &&
      departuerTime &&
      destinationTime <= departuerTime
    ) {
      errors.destinationTime = "Arrival time must be after departure time.";
    }

    if (!price || isNaN(price) || price <= 0) {
      errors.price = "Price must be a positive number.";
    }

    if (!bus || isNaN(bus) || bus <= 0) {
      errors.bus = "Bus must be a valid number.";
    }

    return errors;
  };

  const handleAddTrip = (event) => {
    event.preventDefault();
    console.log("Adding trip with data:", newTrip);

    const errors = validateForm(newTrip);
    setAddValidationErrors(errors);
    console.log("Validation Errors:", errors);
    if (Object.keys(errors).length === 0) {
      const tripData = {
        ...newTrip,
        company: companyId,
      };

      axios
        .post("http://localhost:8000/all/trips/", tripData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Trip added:", res.data);
          setTrips((prevTrips) => [...prevTrips, res.data]);
          setNewTrip({
            tripNumber: "",
            date: "",
            avilabalPlaces: "",
            departuerStation: "",
            destinationStation: "",
            departuerTime: "",
            destinationTime: "",
            price: "",
            bus: "",
          });
          setAddValidationErrors({});
          setShowAddModal(false);
        })
        .catch((err) => {
          console.error(
            "Error adding trip:",
            err.response ? err.response.data : err.message
          );
          if (err.response && err.response.data) {
            // Check if there are backend validatio n errors
            const backendErrors = err.response.data;
            const validationErrors = {};

            // Map backend errors to validationErrors state
            if (backendErrors.tripNumber) {
              validationErrors.tripNumber = backendErrors.tripNumber.join(", ");
            }
            setAddValidationErrors(validationErrors);
          }
        });
    } else {
      setAddValidationErrors(errors);
    }
  };

  const confirmDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/selected/trip/${selectedTrip.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setTrips((prevTrips) =>
          prevTrips.filter((trip) => trip.id !== selectedTrip.id)
        );
        setShowDeleteModal(false);
      })
      .catch((err) => console.error("Error deleting trip:", err));
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  // const handleButtonClick = (view) => {
  //   setActiveButton(view);// };

  const handleSaveChanges = () => {
    const companyId = decodedToken.user_id;
    axios
      .put(
        `http://127.0.0.1:8000/mixinuser_pk/${companyId}/?user_type=company`,
        {
          name: companyName,
          email: companyEmail,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Changes saved:", response.data);
        setShowProfileEditModal(false);
      })
      .catch((error) => console.error("Error saving changes:", error));
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setView(item); // تحديث العرض
  };
  return (
    <div className="container mt-2 table-responsive">
      <div
        className="row main d-flex justify-content-start align-items-start"
        style={{ minHeight: "5vh" }}
      >
        <div className="col-md-3 my-2">
          <Nav
            className="flex-column py-2"
            style={{ border: "1px solid #ccc", borderRadius: "5px" }}
          >
            <Nav.Item>
              <button
                className={`list-group-item list-group-item-action p-2 nav-item-custom ${
                  activeItem === "profile" ? "active" : ""
                }`}
                onClick={() => handleItemClick("profile")}
              >
                Profile
              </button>
            </Nav.Item>
            <Nav.Item>
              <button
                className={`list-group-item list-group-item-action p-2 nav-item-custom ${
                  activeItem === "trips" ? "active" : ""
                }`}
                onClick={() => handleItemClick("trips")}
              >
                List Trips
              </button>
            </Nav.Item>
            <Nav.Item>
              <button
                className={`list-group-item list-group-item-action p-2 nav-item-custom ${
                  activeItem === "bookings" ? "active" : ""
                }`}
                onClick={() => handleItemClick("bookings")}
              >
                List Bookings
              </button>
            </Nav.Item>
          </Nav>
        </div>
      </div>
      {/* // ----------------------------------------------------------------- */}
      <div className="container mt-2 table-responsive ">
        <div
          className="row main d-flex justify-content-center align-items-center"
          style={{ minHeight: "5vh" }}
        >
          {view === "profile" && (
            <div className="profile-details">
              <Row className="align-items-center">
                <Col md={4} className="d-flex justify-content-center"></Col>
                <Col md={8}>
                  <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Card.Body>
                      <h2
                        style={{
                          color: "#003366",
                          marginBottom: "20px",
                          textAlign: "center",
                        }}
                      >
                        Company Profile
                      </h2>
                      <Card.Text
                        style={{ color: "#003366" }}
                        className="text-center"
                      >
                        <h4>
                          {" "}
                          <strong> Welcome :</strong> {companyName}
                        </h4>
                      </Card.Text>
                      <Card.Text
                        style={{ color: "#003366" }}
                        className="text-center"
                      >
                        <h4>
                          <strong> Your Email:</strong> {companyEmail}
                        </h4>
                      </Card.Text>

                      <Form>
                        <div className="text-center mt-3">
                          <Button
                            variant="primary"
                            onClick={() => setShowProfileEditModal(true)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            <FaEdit style={{ marginRight: "5px" }} /> Edit
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}

          {/* ----------------------------------------------------- */}
          <Modal
            show={showProfileEditModal}
            onHide={() => setShowProfileEditModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Company Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <label>Company Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={companyName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowProfileEditModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {view === "trips" && (
            <>
              {currentPageItems.length ? (
                <div className="table-responsive ">
                  <table className="table table-striped table-bordered w-100">
                    <thead>
                      <tr>
                        <th>Trip Number</th>
                        <th>Trip Date</th>
                        <th>Available Places</th>
                        <th>Departure Station</th>
                        <th>Stop Stations</th>
                        <th>Departure Time</th>
                        <th>Arrived Time</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageItems.map((trip) => (
                        <tr key={trip.id}>
                          <td>{trip.tripNumber}</td>
                          <td>{trip.date}</td>
                          <td>{trip.avilabalPlaces}</td>
                          <td>{trip.departuerStation}</td>
                          <td>{trip.destinationStation}</td>
                          <td>{trip.departuerTime}</td>
                          <td>{trip.destinationTime}</td>
                          <td>{trip.price}</td>
                          <td>{trip.status}</td>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm mx-1"
                              onClick={() => handleEditClick(trip)}
                            >
                              <FaEdit />
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm mx-1"
                              onClick={() => handleDeleteClick(trip)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">No trips available</p>
              )}

              {/* Add Trip Button Section */}
              <div className="text-end mt-3 mb-3">
                <span>Want to add a new trip ? </span>
                {/* <button
                  className="btn "
                  style={{ color: "#003366" }}
                  onClick={() => setShowAddModal(true)}
                >
                  Add Trip
                </button> */}
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseDown={(e) =>
                    (e.target.style.backgroundColor = "#218838")
                  } // لون أغمق عند الضغط
                  onMouseUp={(e) =>
                    (e.target.style.backgroundColor = "#28a745")
                  } // إعادة اللون عند رفع الضغط
                  onClick={() => setShowAddModal(true)}
                >
                  <FaPlus style={{ marginRight: "5px" }} /> Add Trip
                </button>
              </div>

              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button className="page-link" onClick={handlePrevious}>
                      <FaArrowLeft /> {}
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map((pageNumber) => (
                    <li
                      key={pageNumber}
                      className={`page-item ${
                        currentPage === pageNumber + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNumber + 1)}
                      >
                        {pageNumber + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button className="page-link" onClick={handleNext}>
                      <FaArrowRight /> {}
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
          {view === "bookings" && (
            <>
              {currentBookingsPageItems.length ? (
                <div className="table-responsive">
                  <table className="table table-striped table-bordered w-100">
                    <thead>
                      <tr>
                        <th>Trip Number</th>
                        <th>User Name</th>
                        <th>Booking Date</th>
                        <th>Pickup Location</th>
                        <th>Drop Location</th>
                        <th>Seats Booked</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBookingsPageItems.map((booking, index) => (
                        <tr key={index}>
                          <td>{getTripNumber(booking.trip)}</td>
                          <td>{userNames[booking.user]}</td>
                          <td>{booking.date}</td>
                          <td>{booking.pickupLocation}</td>
                          <td>{booking.dropLocation}</td>
                          <td>{booking.numberOfPlaces}</td>
                          <td>{booking.totalFare}</td>
                          <td>{booking.status || "Pending"}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm mx-1  d-inline-flex"
                              onClick={() =>
                                handleBookingStatus(
                                  booking.id,
                                  "Accepted",
                                  userNames[booking.user]
                                )
                              }
                              disabled={
                                booking.status === "Accepted" ||
                                booking.status === "Rejected"
                              }
                            >
                              {/* // Accept  */}
                              <FaCheck />
                            </button>
                            <button
                              className="btn btn-danger btn-sm mx-1  d-inline-flex"
                              disabled={
                                booking.status === "Accepted" ||
                                booking.status === "Rejected"
                              }
                              onClick={() =>
                                handleBookingStatus(
                                  booking.id,
                                  "Rejected",
                                  userNames[booking.user]
                                )
                              }
                            >
                              <FaTimes />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">
                  No bookings found for this company.
                </p>
              )}

              {/* Pagination Controls for Bookings */}
              <nav aria-label="Bookings page navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentBookingsPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={handleBookingsPrevious}
                    >
                      <FaArrowLeft />
                    </button>
                  </li>
                  {[...Array(totalBookingsPages).keys()].map((pageNumber) => (
                    <li
                      key={pageNumber}
                      className={`page-item ${
                        currentBookingsPage === pageNumber + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handleBookingsPageChange(pageNumber + 1)}
                      >
                        {pageNumber + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentBookingsPage === totalBookingsPages
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button className="page-link" onClick={handleBookingsNext}>
                      {/* Next*/}

                      <FaArrowRight />
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
          {/* Inline Confirmation Modal */}
          <Modal show={showConfirmationModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>{confirmationMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      {showAddModal && (
        <Modal
          id="add-trip-modal"
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
        >
          <ModalHeader closeButton>
            <ModalTitle>Add Trip</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <form id="add-trip-form" onSubmit={handleAddTrip}>
              <div className="form-group">
                <label>Trip Number:</label>
                <input
                  type="text"
                  name="tripNumber"
                  value={newTrip.tripNumber}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
                {addValidationErrors.tripNumber && (
                  <p className="text-danger">
                    {addValidationErrors.tripNumber}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Trip Date:</label>
                <input
                  type="date"
                  name="date"
                  value={newTrip.date}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
                {addValidationErrors.date && (
                  <p className="text-danger">{addValidationErrors.date}</p>
                )}
              </div>
              <div className="form-group">
                <label>Available Places:</label>
                <input
                  type="number"
                  name="avilabalPlaces"
                  value={newTrip.avilabalPlaces}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
                {addValidationErrors.avilabalPlaces && (
                  <p className="text-danger">
                    {addValidationErrors.avilabalPlaces}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Departure Station:</label>
                <input
                  type="text"
                  name="departuerStation"
                  value={newTrip.departuerStation}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
                {addValidationErrors.departuerStation && (
                  <p className="text-danger">
                    {addValidationErrors.departuerStation}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Arrived Station:</label>
                <input
                  type="text"
                  name="destinationStation"
                  value={newTrip.destinationStation}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
                {addValidationErrors.destinationStation && (
                  <p className="text-danger">
                    {addValidationErrors.destinationStation}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Departure Time:</label>
                <input
                  type="time"
                  name="departuerTime"
                  value={newTrip.departuerTime}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
                {addValidationErrors.departuerTime && (
                  <p className="text-danger">
                    {addValidationErrors.departuerTime}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Arrived Time:</label>
                <input
                  type="time"
                  name="destinationTime"
                  value={newTrip.destinationTime}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
                {addValidationErrors.destinationTime && (
                  <p className="text-danger">
                    {addValidationErrors.destinationTime}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={newTrip.price}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
                {addValidationErrors.price && (
                  <p className="text-danger">{addValidationErrors.price}</p>
                )}
              </div>
              <div className="form-group">
                <label>Bus</label>
                <input
                  type="number"
                  name="bus"
                  value={newTrip.bus}
                  onChange={handleNewTripChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Add Trip
              </button>
            </form>
          </ModalBody>
        </Modal>
      )}
      ,
      {showEditModal && (
        <Modal
          id="edit-trip-modal"
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
        >
          <ModalHeader closeButton>
            <ModalTitle>Edit Trip</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <form id="edit-trip-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Trip Number:</label>
                <input
                  type="text"
                  name="tripNumber"
                  value={formData.tripNumber}
                  onChange={handleChange}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Trip Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                />
                {editValidationErrors.date && (
                  <p className="text-danger">{editValidationErrors.date}</p>
                )}
              </div>
              <div className="form-group">
                <label>Available Places:</label>
                <input
                  type="number"
                  name="avilabalPlaces"
                  value={formData.avilabalPlaces}
                  onChange={handleChange}
                  className="form-control"
                />
                {editValidationErrors.avilabalPlaces && (
                  <p className="text-danger">
                    {editValidationErrors.avilabalPlaces}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Departure Station:</label>
                <input
                  type="text"
                  name="departuerStation"
                  value={formData.departuerStation}
                  onChange={handleChange}
                  className="form-control"
                />
                {editValidationErrors.departuerStation && (
                  <p className="text-danger">
                    {editValidationErrors.departuerStation}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Arrived Station:</label>
                <input
                  type="text"
                  name="destinationStation"
                  value={formData.destinationStation}
                  onChange={handleChange}
                  className="form-control"
                />
                {editValidationErrors.destinationStation && (
                  <p className="text-danger">
                    {editValidationErrors.destinationStation}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Departure Time:</label>
                <input
                  type="time"
                  name="departuerTime"
                  value={formData.departuerTime}
                  onChange={handleChange}
                  className="form-control"
                />
                {editValidationErrors.departuerTime && (
                  <p className="text-danger">
                    {editValidationErrors.departuerTime}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Arrived Time:</label>
                <input
                  type="time"
                  name="destinationTime"
                  value={formData.destinationTime}
                  onChange={handleChange}
                  className="form-control"
                />
                {editValidationErrors.destinationTime && (
                  <p className="text-danger">
                    {editValidationErrors.destinationTime}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                />
                {editValidationErrors.price && (
                  <p className="text-danger">{editValidationErrors.price}</p>
                )}
              </div>
              <div className="form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                  disabled
                />
                {/* {validationErrors.status && <p className="text-danger">{validationErrors.status}</p>} */}
              </div>
              <div className="form-group">
                <label>Bus</label>
                <input
                  type="number"
                  name="bus"
                  value={formData.bus}
                  onChange={handleChange}
                  className="form-control"
                />
                {editValidationErrors.bus && (
                  <p className="text-danger">{editValidationErrors.bus}</p>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </form>
          </ModalBody>
        </Modal>
      )}
      ,
      {showDeleteModal && (
        <Modal
          id="delete-trip-modal"
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
        >
          <ModalHeader closeButton>
            <ModalTitle>Delete Trip</ModalTitle>
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this trip?</ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-danger"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelDelete}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default DisplayTrips;
