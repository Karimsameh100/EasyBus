import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchComponent from "../Componants/Searh";
import { Reviews } from "../Componants/Review";
import gobus from "../logo/unnamed.png"
import axios from "axios";

export function CityDetailes() {
    const params = useParams();
    const [city, setCity] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 4;
    const [hasMoreReviews, setHasMoreReviews] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:4001/posts/${params.id}`)
            .then((res) => {
                setCity(res.data);
                setHasMoreReviews(res.data.Reviews.length > reviewsPerPage);
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

    const handleGoBack = () => {
        // Go back to previous page if possible
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (!city) {
        return <div>Loading...</div>;
    }

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
                <h2 className="text-center m-5">Travel with go bus</h2>
                <div class="row d-flex justify-content-center">
                    <div class="col-sm-6 col-md-4">
                        <img src={gobus} className="img-fluid mt-5 " alt="Image" />
                    </div>
                    <div class="col-sm-6 col-md-8">
                        <table class="table table-striped table-bordered-bold">
                            <thead>
                                <tr>
                                    <th>Trip Number</th>
                                    <th style={{width : "15%"}}>Trip Date</th>
                                    <th class="text-center" style={{ width: "10%" }}>Available Places</th>
                                    <th class="text-center" style={{ width: "15%" }}>Departure Station</th>
                                    <th class="text-center" style={{ width: "15%" }}>Stop Stations</th>
                                    <th>Go In</th>
                                    <th>Arrive At</th>
                                    <th style={{ width: "7%" }}>Price</th>
                                    <th class="text-center" style={{ width: "10%" }}>Book</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>TR001</td>
                                    <td>2023-02-20</td>
                                    <td>20</td>
                                    <td>{city.city}</td>
                                    <td>Los Angeles, Chicago</td>
                                    <td>08:00 AM</td>
                                    <td>10:00 AM</td>
                                    <td>$100</td>
                                    <td><button class="btn btn-success btn-sm w-100">Book</button></td>
                                </tr>
                                <tr>
                                    <td>TR002</td>
                                    <td>2023-02-22</td>
                                    <td>15</td>
                                    <td>{city.city}</td>
                                    <td>Las Vegas, Phoenix</td>
                                    <td>09:00 AM</td>
                                    <td>11:00 AM</td>
                                    <td>$120</td>
                                    <td><button class="btn btn-success btn-sm w-100">Book</button></td>
                                </tr>
                                <tr>
                                    <td>TR003</td>
                                    <td>2023-02-24</td>
                                    <td>25</td>
                                    <td>{city.city}</td>
                                    <td>Orlando, Tampa</td>
                                    <td>10:00 AM</td>
                                    <td>12:00 PM</td>
                                    <td>$150</td>
                                    <td><button class="btn btn-success btn-sm w-100">Book</button></td>
                                </tr>
                                <tr>
                                    <td>TR004</td>
                                    <td>2023-02-26</td>
                                    <td>30</td>
                                    <td>{city.city}</td>
                                    <td>Houston, Austin</td>
                                    <td>11:00 AM</td>
                                    <td>01:00 PM</td>
                                    <td>$180</td>
                                    <td><button class="btn btn-success btn-sm w-100">Book</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
