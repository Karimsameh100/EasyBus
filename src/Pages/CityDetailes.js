import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import SearchComponent from "../Componants/Searh";
import { Reviews } from "../Componants/Reviews/Review";
import gobus from "../logo/unnamed.png"
import axios from "axios";

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
    }, [params.id, reviewsPerPage]);

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

    const handleBookTrip = (trip,company) => {
        // Navigate to the Booking page and pass the trip data as a prop
        navigate(`/booking/${trip.tripNumber}`, { state: { trip,company } });
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

    const handleDeleteReview = (reviewId) => {
        axios.get(`http://localhost:4001/posts/${params.id}`)
            .then(res => {
                const updatedReviews = res.data.Reviews.filter(r => r.ReviewId !== reviewId);
                axios.put(`http://localhost:4001/posts/${params.id}`, {
                    ...res.data,
                    Reviews: updatedReviews
                }).then(() => {
                    setCity(prevCity => ({
                        ...prevCity,
                        Reviews: updatedReviews
                    }));
                });
            })
            .catch(err => console.error('Error deleting review:', err));
    };
    
    
    const handleEditReview = (reviewId) => {
        navigate(`/edit/${params.id}/${reviewId}`);
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
            <div class="container-fluid">
                {companiess.map((company) => (
                    <div key={company.id} class="row d-flex justify-content-center mb-5">
                        <h2 className="text-center m-5">Travel with {company.name}</h2>
                        <div class="col-sm-6 col-md-4">
                            <img src={company.image} className="img-fluid mt-5 " alt="Image" />
                        </div>
                        <div class=" table-responsive col-sm-6 col-md-8">
                            <table class="table table-striped table-bordered-bold">
                                <thead>
                                    <tr>
                                        <th>Trip Number</th>
                                        <th style={{ width: "15%" }}>Trip Date</th>
                                        <th class="text-center" style={{ width: "8%" }}>Available Places</th>
                                        <th class="text-center" style={{ width: "15%" }}>Departure Station</th>
                                        <th class="text-center" style={{ width: "10%" }}>Stop Stations</th>
                                        <th style={{width : "10%"}}>Go In</th>
                                        <th style={{width : "10%"}}>Arrive At</th>
                                        <th style={{ width: "10%" }}>Price</th>
                                        <th class="text-center" style={{ width: "10%" }}>Book</th>
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
                                                <button class="btn btn-success btn-sm w-100"  onClick={() => handleBookTrip(trip,company)}>Book</button>
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
                                            customerRate={review.ReviewCutomerRate}
                                            onEdit={() => handleEditReview(review.ReviewId)}
                                            onDelete={() => handleDeleteReview(review.ReviewId)}
                                            isAuthor={review.UserId === currentUserId}
                                        
                                    />
            
                                    </div>
                                ))}
                                <Link to={`/create/${params.id}`} className="btn btn-secondary rounded-pill"> Share Your Review</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
