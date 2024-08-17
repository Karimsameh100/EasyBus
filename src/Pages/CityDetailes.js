import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchComponent from "../Componants/Searh";
import { Reviews } from "../Componants/Review";
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
                    right : "0%",
                    padding :"10px",
                    paddingBottom : "30px",
                    width : "100%",
                    height : "100%",
                    maxHeight: "100%", // add this to prevent height overflow
                    maxWidth: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
                                    <button onClick={handleLoadMore} className="btn btn-primary rounded-pill">More Reviews</button>
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
