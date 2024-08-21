import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Reviews({ customerImg, customerReview, customerName, customerRate }) {
    const getStarRating = (rate) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rate ? '★' : '☆'; // Full star if i < rate, empty star otherwise
        }
        return stars;
    };

    return (

                <div className="card border-0 border-bottom border-primary shadow-sm">
                     <div className="position-absolute top-0 end-0 m-3 text-warning" style={{ fontSize: '1.5rem' }}>
                        {getStarRating(parseInt(customerRate))}
                    </div>
                    <div className="card-body p-4 p-xxl-5">
                        <figure>
                        <img className="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" width={80} src={customerImg} alt="Luna Joh"/>
                        <figcaption>
                            <blockquote class="bsb-blockquote-icon mb-4">{customerReview}</blockquote>
                            <h4 className="mb-2">{customerName}</h4>
                        </figcaption>
                        </figure>
                    </div>
                </div>

    );
}