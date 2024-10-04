import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SearchComponent from "../Componants/Searh";
import { Reviews } from "../Componants/Reviews/Review";
import gobus from "../logo/unnamed.png";
import axios from "axios";
// import { Alert } from "react-bootstrap";

import { FaRegBookmark, FaHeart } from "react-icons/fa";
import "../Componants/bookstyle.css";
import {
  Modal,
  ModalTitle,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "react-bootstrap";
import ReviewForm from "./CreateReview";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-bootstrap";

export function CityDetailes() {
  const params = useParams();
  const [city, setCity] = useState();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [companiess, setCompanies] = useState([]);
  const [trips, setTrips] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [allTrips, setAllTrips] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({}); // Initialize formData state
  const [editTrip, setEditTrip] = useState(null); // Initialize editTrip state
  const [showModal, setShowModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false); // State to control the ReviewForm modal
  const [editReviewId, setEditReviewId] = useState(null); // State to control edit mode
  const [favorites, setFavorites] = useState([]);
  const imageBaseURL = "http://localhost:8000/";

  // State to control the visibility of the success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // ------------------Favourites-----------START---------------------//
  useEffect(() => {
    axios
      .get(`http://localhost:8000/all/trips/`)
      .then((res) => {
        console.log("API response:", res.data);
        setAllTrips(res.data);
      })
      .catch((err) => console.error("Error fetching trips:", err));
  }, [params.id, setEditTrip, setAllTrips]);

  console.log("allTrips:", allTrips);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/cities/${params.id}/`)
      .then((res) => {
        setCity(res.data);}
      )
      .catch((err) => console.error("Error fetching city:", err));
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, [params.id, setAllTrips, setEditTrip]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/register/company/")
      .then((response) => {
        const cityName = city.city;
        const filteredCompanies = response.data.filter((company) => {
          const trips = company.company_trips.filter((trip) => {
            return (
              trip.departuerStation == cityName ||
              trip.destinationStation == cityName
            );
          });
          return trips.length > 0;
        });
        setCompanies(filteredCompanies);
      })
      .catch((error) => console.error(error));
  }, [params.id]);

  console.log(companiess);

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/favorites"); // Replace with the correct API endpoint
      if (response.ok) {
        const data = await response.json();
        // Do something with the data, for example, update the state
        setFavorites(data);
      } else {
        console.error("Failed to fetch favorites");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites(); // Ensure this is called on component load or where needed
  }, []);

  const handleAddToFavorites = async (trip) => {
    try {
      const authToken = localStorage.getItem("authToken");

      // Ensure the data structure matches what your backend expects
      const data = { trip_id: trip };

      // Send the request to add the trip to favorites
      await axios.post("http://localhost:8000/favorites/", data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      console.log("Trip added to favorites");
    } catch (error) {
      if (error.response) {
        // Log detailed server error for troubleshooting
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error adding to favorites", error);
      }
    }
  };

  // ------------------Favourites-----------END---------------------//

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Make the request
    axios
      .put(`http://localhost:8000/selected/trip/${editTrip.id}`, {
        ...formData,
      })

      .then((res) => {
        const updatedTrips = allTrips.map((trip) =>
          trip.tripNumber === editTrip.id ? res.data : trip
        );
        setAllTrips(updatedTrips);
        setShowEditModal(false); // Hide the modal after update
      })
      .catch((err) => console.error("Error updating trip:", err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/cities/${params.id}/`)
      .then((res) => {
        console.log("tststtsts: ", res.data.companies);
        setCity(res.data);
        setHasMoreReviews(res.data.Reviews.length > reviewsPerPage);
        setCompanies(res.data.companies || []); // add default value
        setTrips((res.data.companies && res.data.companies.trips) || []); // add default value
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [params.id, reviewsPerPage, showEditModal, showDeleteModal]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = city
    ? city.Reviews.slice(indexOfFirstReview, indexOfLastReview)
    : [];

  useEffect(() => {
    if (city) {
      setHasMoreReviews(city.Reviews.length > indexOfLastReview);
    }
  }, [currentPage, city, indexOfLastReview]);

  const handleLoadMore = () => {
    // Load more reviews if available
    if (hasMoreReviews) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const isUser = localStorage.getItem("authToken") ? true : false;
    if (isUser) {
      setIsLoggedIn(true);
    }
  }, [localStorage.getItem("authToken")]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setIsLoggedIn(true);

      // Decode the JWT token to get the user_id
      const decodedToken = jwtDecode(authToken);

      if (decodedToken && decodedToken.user_id) {
        setCurrentUserId(decodedToken.user_id);
        console.log("print user:", decodedToken.user_id);
      } else {
        console.error("User ID not found in token");
      }
    }
  }, [localStorage.getItem("authToken")]);

  const handleBookTrip = (trip, company) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      navigate(`/booking/${trip.tripNumber}`, { state: { trip, company } });
    }
  };
  const handleGoBack = () => {
    // Go back to previous page if possible
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!city) {
    return (
      <div className="text-center fs-2 text-bg-primary h-75">Loading...</div>
    );
  }

  const confirmDeleteReview = (reviewId) => {
    setReviewToDelete(reviewId);
    setShowModal(true);
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;

    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const updatedReviews = city.Reviews.filter((r) => r.id !== reviewToDelete);

    setCity((prevCity) => ({
      ...prevCity,
      Reviews: updatedReviews,
    }));

    try {
      await axios.delete(`http://localhost:8000/reviews/${reviewToDelete}/`, {
        headers,
      });
      setShowModal(false);
      setReviewToDelete(null);
    } catch (error) {
      console.error("Error deleting review:", error);
      setCity((prevCity) => ({
        ...prevCity,
        Reviews: prevCity.Reviews,
      }));
    }
  };

  const handleEditReview = (reviewId) => {
    setEditReviewId(reviewId);
    setShowReviewForm(true);
  };

  const handleOpenReviewForm = () => {
    setEditReviewId(null);
    setShowReviewForm(true);
  };

  const handleReviewSubmit = (newReview) => {
    setCity((prevCity) => {
      const existingReviewIndex = prevCity.Reviews.findIndex(
        (review) => review.id === newReview.id
      );

      if (existingReviewIndex !== -1) {
        // Update existing review
        const updatedReviews = [...prevCity.Reviews];
        updatedReviews[existingReviewIndex] = newReview;
        return { ...prevCity, Reviews: updatedReviews };
      } else {
        return { ...prevCity, Reviews: [...prevCity.Reviews, newReview] };
      }
    });
  };

  return (
    <>
      {showSuccessAlert && (
        <Alert
          variant="success"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "fit-content",
            zIndex: 1000,
          }}
        >
          This trip was added successfully to favorites!
        </Alert>
      )}
      <div style={{ position: "relative" }}>
        <img
          src={city.image}
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            opacity: 0.9,
          }}
        />

        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            position: "absolute",
            top: "0%",
            left: "0%",
            right: "0%",
            padding: "10px",
            paddingBottom: "30px",
            width: "100%",
            height: "100%",
            maxHeight: "100%", // add this to prevent height overflow
            maxWidth: "100%",
            backgroundColor: "rgba(128, 128, 128, 0.4)",
            display: "block",
            justifyContent: "around",
            alignItems: "center",
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        >
          <h1 className="text-light text-center">Book your Ticket</h1>
          <SearchComponent />
          <h2 className="text-light text-center">{city.city} City</h2>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <img
          src={city?.image}
          alt={city.name}
          style={{
            width: "50%",
            height: "50%",
            objectFit: "cover",
            marginRight: "20px",
          }}
        />
        <h4 style={{ textAlign: "left" }}>{city.info}</h4>
      </div>
      <div className="badge-container">
        <span className="badge badge-primary">{favorites.length}</span>{" "}
        {/* Display the updated favorites count */}
      </div>
      <div class="container-fluid">
        {companiess &&
          companiess.map((company) => (
            <div
              key={company.id}
              class="row d-flex justify-content-center mb-5"
            >
              <h2 className="text-center m-5">Travel with {company.name}</h2>
              <div class="col-sm-6 col-md-4">
                <img
                  src={
                    // {company.image}----------------------------الصوره مش بتيجى من الباك ايند
                    gobus
                  }
                  className="img-fluid mt-5 "
                  alt="Image"
                />
              </div>
              <div className="table-responsive col-sm-6 col-md-8">
                <table className="table table-striped table-bordered-bold w-100">
                  <thead>
                    <tr>
                      <th>Trip Number</th>
                      <th>Trip Date</th>
                      <th>Available Places</th>
                      <th>Departure Station</th>
                      <th>Stop Stations</th>
                      <th>Go In</th>
                      <th>Arrive At</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.company_trips
                      .filter((trip) => {
                        return (
                          trip.departuerStation === city.city ||
                          trip.destinationStation === city.city
                        );
                      })
                      .map((trip) => (
                        <tr key={trip.id}>
                          <td>{trip.tripNumber}</td>
                          <td>{trip.date}</td>
                          <td>{trip.avilabalPlaces}</td>
                          <td>{trip.departuerStation}</td>
                          <td>{trip.destinationStation}</td>
                          <td>{trip.departuerTime}</td>
                          <td>{trip.destinationTime}</td>
                          <td>{trip.price}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm mx-1"
                              style={{ width: "100%" }}
                              onClick={() =>
                                isLoggedIn
                                  ? handleBookTrip(trip, company)
                                  : setShowLoginModal(true)
                              }
                            >
                              <FaRegBookmark /> Book
                            </button>
                            <button
                              className="btn btn-outline-warning btn-sm mx-1 my-1"
                              style={{ width: "100%" }}
                              onClick={() =>
                                isLoggedIn
                                  ? handleAddToFavorites(trip, company)
                                  : setShowLoginModal(true)
                              }
                            >
                              <FaHeart />
                              {/* Liked */}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>

      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row gy-5 gy-lg-0 align-items-center">
            <div className="col-12 col-lg-4">
              <h2 className="display-5 mb-3 mb-xl-4">Our Clients</h2>
              <p className="lead mb-4 mb-xl-5">
                We believe in client satisfaction. Here are some Reviews by our
                worthy clients.
              </p>
              <div className="d-flex">
                {currentPage > 1 && (
                  <button
                    onClick={handleGoBack}
                    className="btn btn-secondary rounded-pill me-2"
                  >
                    Go Back
                  </button>
                )}
                {hasMoreReviews && (
                  <button
                    onClick={handleLoadMore}
                    className="btn btn-success rounded-pill"
                  >
                    More Reviews
                  </button>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="row">
                {currentReviews.map((review) => (
                  <div key={review.id} className="col-12 col-md-6 mb-4">
                    <Reviews
                      customerImg={`${imageBaseURL}${review.ReviewCustomerDetails.image}`}
                      customerReview={review.Review}
                      customerName={review.ReviewCustomerDetails.name}
                      customerRate={review.ReviewCustomerRate}
                      onEdit={() => handleEditReview(review.id)}
                      onDelete={() => confirmDeleteReview(review.id)}
                      isAuthor={
                        review.ReviewCustomerDetails.id === currentUserId
                      }
                    />
                  </div>
                ))}
                {isLoggedIn && (
                  <Button
                    className="btn btn-success rounded-pill"
                    onClick={handleOpenReviewForm}
                  >
                    Review The Trip
                  </Button>
                )}
              </div>

              {/* Review Form Modal */}
              <Modal
                show={showReviewForm}
                onHide={() => setShowReviewForm(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    {editReviewId ? "Edit Your Review" : "Share Your Review"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ReviewForm
                    id={params.id}
                    cityId={city.id}
                    reviewId={editReviewId}
                    onClose={() => setShowReviewForm(false)}
                    onSubmit={handleReviewSubmit}
                  />
                </Modal.Body>
              </Modal>

              {/* Confirmation Modal */}
              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this review?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleDeleteReview}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </section>
      {showLoginModal && (
        <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
          <ModalHeader closeButton>
            <ModalTitle>Login To Add to Favorites or Book The Trip</ModalTitle>
          </ModalHeader>
          <ModalBody>
            You need to Login to complete Booking and add your favourite trips
            !!
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                navigate("/Login1");
                setShowLoginModal(false);
              }}
            >
              Go to Login
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowLoginModal(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}

export default CityDetailes;
