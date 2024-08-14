import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export function TripItem({ id, image, city,info }) {
  return (
    <div className="card" style={{ width: "100%" }}>
        <Link to={`/City/${id}`}>
      <div className="card-img-top" style={{ height: "250px", overflow: "hidden" }}>
        <img src={image} alt="Card image cap" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      </Link>
      <div className="card-body text-center">
        <h5 className="card-title">{city}</h5>
      </div>
    </div>
  );
}