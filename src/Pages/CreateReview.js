import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ReviewForm() {
    const { id, reviewId } = useParams();  // `reviewId` will be undefined when creating a new review
    const [review, setReview] = useState({
        RevCustomerImage: 'https://i.pinimg.com/564x/1a/ef/2a/1aef2a96597421aeb4013e26b9513b65.jpg', 
        Review: '',
        ReviewCustomerName: '',
        ReviewCutomerRate: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (reviewId) {
            // Fetch the existing review if editing
            axios.get(`http://localhost:4001/posts/${id}`)
                .then(res => {
                    const existingReview = res.data.Reviews.find(r => r.ReviewId === parseInt(reviewId));
                    if (existingReview) {
                        setReview(existingReview);
                    } else {
                        console.error('Review not found');
                    }
                })
                .catch(err => console.error('Error fetching review:', err));
        }
    }, [id, reviewId]);

    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        });
    };

    const handleRatingChange = (rate) => {
        setReview({
            ...review,
            ReviewCutomerRate: rate
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
                        cursor: 'pointer',
                        color: i <= rate ? 'gold' : 'gray',
                        fontSize: '1.5rem',
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
    
        const currentUser = {
            UserId: 1, // Replace with actual logged-in user ID
            UserName: 'Afnan', // Replace with actual logged-in user name
        };
    
        if (reviewId) {
            // Update the existing review
            axios.get(`http://localhost:4001/posts/${id}`)
                .then(res => {
                    const updatedReviews = res.data.Reviews.map(r => 
                        r.ReviewId === parseInt(reviewId) ? { ...review } : r
                    );
                    axios.put(`http://localhost:4001/posts/${id}`, {
                        ...res.data,
                        Reviews: updatedReviews
                    }).then(() => {
                        navigate(`/city/${id}`);
                    });
                })
                .catch(err => console.error('Error updating review:', err));
        } else {
            // Create a new review
            axios.get(`http://localhost:4001/posts/${id}`)
                .then(res => {
                    const existingReviews = res.data.Reviews;
                    const maxReviewId = existingReviews.length > 0 ? Math.max(...existingReviews.map(r => r.ReviewId || 0)) : 1;
    
                    const newReview = { 
                        ReviewId: maxReviewId + 1,
                        ...review,
                        UserId: currentUser.UserId,
                        UserName: currentUser.UserName,
                    };
    
                    const updatedReviews = [...existingReviews, newReview];
    
                    axios.put(`http://localhost:4001/posts/${id}`, {
                        ...res.data,
                        Reviews: updatedReviews
                    }).then(() => {
                        navigate(`/city/${id}`);
                    });
                })
                .catch(err => console.error('Error updating reviews:', err));
        }
    };
    

    return (
        <>
            <h2 className='mt-5 text-center'>{reviewId ? 'Edit Your Review' : 'Share Your Review'}</h2>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh', marginTop: '10px', marginBottom: '40px' }}>
                <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                    <div className="text-center mb-4">
                        <img
                            className="img-fluid rounded-circle"
                            src={review.RevCustomerImage}
                            alt="Customer"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-center">
                            <div className="rating">
                                {getStarRating(review.ReviewCutomerRate)}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ReviewCustomerName" className="form-label">Your Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ReviewCustomerName"
                                name="ReviewCustomerName"
                                value={review.ReviewCustomerName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Review" className="form-label">Your Review</label>
                            <textarea
                                className="form-control"
                                id="Review"
                                name="Review"
                                value={review.Review}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">{reviewId ? 'Update Review' : 'Submit Review'}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ReviewForm;










