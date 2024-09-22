import React, { useState, useEffect } from "react";
import axios from "axios";

function ReviewForm({ id, reviewId, onClose, onSubmit, currentUser }) {
  const [review, setReview] = useState({
    RevCustomerImage:
      currentUser?.image ||
      "https://i.pinimg.com/564x/1a/ef/2a/1aef2a96597421aeb4013e26b9513b65.jpg",
    Review: "",
    ReviewCustomerName: currentUser?.name || "",
    ReviewCustomerRate: 0,
  });

  useEffect(() => {
    if (reviewId) {
      axios
        .get(`http://localhost:8000/reviews/${reviewId}/`)
        .then((res) => {
          const existingReview = res.data;
          setReview({
            ReviewCustomerName: existingReview.ReviewCustomerDetails.name,
            Review: existingReview.Review,
            ReviewCustomerRate: existingReview.ReviewCustomerRate,
            ReviewCustomerImage:
              existingReview.ReviewCustomerDetails.image ||
              "https://i.pinimg.com/564x/1a/ef/2a/1aef2a96597421aeb4013e26b9513b65.jpg",
          });
        })
        .catch((err) => console.error("Error fetching review:", err));
    }
  }, [reviewId]);

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

    const reviewData = {
      Review: review.Review,
      ReviewCustomerRate: review.ReviewCustomerRate,
      ReviewCustomerName: currentUser.id, // Send the logged-in user’s ID
    };

    if (reviewId) {
      // Update existing review
      axios
        .put(`http://localhost:8000/reviews/${reviewId}/`, reviewData)
        .then((res) => {
          onSubmit(res.data); // Notify parent of the updated reviews
          onClose(); // Close modal
        })
        .catch((err) => console.error("Error updating review:", err));
    } else {
      // Create new review
      axios
        .post("http://localhost:8000/reviews/", reviewData)
        .then((res) => {
          onSubmit(res.data); // Notify parent of the new review
          onClose(); // Close modal
        })
        .catch((err) => console.error("Error creating review:", err));
    }
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
          value={review.name}
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
