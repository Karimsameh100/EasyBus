import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export function Reviews({ id, image, city,info }) {
    return (

        <section class="bg-light py-3 py-md-5">
            <div class="container">
                <div class="row gy-5 gy-lg-0 align-items-center">
                <div class="col-12 col-lg-4">
                    <h2 class="display-5 mb-3 mb-xl-4">Our Clients</h2>
                    <p class="lead mb-4 mb-xl-5">We believe in client satisfaction. Here are some testimonials by our worthy clients.</p>
                    <a href="#!" class="btn bsb-btn-2xl btn-primary rounded-pill">More Testimonials</a>
                </div>

                <div class="col-12 col-lg-8">
                    <div class="row justify-content-xl-end">
                    <div class="col-12 col-xl-11">
                        <div class="row gy-4">
                        <div class="col-12 col-md-6">
                            <div class="card border-0 border-bottom border-primary shadow-sm">
                            <div class="card-body p-4 p-xxl-5">
                                <figure>
                                <img class="img-fluid rounded rounded-circle mb-4 border border-5" loading="lazy" /* src={customerImg} */ alt="Luna Joh"/>
                                <figcaption>
                                    <blockquote class="bsb-blockquote-icon mb-4">{/* {customerReview} */} i'm bored !!!</blockquote>
                                    <h4 class="mb-2">{/* {customerName} */} Afnan Mohamed</h4>
                                    <h5 class="fs-6 text-secondary mb-0">{/* {customerJob} */} Web Zeft</h5>
                                </figcaption>
                                </figure>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

    );
}