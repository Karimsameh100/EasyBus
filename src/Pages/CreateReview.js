// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function ReviewForm({ id, reviewId, onClose, onSubmit, currentUser }) {
//   const [review, setReview] = useState({
//     RevCustomerImage:
//       currentUser?.image ||
//       "https://i.pinimg.com/564x/1a/ef/2a/1aef2a96597421aeb4013e26b9513b65.jpg",
//     Review: "",
//     ReviewCustomerName: currentUser?.name || "",
//     ReviewCustomerRate: 0,
//   });

//   useEffect(() => {
//     if (reviewId) {
//       axios
//         .get(`http://localhost:8000/reviews/${reviewId}/`)
//         .then((res) => {
//           const existingReview = res.data;
//           setReview({
//             ReviewCustomerName: existingReview.ReviewCustomerDetails.name,
//             Review: existingReview.Review,
//             ReviewCustomerRate: existingReview.ReviewCustomerRate,
//             ReviewCustomerImage:
//               existingReview.ReviewCustomerDetails.image ||
//               "https://i.pinimg.com/564x/1a/ef/2a/1aef2a96597421aeb4013e26b9513b65.jpg",
//           });
//         })
//         .catch((err) => console.error("Error fetching review:", err));
//     }
//   }, [reviewId]);

//   const handleChange = (e) => {
//     setReview({
//       ...review,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleRatingChange = (rate) => {
//     setReview({
//       ...review,
//       ReviewCustomerRate: rate,
//     });
//   };

//   const getStarRating = (rate) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span
//           key={i}
//           onClick={() => handleRatingChange(i)}
//           style={{
//             cursor: "pointer",
//             color: i <= rate ? "gold" : "gray",
//             fontSize: "1.5rem",
//           }}
//         >
//           ★
//         </span>
//       );
//     }
//     return stars;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const reviewData = {
//       Review: review.Review,
//       ReviewCustomerRate: review.ReviewCustomerRate,
//       ReviewCustomerName: currentUser.id, // Send the logged-in user’s ID
//     };

//     if (reviewId) {
//       // Update existing review
//       axios
//         .put(`http://localhost:8000/reviews/${reviewId}/`, reviewData)
//         .then((res) => {
//           onSubmit(res.data); // Notify parent of the updated reviews
//           onClose(); // Close modal
//         })
//         .catch((err) => console.error("Error updating review:", err));
//     } else {
//       // Create new review
//       axios
//         .post("http://localhost:8000/reviews/", reviewData)
//         .then((res) => {
//           onSubmit(res.data); // Notify parent of the new review
//           onClose(); // Close modal
//         })
//         .catch((err) => console.error("Error creating review:", err));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3 text-center">
//         <div className="rating">{getStarRating(review.ReviewCustomerRate)}</div>
//       </div>
//       <div className="mb-3">
//         <label htmlFor="ReviewCustomerName" className="form-label">
//           Your Name
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           id="ReviewCustomerName"
//           name="ReviewCustomerName"
//           value={review.name}
//           onChange={handleChange}
//           readOnly
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="Review" className="form-label">
//           Your Review
//         </label>
//         <textarea
//           className="form-control"
//           id="Review"
//           name="Review"
//           value={review.Review}
//           onChange={handleChange}
//           required
//         ></textarea>
//       </div>
//       <button type="submit" className="btn btn-success rounded-pill w-100">
//         {reviewId ? "Update Review" : "Submit Review"}
//       </button>
//     </form>
//   );
// }

// export default ReviewForm;
// -----------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function ReviewForm({ id, reviewId, onClose, onSubmit }) {
  const [review, setReview] = useState({
    RevCustomerImage: "",
    Review: "",
    ReviewCustomerName: "",
    ReviewCustomerRate: 0,
  });

  const [userDetails, setUserDetails] = useState(1);
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

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;

      axios
        .get(`http://127.0.0.1:8000/user/${userId}`, { headers })
        .then((response) => {
          const {
            name,
            email,
            phone_number,
            image,
            is_staff,
            is_superuser,
            last_login,
            user_type,
          } = response.data;

          setUserDetails({
            id: userId,
            name,
            email,
            phone_number,
            image,
            is_staff,
            is_superuser,
            last_login,
            user_type,
          });

          // Update the review form state with user details
          setReview({
            RevCustomerImage:
              image ||
              "https://i.pinimg.com/564x/1a/ef/2a/1aef2a96597421aeb4013e26b9513b65.jpg",
            ReviewCustomerName: name || "",
            Review: "",
            ReviewCustomerRate: 0,
          });
        })
        .catch((error) => console.error("Error fetching user data:", error));
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [token]);

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

    const reviewData = {
      Review: review.Review,
      ReviewCustomerRate: review.ReviewCustomerRate,
      ReviewCustomerDetails_id: userDetails.id,
      //  {
      //     id: userDetails.id,
      //     name: userDetails.name,
      //     email: userDetails.email,
      //     phone_number: userDetails.phone_number,
      //     image: userDetails.image,
      //     is_staff: userDetails.is_staff,
      //     is_superuser: userDetails.is_superuser,
      //     user_type: userDetails.user_type,
      //     last_login:userDetails.last_login
      // },
    };

    if (reviewId) {
      axios
        .put(`http://localhost:8000/reviews/${reviewId}/`, reviewData, {
          headers,
        })
        .then((res) => {
          onSubmit(res.data);
          onClose();
        })
        .catch((err) => {
          console.error("Error updating review:", err.response?.data || err);
        });
    } else {
      // Create new review
      axios
        .post("http://localhost:8000/reviews/", reviewData, { headers })
        .then((res) => {
          onSubmit(res.data);
          onClose();
        })
        .catch((err) => {
          console.error("Error creating review:", err.response?.data || err);
        });
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
