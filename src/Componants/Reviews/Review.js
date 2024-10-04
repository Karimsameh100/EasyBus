import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Review.css'; 

export function Reviews({ customerImg, customerReview, customerName, customerRate, onEdit, onDelete, isAuthor }) {
    const getStarRating = (rate) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rate ? '★' : '☆';
        }
        return stars;
    };

    return (
        <div className="card review-card border-0 border-bottom border-primary shadow-sm h-100">
            <div className="position-absolute top-0 end-0 m-3 text-warning" style={{ fontSize: '1.5rem' }}>
                {getStarRating(parseInt(customerRate))}
            </div>
            <div className="card-body p-4 p-xxl-5">
                <figure>
                    <img className="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" width={80} src={customerImg} alt="Customer"/>
                    <figcaption>
                        <blockquote className="bsb-blockquote-icon mb-4 review-text">
                            {customerReview}
                        </blockquote>
                        <h4 className="mb-2">{customerName}</h4>
                    </figcaption>
                </figure>
                {isAuthor && (
                    <div className="d-flex justify-content-end">
                        {onEdit && (
                            <button onClick={onEdit} className="btn btn-warning me-2">
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <button onClick={onDelete} className="btn btn-danger">
                                Delete
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
