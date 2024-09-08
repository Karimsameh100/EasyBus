import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SearchComponent from "../Componants/Searh";
import { Reviews } from "../Componants/Reviews/Review";
import gobus from "../logo/unnamed.png"
import axios from "axios";
import { Modal, ModalTitle, ModalHeader, ModalBody, ModalFooter, Button } from 'react-bootstrap';
import ReviewForm from "./CreateReview";

export function CityDetailes() {
    const params = useParams();
    const [city, setCity] = useState();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 4;
    const [hasMoreReviews, setHasMoreReviews] = useState(true);
    const [companiess, setCompanies] = useState([]);
    const [trips, setTrips] = useState([]);
    const currentUserId = 1;

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [formData, setFormData] = useState({}); // Initialize formData state
    const [editTrip, setEditTrip] = useState(null); // Initialize editTrip state
    const [company, setCompany] = useState(null); // Initialize company state
    const [showModal, setShowModal] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);  // State to control the ReviewForm modal
    const [editReviewId, setEditReviewId] = useState(null); // State to control edit mode
    const [favorites, setFavorites] = useState([]);



    // ------------------Favourites-----------START---------------------//
    useEffect(() => {
        axios.get(`http://localhost:4001/posts/${params.id}`)
            .then((res) => setCity(res.data))
            .catch((err) => console.error('Error fetching city:', err));

        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
            setIsLoggedIn(true);
        }

        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, [params.id]);

    const handleAddToFavorites = (trip, company) => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const newFavorite = { ...trip, companyName: company.name };
        storedFavorites.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    
        // Dispatch a storage event to notify other components
        window.dispatchEvent(new Event('storage'));
    
        setFavorites(storedFavorites.length);
    };



    // ------------------Favourites-----------END---------------------//


    const handleEditTrip = (trip, company) => {
        setEditTrip(trip);
        setCompany(company);
        setFormData({
            tripNumber: trip.tripNumber,
            tripDate: trip.tripDate,
            availablePlaces: trip.availablePlaces,
            departureStation: trip.departureStation,
            stopStations: trip.stopStations,
            departureTime: trip.departureTime,
            arrivedTime: trip.arrivedTime,
            price: trip.price,
        });
        setShowEditModal(true);
    };


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update the trip in the JSON data
        axios.put(`http://localhost:4001/posts/${params.id}`, {
            ...city,
            companies: city.companies.map((c) => {
                if (c.id === company.id) {
                    return {
                        ...c,
                        trips: c.trips.map((t) => {
                            if (t.tripNumber === editTrip.tripNumber) {
                                return {
                                    ...formData,
                                    id: t.id,
                                };
                            }
                            return t;
                        }),
                    };
                }
                return c;
            }),
        })
            .then((res) => {
                setCity(res.data);
                setShowEditModal(false); // Hide the modal after update
            })
            .catch((err) => console.error('Error updating trip:', err));
    };

    const handleDeleteTrip = (trip, company) => {
        setEditTrip(trip);
        setCompany(company);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        // Delete the trip from the JSON data
        axios
            .put(`http://localhost:4001/posts/${params.id}`, {
                ...city,
                companies: city.companies.map((c) => {
                    if (c.id === company.id) {
                        return {
                            ...c,
                            trips: c.trips.filter((t) => t.tripNumber !== editTrip.tripNumber),
                        };
                    }
                    return c;
                }),
            })
            .then((res) => {
                setCity(res.data);
                setShowDeleteModal(false); // Hide the modal after deletion
            })
            .catch((err) => console.error("Error deleting trip:", err));
    };

    const cancelDelete = () => {
        setShowDeleteModal(false); // Hide the modal on cancel
    };




    useEffect(() => {
        axios
            .get(`http://localhost:4001/posts/${params.id}`)
            .then((res) => {
                setCity(res.data);
                setHasMoreReviews(res.data.Reviews.length > reviewsPerPage);
                setCompanies(res.data.companies || []); // add default value
                setTrips(res.data.companies && res.data.companies.trips || []); // add default value
            })
            .catch((err) => console.error('Error fetching products:', err));
    }, [params.id, reviewsPerPage, showEditModal, showDeleteModal]);

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = city ? city.Reviews.slice(indexOfFirstReview, indexOfLastReview) : [];

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

    //     userName	Karim Sameh	
    // userEmail	karimsameh807@gmail.com	
    // isLoggedIn	true	


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     const isLoggedIn = localStorage.getItem("isLoggedIn");
    //     if (isLoggedIn === "true") {
    //         setIsLoggedIn(true);
    //     }
    // }, []);

    const handleLogin = () => {
        // login logic here
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // logout logic here
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
    };

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
        return <div>Loading...</div>;
    }

    const confirmDeleteReview = (reviewId) => {
        setReviewToDelete(reviewId);
        setShowModal(true);
    };

    const handleDeleteReview = () => {
        if (!reviewToDelete) return;

        // Optimistically update the UI
        const updatedReviews = city.Reviews.filter(r => r.ReviewId !== reviewToDelete);
        setCity(prevCity => ({
            ...prevCity,
            Reviews: updatedReviews
        }));

        // Make the API call to update the server
        axios.put(`http://localhost:4001/posts/${params.id}`, {
            ...city,
            Reviews: updatedReviews
        }).then(() => {
            // Reset modal and state after successful deletion
            setShowModal(false);
            setReviewToDelete(null);
        }).catch(err => {
            console.error('Error deleting review:', err);
            // If the API call fails, revert the optimistic update
            setCity(prevCity => ({
                ...prevCity,
                Reviews: [...prevCity.Reviews, reviewToDelete] // Add back the deleted review
            }));
            // Show an error message or handle the error appropriately
        });
    };


    const handleEditReview = (reviewId) => {
        setEditReviewId(reviewId);
        setShowReviewForm(true);  // Open the modal in edit mode
    };

    const handleOpenReviewForm = () => {
        setEditReviewId(null);  // Reset the edit mode
        setShowReviewForm(true);  // Open the modal for a new review
    };

    const handleReviewSubmit = (updatedReviews) => {
        setCity(prevCity => ({ ...prevCity, Reviews: updatedReviews }));
    };


    return (
        <>
            <div style={{ position: "relative" }}>
                <img src={city?.image} style={{ width: "100%", height: "100vh", objectFit: "cover", opacity: 0.9 }} />

                <div className="d-flex flex-column align-items-center justify-content-center" style={{
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
                    boxSizing: "border-box"
                }}>
                    <h1 className="text-light text-center">Book your Ticket</h1>
                    <SearchComponent />
                    <h2 className="text-light text-center">{city.city} City</h2>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
                <img src={city?.image} style={{ width: "50%", height: "50%", objectFit: "cover", marginRight: "20px" }} />
                <h4 style={{ textAlign: "left" }}>{city.info}</h4>
            </div>
            <div className="badge-container">
                <span className="badge badge-primary">{favorites.length}</span> {/* Display the updated favorites count */}
            </div>
            <div class="container-fluid">
                {city && city.companies.map((company) => (
                    <div key={company.id} class="row d-flex justify-content-center mb-5">
                        <h2 className="text-center m-5">Travel with {company.name}</h2>
                        <div class="col-sm-6 col-md-4">
                            <img src={company.image} className="img-fluid mt-5 " alt="Image" />
                        </div>
                        <div className="table-responsive col-sm-6 col-md-8">
                            <table className="table table-striped table-bordered-bold">
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
                                    {company.trips.map((trip) => (
                                        <tr key={trip.tripNumber}>
                                            <td>{trip.tripNumber}</td>
                                            <td>{trip.tripDate}</td>
                                            <td>{trip.availablePlaces}</td>
                                            <td>{trip.departureStation}</td>
                                            <td>{trip.stopStations}</td>
                                            <td>{trip.departureTime}</td>
                                            <td>{trip.arrivedTime}</td>
                                            <td>{trip.price}</td>
                                            <td>
                                                <button class="btn btn-success btn-sm mx-1" style={{ width: "20%" }} 
                                                onClick={() => isLoggedIn ? handleBookTrip(trip, company) : setShowLoginModal(true)}>Book</button>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    style={{ width: "20%" }}
                                                    onClick={() => {
                                                        handleEditTrip(trip, company);
                                                        setShowEditModal(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm mx-2 "
                                                    style={{ width: "20%" }}
                                                    onClick={() => {
                                                        handleDeleteTrip(trip, company);
                                                        setShowDeleteModal(true);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                
                                                    className="btn btn-warning btn-sm"  style={{ width: "30%" }}


                                                    onClick={() => isLoggedIn ? handleAddToFavorites(trip, company) : setShowLoginModal(true)}
                                                >
                                                    Add to Favorites
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
                            <p className="lead mb-4 mb-xl-5">We believe in client satisfaction. Here are some Reviews by our worthy clients.</p>
                            <div className="d-flex">
                                {currentPage > 1 && (
                                    <button onClick={handleGoBack} className="btn btn-secondary rounded-pill me-2">Go Back</button>
                                )}
                                {hasMoreReviews && (
                                    <button onClick={handleLoadMore} className="btn btn-success rounded-pill">More Reviews</button>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-lg-8">
                            <div className="row">
                                {currentReviews.map((review) => (
                                    <div key={review.ReviewId} className="col-12 col-md-6 mb-4">
                                        <Reviews
                                            customerImg={review.RevCustomerImage}
                                            customerReview={review.Review}
                                            customerName={review.ReviewCustomerName}
                                            customerRate={review.ReviewCustomerRate}
                                            onEdit={() => handleEditReview(review.ReviewId)}
                                            onDelete={() => confirmDeleteReview(review.ReviewId)}
                                            isAuthor={review.UserId === currentUserId}

                                        />

                                    </div>
                                ))}
                                <Button className="btn btn-success rounded-pill" onClick={handleOpenReviewForm}>
                                    Share Your Review
                                </Button>
                            </div>

                            {/* Review Form Modal */}
                            <Modal show={showReviewForm} onHide={() => setShowReviewForm(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{editReviewId ? "Edit Your Review" : "Share Your Review"}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ReviewForm id={params.id} reviewId={editReviewId} onClose={() => setShowReviewForm(false)}
                                        onSubmit={handleReviewSubmit} />
                                </Modal.Body>
                            </Modal>

                            {/* Confirmation Modal */}
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm Deletion</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                                    <Button variant="danger" onClick={handleDeleteReview}>Delete</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </section>



            {showEditModal && (
                <Modal id="edit-trip-modal" show={showEditModal} onHide={() => setShowEditModal(false)}>
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
                                />
                            </div>
                            <div className="form-group">
                                <label>Trip Date:</label>
                                <input
                                    type="date"
                                    name="tripDate"
                                    value={formData.tripDate}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Available Places:</label>
                                <input
                                    type="number"
                                    name="availablePlaces"
                                    value={formData.availablePlaces}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Departure Station:</label>
                                <input
                                    type="text"
                                    name="departureStation"
                                    value={formData.departureStation}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Arrived Station:</label>
                                <input
                                    type="text"
                                    name="arrivedStation"
                                    value={formData.arrivedStation}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Departure Time:</label>
                                <input
                                    type="time"
                                    name="departureTime"
                                    value={formData.departureTime}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Arrived Time:</label>
                                <input
                                    type="time"
                                    name="arrivedTime"
                                    value={formData.arrivedTime}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </form>
                    </ModalBody>
                </Modal>
            )},
            {showDeleteModal && (
                <Modal id="delete-trip-modal" show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <ModalHeader closeButton>
                        <ModalTitle>Delete Trip</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this trip?
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                            Delete
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            )}

            {showLoginModal && (
                <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
                    <ModalHeader closeButton>
                        <ModalTitle>Login To Add to Favorites or Book The Trip</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        You need to Login to complete Booking and add your favourite trips !!
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            navigate('/login');
                            setShowLoginModal(false);
                        }}>Go to Login</Button>
                        <Button variant="secondary" onClick={() => setShowLoginModal(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )}

        </>
    );
};
