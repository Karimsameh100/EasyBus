import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ReviewForm() {
    const { id } = useParams();
    const [review, setReview] = useState({
        RevCustomerImage: 'https://i.pinimg.com/564x/1a/ef/2a/1aef2a96597421aeb4013e26b9513b65.jpg', 
        Review: '',
        ReviewCustomerName: '',
        ReviewCutomerRate: 0,
    });

    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Fetch the existing reviews
        axios.get(`http://localhost:4001/posts/${id}`)
            .then(res => {
                // Determine the maximum ReviewId in the existing reviews
                const existingReviews = res.data.Reviews;
                const maxReviewId = existingReviews.length > 0 ? Math.max(...existingReviews.map(r => r.ReviewId || 0)) : 1;
                
                // Set the ReviewId of the new review
                const newReview = { 
                    ReviewId: maxReviewId + 1 ,
                    ...review
                    
                };
                
                // Add the new review to the list
                const updatedReviews = [...existingReviews, newReview];
                
                // Update the post with the new review list
                axios.put(`http://localhost:4001/posts/${id}`, {
                    ...res.data,
                    Reviews: updatedReviews
                }).then(() => {
                    navigate(`/city/${id}`);
                });
            })
            .catch(err => console.error('Error updating reviews:', err));
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

    return (
        <>
            <h2 className='mt-5 text-center'>Share Your Review</h2>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh', marginTop: '10px',  marginBottom: '40px' }}>
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
                    <button type="submit" className="btn btn-primary w-100">Submit Review</button>
                </form>
            </div>
        </div>
        </>
    );  
}

export default ReviewForm;