import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function ReviewForm({ id,cityId, reviewId, onClose, onSubmit }) {
  const [review, setReview] = useState({
    RevCustomerImage: "",
    Review: "",
    ReviewCustomerName: "",
    ReviewCustomerRate: 0,
  });

  const [userDetails, setUserDetails] = useState({});
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;

    axios
      .get(`http://127.0.0.1:8000/user/${userId}`, { headers })
      .then((response) => {
        const { name, image } = response.data;

        setUserDetails({
          id: userId,
          name,
          image,
        });

        // Set default values for a new review
        setReview((prev) => ({
          ...prev,
          RevCustomerImage: image || "https://i.pinimg.com/564x/1a/ef/2a/1aef2a96597421aeb4013e26b9513b65.jpg",
          ReviewCustomerName: name || "",
          Review: "",
          ReviewCustomerRate: 0,
        }));
      })
      .catch((error) => console.error("Error fetching user data:", error));

    // Fetch existing review data if reviewId is provided
    if (reviewId) {
      axios
        .get(`http://127.0.0.1:8000/reviews/${reviewId}/`, { headers })
        .then((response) => {
          const existingReview = response.data;
          setReview((prev) => ({
            ...prev,
            Review: existingReview.Review,
            ReviewCustomerRate: existingReview.ReviewCustomerRate,
          }));
        })
        .catch((error) => console.error("Error fetching review data:", error));
    }
  }, [token, reviewId]); // Add reviewId to dependency array

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (rate) => {
    setReview({
      ...review,
      ReviewCustomerRate: rate,
    });
  };

  const getStarRating = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          style={{
            cursor: "pointer",
            color: i <= rate ? "gold" : "gray",
            fontSize: "1.5rem",
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    console.log("User ID:", userDetails.id);
    const reviewData = {
      Review: review.Review,
      ReviewCustomerRate: review.ReviewCustomerRate,
      ReviewCustomerDetails_id: userDetails.id,
      city_id: cityId,
    };
    console.log("City ID:", cityId);

    const apiCall = reviewId
      ? axios.put(`http://localhost:8000/reviews/${reviewId}/`, reviewData, { headers })
      : axios.post("http://localhost:8000/reviews/", reviewData, { headers });

    apiCall
      .then((res) => {
        console.log("Review submitted successfully:", res.data);
        onSubmit(res.data);
        onClose();
      })
      .catch((err) => {
        console.error(reviewId ? "Error updating review:" : "Error creating review:", err.response?.data || err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 text-center">
        <div className="rating">{getStarRating(review.ReviewCustomerRate)}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="ReviewCustomerName" className="form-label">
          Your Name
        </label>
        <input
          type="text"
          className="form-control"
          id="ReviewCustomerName"
          name="ReviewCustomerName"
          value={review.ReviewCustomerName}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Review" className="form-label">
          Your Review
        </label>
        <textarea
          className="form-control"
          id="Review"
          name="Review"
          value={review.Review}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-success rounded-pill w-100">
        {reviewId ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;
